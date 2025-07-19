
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Eye, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"; // Assuming you use shadcn or Radix wrapped components

import { useNavigate } from "react-router-dom";


interface Student {
  id: string;
  name: string;
  email: string;
  domain: string;
  sessionsAttended: number;
  performance: number;
}

interface StudentManagementProps {
  students: Student[];
}

const StudentManagement = ({ students }: StudentManagementProps) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Student Details</h2>
      </div>

      {/* Filter Section */}
      <div className="flex gap-4 mb-6">
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Domain" />
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

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Student Email ID</TableHead>
                <TableHead>Domain Name</TableHead>
                <TableHead>Total Sessions Attended</TableHead>
                <TableHead>Performance Rate</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {student.domain}
                    </Badge>
                  </TableCell>
                  <TableCell>{student.sessionsAttended}</TableCell>
                  <TableCell>{student.performance}%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => navigate(`/view-student/${student.email}`)}>
                        <Eye size={14} />
                      </Button>
                      {/* <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 size={14} />
                      </Button> */}
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

export default StudentManagement;
