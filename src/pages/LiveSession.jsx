// import { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const LiveSession = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

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
//   useEffect(() => {
//     const roomName = location.state?.autoJoinRoom || "DefaultMentxSession2025";

//     if (jitsiReady && !jitsiApi && roomName) {
//       handleJoin(roomName);
//     }
//   }, [jitsiReady, location.state]);

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


// import { useNavigate,  } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const LiveSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionId } = useParams();
  console.log("Session ID:", sessionId);

  const jitsiContainerRef = useRef(null);
  const timerRef = useRef(null);

  const [elapsedTime, setElapsedTime] = useState(0);
  const [jitsiReady, setJitsiReady] = useState(false);
  const [jitsiApi, setJitsiApi] = useState(null);
  const [currentRoom, setCurrentRoom] = useState("");

  // Load Jitsi script once
  useEffect(() => {
    const existingScript = document.getElementById("jitsi-script");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.id = "jitsi-script";
      script.onload = () => setJitsiReady(true);
      document.body.appendChild(script);
    } else {
      setJitsiReady(true);
    }
  }, []);

  // Auto-join on mount
  // useEffect(() => {
  //   const roomName = location.state?.autoJoinRoom || "DefaultMentxSession2025";

  //   if (jitsiReady && !jitsiApi && roomName) {
  //     handleJoin(roomName);
  //   }
  // }, [jitsiReady, location.state]);

  useEffect(() => {
  if (jitsiReady && !jitsiApi && sessionId) {
    handleJoin(sessionId);
  }
}, [jitsiReady, sessionId]);

  // Join meeting
  const handleJoin = (roomName) => {
    if (!window.JitsiMeetExternalAPI) {
      alert("Jitsi Meet API not loaded yet. Please wait.");
      return;
    }

    setCurrentRoom(roomName);

    const domain = "meet.jit.si";
    const options = {
      roomName,
      parentNode: jitsiContainerRef.current,
      width: "100%",
      height: 500,
      userInfo: {
        displayName: "Student",
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);
    setJitsiApi(api);

    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    api.addEventListener("readyToClose", handleLeave);
  };

  // Leave meeting
  const handleLeave = () => {
    if (jitsiApi) jitsiApi.dispose();
    clearInterval(timerRef.current);
    setElapsedTime(0);
    setJitsiApi(null);
    setCurrentRoom("");
    navigate("/booking-sessions");
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="p-6 font-[Poppins]">
      <h2 className="text-2xl font-bold mb-4">🔴 Live Session</h2>
      <div className="mb-3 text-gray-800 font-semibold">
        🟢 Joined Room: <strong>{currentRoom}</strong>
        <br />⏱ Time: {formatTime(elapsedTime)}
      </div>
      <div
        ref={jitsiContainerRef}
        className="rounded overflow-hidden shadow-md w-full min-h-[500px]"
      />
      <div className="mt-4 text-center">
        <button
          onClick={handleLeave}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full"
        >
          🚪 Leave Session
        </button>
      </div>
    </div>
  );
};

export default LiveSession;
