import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Book, CheckCircle } from "lucide-react";

interface Session {
  _id: string;
  title: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  mentorName: string;
  status: string;
  price: number;
}

interface Payment {
  _id: string;
  amount: number;
  status: string;
  timestamp: string;
  sessionId: string;
}

interface Student {
  userId: {
    name: string;
    email: string;
    phone: string;
    role: string;
  };
  profilePic: string;
  educationLevel: string;
  goal: string;
  interests: string[];
  enrolledSessions: Session[];
  attendedSessions: Session[];
  payments: Payment[];
  totalSpent: number;
}

const ViewStudent = () => {
  const { email } = useParams<{ email: string }>();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/students/${email}`);
        setStudent(res.data);
      } catch (err) {
        console.error("Failed to fetch student", err);
      }
    };

    if (email) fetchStudent();
  }, [email]);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="space-y-6 p-6">
      {/* Student Profile */}
      <Card>
        <CardContent className="flex flex-col md:flex-row gap-8 items-center md:items-start p-6">
          <Avatar className="w-32 h-32 border-4 border-green-600">
            <AvatarImage src={student?.profilePic} alt={student?.userId.name} />
            <AvatarFallback>{getInitials(student?.userId.name || "")}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-semibold">{student?.userId.name}</h2>
            <p className="text-muted-foreground text-sm">{student?.userId.email}</p>
            <p className="text-gray-700 text-sm">{student?.goal}</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="bg-gray-100 px-4 py-2 rounded-md text-sm">
                <strong>Education:</strong> {student?.educationLevel}
              </div>
              <div className="bg-green-100 px-4 py-2 rounded-md text-sm flex items-center gap-2">
                <DollarSign size={16} className="text-green-600" />
                ₹{student?.totalSpent}
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-md text-sm flex items-center gap-2">
                <Book size={16} className="text-blue-600" />
                Enrolled: {student?.enrolledSessions.length}
              </div>
              <div className="bg-purple-50 px-4 py-2 rounded-md text-sm flex items-center gap-2">
                <CheckCircle size={16} className="text-purple-600" />
                Attended: {student?.attendedSessions.length}
              </div>
            </div>

            {student?.interests?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {student.interests.map((interest, idx) => (
                  <Badge key={idx} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Enrolled Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Enrolled Sessions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Mentor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {student?.enrolledSessions.map((session) => (
                <TableRow key={session._id}>
                  <TableCell>{session.title}</TableCell>
                  <TableCell>{session.subject}</TableCell>
                  <TableCell>{new Date(session.date).toLocaleDateString()}</TableCell>
                  <TableCell>{session.time}</TableCell>
                  <TableCell>{session.mentorName}</TableCell>
                  <TableCell>{session.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Session ID</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {student?.payments.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>{payment._id}</TableCell>
                  <TableCell>₹{payment.amount}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                  <TableCell>{payment.sessionId}</TableCell>
                  <TableCell>{new Date(payment.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewStudent;
