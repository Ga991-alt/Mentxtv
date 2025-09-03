import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { CheckCircle2, XCircle, User, BookOpen, IndianRupee, Mail } from "lucide-react";

const PaymentDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id: paymentId } = useParams();


  const payment = state?.payment;

  if (!payment) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50 text-red-600 font-medium">
        Payment data not found. Please go back and try again.
      </div>
    );
  }

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${paymentId}.jpg`;

  const handleAction = async (status: "paid" | "failed") => {
  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    // 1. Fetch student by email
    const studentRes = await axios.get(`${baseURL}/api/students/${payment.email}`);
    const student = studentRes.data;

    if (!student || !student._id) {
      toast.error("Student not found.");
      return;
    }

    const updatedStudent = { ...student };
    const amount = payment.amount || 0;
    const sessionId = payment.sessionId;

    // 2. Update totalSpent and enrolledSessions based on action

    if (status === "failed" && payment.status !== "failed") {
  const sessionId = String(payment.sessionId);
  const amount = Number(payment.amount);

  updatedStudent.totalSpent = Math.max((student.totalSpent || 0) - amount, 0);

  const index = student.enrolledSessions.findIndex(
  (session: any) => String(session._id) === String(sessionId)
);


  console.log("index",index);

  if (index !== -1) {
  const before = index > 0 ? student.enrolledSessions.slice(0, index) : [];
  console.log("before",before);
  const after = index < student.enrolledSessions.length - 1
    ? student.enrolledSessions.slice(index + 1)
    : [];

    console.log("after",after)

  updatedStudent.enrolledSessions = [...before, ...after];
}


  console.log("hello ",updatedStudent)
}


    if (status === "paid" && payment.status === "failed") {
      // Add amount
      updatedStudent.totalSpent = (student.totalSpent || 0) + amount;

      // Add sessionId if not already present
      if (!updatedStudent.enrolledSessions?.includes(sessionId)) {
        updatedStudent.enrolledSessions = [...(updatedStudent.enrolledSessions || []), sessionId];
      }
    }

    // 3. Update student only if there's a change
    const shouldUpdateStudent =
      updatedStudent.totalSpent !== student.totalSpent ||
      JSON.stringify(updatedStudent.enrolledSessions) !== JSON.stringify(student.enrolledSessions);

    if (shouldUpdateStudent) {
      await axios.put(`${baseURL}/api/students/${student._id}`, updatedStudent);
    }

    // 4. Update payment status
    await axios.put(`${baseURL}/api/payments/${paymentId}/status`, { status });

    toast.success(`Payment marked as ${status}`);
    navigate("/admin-dashboard?tab=payments");
  } catch (err) {
    toast.error("Failed to update payment or student data.");
    console.error(err);
  }
};



  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Payment Verification
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Payment Proof Image */}
            <div className="w-full border rounded-lg overflow-hidden shadow-sm">
              <img
                src={imageUrl}
                alt="Payment proof"
                className="w-full max-h-[500px] object-contain bg-white"
              />
            </div>

            {/* Payment Info Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 space-y-3">
              <h3 className="text-lg font-medium text-gray-700 border-b pb-2">Payment Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span><strong>Student:</strong> {payment.studentName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span><strong>Email:</strong> {payment.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span><strong>Session:</strong> {payment.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-gray-500" />
                  <span><strong>Amount:</strong> ₹{payment.amount}</span>
                </div>
                <div className="flex items-center gap-2 col-span-full">
                  <span className="text-sm font-semibold text-gray-700">Status:</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium 
                    ${payment.status === "completed" ? "bg-green-100 text-green-700" :
                      payment.status === "failed" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"}`}>
                    {payment.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Approve / Disapprove Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                onClick={() => handleAction("paid")}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Approve
              </Button>
              <Button
                onClick={() => handleAction("failed")}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <XCircle className="h-4 w-4" />
                Disapprove
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentDetail;
