
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FinancialData {
  month: string;
  users: number;
  revenue: number;
  costs: number;
  profit: number;
}

interface FinancialProjectionTableProps {
  monthlyData: FinancialData[];
  quarterlyData: FinancialData[];
  yearlyData: FinancialData[];
}

const FinancialProjectionTable = ({ 
  monthlyData, 
  quarterlyData, 
  yearlyData 
}: FinancialProjectionTableProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Financial Projections</CardTitle>
        <CardDescription>Estimated growth and revenue forecasts for the credit-based SaaS model</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <TabsList className="mb-4">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Users</TableHead>
                  <TableHead className="text-right">Revenue ($)</TableHead>
                  <TableHead className="text-right">Costs ($)</TableHead>
                  <TableHead className="text-right">Profit ($)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyData.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell className="font-medium">{row.month}</TableCell>
                    <TableCell className="text-right">{row.users}</TableCell>
                    <TableCell className="text-right">${row.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${row.costs.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${row.profit.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="quarterly">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quarter</TableHead>
                  <TableHead className="text-right">Users</TableHead>
                  <TableHead className="text-right">Revenue ($)</TableHead>
                  <TableHead className="text-right">Costs ($)</TableHead>
                  <TableHead className="text-right">Profit ($)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quarterlyData.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell className="font-medium">{row.month}</TableCell>
                    <TableCell className="text-right">{row.users}</TableCell>
                    <TableCell className="text-right">${row.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${row.costs.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${row.profit.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="yearly">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead className="text-right">Users</TableHead>
                  <TableHead className="text-right">Revenue ($)</TableHead>
                  <TableHead className="text-right">Costs ($)</TableHead>
                  <TableHead className="text-right">Profit ($)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {yearlyData.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell className="font-medium">{row.month}</TableCell>
                    <TableCell className="text-right">{row.users}</TableCell>
                    <TableCell className="text-right">${row.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${row.costs.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${row.profit.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FinancialProjectionTable;
