import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";

interface Payment {
  id: string;
  studentName: string;
  email: string;
  domain: string;
  sessionId: string;
  amount: number;
  status: string;
  paymentDate: string;
  title: string; // Added title to match the session title
}

interface PaymentManagementProps {
  payments: Payment[];
}

const PaymentManagement = ({ payments }: PaymentManagementProps) => {
  const formatStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
      case "completed":
        return { label: "Completed", color: "bg-green-100 text-green-800" };
      case "pending":
        return { label: "Pending", color: "bg-yellow-100 text-yellow-800" };
      case "failed":
      default:
        return { label: "Failed", color: "bg-red-100 text-red-800" };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payment Details</h2>
        {/* <Button className="bg-blue-600 text-white">
          <Download size={16} className="mr-2" />
          Export Report
        </Button> */}
      </div>

      {/* Filters */}
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

        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Payment Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Student Payments</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Email ID</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Session Title</TableHead>
                <TableHead>Amount Paid</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => {
                console.log(payment);
                const { label, color } = formatStatus(payment.status);
                const paymentDate = new Date(payment.paymentDate).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                });

                return (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.studentName || "N/A"}</TableCell>
                    <TableCell>{payment.email || "N/A"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {payment.domain || null}
                      </Badge>
                    </TableCell>
                    <TableCell>{payment.title}</TableCell>
                    <TableCell className="font-semibold">₹{payment.amount}</TableCell>
                    <TableCell>
                      <Badge className={color}>{label}</Badge>
                    </TableCell>
                    <TableCell>{paymentDate}</TableCell>
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

export default PaymentManagement;
