
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig"; // Adjust based on your alias setup

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: false
  });
  
  const { login } = useUser();
  const navigate = useNavigate();

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   // Simple validation - in real app, you'd validate against a backend
  //   if (!formData.email || !formData.password) {
  //     alert("Please fill in all required fields");
  //     return;
  //   }

  //   if (selectedRole === "Mentor" && !formData.name) {
  //     alert("Name is required for mentor login");
  //     return;
  //   }

  //   // Create user object
  //   const userData = {
  //     name: formData.name || formData.email.split('@')[0],
  //     email: formData.email,
  //     role: selectedRole as 'Student' | 'Mentor' | 'Admin'
  //   };

  //   // Login user
  //   login(userData);

  //   // Always redirect to home page after login
  //   navigate("/");
  // };


//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (!formData.email || !formData.password) {
//     alert("Please fill in all required fields");
//     return;
//   }

//   if (selectedRole === "Mentor" && !formData.name) {
//     alert("Name is required for mentor login");
//     return;
//   }

//   try {
//     // Firebase Auth
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       formData.email,
//       formData.password
//     );

//     const user = userCredential.user;

//     // Local context login
//     const userData = {
//       name: formData.name || user.email?.split('@')[0],
//       email: user.email || "",
//       role: selectedRole as 'Student' | 'Mentor' | 'Admin'
//     };

//     login(userData);
//     navigate("/");
//   } catch (error: any) {
//     console.error("Login error", error);
//     alert("Authentication failed: " + error.message);
//   }
// };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    alert("Please fill in all required fields");
    return;
  }

  if (selectedRole === "Mentor" && !formData.name) {
    alert("Name is required for mentor login");
    return;
  }

  try {
    // Firebase login
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;

    const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api`;
    const endpoint = selectedRole === "Student"
      ? `${baseURL}/students/${encodeURIComponent(user.email || "")}`
      : `${baseURL}/mentors/${encodeURIComponent(user.email || "")}`;

    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("User record not found in DB");
    }

    const fullUserData = await response.json();
    console.log("Full user data:", fullUserData);
    // Save user in context
    login({
      name: fullUserData.userId?.name || fullUserData.name || user.email?.split("@")[0],
      email: fullUserData.userId?.email || fullUserData.email || "",
      role: selectedRole as "Student" | "Mentor",
      id: fullUserData._id // MongoDB ID
    });

    navigate("/");
  } catch (error: any) {
    console.error("Login error", error);
    alert("Authentication failed: " + error.message);
  }
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 group">
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <img 
                src="/lovable-uploads/5d782425-50a4-4419-8ded-ab9e0ed405cb.png" 
                alt="MentxTv" 
                className="w-10 h-10"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to your MentxTv account
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Login As
                </label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Mentor">Mentor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Name Field - Show for Mentor */}
              {selectedRole === "Mentor" && (
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Sign In
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign up for free
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
