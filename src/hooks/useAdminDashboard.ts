import { useState } from "react";

export const useAdminDashboard = () => {
  const [adminName] = useState("Admin User");
  const [adminImage, setAdminImage] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    instagram: "",
    twitter: "",
    youtube: ""
  });

  const handleAdminImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAdminImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialLinksChange = (platform: string, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const handleSocialLinksSave = () => {
    console.log("Saving social links:", socialLinks);
    localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
  };

  return {
    adminName,
    adminImage,
    sidebarOpen,
    socialLinks,
    setAdminImage,
    setSidebarOpen,
    handleAdminImageUpload,
    handleSocialLinksChange,
    handleSocialLinksSave
  };
};