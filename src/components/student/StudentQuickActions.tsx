import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StudentQuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Link to="/booking-sessions">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Book New Session
            </Button>
          </Link>
          <Button variant="outline">View All Sessions</Button>
          <Link to="/student-dashboard-result">
            <Button variant="outline">My Exams</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentQuickActions;
