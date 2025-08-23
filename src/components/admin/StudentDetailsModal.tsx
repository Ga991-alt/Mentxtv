import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface Student {
  name: string;
  email: string;
  status: "present" | "absent";
}

interface StudentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
  sessionType: "live" | "upcoming" | "ended";
  students: Student[];
}

const StudentDetailsModal = ({ 
  isOpen, 
  onClose, 
  sessionId, 
  sessionType, 
  students 
}: StudentDetailsModalProps) => {
  const getStatusBadge = (status: string) => {
    if (status === "Attending") {
      return <Badge className="bg-green-100 text-green-800">Attending</Badge>;
    }
    return <Badge className="bg-red-100 text-red-800">Not Attending</Badge>;
  };

  const getTitle = () => {
    switch (sessionType) {
      case "live":
        return "Student Details (Live Session)";
      case "upcoming":
        return "Student Details (Upcoming Session)";
      case "ended":
        return "Student Details (Ended Session)";
      default:
        return "Student Details";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Student Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye size={14} />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        Remove
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetailsModal;