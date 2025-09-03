import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Users, Clock, Calendar, TrendingUp } from "lucide-react";

interface TestDetailsViewProps {
  testId: string;
  onBack: () => void;
}

// Mock data for students who attended the test
const mockStudentResults = [
  {
    id: "1",
    name: "Arjun Sharma",
    email: "arjun.sharma@example.com",
    subject: "Mathematics",
    marks: 85,
    totalMarks: 100,
    percentage: 85,
    timeTaken: "45 mins",
    examDate: "2024-01-20",
    examTime: "10:30 AM"
  },
  {
    id: "2", 
    name: "Priya Patel",
    email: "priya.patel@example.com",
    subject: "Mathematics",
    marks: 92,
    totalMarks: 100,
    percentage: 92,
    timeTaken: "42 mins",
    examDate: "2024-01-20",
    examTime: "10:30 AM"
  },
  {
    id: "3",
    name: "Rahul Kumar",
    email: "rahul.kumar@example.com", 
    subject: "Mathematics",
    marks: 78,
    totalMarks: 100,
    percentage: 78,
    timeTaken: "48 mins",
    examDate: "2024-01-20",
    examTime: "10:30 AM"
  },
  {
    id: "4",
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    subject: "Mathematics", 
    marks: 88,
    totalMarks: 100,
    percentage: 88,
    timeTaken: "40 mins",
    examDate: "2024-01-20",
    examTime: "10:30 AM"
  }
];

const TestDetailsView = ({ testId, onBack }: TestDetailsViewProps) => {
  const [students] = useState(mockStudentResults);

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-50";
    if (percentage >= 75) return "text-blue-600 bg-blue-50"; 
    if (percentage >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const averageMarks = students.reduce((sum, student) => sum + student.marks, 0) / students.length;
  const highestMarks = Math.max(...students.map(s => s.marks));
  const lowestMarks = Math.min(...students.map(s => s.marks));

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to Tests
        </Button>
        <h2 className="text-2xl font-bold text-foreground">Test Results - JEE Main Mathematics - Algebra</h2>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Attempts</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">{averageMarks.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Highest Score</p>
                <p className="text-2xl font-bold">{highestMarks}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lowest Score</p>
                <p className="text-2xl font-bold">{lowestMarks}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Results Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} />
            Student Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Time Taken</TableHead>
                <TableHead>Exam Date</TableHead>
                <TableHead>Exam Time</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="text-muted-foreground">{student.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.subject}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {student.marks}/{student.totalMarks}
                  </TableCell>
                  <TableCell className="flex items-center gap-1">
                    <Clock size={14} />
                    {student.timeTaken}
                  </TableCell>
                  <TableCell className="flex items-center gap-1">
                    <Calendar size={14} />
                    {student.examDate}
                  </TableCell>
                  <TableCell>{student.examTime}</TableCell>
                  <TableCell>
                    <Badge className={`${getPerformanceColor(student.percentage)} border-0`}>
                      {student.percentage}%
                    </Badge>
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

export default TestDetailsView;