import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminDashboardContent from "@/components/admin/AdminDashboardContent";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";

const AdminDashboard = () => {
  const {
    adminName,
    adminImage,
    sidebarOpen,
    socialLinks,
    setSidebarOpen,
    handleAdminImageUpload,
    handleSocialLinksChange,
    handleSocialLinksSave
  } = useAdminDashboard();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="flex-1 lg:ml-64">
        <AdminHeader 
          adminName={adminName}
          adminImage={adminImage}
          onImageUpload={handleAdminImageUpload}
        />

        {/* Mobile menu button */}
        <div className="lg:hidden p-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={16} className="mr-2" />
            Menu
          </Button>
        </div>

        <AdminDashboardContent 
          socialLinks={socialLinks}
          onSocialLinksChange={handleSocialLinksChange}
          onSocialLinksSave={handleSocialLinksSave}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;