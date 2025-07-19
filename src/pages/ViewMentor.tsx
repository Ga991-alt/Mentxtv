import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Session {
  _id: string;
  title: string;
  bookedStudents: string[];
  feedbacks: string[];
}

interface MentorDetails {
  userId: {
    name: string;
    email: string;
  };
  bio: string;
  profilePic: string;
  education: string;
  subjects: string[];
  sessions: Session[];
}

const ViewMentor = () => {
  const { email } = useParams<{ email: string }>();
  const [mentor, setMentor] = useState<MentorDetails | null>(null);

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/mentors/${email}`);
        setMentor(res.data);
      } catch (error) {
        console.error("Failed to fetch mentor data", error);
      }
    };

    if (email) fetchMentor();
  }, [email]);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  const avgRating = 4.5; // Placeholder — you can calculate based on feedback later

  return (
    <div className="space-y-6 p-6">
      {/* Profile Section */}
      <Card>
        <CardContent className="flex flex-col md:flex-row gap-8 items-center md:items-start p-6">
            <div><div className="flex flex-col md:flex-row gap-8 items-center md:items-start p-6 ">
          <div className="relative w-32 h-32  ">
            <Avatar className="w-full h-full border-4 border-blue-600">
              <AvatarImage src={mentor?.profilePic} alt={mentor?.userId.name} />
              <AvatarFallback>{getInitials(mentor?.userId.name || "")}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-semibold">{mentor?.userId.name}</h2>
            <p className="text-muted-foreground text-sm">{mentor?.userId.email}</p>
            <p className="text-gray-700 text-sm">{mentor?.bio}</p>
          </div></div>
          <div className="flex gap-4 mt-4 flex-wrap">
              <div className="bg-gray-100 px-4 py-2 rounded-md text-sm">
                <strong>Total Sessions:</strong> {mentor?.sessions.length}
              </div>
              <div className="bg-yellow-100 px-4 py-2 rounded-md text-sm flex items-center gap-2">
                <Star size={16} className="text-yellow-500 fill-yellow-400" />
                <span>{avgRating} / 5.0</span>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-md text-sm">
                <strong>Education:</strong> {mentor?.education}
              </div>
            </div>

            {mentor?.subjects?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {mentor.subjects.map((subj, idx) => (
                  <Badge key={idx} variant="outline">
                    {subj}
                  </Badge>
                ))}
              </div>
            )}
            </div>
        </CardContent>
      </Card>

      {/* Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sessions Conducted</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Session Name</TableHead>
                <TableHead>Session ID</TableHead>
                <TableHead>Booked Students</TableHead>
                <TableHead>Feedbacks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mentor?.sessions.map((session) => (
                <TableRow key={session._id}>
                  <TableCell className="font-medium">{session.title}</TableCell>
                  <TableCell>{session._id}</TableCell>
                  <TableCell>{session.bookedStudents.length}</TableCell>
                  <TableCell>{session.feedbacks.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewMentor;
