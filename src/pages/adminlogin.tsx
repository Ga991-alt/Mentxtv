import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/UserContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const {login} = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data)

    if (res.ok) {
      localStorage.setItem("token", data.token);
      login({
      name: data.admin?.name || data.admin?.email?.split("@")[0],
      email: data.admin?.email || "",
      phone: `${data.admin?.phone || ""}`,
      role: "Admin",
      id: data.admin?._id // MongoDB ID
    });
      toast({ title: "Login successful!", description: "Welcome Admin." });
      navigate("/admin-dashboard");
    } else {
      toast({
        title: "Login failed",
        description: data.message || "Invalid credentials",
        variant: "destructive",
      });
    }
  } catch (err) {
    toast({
      title: "Error",
      description: "Something went wrong. Try again.",
      variant: "destructive",
    });
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="text-right">
            <Link
              to="/admin-forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
