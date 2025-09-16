// // import { useEffect, useRef, useState } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";

// // const LiveSession = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const jitsiContainerRef = useRef(null);
// //   const timerRef = useRef(null);

// //   const [elapsedTime, setElapsedTime] = useState(0);
// //   const [jitsiReady, setJitsiReady] = useState(false);
// //   const [jitsiApi, setJitsiApi] = useState(null);
// //   const [currentRoom, setCurrentRoom] = useState("");

// //   // Load Jitsi script once
// //   useEffect(() => {
// //     const existingScript = document.getElementById("jitsi-script");

// //     if (!existingScript) {
// //       const script = document.createElement("script");
// //       script.src = "https://meet.jit.si/external_api.js";
// //       script.async = true;
// //       script.id = "jitsi-script";
// //       script.onload = () => setJitsiReady(true);
// //       document.body.appendChild(script);
// //     } else {
// //       setJitsiReady(true);
// //     }
// //   }, []);

// //   // Auto-join on mount
// //   useEffect(() => {
// //     const roomName = location.state?.autoJoinRoom || "DefaultMentxSession2025";

// //     if (jitsiReady && !jitsiApi && roomName) {
// //       handleJoin(roomName);
// //     }
// //   }, [jitsiReady, location.state]);

// //   // Join meeting
// //   const handleJoin = (roomName) => {
// //     if (!window.JitsiMeetExternalAPI) {
// //       alert("Jitsi Meet API not loaded yet. Please wait.");
// //       return;
// //     }

// //     setCurrentRoom(roomName);

// //     const domain = "meet.jit.si";
// //     const options = {
// //       roomName,
// //       parentNode: jitsiContainerRef.current,
// //       width: "100%",
// //       height: 500,
// //       userInfo: {
// //         displayName: "Student",
// //       },
// //     };

// //     const api = new window.JitsiMeetExternalAPI(domain, options);
// //     setJitsiApi(api);

// //     timerRef.current = setInterval(() => {
// //       setElapsedTime((prev) => prev + 1);
// //     }, 1000);

// //     api.addEventListener("readyToClose", handleLeave);
// //   };

// //   // Leave meeting
// //   const handleLeave = () => {
// //     if (jitsiApi) jitsiApi.dispose();
// //     clearInterval(timerRef.current);
// //     setElapsedTime(0);
// //     setJitsiApi(null);
// //     setCurrentRoom("");
// //     navigate("/booking-sessions");
// //   };

// //   // Format time
// //   const formatTime = (seconds) => {
// //     const mins = Math.floor(seconds / 60)
// //       .toString()
// //       .padStart(2, "0");
// //     const secs = (seconds % 60).toString().padStart(2, "0");
// //     return `${mins}:${secs}`;
// //   };

// //   return (
// //     <div className="p-6 font-[Poppins]">
// //       <h2 className="text-2xl font-bold mb-4">🔴 Live Session</h2>
// //       <div className="mb-3 text-gray-800 font-semibold">
// //         🟢 Joined Room: <strong>{currentRoom}</strong>
// //         <br />⏱ Time: {formatTime(elapsedTime)}
// //       </div>
// //       <div
// //         ref={jitsiContainerRef}
// //         className="rounded overflow-hidden shadow-md w-full min-h-[500px]"
// //       />
// //       <div className="mt-4 text-center">
// //         <button
// //           onClick={handleLeave}
// //           className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full"
// //         >
// //           🚪 Leave Session
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LiveSession;


// // import { useNavigate,  } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation, useParams } from "react-router-dom";

// const LiveSession = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { sessionId } = useParams();
//   console.log("Session ID:", sessionId);

//   const jitsiContainerRef = useRef(null);
//   const timerRef = useRef(null);

//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [jitsiReady, setJitsiReady] = useState(false);
//   const [jitsiApi, setJitsiApi] = useState(null);
//   const [currentRoom, setCurrentRoom] = useState("");

//   // Load Jitsi script once
//   useEffect(() => {
//     const existingScript = document.getElementById("jitsi-script");

//     if (!existingScript) {
//       const script = document.createElement("script");
//       script.src = "https://meet.jit.si/external_api.js";
//       script.async = true;
//       script.id = "jitsi-script";
//       script.onload = () => setJitsiReady(true);
//       document.body.appendChild(script);
//     } else {
//       setJitsiReady(true);
//     }
//   }, []);

//   // Auto-join on mount
//   // useEffect(() => {
//   //   const roomName = location.state?.autoJoinRoom || "DefaultMentxSession2025";

//   //   if (jitsiReady && !jitsiApi && roomName) {
//   //     handleJoin(roomName);
//   //   }
//   // }, [jitsiReady, location.state]);

//   useEffect(() => {
//   if (jitsiReady && !jitsiApi && sessionId) {
//     handleJoin(sessionId);
//   }
// }, [jitsiReady, sessionId]);

//   // Join meeting
//   const handleJoin = (roomName) => {
//     if (!window.JitsiMeetExternalAPI) {
//       alert("Jitsi Meet API not loaded yet. Please wait.");
//       return;
//     }

//     setCurrentRoom(roomName);

//     const domain = "meet.jit.si";
//     const options = {
//       roomName,
//       parentNode: jitsiContainerRef.current,
//       width: "100%",
//       height: 500,
//       userInfo: {
//         displayName: "Student",
//       },
//     };

//     const api = new window.JitsiMeetExternalAPI(domain, options);
//     setJitsiApi(api);

//     timerRef.current = setInterval(() => {
//       setElapsedTime((prev) => prev + 1);
//     }, 1000);

//     api.addEventListener("readyToClose", handleLeave);
//   };

//   // Leave meeting
//   const handleLeave = () => {
//     if (jitsiApi) jitsiApi.dispose();
//     clearInterval(timerRef.current);
//     setElapsedTime(0);
//     setJitsiApi(null);
//     setCurrentRoom("");
//     navigate("/booking-sessions");
//   };

//   // Format time
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60)
//       .toString()
//       .padStart(2, "0");
//     const secs = (seconds % 60).toString().padStart(2, "0");
//     return `${mins}:${secs}`;
//   };

//   return (
//     <div className="p-6 font-[Poppins]">
//       <h2 className="text-2xl font-bold mb-4">🔴 Live Session</h2>
//       <div className="mb-3 text-gray-800 font-semibold">
//         🟢 Joined Room: <strong>{currentRoom}</strong>
//         <br />⏱ Time: {formatTime(elapsedTime)}
//       </div>
//       <div
//         ref={jitsiContainerRef}
//         className="rounded overflow-hidden shadow-md w-full min-h-[500px]"
//       />
//       <div className="mt-4 text-center">
//         <button
//           onClick={handleLeave}
//           className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full"
//         >
//           🚪 Leave Session
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LiveSession;

// declare global {
//   interface Window {
//     JitsiMeetExternalAPI: any; // or use the actual type if available
//   }
// }

// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";

// const LiveSession = () => {
//   const navigate = useNavigate();
//   const { sessionId } = useParams();

//   const jitsiContainerRef = useRef(null);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [jitsiReady, setJitsiReady] = useState(false);
//   const [jitsiApi, setJitsiApi] = useState<any>(null);
//   const [currentRoom, setCurrentRoom] = useState("");

//   useEffect(() => {
//     const existingScript = document.getElementById("jitsi-script");

//     if (!existingScript) {
//       const script = document.createElement("script");
//       script.src = "https://meet.jit.si/external_api.js";
//       script.async = true;
//       script.id = "jitsi-script";
//       script.onload = () => setJitsiReady(true);
//       document.body.appendChild(script);
//     } else {
//       setJitsiReady(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (jitsiReady && !jitsiApi && sessionId) {
//       handleJoin(sessionId);
//     }
//   }, [jitsiReady, sessionId]);

//   const handleJoin = (roomName: string) => {
//     if (!window.JitsiMeetExternalAPI) {
//       alert("Jitsi Meet API not loaded yet. Please wait.");
//       return;
//     }

//     setCurrentRoom(roomName);

//     const domain = "meet.jit.si";
//     const options = {
//       roomName,
//       parentNode: jitsiContainerRef.current,
//       width: "100%",
//       height: 500,
//       userInfo: {
//         displayName: "Mentor",
//       },
//       configOverwrite: {},
//       interfaceConfigOverwrite: {
//         DEFAULT_BACKGROUND: "#e0f2ff",
//         DEFAULT_LOCAL_DISPLAY_NAME: "Mentor",
//         DEFAULT_REMOTE_DISPLAY_NAME: "Student",
//         VIDEO_LAYOUT_FIT: "both",
//         SHOW_JITSI_WATERMARK: false,
//         SHOW_WATERMARK_FOR_GUESTS: false,
//         SHOW_CHROME_EXTENSION_BANNER: false,
//         TOOLBAR_ALWAYS_VISIBLE: false,
//       },
//     };

//     const api = new window.JitsiMeetExternalAPI(domain, options);
//     setJitsiApi(api);

//     timerRef.current = setInterval(() => {
//       setElapsedTime((prev) => prev + 1);
//     }, 1000);

//     api.addEventListener("readyToClose", handleLeave);
//   };

//   const handleLeave = () => {
//     if (jitsiApi) jitsiApi.dispose();
//     if (timerRef.current) clearInterval(timerRef.current);
//     setElapsedTime(0);
//     setJitsiApi(null);
//     setCurrentRoom("");
//     navigate("/booking-sessions");
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60)
//       .toString()
//       .padStart(2, "0");
//     const secs = (seconds % 60).toString().padStart(2, "0");
//     return `${mins}:${secs}`;
//   };

//   return (
//     <div className="p-6 font-[Poppins] bg-blue-50 min-h-screen">
//       <h2 className="text-2xl font-bold mb-4 text-blue-800">🔴 Live Session</h2>
//       <div className="mb-3 text-blue-700 font-semibold">
//         🟢 Joined Room: <strong>{currentRoom}</strong>
//         <br />⏱ Time: {formatTime(elapsedTime)}
//       </div>
//       <div
//         ref={jitsiContainerRef}
//         className="rounded-md border border-blue-300 shadow-lg w-full min-h-[500px] overflow-hidden bg-white"
//       />
//       <div className="mt-4 text-center">
//         <button
//           onClick={handleLeave}
//           className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full"
//         >
//           🚪 Leave Session
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LiveSession;



import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Timer, Users, Send, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/contexts/UserContext";

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

const ChatBox = ({ messages, onSendMessage }: { messages: Message[], onSendMessage: (text: string) => void }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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

const LiveSession = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
 const user = useUser();
  const jitsiContainerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [elapsedTime, setElapsedTime] = useState(0);
  const [jitsiReady, setJitsiReady] = useState(false);
  const [jitsiApi, setJitsiApi] = useState<any>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Load Jitsi script
  useEffect(() => {
    const scriptId = "jitsi-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://meet.mentxtv.com/external_api.js"; // ✅ your domain
      script.async = true;
      script.id = scriptId;
      script.onload = () => setJitsiReady(true);
      document.body.appendChild(script);
    } else {
      setJitsiReady(true);
    }

    return () => {
      jitsiApi?.dispose();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [jitsiApi]);

  // Init Jitsi when ready
  // Init Jitsi when ready
useEffect(() => {
  if (jitsiReady && !jitsiApi && sessionId && user?.user?.name) {
    if (typeof window.JitsiMeetExternalAPI !== "undefined") {
      handleJoin(sessionId, user.user.name);
    } else {
      const interval = setInterval(() => {
        if (typeof window.JitsiMeetExternalAPI !== "undefined") {
          clearInterval(interval);
          handleJoin(sessionId, user.user.name);
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }
}, [jitsiReady, sessionId, jitsiApi, user]);


  const handleJoin = (roomName: string, studentName: string) => {
    if (!window.JitsiMeetExternalAPI || !jitsiContainerRef.current) return;

    const domain = "meet.mentxtv.com"; // ✅
    const options = {
      roomName,
      parentNode: jitsiContainerRef.current,
      width: "100%",
      height: "100%",
      userInfo: { displayName: studentName },
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        prejoinPageEnabled: false,
      },
      interfaceConfigOverwrite: {
        TOOLBAR_ALWAYS_VISIBLE: true,
        SHOW_JITSI_WATERMARK: false,
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);
    setJitsiApi(api);

    api.addEventListener("videoConferenceJoined", (localUser: any) => {
      timerRef.current = setInterval(() => setElapsedTime((p) => p + 1), 1000);
      setParticipants([
        {
          id: localUser.id,
          name: studentName,
          avatar: `https://avatar.vercel.sh/${studentName}.png`,
        },
      ]);
    });

    api.addEventListener("participantJoined", (p: any) => {
      setParticipants((prev) => [
        ...prev,
        {
          id: p.id,
          name: p.displayName || "Participant",
          avatar: `https://avatar.vercel.sh/${p.id}.png`,
        },
      ]);
    });

    api.addEventListener("participantLeft", (p: any) => {
      setParticipants((prev) => prev.filter((user) => user.id !== p.id));
    });

    api.addEventListener("incomingMessage", (event: any) => {
      setMessages((prev) => [
        ...prev,
        {
          id: event.from,
          name: event.nick,
          avatar: `https://avatar.vercel.sh/${event.from}.png`,
          text: event.message,
          isLocal: false,
        },
      ]);
    });

    api.addEventListener("readyToClose", handleLeave);
  };

  const handleSendMessage = (text: string) => {
    if (!jitsiApi) return;
    const localParticipant = jitsiApi.getParticipantsInfo()[0];
    jitsiApi.executeCommand("sendChatMessage", text);
    setMessages((prev) => [
      ...prev,
      {
        id: localParticipant?.participantId || "local-user",
        name: "Student",
        avatar: `https://avatar.vercel.sh/student.png`,
        text,
        isLocal: true,
      },
    ]);
  };

  const handleLeave = () => {
    navigate("/booking-sessions");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1600px] mx-auto h-[calc(100vh-4rem)]">
        {/* Jitsi Video Section */}
        <div className="lg:col-span-2 xl:col-span-3 h-full flex flex-col">
          <Card className="overflow-hidden shadow-2xl rounded-xl flex-grow flex flex-col">
            <CardContent className="p-0 bg-black flex-grow">
              {/* 👇 The container for Jitsi iframe */}
              <div ref={jitsiContainerRef} className="w-full h-full" />
            </CardContent>
            <div className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{participants.length} Participants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono">{formatTime(elapsedTime)}</span>
                </div>
              </div>
              <div className="text-muted-foreground">
                <span>
                  Session ID: <span className="font-semibold text-primary">{sessionId}</span>
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Chat Section */}
        <div className="hidden lg:block lg:col-span-1 xl:col-span-1 h-full">
          <Card className="shadow-lg h-full flex flex-col">
            <div className="flex items-center gap-2 p-4 border-b dark:border-gray-700">
              <MessageSquare /> <span className="font-semibold">Chat</span>
            </div>
            <CardContent className="flex-grow">
              <ChatBox messages={messages} onSendMessage={handleSendMessage} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveSession;
