
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export interface Activity {
  id: string;
  date: string;
  modelName: string;
  modelProvider: string;
  creditsUsed: number;
  category: string;
}

interface RecentActivityTableProps {
  activities: Activity[];
}

const RecentActivityTable = ({ activities }: RecentActivityTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your recent AI model usage</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Credits</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">{activity.date}</TableCell>
                <TableCell>{activity.modelName}</TableCell>
                <TableCell>{activity.modelProvider}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-navy/5 text-navy">
                    {activity.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{activity.creditsUsed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentActivityTable;
