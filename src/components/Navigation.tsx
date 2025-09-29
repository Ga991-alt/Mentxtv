import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, LogOut } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Exam Details", href: "/exam-details" },
    { label: "Test Portal", href: "/test-portal" },
    { label: "Our Mentors", href: "/mentors" },
    { label: "Booking Sessions", href: "/booking-sessions", protected: true },
  ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/mentxtv-uploads/5d782425-50a4-4419-8ded-ab9e0ed405cb.png"
              alt="MentxTv Logo"
              className="h-8 w-8"
            />
            <h1 className="text-2xl font-bold text-gray-900">MentxTv</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, i) =>
              !item.protected || user ? (
                <a
                  key={i}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.label}
                </a>
              ) : null
            )}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-9 w-9 cursor-pointer">
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
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>
                    {user.name} <span className="text-xs">({user.role})</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={getDashboardLink()}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/blogs">Blogs</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/about">About Us</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                </Button>
              </>
            )}
          </div>

          {/* Mobile Hamburger + Avatar */}
          <div className="flex md:hidden items-center space-x-3">
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={user.image} />
                    <AvatarFallback className="bg-gray-600 text-white">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={getDashboardLink()}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/blogs">Blogs</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/about">About Us</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item, i) =>
              !item.protected || user ? (
                <a
                  key={i}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  {item.label}
                </a>
              ) : null
            )}
            {!user && (
              <>
                <a
                  href="/login"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
