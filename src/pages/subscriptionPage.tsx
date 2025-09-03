import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Star,
  Scan,
  CheckCircle,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";
import axios from "axios";

const SubscriptionPayment = () => {
  const { user } = useUser();
  const location = useLocation();
  const subscription = location.state as any; // coming from navigate(..., { state: payload })

  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  if (!subscription) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        No subscription details found. Please go back and select a plan.
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

//   const handleContinue = async () => {
//     if (!paymentProof) {
//       toast.error("Please upload payment proof first");
//       return;
//     }

//     try {
//       const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api`;
//       const studentEmail = user?.email;
//       if (!studentEmail) return toast.error("User email not found.");

//       // 1. Fetch student data
//       const studentRes = await axios.get(`${baseURL}/students/${studentEmail}`);
//       const studentData = studentRes.data;

//       // 2. Create subscription
//       await axios.post(`${baseURL}/subscriptions/add`, {
//         studentId: studentData._id,
//         mentorId: subscription.mentorId,
//         plan: subscription.plan,
//         amount: subscription.amount,
//         startDate: subscription.startDate,
//         endDate: subscription.endDate,
//         status: "pending", // until admin verifies
//       });

//       setPaymentComplete(true);
//       toast.success("Subscription payment submitted! Pending admin verification.");
//     } catch (err: any) {
//       console.error(err);
//       toast.error(
//         err?.response?.data?.message || "Failed to process subscription payment."
//       );
//     }
//   };

const handleContinue = async () => {
  if (!paymentProof) {
    toast.error("Please upload payment proof first");
    return;
  }

  try {
    const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api`;
    const studentEmail = user?.email;
    if (!studentEmail) return toast.error("User email not found.");

    // 1. Fetch student data
    const studentRes = await axios.get(`${baseURL}/students/${studentEmail}`);
    const studentData = studentRes.data;

    // 2. Upload proof to Cloudinary
    const formData = new FormData();
    formData.append("file", paymentProof);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    // use studentId+timestamp to avoid overwrite
    formData.append("public_id", `${studentData._id}_${Date.now()}`);

    const cloudinaryRes = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    const proofUrl = cloudinaryRes.data.secure_url;

    // 3. Create subscription with proof included
    await axios.post(`${baseURL}/subscriptions/`, {
      studentId: studentData._id,
      mentorId: subscription.mentorId,
      plan: subscription.plan,
      amount: subscription.amount,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
      proof: proofUrl,        // ✅ add proof
      status: "pending",      // until admin verifies
    });

    setPaymentComplete(true);
    toast.success("Subscription payment submitted! Pending admin verification.");
  } catch (err: any) {
    console.error(err);
    toast.error(
      err?.response?.data?.message || "Failed to process subscription payment."
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
                Subscription Verification Pending
              </h2>
              <p className="text-gray-600">
                Your payment proof has been submitted successfully. Please wait
                for admin verification.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold">Plan: {subscription.plan}</h3>
              <p className="text-sm text-gray-600">
                Mentor: {subscription.mentorId}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span>
                  Start: {new Date(subscription.startDate).toLocaleDateString()}
                </span>
                <span>
                  End: {new Date(subscription.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="text-lg font-bold">₹{subscription.amount}</div>
            </div>

            <div className="space-y-3">
              <Link to="/student-dashboard">
                <Button className="w-full">Go to Dashboard</Button>
              </Link>

              <Link to="/subscriptions">
                <Button variant="outline" className="w-full">
                  View More Subscriptions
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
              to="/subscriptions"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} />
              <span>Back to Subscriptions</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subscription Details */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">
                  Plan: {subscription.plan}
                </h3>
                <p className="text-gray-600">Mentor: {subscription.mentorId}</p>

                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">N/A</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    End Date:{" "}
                    {new Date(subscription.endDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Duration: dynamic</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Amount:</span>
                  <span className="text-2xl font-bold">
                    ₹{subscription.amount}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Proof Section */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SubscriptionPayment;
