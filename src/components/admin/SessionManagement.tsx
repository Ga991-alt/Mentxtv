import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import StudentDetailsModal from "./StudentDetailsModal";
import { useNavigate } from "react-router-dom";

interface LiveSession {
  id: string;
  mentorName: string;
  mentorId: string;
  subject: string;
  domain: string;
  studentsAttending: number;
  feedbackGiven: boolean;
}

interface UpcomingSession {
  id: string;
  mentorName: string;
  mentorId: string;
  subject: string;
  domain: string;
  studentsRegistered: number;
  canDelete: boolean;
}

interface EndedSession {
  id: string;
  mentorName: string;
  mentorId: string;
  subject: string;
  domain: string;
  studentsAttended: number;
  feedbackCollected: boolean;
}

interface Student {
  id: string;
  name: string;
  email: string;
  status: "present" | "absent";
}

interface SessionManagementProps {
  liveSessions: LiveSession[];
  upcomingSessions: UpcomingSession[];
  endedSessions: EndedSession[];
}

const SessionManagement = ({
  liveSessions,
  upcomingSessions,
  endedSessions,
}: SessionManagementProps) => {
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [modalState, setModalState] = useState({
    isOpen: false,
    sessionId: "",
    sessionType: "live" as "live" | "upcoming" | "ended",
  });

  const [students, setStudents] = useState<Student[]>([]);

  const filterSessions = (sessions: any[], domain: string) => {
    return sessions.filter((session) => {
      return domain === "all" || session.domain?.toLowerCase() === domain.toLowerCase();
    });
  };

  const filteredLiveSessions = filterSessions(liveSessions, selectedDomain);
  const filteredUpcomingSessions = filterSessions(upcomingSessions, selectedDomain);
  const filteredEndedSessions = filterSessions(endedSessions, selectedDomain);

  const openModal = async (
    sessionId: string,
    sessionType: "live" | "upcoming" | "ended"
  ) => {
    setModalState({ isOpen: true, sessionId, sessionType });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/sessions/${sessionId}/students`
      );
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to fetch students:", err);
      setStudents([]);
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, sessionId: "", sessionType: "live" });
    setStudents([]);
  };

  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Session Details</h2>
      </div>

      {/* Filter Section */}
      <div className="flex gap-4 mb-6">
        <Select value={selectedDomain} onValueChange={setSelectedDomain}>
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

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="live">Live Session</SelectItem>
            <SelectItem value="upcoming">Upcoming Session</SelectItem>
            <SelectItem value="ended">Ended Session</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Render Grouped Session Cards */}
      {(["live", "upcoming", "ended"] as const).map((type) => {
        const sessions =
          type === "live"
            ? filteredLiveSessions
            : type === "upcoming"
            ? filteredUpcomingSessions
            : filteredEndedSessions;

        if (selectedCategory !== "all" && selectedCategory !== type) return null;
        if (!sessions.length) return null;

        return (
          <Card key={type}>
            <CardHeader>
              <CardTitle className="text-lg capitalize">{type} Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session ID</TableHead>
                    <TableHead>Mentor Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>{session.id}</TableCell>
                      <TableCell>{session.mentorName}</TableCell>
                      <TableCell>
                        <Badge>{session.subject}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge>{session.domain}</Badge>
                      </TableCell>
                      <TableCell>
                        {
                          (session as any).studentsAttending ||
                          (session as any).studentsRegistered ||
                          (session as any).studentsAttended
                        }
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-blue-100 text-blue-800"
                            onClick={type==="ended"? ()=> window.open(`/session-details/${session.id}`, "_blank") : () => openModal(session.id, type)}
                          >
                            View Details
                          </Button>
                          {(session as any).canDelete && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600"
                            >
                              <Trash2 size={14} />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      })}

      {/* Footer Action Buttons */}
      <div className="flex gap-4 mt-6">
        <Button className="bg-blue-600 text-white">See Live Class</Button>
        <Button variant="outline">Total Mentors</Button>
      </div>

      {/* Student Modal */}
      <StudentDetailsModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        sessionId={modalState.sessionId}
        sessionType={modalState.sessionType}
        students={students}
      />
    </div>
  );
};

export default SessionManagement;
