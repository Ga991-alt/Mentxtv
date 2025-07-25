import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Eye, Edit, Trash2, Star } from "lucide-react";

interface Mentor {
  id: string;
  email: string;
  name: string;
  domain: string;
  rating: number;
  sessions: number;
}

interface MentorFormData {
  userEmail: string;
  bio: string;
  subjects: string[];
  domain: string;
  education: string;
  expertise: string[];
}

interface MentorManagementProps {
  mentors: Mentor[];
}

const MentorManagement = ({ mentors }: MentorManagementProps) => {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const [open, setOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<MentorFormData>({
    userEmail: "",
    bio: "",
    subjects: [],
    education: "",
    expertise: [],
    domain: "",
  });

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));

  const handleDeleteMentor = async () => {
    if (!selectedMentorId) return;
    try {
      await axios.delete(`${baseURL}/api/mentors/${selectedMentorId}`);
      setDeleteDialogOpen(false);
    } catch (err) {
      console.error("Failed to delete mentor", err);
    }
  };

  const handleEditMentor = async (email: string) => {
    try {
      const res = await axios.get(`${baseURL}/api/mentors/${email}`);
      const data = res.data;

      setFormData({
        userEmail: data.userId.email,
        bio: data.bio,
        education: data.education,
        domain: data.domain,
        expertise: data.expertise || [],
        subjects: data.subjects || [],
      });

      setSelectedMentorId(data._id);
      setIsEditing(true);
      setEditDialogOpen(true);
    } catch (err) {
      console.error("Failed to fetch mentor details", err);
    }
  };

  const handleSubmit = async () => {
    try {
      const userRes = await axios.get(`${baseURL}/api/users/${formData.userEmail}`);
      const userId = userRes.data?._id;
      if (!userId) return;

      const payload = { ...formData, userId };
      delete payload.userEmail;

      if (isEditing && selectedMentorId) {
        await axios.put(`${baseURL}/api/mentors/${selectedMentorId}`, payload);
        setEditDialogOpen(false);
      } else {
        await axios.post(`${baseURL}/api/mentors`, payload);
        setOpen(false);
      }

      setFormData({
        userEmail: "",
        bio: "",
        subjects: [],
        education: "",
        expertise: [],
        domain: "",
      });

      setIsEditing(false);
    } catch (err) {
      console.error("Failed to submit mentor data", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Mentor Details</h2>
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Domains" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              <SelectItem value="jee">JEE</SelectItem>
              <SelectItem value="neet">NEET</SelectItem>
              <SelectItem value="upsc">UPSC</SelectItem>
              <SelectItem value="gate">GATE</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Add New Mentor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Mentor</DialogTitle>
            </DialogHeader>
            <MentorForm formData={formData} setFormData={setFormData} isEditing={false} />
            <Button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Submit
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mentor Name</TableHead>
                <TableHead>Mentor ID</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mentors.map((mentor) => (
                <TableRow key={mentor.id}>
                  <TableCell>{mentor.name}</TableCell>
                  <TableCell>{mentor.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{mentor.domain}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(mentor.rating)}</div>
                      <span className="text-sm">({mentor.rating})</span>
                    </div>
                  </TableCell>
                  <TableCell>{mentor.sessions}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => navigate(`/view-mentor/${mentor.email}`)}>
                        <Eye size={14} />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditMentor(mentor.email)}>
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                        onClick={() => {
                          setSelectedMentorId(mentor.id);
                          setDeleteDialogOpen(true);
                        }}
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

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Mentor</DialogTitle>
          </DialogHeader>
          <MentorForm formData={formData} setFormData={setFormData} isEditing />
          <Button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white">
            Update
          </Button>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this mentor?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button className="bg-red-600 text-white" onClick={handleDeleteMentor}>Confirm Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const MentorForm = ({
  formData,
  setFormData,
  isEditing,
}: {
  formData: MentorFormData;
  setFormData: React.Dispatch<React.SetStateAction<MentorFormData>>;
  isEditing: boolean;
}) => (
  <div className="space-y-4">
    <Input
      placeholder="Email"
      value={formData.userEmail}
      onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
      disabled={isEditing}
      className={isEditing ? "cursor-not-allowed bg-gray-100" : ""}
    />
    <Textarea
      placeholder="Bio"
      value={formData.bio}
      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
    />
    <Input
      placeholder="Subjects (comma separated)"
      value={formData.subjects.join(", ")}
      onChange={(e) =>
        setFormData({ ...formData, subjects: e.target.value.split(",").map((s) => s.trim()) })
      }
    />
    <Input
      placeholder="Education"
      value={formData.education}
      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
    />
    <Input
      placeholder="Domain"
      value={formData.domain}
      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
    />
    <Input
      placeholder="Expertise (comma separated)"
      value={formData.expertise.join(", ")}
      onChange={(e) =>
        setFormData({ ...formData, expertise: e.target.value.split(",").map((s) => s.trim()) })
      }
    />
  </div>
);

export default MentorManagement;
