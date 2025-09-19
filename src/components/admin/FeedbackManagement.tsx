import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Feedback {
  _id?: string; // coming from MongoDB
  name: string;
  role: string;
  testimonial: string;
  type: "student" | "mentor";
}

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);
  const [formData, setFormData] = useState<Feedback>({
    name: "",
    role: "",
    testimonial: "",
    type: "student",
  });

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // Fetch feedbacks
  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/feedbacks`);
      setFeedbacks(res.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Add / Update feedback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingFeedback && editingFeedback._id) {
        // Update
        const res = await axios.put(`${API_BASE}/api/feedbacks/${editingFeedback._id}`, formData);
        setFeedbacks(feedbacks.map(f => (f._id === editingFeedback._id ? res.data : f)));
      } else {
        // Create
        const res = await axios.post(`${API_BASE}/api/feedbacks`, formData);
        setFeedbacks([res.data, ...feedbacks]);
      }

      // Reset form
      setFormData({ name: "", role: "", testimonial: "", type: "student" });
      setEditingFeedback(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving feedback:", error);
    }
  };

  // Edit
  const handleEdit = (feedback: Feedback) => {
    setFormData({
      name: feedback.name,
      role: feedback.role,
      testimonial: feedback.testimonial,
      type: feedback.type,
    });
    setEditingFeedback(feedback);
    setIsDialogOpen(true);
  };

  // Delete
  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await axios.delete(`${API_BASE}/api/feedbacks/${id}`);
      setFeedbacks(feedbacks.filter(f => f._id !== id));
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", role: "", testimonial: "", type: "student" });
    setEditingFeedback(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Feedback Management</h2>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-blue-600 text-white">
              <Plus size={16} className="mr-2" />
              Add New Feedback
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingFeedback ? "Edit Feedback" : "Add New Feedback"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: "student" | "mentor") =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="mentor">Mentor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="role">Role/Subject</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g., NEET Aspirant, JEE Mentor"
                  required
                />
              </div>
              <div>
                <Label htmlFor="testimonial">Testimonial</Label>
                <Textarea
                  id="testimonial"
                  value={formData.testimonial}
                  onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                  placeholder="Enter the feedback testimonial"
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 text-white">
                  {editingFeedback ? "Update" : "Add"} Feedback
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Feedbacks Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Feedbacks</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Testimonial</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbacks.map((feedback) => (
                <TableRow key={feedback._id}>
                  <TableCell className="font-medium">{feedback.name}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        feedback.type === "student"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {feedback.type === "student" ? "Student" : "Mentor"}
                    </span>
                  </TableCell>
                  <TableCell>{feedback.role}</TableCell>
                  <TableCell className="max-w-md">
                    <p className="truncate">{feedback.testimonial}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(feedback)}>
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(feedback._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackManagement;
