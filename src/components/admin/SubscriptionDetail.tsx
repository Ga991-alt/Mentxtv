import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { CheckCircle2, XCircle, User, IndianRupee, Calendar, Mail } from "lucide-react";

const SubscriptionDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id: subscriptionId } = useParams();

  const subscription = state?.subscription;

  if (!subscription) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50 text-red-600 font-medium">
        Subscription data not found. Please go back and try again.
      </div>
    );
  }

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const proofUrl = subscription.proof
    ? subscription.proof
    : `https://res.cloudinary.com/${cloudName}/image/upload/${subscriptionId}.jpg`;

  const handleAction = async (status: "active" | "expired" | "pending") => {
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;

      await axios.put(`${baseURL}/api/subscriptions/${subscriptionId}/status`, { status });

      toast.success(`Subscription marked as ${status}`);
      navigate("/admin-dashboard?tab=subscribe");
    } catch (err) {
      toast.error("Failed to update subscription status.");
      console.error(err);
    }
  };

  const renderStudent = () => {
    if (!subscription.studentId) return "N/A";
    if (typeof subscription.studentId === "string") return subscription.studentId;
    if (typeof subscription.studentId.userId === "string") return subscription.studentId.userId;
    return (
      subscription.studentId.userId?.name ||
      subscription.studentId.userId?.email ||
      subscription.studentId._id
    );
  };

  const renderMentor = () => {
    if (!subscription.mentorId) return "N/A";
    if (typeof subscription.mentorId === "string") return subscription.mentorId;
    if (typeof subscription.mentorId.userId === "string") return subscription.mentorId.userId;
    return (
      subscription.mentorId.userId?.name ||
      subscription.mentorId.userId?.email ||
      subscription.mentorId._id
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Subscription Verification
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Proof Image */}
            <div className="w-full border rounded-lg overflow-hidden shadow-sm">
              <img
                src={proofUrl}
                alt="Subscription proof"
                className="w-full max-h-[500px] object-contain bg-white"
              />
            </div>

            {/* Subscription Info */}
            <div className="bg-white rounded-lg shadow-sm p-4 space-y-3">
              <h3 className="text-lg font-medium text-gray-700 border-b pb-2">Subscription Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span><strong>Student:</strong> {renderStudent()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span><strong>Mentor:</strong> {renderMentor()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span><strong>Plan:</strong> {subscription.plan}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-gray-500" />
                  <span><strong>Amount:</strong> ₹{subscription.amount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span><strong>Start Date:</strong> {new Date(subscription.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span><strong>End Date:</strong> {new Date(subscription.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 col-span-full">
                  <span className="text-sm font-semibold text-gray-700">Status:</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium 
                    ${subscription.status === "active" ? "bg-green-100 text-green-700" :
                      subscription.status === "expired" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"}`}>
                    {subscription.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Approve / Expire / Pending Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                onClick={() => handleAction("active")}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Approve
              </Button>
              <Button
                onClick={() => handleAction("expired")}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <XCircle className="h-4 w-4" />
                Expire
              </Button>
              <Button
                onClick={() => handleAction("pending")}
                className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2"
              >
                Pending
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionDetail;
