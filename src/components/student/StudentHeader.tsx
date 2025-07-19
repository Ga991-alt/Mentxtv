
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

const StudentHeader = () => {
  const { user, updateUserImage } = useUser();
  const studentName = user?.name || "Student";

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        updateUserImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            {/* Large Image Upload */}
            <div className="relative">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.image} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                  {studentName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <label className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 shadow-lg">
                <Camera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Student Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                  {studentName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-700">{studentName}</span>
            </div>
            <Link to="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <LogOut size={16} />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
