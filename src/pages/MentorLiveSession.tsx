// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useUser } from "@/contexts/UserContext";

// const MentorLiveSession = () => {
//   const navigate = useNavigate();
//   const { sessionId } = useParams<{ sessionId: string }>();
//   const { user } = useUser();

//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [currentRoom, setCurrentRoom] = useState("");

//   // Timer logic
//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (sessionId) {
//       setCurrentRoom(sessionId);
//       timer = setInterval(() => {
//         setElapsedTime((prev) => prev + 1);
//       }, 1000);
//     }

//     return () => clearInterval(timer);
//   }, [sessionId]);

//   // Join room via new tab
//   const handleJoin = () => {
//     if (!sessionId) return;
//     const meetUrl = `https://meet.jit.si/${sessionId}`;
//     window.open(meetUrl, "_blank");
//   };

//   const handleLeave = () => {
//     navigate("/mentor-dashboard");
//   };

//   const formatTime = (sec: number) => {
//     const m = String(Math.floor(sec / 60)).padStart(2, "0");
//     const s = String(sec % 60).padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   return (
//     <div className="p-6 font-[Poppins]">
//       <h2 className="text-2xl font-bold mb-4">🎙 Mentor Control Panel</h2>

//       <div className="mb-3 text-gray-800 font-semibold">
//         👨‍🏫 Mentor: <strong>{user?.name}</strong> <br />
//         🧩 Room ID: <strong>{currentRoom}</strong> <br />
//         ⏱ Live Time: <span>{formatTime(elapsedTime)}</span>
//       </div>

//       <div className="text-center my-6">
//         <button
//           onClick={handleJoin}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
//         >
//           🚀 Launch Live Session
//         </button>
//       </div>

//       <div className="text-center">
//         <button
//           onClick={handleLeave}
//           className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full"
//         >
//           🚪 End Session
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MentorLiveSession;
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Timer, Users, Send, MessageSquare } from "lucide-react";

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

interface Participant {
  id: string;
  name: string;
  avatar?: string;
}

interface Message {
  id: string;
  name: string;
  avatar?: string;
  text: string;
  isLocal: boolean;
}

const ChatBox = ({ messages, onSendMessage }: { messages: Message[]; onSendMessage: (text: string) => void }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-4 overflow-y-auto pr-2">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.isLocal ? "justify-end" : ""}`}>
            {!msg.isLocal && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={msg.avatar} />
                <AvatarFallback>{msg.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`rounded-lg px-3 py-2 max-w-xs ${
                msg.isLocal ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              {!msg.isLocal && <p className="text-xs font-semibold pb-1">{msg.name}</p>}
              <p className="text-sm">{msg.text}</p>
            </div>
            {msg.isLocal && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={msg.avatar} />
                <AvatarFallback>{msg.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex items-center gap-2 pt-4">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

const MentorLiveSession = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { user } = useUser();

  const jitsiContainerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [elapsedTime, setElapsedTime] = useState(0);
  const [jitsiReady, setJitsiReady] = useState(false);
  const [jitsiApi, setJitsiApi] = useState<any>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // --- HELPER: debug console logger
  const log = (...args: any[]) => console.log("[MentorLiveSession]", ...args);

  // --- format elapsed time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Load Jitsi script
  useEffect(() => {
    const scriptId = "jitsi-script";
    if (!document.getElementById(scriptId)) {
      log("Injecting Jitsi script...");
      const script = document.createElement("script");
      script.src = "https://meet.mentxtv.com/external_api.js";
      script.async = true;
      script.id = scriptId;
      script.onload = () => {
        log("✅ Jitsi script loaded");
        setJitsiReady(true);
      };
      script.onerror = () => log("❌ Failed to load Jitsi script");
      document.body.appendChild(script);
    } else {
      log("ℹ️ Jitsi script already exists");
      setJitsiReady(true);
    }

    return () => {
      if (jitsiApi) {
        log("Cleaning up Jitsi API instance");
        jitsiApi.dispose();
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [jitsiApi]);

  const handleJoin = (roomName: string, mentorName: string) => {
    log("Attempting to join Jitsi room:", roomName);

    if (!window.JitsiMeetExternalAPI) return log("❌ JitsiMeetExternalAPI not available yet");
    if (!jitsiContainerRef.current) return log("❌ Jitsi container ref is null");

    try {
      const api = new window.JitsiMeetExternalAPI("meet.mentxtv.com", {
        roomName,
        parentNode: jitsiContainerRef.current,
        width: "100%",
        height: "100%",
        userInfo: { displayName: mentorName },
        configOverwrite: { startWithAudioMuted: true, startWithVideoMuted: true, prejoinPageEnabled: false },
        interfaceConfigOverwrite: { TOOLBAR_ALWAYS_VISIBLE: true, SHOW_JITSI_WATERMARK: false },
      });

      log("✅ Jitsi API instance created");
      setJitsiApi(api);

      api.addEventListener("videoConferenceJoined", (localUser: any) => {
        log("🎥 Video conference joined:", localUser);
        timerRef.current = setInterval(() => setElapsedTime((p) => p + 1), 1000);
        setParticipants([{ id: localUser.id, name: mentorName, avatar: `https://avatar.vercel.sh/${mentorName}.png` }]);
      });

      api.addEventListener("participantJoined", (p: any) => {
        log("👤 Participant joined:", p);
        setParticipants((prev) => [
          ...prev,
          { id: p.id, name: p.displayName || "Student", avatar: `https://avatar.vercel.sh/${p.id}.png` },
        ]);
      });

      api.addEventListener("participantLeft", (p: any) => {
        log("🚪 Participant left:", p);
        setParticipants((prev) => prev.filter((user) => user.id !== p.id));
      });

      api.addEventListener("incomingMessage", (event: any) => {
        log("💬 Incoming message:", event);
        setMessages((prev) => [
          ...prev,
          { id: event.from, name: event.nick, avatar: `https://avatar.vercel.sh/${event.from}.png`, text: event.message, isLocal: false },
        ]);
      });

      api.addEventListener("readyToClose", () => {
        log("⚠️ Meeting ready to close");
        handleLeave();
      });
    } catch (err) {
      log("❌ Error creating Jitsi API:", err);
    }
  };

  // Initialize
  // Initialize
useEffect(() => {
  if (user && jitsiReady && !jitsiApi && sessionId) {
    if (typeof window.JitsiMeetExternalAPI !== "undefined") {
      log("✅ Jitsi API available, initializing meeting...");
      handleJoin(sessionId, user.name);
    } else {
      log("⏳ Waiting for Jitsi API...");
      const interval = setInterval(() => {
        if (typeof window.JitsiMeetExternalAPI !== "undefined") {
          log("✅ Jitsi API now available, initializing meeting...");
          clearInterval(interval);
          handleJoin(sessionId, user.name);
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }
}, [jitsiReady, sessionId, jitsiApi, user]);


  const handleSendMessage = (text: string) => {
    if (!jitsiApi || !user) return log("⚠️ Cannot send message, API or user missing");
    const localParticipant = jitsiApi.getParticipantsInfo()[0];
    log("📤 Sending message:", text);
    jitsiApi.executeCommand("sendChatMessage", text);
    setMessages((prev) => [
      ...prev,
      { id: localParticipant?.participantId || "local-user", name: user.name, avatar: `https://avatar.vercel.sh/${user.name}.png`, text, isLocal: true },
    ]);
  };

  const handleLeave = () => {
    log("🔚 Leaving meeting, redirecting to dashboard");
    navigate("/mentor/dashboard");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1600px] mx-auto h-[calc(100vh-4rem)]">
        {/* Jitsi Video Section */}
        <div className="lg:col-span-2 xl:col-span-3 h-full flex flex-col">
          <Card className="overflow-hidden shadow-2xl rounded-xl flex-grow flex flex-col">
            <CardContent className="p-0 bg-black flex-grow">
              <div ref={jitsiContainerRef} className="w-full h-full" />
            </CardContent>
            <div className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{participants.length} Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono">{formatTime(elapsedTime)}</span>
                </div>
              </div>
              <div className="text-muted-foreground">
                <span>Session ID: <span className="font-semibold text-primary">{sessionId}</span></span>
              </div>
            </div>
          </Card>
        </div>

        {/* Chat Section */}
        <div className="hidden lg:block lg:col-span-1 xl:col-span-1 h-full">
          <Card className="shadow-lg h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare /> Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <ChatBox messages={messages} onSendMessage={handleSendMessage} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MentorLiveSession;
