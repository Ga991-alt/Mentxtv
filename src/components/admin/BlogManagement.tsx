// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Label } from "@/components/ui/label";
// import {
//   Eye,
//   Plus,
//   Edit,
//   Trash2,
//   Upload,
// } from "lucide-react";
// import { toast } from "sonner";

// // Blog type
// interface BlogPost {
//   id: string;
//   title: string;
//   content: string;
//   category: string;
//   author: string;
//   date: string;
//   image: string;
//   status: "draft" | "published";
// }

// const BlogManagement = () => {
//   const [blogs, setBlogs] = useState<BlogPost[]>([]);
//   console.log("Current blogs:", blogs);
//   const [newBlog, setNewBlog] = useState<Partial<BlogPost>>({
//     title: "",
//     content: "",
//     category: "",
//     author: "Admin",
//     image: "",
//     status: "draft",
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [editBlogId, setEditBlogId] = useState<string | null>(null);
//   const [currentStep, setCurrentStep] = useState<"thumbnail" | "content">(
//     "thumbnail"
//   );

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setNewBlog((prev) => ({
//           ...prev,
//           image: e.target?.result as string,
//         }));
//       };
//       reader.readAsDataURL(file);
//       toast.success("Image uploaded successfully!");
//     }
//   };

//   const handleCreateOrUpdateBlog = () => {
//     if (!newBlog.title || !newBlog.content || !newBlog.category) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     if (isEditing && editBlogId) {
//       // ✅ Update blog
//       setBlogs((prev) =>
//         prev.map((b) =>
//           b.id === editBlogId ? { ...b, ...newBlog } as BlogPost : b
//         )
//       );
//       toast.success("Blog post updated successfully!");
//     } else {
//       // ✅ Create new blog
//       const blog: BlogPost = {
//         id: Date.now().toString(),
//         title: newBlog.title!,
//         content: newBlog.content!,
//         category: newBlog.category!,
//         author: newBlog.author!,
//         date: new Date().toISOString().split("T")[0],
//         image: newBlog.image || "/placeholder.svg?height=400&width=600",
//         status: newBlog.status as "draft" | "published",
//       };
//       setBlogs((prev) => [blog, ...prev]);
//       toast.success("Blog post created successfully!");
//     }

//     // Reset form
//     setNewBlog({
//       title: "",
//       content: "",
//       category: "",
//       author: "Admin",
//       image: "",
//       status: "draft",
//     });
//     setIsEditing(false);
//     setEditBlogId(null);
//     setCurrentStep("thumbnail");
//   };

//   const handleDeleteBlog = (id: string) => {
//     setBlogs((prev) => prev.filter((b) => b.id !== id));
//     toast.success("Blog post deleted successfully!");
//   };

//   const handleEditBlog = (blog: BlogPost) => {
//     setNewBlog(blog);
//     setIsEditing(true);
//     setEditBlogId(blog.id);
//     setCurrentStep("thumbnail");
//   };

//   const handleNextStep = () => {
//     if (currentStep === "thumbnail") {
//       if (!newBlog.title || !newBlog.category || !newBlog.image) {
//         toast.error(
//           "Please fill in title, category, and upload an image for the thumbnail"
//         );
//         return;
//       }
//       setCurrentStep("content");
//     }
//   };

//   const BlogPreview = ({ blog }: { blog: Partial<BlogPost> }) => (
//     <div className="max-w-4xl mx-auto">
//       <Card className="overflow-hidden">
//         {blog.image && (
//           <div className="aspect-video w-full overflow-hidden">
//             <img
//               src={blog.image}
//               alt={blog.title}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         )}
//         <CardContent className="p-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             {blog.title}
//           </h1>
//           <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
//             <span>By {blog.author}</span>
//             <span>{blog.category}</span>
//             <Badge
//               variant={blog.status === "published" ? "default" : "secondary"}
//             >
//               {blog.status}
//             </Badge>
//           </div>
//           <p className="text-gray-700">{blog.content}</p>
//         </CardContent>
//       </Card>
//     </div>
//   );

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button
//               className="flex items-center gap-2"
//               onClick={() => {
//                 setIsEditing(false);
//                 setNewBlog({
//                   title: "",
//                   content: "",
//                   category: "",
//                   author: "Admin",
//                   image: "",
//                   status: "draft",
//                 });
//               }}
//             >
//               <Plus size={16} />
//               Create New Blog
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle>
//                 {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
//               </DialogTitle>
//             </DialogHeader>

//             {/* Steps */}
//             <div className="mb-4 flex items-center gap-4">
//               <div
//                 className={`px-4 py-2 rounded-lg ${
//                   currentStep === "thumbnail"
//                     ? "bg-blue-100 text-blue-800"
//                     : "bg-gray-100 text-gray-600"
//                 }`}
//               >
//                 1. Thumbnail
//               </div>
//               <div className="flex-1 h-0.5 bg-gray-200"></div>
//               <div
//                 className={`px-4 py-2 rounded-lg ${
//                   currentStep === "content"
//                     ? "bg-blue-100 text-blue-800"
//                     : "bg-gray-100 text-gray-600"
//                 }`}
//               >
//                 2. Content
//               </div>
//             </div>

//             {/* Tabs */}
//             <Tabs defaultValue="edit" className="w-full">
//               <TabsList className="grid w-full grid-cols-2">
//                 <TabsTrigger value="edit">Edit</TabsTrigger>
//                 <TabsTrigger value="preview">Preview</TabsTrigger>
//               </TabsList>

//               <TabsContent value="edit" className="space-y-4">
//                 {/* Step 1: Thumbnail */}
//                 {currentStep === "thumbnail" && (
//                   <div className="space-y-4">
//                     <div>
//                       <Label>Title</Label>
//                       <Input
//                         value={newBlog.title}
//                         onChange={(e) =>
//                           setNewBlog({ ...newBlog, title: e.target.value })
//                         }
//                       />
//                     </div>
//                     <div>
//                       <Label>Category</Label>
//                       <Select
//                         value={newBlog.category}
//                         onValueChange={(val) =>
//                           setNewBlog({ ...newBlog, category: val })
//                         }
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Tech">Tech</SelectItem>
//                           <SelectItem value="Design">Design</SelectItem>
//                           <SelectItem value="Business">Business</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div>
//                       <Label>Thumbnail Image</Label>
//                       <Input type="file" onChange={handleImageUpload} />
//                       {newBlog.image && (
//                         <img
//                           src={newBlog.image}
//                           alt="preview"
//                           className="mt-2 h-32 rounded"
//                         />
//                       )}
//                     </div>
//                     <div className="flex justify-end">
//                       <Button onClick={handleNextStep}>Next →</Button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Step 2: Content */}
//                 {currentStep === "content" && (
//                   <div className="space-y-4">
//                     <div>
//                       <Label>Content</Label>
//                       <Textarea
//                         value={newBlog.content}
//                         onChange={(e) =>
//                           setNewBlog({ ...newBlog, content: e.target.value })
//                         }
//                         rows={6}
//                       />
//                     </div>
//                     <div>
//                       <Label>Status</Label>
//                       <Select
//                         value={newBlog.status}
//                         onValueChange={(val) =>
//                           setNewBlog({
//                             ...newBlog,
//                             status: val as "draft" | "published",
//                           })
//                         }
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select status" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="draft">Draft</SelectItem>
//                           <SelectItem value="published">Published</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <Button onClick={handleCreateOrUpdateBlog} className="w-full">
//                       {isEditing ? "Update Blog" : "Create Blog"}
//                     </Button>
//                   </div>
//                 )}
//               </TabsContent>

//               <TabsContent value="preview">
//                 <BlogPreview blog={newBlog} />
//               </TabsContent>
//             </Tabs>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Blog list */}
//       <div className="space-y-4">
//         {blogs.map((blog) => (
//           <Card key={blog.id}>
//             <CardContent className="p-6 flex justify-between">
//               <div className="flex gap-4">
//                 <img
//                   src={blog.image}
//                   alt={blog.title}
//                   className="w-24 h-24 object-cover rounded"
//                 />
//                 <div>
//                   <h3 className="text-lg font-semibold">{blog.title}</h3>
//                   <p className="text-sm text-gray-600 line-clamp-2">
//                     {blog.content}
//                   </p>
//                   <div className="flex gap-3 text-xs text-gray-500 mt-1">
//                     <span>{blog.author}</span>
//                     <span>{blog.date}</span>
//                     <Badge
//                       variant={
//                         blog.status === "published" ? "default" : "secondary"
//                       }
//                     >
//                       {blog.status}
//                     </Badge>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleEditBlog(blog)}
//                 >
//                   <Edit size={16} />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleDeleteBlog(blog.id)}
//                 >
//                   <Trash2 size={16} />
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogManagement;



import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Eye, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL + "/api/blogs";

// Blog type
interface BlogPost {
  _id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
  status: "draft" | "published";
}

const BlogManagement = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);

  const [newBlog, setNewBlog] = useState<Partial<BlogPost>>({
    title: "",
    content: "",
    category: "",
    author: "Admin",
    image: "",
    status: "draft",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editBlogId, setEditBlogId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<"thumbnail" | "content">(
    "thumbnail"
  );

  // ✅ Fetch blogs on load
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE);
      setBlogs(res.data);
    } catch (err) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const [imageUploading, setImageUploading] = useState(false);
const [isDialogOpen, setIsDialogOpen] = useState(false);
const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) {
    toast.error("No file selected");
    return;
  }

  setImageUploading(true); // ✅ show loader
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "mentor_profile");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dp4ubhr1q/image/upload",
      { method: "POST", body: formData }
    );

    const data = await response.json();
    console.log("Cloudinary response:", data);

    if (!data.secure_url) throw new Error("Upload failed");

    setNewBlog((prev) => ({ ...prev, image: data.secure_url }));
    toast.success("Image uploaded successfully!");
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    toast.error("Image upload failed");
  } finally {
    setImageUploading(false); // ✅ hide loader
  }
};




useEffect(() => {
  console.log("newBlog updated:", newBlog);
}, [newBlog]);

  // ✅ Create / Update Blog
  const handleCreateOrUpdateBlog = async () => {
    if (!newBlog.title || !newBlog.content || !newBlog.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (isEditing && editBlogId) {
        await axios.put(`${API_BASE}/${editBlogId}`, newBlog);
        toast.success("Blog post updated successfully!");
      } else {
        await axios.post(API_BASE, newBlog);
        toast.success("Blog post created successfully!");
      }
      fetchBlogs();
    } catch (err) {
      toast.error("Failed to save blog");
    }

    // Reset form
    setNewBlog({
      title: "",
      content: "",
      category: "",
      author: "Admin",
      image: "",
      status: "draft",
    });
    setIsEditing(false);
    setEditBlogId(null);
    setCurrentStep("thumbnail");
  };

  // ✅ Delete Blog
  const handleDeleteBlog = async (id: string) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      toast.success("Blog post deleted successfully!");
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      toast.error("Failed to delete blog");
    }
  };

  const handleEditBlog = (blog: BlogPost) => {
    setNewBlog(blog);
    setIsEditing(true);
    setEditBlogId(blog._id);
    setCurrentStep("thumbnail");
  };

  const handleNextStep = () => {
    if (currentStep === "thumbnail") {
      if (!newBlog.title || !newBlog.category ) {
        toast.error(
          "Please fill in title, category, and upload an image for the thumbnail"
        );
        return;
      }
      setCurrentStep("content");
    }
  };

  const BlogPreview = ({ blog }: { blog: Partial<BlogPost> }) => (
    <div className="max-w-4xl mx-auto">
      <Card className="overflow-hidden">
        {blog.image && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardContent className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
            <span>By {blog.author}</span>
            <span>{blog.category}</span>
            <Badge
              variant={blog.status === "published" ? "default" : "secondary"}
            >
              {blog.status}
            </Badge>
          </div>
          <p className="text-gray-700">{blog.content}</p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
  <Button
    onClick={() => {
      setIsEditing(false);
      setNewBlog({
        title: "",
        content: "",
        category: "",
        author: "Admin",
        image: "",
        status: "draft",
      });
      setIsDialogOpen(true); // open dialog
    }}
  >
    <Plus size={16} /> Create New Blog
  </Button>
</DialogTrigger>
{/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}> */}
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
              </DialogTitle>
            </DialogHeader>

            {/* Steps */}
            <div className="mb-4 flex items-center gap-4">
              <div
                className={`px-4 py-2 rounded-lg ${
                  currentStep === "thumbnail"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                1. Thumbnail
              </div>
              <div className="flex-1 h-0.5 bg-gray-200"></div>
              <div
                className={`px-4 py-2 rounded-lg ${
                  currentStep === "content"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                2. Content
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="edit" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="edit" className="space-y-4">
                {/* Step 1: Thumbnail */}
                {currentStep === "thumbnail" && (
                  <div className="space-y-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={newBlog.title}
                        onChange={(e) =>
                          setNewBlog({ ...newBlog, title: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select
                        value={newBlog.category}
                        onValueChange={(val) =>
                          setNewBlog({ ...newBlog, category: val })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tech">Tech</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Thumbnail Image</Label>
                      <Input type="file" onChange={handleImageUpload} />

                      {newBlog.image && (
                        <img
                          src={newBlog.image}
                          alt="preview"
                          className="mt-2 h-32 rounded"
                        />
                      )}

                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleNextStep} disabled={imageUploading}>
  {imageUploading ? "Uploading..." : "Next →"}
</Button>

                    </div>
                  </div>
                )}

                {/* Step 2: Content */}
                {currentStep === "content" && (
                  <div className="space-y-4">
                    <div>
                      <Label>Content</Label>
                      <Textarea
                        value={newBlog.content}
                        onChange={(e) =>
                          setNewBlog({ ...newBlog, content: e.target.value })
                        }
                        rows={6}
                      />
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Select
                        value={newBlog.status}
                        onValueChange={(val) =>
                          setNewBlog({
                            ...newBlog,
                            status: val as "draft" | "published",
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={handleCreateOrUpdateBlog}
                      className="w-full"
                    >
                      {isEditing ? "Update Blog" : "Create Blog"}
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="preview">
                <BlogPreview blog={newBlog} />
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Blog list */}
      <div className="space-y-4">
        {loading ? (
          <p>Loading blogs...</p>
        ) : (
          blogs.map((blog) => (
            <Card key={blog._id}>
              <CardContent className="p-6 flex justify-between">
                <div className="flex gap-6">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-36 h-36 object-cover rounded"
                  />
                  <div className="flex flex-col justify-between gap-2">
                    <h3 className="text-lg font-semibold">{blog.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {blog.content}
                    </p>
                    <div className="flex gap-3 text-xs text-gray-500 mt-1">
                      <span>{blog.author}</span>
                      <span>
  {new Date(blog.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}
</span>

                      <Badge
                        variant={
                          blog.status === "published"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {blog.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {handleEditBlog(blog); setIsDialogOpen(true);}}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteBlog(blog._id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogManagement;
