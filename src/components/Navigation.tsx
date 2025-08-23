import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Menu,
  X,
  User,
  BookOpen,
  MessageCircle,
  Users,
  HelpCircle,
  Shield,
  FileText,
  Phone,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { user, logout } = useUser();

  const getDashboardLink = () => {
    if (!user) return "/";
    switch (user.role) {
      case "Student":
        return "/student-dashboard";
      case "Mentor":
        return "/mentor-dashboard";
      case "Admin":
        return "/admin-dashboard";
      default:
        return "/";
    }
  };

  const sideMenuItems = [
    { icon: User, label: "Login/Signup", href: "/login" },
    { icon: FileText, label: "Blogs", href: "/blogs" },
    // { icon: Users, label: "Become a mentor", href: "/become-mentor" },
    { icon: Users, label: "About Us", href: "/about" },
    // { icon: HelpCircle, label: "FAQ's", href: "/faq" },
    { icon: FileText, label: "Terms and Conditions", href: "/terms" },
    { icon: Shield, label: "Privacy Policy", href: "/privacy" },
  ];

  const loggedInSideMenuItems = [
    { icon: User, label: "Dashboard", href: getDashboardLink() },
    { icon: FileText, label: "Blogs", href: "/blogs" },
    // { icon: Users, label: "Become a mentor", href: "/become-mentor" },
    { icon: Users, label: "About Us", href: "/about" },
    // { icon: HelpCircle, label: "FAQ's", href: "/faq" },
    { icon: FileText, label: "Terms and Conditions", href: "/terms" },
    { icon: Shield, label: "Privacy Policy", href: "/privacy" },
  ];

  const handleLogout = () => {
    logout();
    setIsSideMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <img
                src="/mentxtv-uploads/5d782425-50a4-4419-8ded-ab9e0ed405cb.png"
                alt="MentxTv Logo"
                className="h-8 w-8"
              />
              <h1 className="text-2xl font-bold text-gray-900">MentxTv</h1>
              {/* <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-gray-700 ml-2"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg> */}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="/"
                  className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Home
                </a>
                {!user && (
                  <a
                    href="/become-mentor"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Become a Mentor
                  </a>
                )}
                <a
                  href="/exam-details"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Exam Details
                </a>
                <a
                  href="/test-portal"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Test Portal
                </a>
                <a
                  href="/viewallmentors"
                  className="text-gray-700 block px-3 py-2 text-base font-medium"
                >
                  Our mentors
                </a>
                <a
                  href="/exam-page"
                  className="text-gray-700 block px-3 py-2 text-base font-medium"
                >
                  Give Exam
                </a>

                <a
                  href="/booking-sessions"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Booking Sessions
                </a>
              </div>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <Link to={getDashboardLink()}>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={user.image} />
                    <AvatarFallback
                      className={`text-white text-sm ${
                        user.role === "Student"
                          ? "bg-blue-600"
                          : user.role === "Mentor"
                          ? "bg-green-600"
                          : "bg-gray-600"
                      }`}
                    >
                      {user.role === "Student"
                        ? user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                        : user.role === "Mentor"
                        ? user.name
                            .split(" ")
                            .slice(-2)
                            .map((n) => n[0])
                            .join("")
                        : "A"}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              ) : (
                <>
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-full font-medium"
                  onClick={() => (window.location.href = "/login")}
                >
                  LOGIN
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-700 hover:bg-blue-50 px-6 py-2 rounded-full font-medium"
                  onClick={() => (window.location.href = "/signup")}
                >
                  SIGN UP
                </Button></>
              )}
              <button
                onClick={() => setIsSideMenuOpen(true)}
                className="p-2 text-gray-700 hover:text-blue-600"
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                <a
                  href="/"
                  className="text-gray-900 block px-3 py-2 text-base font-medium"
                >
                  Home
                </a>
                {!user && (
                  <a
                    href="/become-mentor"
                    className="text-gray-700 block px-3 py-2 text-base font-medium"
                  >
                    Become a Mentor
                  </a>
                )}
                <a
                  href="/exam-details"
                  className="text-gray-700 block px-3 py-2 text-base font-medium"
                >
                  Exam Details
                </a>
                <a
                  href="/test-portal"
                  className="text-gray-700 block px-3 py-2 text-base font-medium"
                >
                  Test Portal
                </a>
                <a
                  href="/admin-login"
                  className="text-gray-700 block px-3 py-2 text-base font-medium"
                >
                  Admin Login
                </a>
                {user && (
                  <a
                    href="/booking-sessions"
                    className="text-gray-700 block px-3 py-2 text-base font-medium"
                  >
                    Booking Sessions
                  </a>
                )}
                <div className="flex flex-col space-y-2 px-3 py-2">
                  {user ? (
                    <Link to={getDashboardLink()}>
                      <div className="flex items-center gap-2 p-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.image} />
                          <AvatarFallback
                            className={`text-white text-sm ${
                              user.role === "Student"
                                ? "bg-blue-600"
                                : user.role === "Mentor"
                                ? "bg-green-600"
                                : "bg-gray-600"
                            }`}
                          >
                            {user.role === "Student"
                              ? user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)
                              : user.role === "Mentor"
                              ? user.name
                                  .split(" ")
                                  .slice(-2)
                                  .map((n) => n[0])
                                  .join("")
                              : "A"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{user.name}</span>
                      </div>
                    </Link>
                  ) : (
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-600 hover:bg-blue-50 rounded-full"
                      onClick={() => (window.location.href = "/login")}
                    >
                      LOGIN
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Side Menu Overlay */}
      {isSideMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed right-0 top-0 h-[60vh] w-80 bg-white shadow-lg rounded-bl-lg flex flex-col">
            <div className="flex justify-between items-center p-4 border-b flex-shrink-0">
              <div className="flex items-center gap-2">
                <img
                  src="/mentxtv-uploads/5d782425-50a4-4419-8ded-ab9e0ed405cb.png"
                  alt="MentxTv Logo"
                  className="h-6 w-6"
                />
                <h2 className="text-xl font-bold text-gray-900">MentxTv</h2>
                {/* <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-gray-700"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg> */}
              </div>
              <button
                onClick={() => setIsSideMenuOpen(false)}
                className="p-2 text-gray-700 hover:text-blue-600"
              >
                <X size={24} />
              </button>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-2">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.image} />
                        <AvatarFallback
                          className={`text-white ${
                            user.role === "Student"
                              ? "bg-blue-600"
                              : user.role === "Mentor"
                              ? "bg-green-600"
                              : "bg-gray-600"
                          }`}
                        >
                          {user.role === "Student"
                            ? user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)
                            : user.role === "Mentor"
                            ? user.name
                                .split(" ")
                                .slice(-2)
                                .map((n) => n[0])
                                .join("")
                            : "A"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.role}</p>
                      </div>
                    </div>
                    {loggedInSideMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.href}
                        className="flex items-center space-x-3 p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => setIsSideMenuOpen(false)}
                      >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <User size={20} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  sideMenuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      className="flex items-center space-x-3 p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      onClick={() => setIsSideMenuOpen(false)}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
