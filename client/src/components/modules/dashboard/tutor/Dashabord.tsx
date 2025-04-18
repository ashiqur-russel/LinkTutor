import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, BookOpen, Wallet, Users } from "lucide-react";
import DashboardCard from "./DashboardCard";

const Dashabord = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Earnings"
          value="$12,340"
          icon={<DollarSign />}
        />
        <DashboardCard title="Total Bookings" value="87" icon={<BookOpen />} />
        <DashboardCard
          title="Total Withdrawn"
          value="$8,220"
          icon={<Wallet />}
        />
        <DashboardCard title="Active Students" value="24" icon={<Users />} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Jane Doe</TableCell>
                <TableCell>Mathematics</TableCell>
                <TableCell>Apr 10, 2025</TableCell>
                <TableCell>
                  <Badge variant="default">Confirmed</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Smith</TableCell>
                <TableCell>Physics</TableCell>
                <TableCell>Apr 9, 2025</TableCell>
                <TableCell>
                  <Badge variant="secondary">Pending</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Other Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Next Session</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            Today at 3:00 PM with <strong>Jane Doe</strong> (Biology)
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>📅 New session request from Alex</p>
            <p>💰 Payment received from Emily</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashabord;
