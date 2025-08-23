import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // or next/router for Next.js
import {
  confirmPasswordReset,
  verifyPasswordResetCode,
} from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const oobCode = params.get("oobCode");
  const mode = params.get("mode");

  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "verifying" | "verified" | "error" | "resetting" | "success">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (mode !== "resetPassword" || !oobCode) {
      setStatus("error");
      setError("Invalid reset link.");
      return;
    }

    setStatus("verifying");

    verifyPasswordResetCode(auth, oobCode)
      .then(() => setStatus("verified"))
      .catch((err) => {
        console.error(err);
        setError("Reset link is invalid or expired.");
        setStatus("error");
      });
  }, [mode, oobCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oobCode) return;

    setStatus("resetting");
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setStatus("success");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        {status === "verified" || status === "resetting" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">Set New Password</h2>
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Button type="submit" disabled={status === "resetting"}>
              {status === "resetting" ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        ) : status === "success" ? (
          <p className="text-green-600">Password has been reset successfully. Redirecting to login...</p>
        ) : status === "verifying" ? (
          <p>Verifying reset link...</p>
        ) : (
          <p className="text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
