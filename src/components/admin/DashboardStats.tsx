
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStatsProps {
  mentorCount: number;
  studentCount: number;
  liveSessionCount: number;
  upcomingSessionCount: number;
}

const DashboardStats = ({ mentorCount, studentCount, liveSessionCount, upcomingSessionCount }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Mentors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{mentorCount}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{studentCount}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Live Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{liveSessionCount}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{upcomingSessionCount}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
