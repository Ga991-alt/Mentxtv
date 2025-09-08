import { useState } from "react";
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
  id: string;
  name: string;
  role: string;
  testimonial: string;
  type: 'student' | 'mentor';
}

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: "1",
      name: "Nilkamal",
      role: "NEET Aspirant",
      testimonial: "Main Nilkamal Baidya, Student of MentxTv, mera mentor name Akansha, mera first class ka chuka hai. My mentor advises and guides me all the time.",
      type: "student"
    },
    {
      id: "2",
      name: "Dr. Akansha Verma",
      role: "NEET Mentor",
      testimonial: "Being a mentor at MentxTv has been incredibly rewarding. Helping students achieve their dreams and seeing their progress gives me immense satisfaction.",
      type: "mentor"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    testimonial: "",
    type: "student" as 'student' | 'mentor'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingFeedback) {
      // Update existing feedback
      setFeedbacks(feedbacks.map(feedback => 
        feedback.id === editingFeedback.id 
          ? { ...feedback, ...formData }
          : feedback
      ));
    } else {
      // Add new feedback
      const newFeedback: Feedback = {
        id: Date.now().toString(),
        ...formData
      };
      setFeedbacks([...feedbacks, newFeedback]);
    }

    // Reset form and close dialog
    setFormData({ name: "", role: "", testimonial: "", type: "student" });
    setEditingFeedback(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (feedback: Feedback) => {
    setFormData({
      name: feedback.name,
      role: feedback.role,
      testimonial: feedback.testimonial,
      type: feedback.type
    });
    setEditingFeedback(feedback);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
  };

  const resetForm = () => {
    setFormData({ name: "", role: "", testimonial: "", type: "student" });
    setEditingFeedback(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Feedback Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 text-white">
              <Plus size={16} className="mr-2" />
              Add New Feedback
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingFeedback ? "Edit Feedback" : "Add New Feedback"}
              </DialogTitle>
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
                  <Select value={formData.type} onValueChange={(value: 'student' | 'mentor') => setFormData({ ...formData, type: value })}>
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
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
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
                <TableRow key={feedback.id}>
                  <TableCell className="font-medium">{feedback.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      feedback.type === 'student' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {feedback.type === 'student' ? 'Student' : 'Mentor'}
                    </span>
                  </TableCell>
                  <TableCell>{feedback.role}</TableCell>
                  <TableCell className="max-w-md">
                    <p className="truncate">{feedback.testimonial}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(feedback)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(feedback.id)}
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