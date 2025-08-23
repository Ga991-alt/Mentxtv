// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   ArrowLeft,
//   Calendar,
//   Clock,
//   Users,
//   Star,
//   Scan,
//   CheckCircle,
// } from "lucide-react";
// import { toast } from "sonner";
// import { useUser } from "@/contexts/UserContext";
// import axios from "axios";

// const Payment = () => {
//   const { sessionId } = useParams();
//   const { addBookedSession, updateSessionPaymentStatus } = useUser();
//   const [isScanning, setIsScanning] = useState(false);
//   const [paymentComplete, setPaymentComplete] = useState(false);
//   const [scannerActive, setScannerActive] = useState(false);
//   const [session, setSession] = useState<any>(null);
//   const { user } = useUser();

//   // Sample session data - in real app, fetch by sessionId
//   // const session = {
//   //   id:  "686749636d4b01e09d133999",
//   //   title: "JEE Advanced Strategy",
//   //   mentor: "Dr. Arjun Mehta",
//   //   date: "Jan 25, 2024",
//   //   time: "10:00 AM",
//   //   duration: "1 hour",
//   //   availableSlots: 6,
//   //   totalSlots: 10,
//   //   rating: 4.9,
//   //   subjects: ["Physics", "Mathematics"],
//   //   price: 500,
//   // };

//   useEffect(() => {
//     const fetchSession = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/api/sessions/${sessionId}`
//         );
//         setSession(res.data);
//         console.log("Fetched session data:", res.data);
//       } catch (err) {
//         toast.error("Failed to load session details");
//       }
//     };
//     fetchSession();
//   }, [sessionId]);
//   console.log("Session:", session);

//   if (!session) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600">
//         Loading session details...
//       </div>
//     );
//   }

//   // const completePayment = () => {
//   //   // Add session to user's booked sessions
//   //   const bookedSession = {
//   //     id: session.id,
//   //     title: session.title,
//   //     mentor: session.mentor,
//   //     date: session.date,
//   //     time: session.time,
//   //     duration: session.duration,
//   //     subjects: session.subjects,
//   //     price: session.price,
//   //     status: "upcoming" as const,
//   //     paymentStatus: "paid" as const,
//   //   };

//   //   addBookedSession(bookedSession);
//   //   setPaymentComplete(true);
//   //   toast.success("Payment successful! Session booked.");
//   // };

//   //   const completePayment = async () => {
//   //   const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api`;
//   //   const studentEmail = user?.email; // get from user context
//   //   if (!studentEmail) return toast.error("User email not found.");

//   //   try {
//   //     // 1. Fetch current student data
//   //     const studentRes = await fetch(`${baseURL}/students/${studentEmail}`);
//   //     if (!studentRes.ok) throw new Error("Student fetch failed");
//   //     const studentData = await studentRes.json();

//   //     // 2. Create payment using axios
//   //     const paymentRes = await axios.post(`${baseURL}/payments`, {
//   //       studentId: studentData._id,
//   //       sessionId: session.id,
//   //       amount: session.price,
//   //       status: "paid",
//   //     });

//   //     const payment = paymentRes.data;

//   //     // 3. Update student locally
//   //     const updatedStudent = {
//   //       ...studentData,
//   //       payments: [...(studentData.payments || []), payment._id],
//   //       enrolledSessions: [...(studentData.enrolledSessions || []), session.id],
//   //       totalSpent: (studentData.totalSpent || 0) + session.price,
//   //     };

//   //     // 4. Update student on backend
//   //     const updateRes = await fetch(`${baseURL}/students/${studentData._id}`, {
//   //       method: "PUT",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(updatedStudent),
//   //     });

//   //     if (!updateRes.ok) throw new Error("Student update failed");

//   //     // 5. UI updates
//   //     setPaymentComplete(true);
//   //     toast.success("Payment successful! Session booked.");
//   //   } catch (error: any) {
//   //     console.error("Payment failed:", error);
//   //     toast.error(error?.response?.data?.message || error.message || "Payment failed. Please try again.");
//   //   }
//   // };
//   console.log("Session ID:", sessionId);
//   console.log("Session Data:", session);
//   const completePayment = async () => {
//     const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api`;
//     const studentEmail = user?.email;
//     if (!studentEmail) return toast.error("User email not found.");

//     try {
//       // 1. Fetch current student data
//       const studentRes = await fetch(`${baseURL}/students/${studentEmail}`);
//       if (!studentRes.ok) throw new Error("Student fetch failed");
//       const studentData = await studentRes.json();

//       // 2. Fetch latest session data to verify seats
//       const sessionRes = await axios.get(`${baseURL}/sessions/${sessionId}`);
//       const sessionData = sessionRes.data;

//       // ✅ Check if seat is still available
//       if (sessionData.seats <= 0) {
//         return toast.error("No seats left for this session.");
//       }

//       // 3. Create payment
//       const paymentRes = await axios.post(`${baseURL}/payments`, {
//         studentId: studentData._id,
//         sessionId: sessionData._id,
//         amount: sessionData.price,
//         status: "paid",
//       });
//       const payment = paymentRes.data;

//       // 4. Update student data
//       const updatedStudent = {
//         ...studentData,
//         payments: [...(studentData.payments || []), payment._id],
//         enrolledSessions: [
//           ...(studentData.enrolledSessions || []),
//           sessionData._id,
//         ],
//         totalSpent: (studentData.totalSpent || 0) + sessionData.price,
//       };

//       const updateStudentRes = await fetch(
//         `${baseURL}/students/${studentData._id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(updatedStudent),
//         }
//       );

//       if (!updateStudentRes.ok) throw new Error("Student update failed");

//       // 5. Update session: reduce seat and add student to bookedStudents
//       const updatedSession = {
//         ...sessionData,
//         // seats: Math.max(sessionData.seats , 0),
//         updatedAt: new Date(),
//         bookedStudents: [
//           ...(sessionData.bookedStudents || []),
//           studentData._id,
//         ],
//       };

//       await axios.put(`${baseURL}/sessions/${sessionData._id}`, updatedSession);

//       // 6. UI updates
//       setPaymentComplete(true);
//       toast.success("Payment successful! Session booked.");
//     } catch (error: any) {
//       console.error("Payment failed:", error);
//       toast.error(
//         error?.response?.data?.message ||
//           error.message ||
//           "Payment failed. Please try again."
//       );
//     }
//   };

//   const startScanner = () => {
//     setIsScanning(true);
//     setScannerActive(true);

//     // Simulate QR code scanning process
//     setTimeout(() => {
//       setIsScanning(false);
//       setScannerActive(false);
//       completePayment();
//     }, 3000);
//   };

//   const handleManualPayment = () => {
//     // Simulate manual payment process
//     completePayment();
//   };

//   if (paymentComplete) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <Card className="w-full max-w-md">
//           <CardContent className="p-8 text-center space-y-6">
//             <div className="flex justify-center">
//               <CheckCircle className="h-16 w-16 text-green-500" />
//             </div>

//             <div className="space-y-2">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Payment Successful!
//               </h2>
//               <p className="text-gray-600">
//                 Your session has been booked successfully.
//               </p>
//             </div>

//             <div className="bg-gray-50 p-4 rounded-lg space-y-2">
//               <h3 className="font-semibold">{session.title}</h3>
//               <p className="text-sm text-gray-600">by {session.mentor}</p>
//               <div className="flex items-center justify-between text-sm">
//                 <span>{session.date}</span>
//                 <span>{session.time}</span>
//               </div>
//               <div className="text-lg font-bold">₹{session.price}</div>
//             </div>

//             <div className="space-y-3">
//               <Link to="/student-dashboard">
//                 <Button className="w-full">Go to Dashboard</Button>
//               </Link>

//               <Link to="/booking-sessions">
//                 <Button variant="outline" className="w-full">
//                   Book More Sessions
//                 </Button>
//               </Link>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center h-16">
//             <Link
//               to="/booking-sessions"
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
//             >
//               <ArrowLeft size={20} />
//               <span>Back to Sessions</span>
//             </Link>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Session Details */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Session Details</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-semibold text-lg">{session.title}</h3>
//                   <Badge
//                     variant="outline"
//                     className="text-green-600 border-green-600"
//                   >
//                     {session.seats - (session.bookedStudents?.length || 0)}/
//                     {session.seats} slots
//                   </Badge>
//                 </div>

//                 <p className="text-gray-600">by {session.mentorName}</p>

//                 <div className="flex items-center gap-1">
//                   <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                   <span className="text-sm font-medium">{session.rating}</span>
//                 </div>
//               </div>

//               <div className="space-y-2 text-sm text-gray-600">
//                 <div className="flex items-center gap-2">
//                   <Calendar className="h-4 w-4" />
//                   <span>{session.date}</span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Clock className="h-4 w-4" />
//                   <span>
//                     {session.time} • {session.duration}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Users className="h-4 w-4" />
//                   <span>{session.availableSlots} available</span>
//                 </div>
//               </div>

//               {/* <div className="flex flex-wrap gap-1">
//                 {session.subjects.map((subject, index) => (
//                   <Badge key={index} variant="secondary" className="text-xs">
//                     {subject}
//                   </Badge>
//                 ))}
//               </div> */}

//               <div className="border-t pt-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-lg font-semibold">Total Amount:</span>
//                   <span className="text-2xl font-bold">₹{session.price}</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Payment Methods */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Payment Methods</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* QR Scanner Section */}
//               <div className="border rounded-lg p-6 space-y-4">
//                 <h3 className="font-semibold flex items-center gap-2">
//                   <Scan className="h-5 w-5" />
//                   Scan QR Code to Pay
//                 </h3>

//                 {scannerActive ? (
//                   <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
//                     <div className="text-center space-y-4">
//                       <div className="animate-pulse">
//                         <Scan className="h-12 w-12 mx-auto text-blue-600" />
//                       </div>
//                       <p className="text-sm text-gray-600">
//                         Scanning for QR code...
//                       </p>
//                       <div className="flex justify-center">
//                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="aspect-square bg-white border rounded-lg flex items-center justify-center">
//                     <img
//                       src="/mentxtv-uploads/scanner.png"
//                       alt="Scan to Pay QR"
//                       className="w-3/4 h-3/4 object-contain"
//                     />
//                   </div>
//                 )}

//                 <Button
//                   onClick={startScanner}
//                   disabled={isScanning}
//                   className="w-full"
//                 >
//                   {isScanning ? "Scanning..." : "Start QR Scanner"}
//                 </Button>
//               </div>

//               {/* Alternative Payment Method */}
//               {/* <div className="border rounded-lg p-6 space-y-4">
//                 <h3 className="font-semibold">Alternative Payment</h3>
//                 <p className="text-sm text-gray-600">
//                   If QR scanner is not working, you can proceed with manual
//                   payment.
//                 </p>
//                 <Button
//                   variant="outline"
//                   onClick={completePayment}
//                   className="w-full"
//                 >
//                   Proceed with Manual Payment
//                 </Button>
//               </div> */}

//               {/* Payment Info */}
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                 <h4 className="font-semibold text-blue-900 mb-2">
//                   Payment Information
//                 </h4>
//                 <ul className="text-sm text-blue-800 space-y-1">
//                   <li>• Secure payment processing</li>
//                   <li>• Instant booking confirmation</li>
//                   <li>• 24/7 customer support</li>
//                   <li>• Refund available up to 24 hours before session</li>
//                 </ul>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Payment;
// /*curl -X POST https://api.razorpay.com/v1/orders -U [rzp_test_srWLrQKgwjPMwN]:[wc4DB9TpyABPw4ABV9TDAyR3] -H 'content-type:application/json' -d '{    "amount": 5000,    "currency": "INR",    "receipt": "qwsaq1",    "partial_payment": true,    "first_payment_min_amount": 230 }' */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Star,
  Scan,
  CheckCircle,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";
import axios from "axios";

const Payment = () => {
  const { sessionId } = useParams();
  const { addBookedSession, updateSessionPaymentStatus } = useUser();
  const [isScanning, setIsScanning] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/sessions/${sessionId}`
        );
        setSession(res.data);
        console.log("Fetched session data:", res.data);
      } catch (err) {
        toast.error("Failed to load session details");
      }
    };
    fetchSession();
  }, [sessionId]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading session details...
      </div>
    );
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0]);
      setIsUploaded(true);
      toast.success("Payment proof uploaded successfully");
    }
  };

  const handleContinue = () => {
    if (!paymentProof) {
      toast.error("Please upload payment proof first");
      return;
    }

    // Here we'll show the pending status instead of payment complete
    setPaymentComplete(true);
  };

  const completePayment = async () => {
    const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api`;
    const studentEmail = user?.email;
    if (!studentEmail) return toast.error("User email not found.");

    try {
      // 1. Fetch current student data
      const studentRes = await fetch(`${baseURL}/students/${studentEmail}`);
      if (!studentRes.ok) throw new Error("Student fetch failed");
      const studentData = await studentRes.json();

      // 2. Fetch latest session data to verify seats
      const sessionRes = await axios.get(`${baseURL}/sessions/${sessionId}`);
      const sessionData = sessionRes.data;

      // ✅ Check if seat is still available
      if (sessionData.seats <= 0) {
        return toast.error("No seats left for this session.");
      }

      // 3. Create payment
      const paymentRes = await axios.post(`${baseURL}/payments`, {
        studentId: studentData._id,
        sessionId: sessionData._id,
        amount: sessionData.price,
        status: "pending", // Changed to pending as admin needs to verify
      });
      const payment = paymentRes.data;

      // 4. Update student data
      const updatedStudent = {
        ...studentData,
        payments: [...(studentData.payments || []), payment._id],
        enrolledSessions: [
          ...(studentData.enrolledSessions || []),
          sessionData._id,
        ],
        totalSpent: (studentData.totalSpent || 0) + sessionData.price,
      };

      const updateStudentRes = await fetch(
        `${baseURL}/students/${studentData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedStudent),
        }
      );

      if (!updateStudentRes.ok) throw new Error("Student update failed");

      // 5. Update session: reduce seat and add student to bookedStudents
      const updatedSession = {
        ...sessionData,
        updatedAt: new Date(),
        bookedStudents: [
          ...(sessionData.bookedStudents || []),
          studentData._id,
        ],
      };

      await axios.put(`${baseURL}/sessions/${sessionData._id}`, updatedSession);

      // 6. UI updates
      setPaymentComplete(true);
      toast.success("Payment proof submitted! Waiting for admin verification.");
    } catch (error: any) {
      console.error("Payment failed:", error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Payment failed. Please try again."
      );
    }
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-yellow-500" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                Payment Verification Pending
              </h2>
              <p className="text-gray-600">
                Your payment proof has been submitted successfully. Please wait
                for admin verification.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold">{session.title}</h3>
              <p className="text-sm text-gray-600">by {session.mentorName}</p>
              <div className="flex items-center justify-between text-sm">
                <span>{session.date}</span>
                <span>{session.time}</span>
              </div>
              <div className="text-lg font-bold">₹{session.price}</div>
            </div>

            <div className="space-y-3">
              <Link to="/mentor-dashboard">
                <Button className="w-full">Go to Dashboard</Button>
              </Link>

              <Link to="/booking-sessions">
                <Button variant="outline" className="w-full">
                  Book More Sessions
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              to="/booking-sessions"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} />
              <span>Back to Sessions</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Session Details */}
          <Card>
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{session.title}</h3>
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-600"
                  >
                    {session.seats - (session.bookedStudents?.length || 0)}/
                    {session.seats} slots
                  </Badge>
                </div>

                <p className="text-gray-600">by {session.mentorName}</p>

                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{session.rating}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{session.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {session.time} • {session.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{session.availableSlots} available</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Amount:</span>
                  <span className="text-2xl font-bold">₹{session.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Scanner Section */}
              <div className="border rounded-lg p-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Scan className="h-5 w-5" />
                  Scan QR Code to Pay
                </h3>

                <div className="aspect-square bg-white border rounded-lg flex items-center justify-center">
                  <img
                    src="/mentxtv-uploads/scanner.png"
                    alt="Scan to Pay QR"
                    className="w-3/4 h-3/4 object-contain"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="payment-proof" className="w-full">
                      <Button variant="outline" className="w-full" asChild>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <Upload className="h-4 w-4" />
                          <span>Upload Payment Proof</span>
                          <input
                            id="payment-proof"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </div>
                      </Button>
                    </label>
                    {paymentProof && (
                      <p className="text-sm text-green-600 mt-2">
                        {paymentProof.name} uploaded successfully
                      </p>
                    )}
                  </div>

                  <Button
                    onClick={handleContinue}
                    disabled={!isUploaded}
                    className="w-full"
                  >
                    Continue
                  </Button>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Payment Information
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Secure payment processing</li>
                  <li>• Instant booking confirmation</li>
                  <li>• 24/7 customer support</li>
                  <li>• Refund available up to 24 hours before session</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Payment;
