
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import axios from "axios";
// // import { Instagram, Twitter, Youtube, Save } from "lucide-react";

// // interface SocialLinks {
// //   instagram: string;
// //   twitter: string;
// //   youtube: string;
// // }

// // interface SocialMediaSettingsProps {
// //   links: SocialLinks;
// //   onInputChange: (platform: string, value: string) => void;
// //   onSave: () => void;
// // }

// // const SocialMediaSettings = ({ links, onInputChange, onSave }: SocialMediaSettingsProps) => {

// //   const baseURL = import.meta.env.VITE_API_BASE_URL; // e.g. http://localhost:5000

// // const fetchSocialLinks = async () => {
// //   try {
// //     const response = await axios.get(`${baseURL}/api/social`);
// //     return response.data;
// //   } catch (error) {
// //     console.error("Failed to fetch social links", error);
// //     throw error;
// //   }
// // };
// //   return (
// //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //       {/* Social Media Links Management */}
// //       <Card>
// //         <CardHeader>
// //           <CardTitle className="flex items-center gap-2">
// //             <Instagram className="h-5 w-5" />
// //             Social Media Links
// //           </CardTitle>
// //           <p className="text-sm text-gray-600">
// //             Manage company social media links that appear in the footer
// //           </p>
// //         </CardHeader>
// //         <CardContent className="space-y-6">
// //           <div className="space-y-2">
// //             <Label htmlFor="instagram" className="flex items-center gap-2">
// //               <Instagram className="h-4 w-4" />
// //               Instagram URL
// //             </Label>
// //             <Input
// //               id="instagram"
// //               type="url"
// //               placeholder="https://instagram.com/yourcompany"
// //               value={links.instagram}
// //               onChange={(e) => onInputChange('instagram', e.target.value)}
// //             />
// //           </div>

// //           <div className="space-y-2">
// //             <Label htmlFor="twitter" className="flex items-center gap-2">
// //               <Twitter className="h-4 w-4" />
// //               Twitter URL
// //             </Label>
// //             <Input
// //               id="twitter"
// //               type="url"
// //               placeholder="https://twitter.com/yourcompany"
// //               value={links.twitter}
// //               onChange={(e) => onInputChange('twitter', e.target.value)}
// //             />
// //           </div>

// //           <div className="space-y-2">
// //             <Label htmlFor="youtube" className="flex items-center gap-2">
// //               <Youtube className="h-4 w-4" />
// //               YouTube URL
// //             </Label>
// //             <Input
// //               id="youtube"
// //               type="url"
// //               placeholder="https://youtube.com/yourcompany"
// //               value={links.youtube}
// //               onChange={(e) => onInputChange('youtube', e.target.value)}
// //             />
// //           </div>

// //           <Button onClick={onSave} className="w-full flex items-center gap-2">
// //             <Save size={16} />
// //             Save Links
// //           </Button>
// //         </CardContent>
// //       </Card>

// //       {/* Preview */}
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Preview</CardTitle>
// //           <p className="text-sm text-gray-600">
// //             How the social media links will appear in the footer
// //           </p>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="bg-gray-900 text-white p-6 rounded-lg">
// //             <h3 className="text-lg font-semibold mb-4">Follow Us :</h3>
// //             <div className="flex gap-4">
// //               {links.instagram && (
// //                 <a 
// //                   href={links.instagram} 
// //                   target="_blank" 
// //                   rel="noopener noreferrer"
// //                   className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
// //                 >
// //                   <Instagram size={20} />
// //                 </a>
// //               )}
// //               {links.twitter && (
// //                 <a 
// //                   href={links.twitter} 
// //                   target="_blank" 
// //                   rel="noopener noreferrer"
// //                   className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
// //                 >
// //                   <Twitter size={20} />
// //                 </a>
// //               )}
// //               {links.youtube && (
// //                 <a 
// //                   href={links.youtube} 
// //                   target="_blank" 
// //                   rel="noopener noreferrer"
// //                   className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
// //                 >
// //                   <Youtube size={20} />
// //                 </a>
// //               )}
// //             </div>
// //             {!links.instagram && !links.twitter && !links.youtube && (
// //               <p className="text-gray-400 text-sm">No social media links configured</p>
// //             )}
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default SocialMediaSettings;



// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import axios from "axios";
// import { Instagram, Twitter, Youtube, Save } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// interface SocialLinks {
//   instagram: string;
//   twitter: string;
//   youtube: string;
// }

// const SocialMediaSettings = () => {
//   const { toast } = useToast();
//   const baseURL = import.meta.env.VITE_API_BASE_URL || "";

//   const [links, setLinks] = useState<SocialLinks>({
//     instagram: "",
//     twitter: "",
//     youtube: "",
//   });

//   // Fetch social links on component mount
//   useEffect(() => {
//     const fetchSocialLinks = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/api/social`);
//         if (response.data) {
//           setLinks({
//             instagram: response.data.instagram || "",
//             twitter: response.data.twitter || "",
//             youtube: response.data.youtube || "",
//           });
//         }
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to load social media links",
//           variant: "destructive",
//         });
//       }
//     };

//     fetchSocialLinks();
//   }, [baseURL, toast]);

//   // Handle input changes
//   const onInputChange = (platform: keyof SocialLinks, value: string) => {
//     setLinks((prev) => ({
//       ...prev,
//       [platform]: value,
//     }));
//   };

//   // Save updated links to backend
//   const onSave = async () => {
//     try {
//       const response = await axios.put(`${baseURL}/api/social`, links);
//       toast({
//         title: "Success",
//         description: response.data.message || "Social media links updated",
//       });
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.response?.data?.message || "Failed to update links",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//       {/* Social Media Links Management */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Instagram className="h-5 w-5" />
//             Social Media Links
//           </CardTitle>
//           <p className="text-sm text-gray-600">
//             Manage company social media links that appear in the footer
//           </p>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="space-y-2">
//             <Label htmlFor="instagram" className="flex items-center gap-2">
//               <Instagram className="h-4 w-4" />
//               Instagram URL
//             </Label>
//             <Input
//               id="instagram"
//               type="url"
//               placeholder="https://instagram.com/yourcompany"
//               value={links.instagram}
//               onChange={(e) => onInputChange("instagram", e.target.value)}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="twitter" className="flex items-center gap-2">
//               <Twitter className="h-4 w-4" />
//               Twitter URL
//             </Label>
//             <Input
//               id="twitter"
//               type="url"
//               placeholder="https://twitter.com/yourcompany"
//               value={links.twitter}
//               onChange={(e) => onInputChange("twitter", e.target.value)}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="youtube" className="flex items-center gap-2">
//               <Youtube className="h-4 w-4" />
//               YouTube URL
//             </Label>
//             <Input
//               id="youtube"
//               type="url"
//               placeholder="https://youtube.com/yourcompany"
//               value={links.youtube}
//               onChange={(e) => onInputChange("youtube", e.target.value)}
//             />
//           </div>

//           <Button onClick={onSave} className="w-full flex items-center gap-2">
//             <Save size={16} />
//             Save Links
//           </Button>
//         </CardContent>
//       </Card>

//       {/* Preview */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Preview</CardTitle>
//           <p className="text-sm text-gray-600">
//             How the social media links will appear in the footer
//           </p>
//         </CardHeader>
//         <CardContent>
//           <div className="bg-gray-900 text-white p-6 rounded-lg">
//             <h3 className="text-lg font-semibold mb-4">Follow Us :</h3>
//             <div className="flex gap-4">
//               {links.instagram && (
//                 <a
//                   href={links.instagram}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
//                 >
//                   <Instagram size={20} />
//                 </a>
//               )}
//               {links.twitter && (
//                 <a
//                   href={links.twitter}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
//                 >
//                   <Twitter size={20} />
//                 </a>
//               )}
//               {links.youtube && (
//                 <a
//                   href={links.youtube}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
//                 >
//                   <Youtube size={20} />
//                 </a>
//               )}
//             </div>
//             {!links.instagram && !links.twitter && !links.youtube && (
//               <p className="text-gray-400 text-sm">No social media links configured</p>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default SocialMediaSettings;



import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Instagram, Twitter, Youtube, Linkedin, Facebook, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialLinks {
  instagram: string;
  twitter: string;
  youtube: string;
  facebook: string;
  linkedin: string;
}

const SocialMediaSettings = () => {
  const { toast } = useToast();
  const baseURL = import.meta.env.VITE_API_BASE_URL || "";

  const [links, setLinks] = useState<SocialLinks>({
    instagram: "",
    twitter: "",
    youtube: "",
    facebook: "",
    linkedin: "",
  });

  console.log(links)

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/social`);
        if (response.data) {
          setLinks({
            instagram: response.data.instagram || "",
            twitter: response.data.twitter || "",
            youtube: response.data.youtube || "",
            facebook: response.data.facebook || "",
            linkedin: response.data.linkedin || "",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load social media links",
          variant: "destructive",
        });
      }
    };

    fetchSocialLinks();
  }, [baseURL, toast]);

  const onInputChange = (platform: keyof SocialLinks, value: string) => {
    setLinks((prev) => ({
      ...prev,
      [platform]: value,
    }));
  };

  const onSave = async () => {
    try {
      const response = await axios.put(`${baseURL}/api/social`, links);
      toast({
        title: "Success",
        description: response.data.message || "Social media links updated",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update links",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Social Media Links Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Instagram className="h-5 w-5" />
            Social Media Links
          </CardTitle>
          <p className="text-sm text-gray-600">
            Manage company social media links that appear in the footer
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Fields */}
          {[
            { id: "instagram", icon: <Instagram className="h-4 w-4" />, placeholder: "https://instagram.com/yourcompany" },
            { id: "twitter", icon: <Twitter className="h-4 w-4" />, placeholder: "https://twitter.com/yourcompany" },
            { id: "youtube", icon: <Youtube className="h-4 w-4" />, placeholder: "https://youtube.com/yourcompany" },
            { id: "facebook", icon: <Facebook className="h-4 w-4" />, placeholder: "https://facebook.com/yourcompany" },
            { id: "linkedin", icon: <Linkedin className="h-4 w-4" />, placeholder: "https://linkedin.com/yourcompany" },
          ].map(({ id, icon, placeholder }) => (
            <div key={id} className="space-y-2">
              <Label htmlFor={id} className="flex items-center gap-2 capitalize">
                {icon}
                {id} URL
              </Label>
              <Input
                id={id}
                type="url"
                placeholder={placeholder}
                value={links[id as keyof SocialLinks]}
                onChange={(e) => onInputChange(id as keyof SocialLinks, e.target.value)}
              />
            </div>
          ))}

          <Button onClick={onSave} className="w-full flex items-center gap-2">
            <Save size={16} />
            Save Links
          </Button>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <p className="text-sm text-gray-600">
            How the social media links will appear in the footer
          </p>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Follow Us :</h3>
            <div className="flex gap-4 flex-wrap">
              {links.instagram && (
                <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Instagram size={20} />
                </a>
              )}
              {links.twitter && (
                <a href={links.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Twitter size={20} />
                </a>
              )}
              {links.youtube && (
                <a href={links.youtube} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Youtube size={20} />
                </a>
              )}
              {links.facebook && (
                <a href={links.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Facebook size={20} />
                </a>
              )}
              {links.linkedin && (
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Linkedin size={20} />
                </a>
              )}
            </div>
            {!Object.values(links).some(Boolean) && (
              <p className="text-gray-400 text-sm mt-4">No social media links configured</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaSettings;
