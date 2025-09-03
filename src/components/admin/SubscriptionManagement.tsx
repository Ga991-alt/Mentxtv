import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface UserId {
  name?: string;
  email?: string;
}

interface Student {
  _id: string;
  userId: UserId | string; // can be populated object or raw string
}

interface Mentor {
  _id: string;
  userId: UserId | string;
}

interface Subscription {
  _id: string;
  studentId: Student | string;
  mentorId: Mentor | string;
  plan: string;
  amount: number;
  status: string;
  createdAt: string;
  endDate: string;
  proof?: string;
}

const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api`;
        const res = await axios.get(`${baseURL}/subscriptions`);
        setSubscriptions(res.data);
      } catch (err) {
        console.error("Failed to fetch subscriptions:", err);
      }
    };
    fetchSubscriptions();
  }, []);

  const handleRowClick = (sub: Subscription) => {
    navigate(`/admin/subscriptions/${sub._id}`, { state: { subscription: sub } });
  };

  const formatStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "verified":
        return { label: "Active", color: "bg-green-100 text-green-800" };
      case "pending":
        return { label: "Pending", color: "bg-yellow-100 text-yellow-800" };
      case "expired":
      default:
        return { label: "Expired", color: "bg-red-100 text-red-800" };
    }
  };

  // ✅ Helpers to safely render names & emails
  const renderStudent = (student: Student | string) => {
    if (typeof student === "string") return student; // fallback ID
    if (typeof student.userId === "string") return student.userId; // still just an ID
    return student.userId?.name || student.userId?.email || student._id || "N/A";
  };

  const renderMentor = (mentor: Mentor | string) => {
    if (typeof mentor === "string") return mentor;
    if (typeof mentor.userId === "string") return mentor.userId;
    return mentor.userId?.name || mentor.userId?.email || mentor._id || "N/A";
  };

  return (
    <div className="space-y-6 cursor-pointer">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Subscription Management</h2>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Subscriptions</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subscription ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Mentor</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub) => {
                const { label, color } = formatStatus(sub.status);
                return (
                  <TableRow
                    key={sub._id}
                    onClick={() => handleRowClick(sub)}
                    className="hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <TableCell className="font-medium">{sub._id}</TableCell>
                    <TableCell>{renderStudent(sub.studentId)}</TableCell>
                    <TableCell>{renderMentor(sub.mentorId)}</TableCell>
                    <TableCell>{sub.plan}</TableCell>
                    <TableCell className="font-semibold">₹{sub.amount}</TableCell>
                    <TableCell>
                      <Badge className={color}>{label}</Badge>
                    </TableCell>
                    <TableCell>{new Date(sub.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(sub.endDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionManagement;
