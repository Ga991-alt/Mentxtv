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
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/sessions/${sessionId}`);
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

    if (sessionData.seats <= 0) {
      return toast.error("No seats left for this session.");
    }

    // 3. Create initial payment record
    const paymentRes = await axios.post(`${baseURL}/payments`, {
      studentId: studentData._id,
      sessionId: sessionData._id,
      amount: sessionData.price,
      status: "created",
    });

    const payment = paymentRes.data;

    // 4. Upload payment proof to Cloudinary using payment._id as filename
    if (!paymentProof) {
      toast.error("Please upload a payment proof before continuing.");
      return;
    }

    const formData = new FormData();
    formData.append("file", paymentProof);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append("public_id", payment._id); // 🧠 use payment._id as Cloudinary filename

    const cloudinaryRes = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    const paymentProofUrl = cloudinaryRes.data.secure_url;
    console.log(paymentProofUrl);

    // 5. Update payment record with image URL
    // await axios.put(`${baseURL}/payments/${payment._id}`, {
    //   paymentProofUrl,
    //   status: "pending", // optional: mark as pending after image upload
    // });

    // 6. Update student data
    const updatedStudent = {
      ...studentData,
      payments: [...(studentData.payments || []), payment._id],
      enrolledSessions: [...(studentData.enrolledSessions || []), sessionData._id],
      totalSpent: (studentData.totalSpent || 0) + sessionData.price,
    };

    const updateStudentRes = await fetch(`${baseURL}/students/${studentData._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStudent),
    });

    if (!updateStudentRes.ok) throw new Error("Student update failed");

    // 7. Update session data
    const updatedSession = {
      ...sessionData,
      updatedAt: new Date(),
      bookedStudents: [...(sessionData.bookedStudents || []), studentData._id],
    };

    await axios.put(`${baseURL}/sessions/${sessionData._id}`, updatedSession);

    // 8. Final UI update
    setPaymentComplete(true);
    toast.success("Payment proof submitted! Waiting for admin verification.");
  } catch (error: any) {
    console.error("Payment failed:", error);
    toast.error(
      error?.response?.data?.message || error.message || "Payment failed. Please try again."
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
                Your payment proof has been submitted successfully. Please wait for admin verification.
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
              <Link to="/student-dashboard">
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
                    {session.seats-(session.bookedStudents?.length||0)}/{session.seats} slots
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
                    onClick={completePayment}
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