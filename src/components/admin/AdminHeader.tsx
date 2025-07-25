
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Camera } from "lucide-react";
import { Link } from "react-router-dom";

interface AdminHeaderProps {
  adminName: string;
  adminImage: string | null;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdminHeader = ({ adminName, adminImage, onImageUpload }: AdminHeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            {/* Admin Image Upload */}
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={adminImage || undefined} />
                <AvatarFallback className="bg-purple-100 text-purple-600">
                  {adminName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <label className="absolute -bottom-1 -right-1 bg-purple-600 text-white p-1 rounded-full cursor-pointer hover:bg-purple-700">
                <Camera size={12} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={adminImage || undefined} />
                <AvatarFallback className="bg-purple-100 text-purple-600 text-sm">
                  {adminName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-700">{adminName}</span>
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

export default AdminHeader;
