import { useState } from "react";
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
import {
  Eye,
  Plus,
  Edit,
  Trash2,
  Upload,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { toast } from "sonner";
import { useBlog, BlogPost } from "@/contexts/BlogContext";

const BlogManagement = () => {
  const { blogs, addBlog, deleteBlog } = useBlog();

  const [newBlog, setNewBlog] = useState<Partial<BlogPost>>({
    title: "",
    content: "",
    category: "",
    author: "Admin",
    image: "",
    status: "draft",
    socialMedia: {
      instagram: "",
      twitter: "",
      linkedin: "",
    },
  });

  const [currentStep, setCurrentStep] = useState<"thumbnail" | "content">(
    "thumbnail"
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewBlog((prev) => ({
          ...prev,
          image: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
      toast.success("Image uploaded successfully!");
    }
  };

  const handleCreateBlog = () => {
    if (!newBlog.title || !newBlog.content || !newBlog.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    const blog: BlogPost = {
      id: Date.now().toString(),
      title: newBlog.title!,
      content: newBlog.content!,
      category: newBlog.category!,
      author: newBlog.author!,
      date: new Date().toISOString().split("T")[0],
      image: newBlog.image || "/placeholder.svg?height=400&width=600",
      status: newBlog.status as "draft" | "published",
      socialMedia: newBlog.socialMedia!,
    };

    addBlog(blog);
    setNewBlog({
      title: "",
      content: "",
      category: "",
      author: "Admin",
      image: "",
      status: "draft",
      socialMedia: {
        instagram: "",
        twitter: "",
        linkedin: "",
      },
    });
    setCurrentStep("thumbnail");
    toast.success("Blog post created successfully!");
  };

  const handleDeleteBlog = (id: string) => {
    deleteBlog(id);
    toast.success("Blog post deleted successfully!");
  };

  const handleNextStep = () => {
    if (currentStep === "thumbnail") {
      if (!newBlog.title || !newBlog.category || !newBlog.image) {
        toast.error(
          "Please fill in title, category, and upload an image for the thumbnail"
        );
        return;
      }
      setCurrentStep("content");
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep("thumbnail");
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
          <div className="mb-6">
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
          </div>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p>{blog.content}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Create New Blog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
            </DialogHeader>

            {/* Steps indicator */}
            <div className="mb-4">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    currentStep === "thumbnail"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <span className="font-medium">1. Create Thumbnail</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-200"></div>
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    currentStep === "content"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <span className="font-medium">2. Add Content</span>
                </div>
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
                    <h3 className="text-lg font-semibold text-gray-900">
                      Step 1: Create Thumbnail
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          placeholder="Blog post title"
                          value={newBlog.title}
                          onChange={(e) =>
                            setNewBlog((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={newBlog.category}
                          onValueChange={(value) =>
                            setNewBlog((prev) => ({ ...prev, category: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Sports">Sports</SelectItem>
                            <SelectItem value="Technology">
                              Technology
                            </SelectItem>
                            <SelectItem value="Health">Health</SelectItem>
                            <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">Thumbnail Image *</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            document.getElementById("image")?.click()
                          }
                          className="flex items-center gap-2"
                        >
                          <Upload size={16} />
                          Upload Image
                        </Button>
                        {newBlog.image && (
                          <img
                            src={newBlog.image}
                            alt="Preview"
                            className="w-32 h-24 object-cover rounded border"
                          />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="author">Author</Label>
                        <Input
                          id="author"
                          placeholder="Author name"
                          value={newBlog.author}
                          onChange={(e) =>
                            setNewBlog((prev) => ({
                              ...prev,
                              author: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={newBlog.status}
                          onValueChange={(value: "draft" | "published") =>
                            setNewBlog((prev) => ({ ...prev, status: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={handleNextStep}
                        className="flex items-center gap-2"
                      >
                        Next: Add Content →
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Content */}
                {currentStep === "content" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Step 2: Add Content
                      </h3>
                      <Button
                        variant="outline"
                        onClick={handlePreviousStep}
                        className="flex items-center gap-2"
                      >
                        ← Back to Thumbnail
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        placeholder="Write your blog content here..."
                        value={newBlog.content}
                        onChange={(e) =>
                          setNewBlog((prev) => ({
                            ...prev,
                            content: e.target.value,
                          }))
                        }
                        rows={10}
                      />
                    </div>

                    <div className="space-y-4">
                      <Label className="text-base font-semibold">
                        Social Media Links
                      </Label>

                      <div className="space-y-2">
                        <Label
                          htmlFor="blog-instagram"
                          className="flex items-center gap-2"
                        >
                          <Instagram size={16} className="text-pink-600" />
                          Instagram
                        </Label>
                        <Input
                          id="blog-instagram"
                          placeholder="https://instagram.com/your-handle"
                          value={newBlog.socialMedia?.instagram || ""}
                          onChange={(e) =>
                            setNewBlog((prev) => ({
                              ...prev,
                              socialMedia: {
                                ...prev.socialMedia!,
                                instagram: e.target.value,
                              },
                            }))
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="blog-twitter"
                          className="flex items-center gap-2"
                        >
                          <Twitter size={16} className="text-blue-400" />
                          Twitter
                        </Label>
                        <Input
                          id="blog-twitter"
                          placeholder="https://twitter.com/your-handle"
                          value={newBlog.socialMedia?.twitter || ""}
                          onChange={(e) =>
                            setNewBlog((prev) => ({
                              ...prev,
                              socialMedia: {
                                ...prev.socialMedia!,
                                twitter: e.target.value,
                              },
                            }))
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="blog-linkedin"
                          className="flex items-center gap-2"
                        >
                          <Linkedin size={16} className="text-blue-600" />
                          LinkedIn
                        </Label>
                        <Input
                          id="blog-linkedin"
                          placeholder="https://linkedin.com/company/your-company"
                          value={newBlog.socialMedia?.linkedin || ""}
                          onChange={(e) =>
                            setNewBlog((prev) => ({
                              ...prev,
                              socialMedia: {
                                ...prev.socialMedia!,
                                linkedin: e.target.value,
                              },
                            }))
                          }
                        />
                      </div>
                    </div>

                    <Button onClick={handleCreateBlog} className="w-full">
                      Create Blog Post
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
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <Card key={blog.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {blog.content}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>By {blog.author}</span>
                        <span>{blog.date}</span>
                        <Badge
                          variant={
                            blog.status === "published"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {blog.status}
                        </Badge>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye size={16} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteBlog(blog.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;
