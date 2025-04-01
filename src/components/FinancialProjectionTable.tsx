
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FinancialProjectionTable = () => {
  const data = {
    monthly: [
      { month: "Month 1", users: 50, revenue: 2500, costs: 1800, profit: 700 },
      { month: "Month 2", users: 80, revenue: 4000, costs: 2200, profit: 1800 },
      { month: "Month 3", users: 110, revenue: 5500, costs: 2600, profit: 2900 },
      { month: "Month 4", users: 150, revenue: 7500, costs: 3100, profit: 4400 },
      { month: "Month 5", users: 200, revenue: 10000, costs: 3700, profit: 6300 },
      { month: "Month 6", users: 260, revenue: 13000, costs: 4400, profit: 8600 },
    ],
    quarterly: [
      { quarter: "Q1", users: 110, revenue: 12000, costs: 6600, profit: 5400 },
      { quarter: "Q2", users: 260, revenue: 30500, costs: 11200, profit: 19300 },
      { quarter: "Q3", users: 450, revenue: 56000, costs: 16800, profit: 39200 },
      { quarter: "Q4", users: 680, revenue: 85000, costs: 23500, profit: 61500 },
    ],
    yearly: [
      { year: "Year 1", users: 680, revenue: 183500, costs: 58100, profit: 125400 },
      { year: "Year 2", users: 1500, revenue: 450000, costs: 120000, profit: 330000 },
      { year: "Year 3", users: 3000, revenue: 900000, costs: 230000, profit: 670000 },
    ]
  };

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
                {data.monthly.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell className="font-medium">{row.month}</TableCell>
                    <TableCell className="text-right">{row.users}</TableCell>
                    <TableCell className="text-right">${row.revenue}</TableCell>
                    <TableCell className="text-right">${row.costs}</TableCell>
                    <TableCell className="text-right">${row.profit}</TableCell>
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
                {data.quarterly.map((row) => (
                  <TableRow key={row.quarter}>
                    <TableCell className="font-medium">{row.quarter}</TableCell>
                    <TableCell className="text-right">{row.users}</TableCell>
                    <TableCell className="text-right">${row.revenue}</TableCell>
                    <TableCell className="text-right">${row.costs}</TableCell>
                    <TableCell className="text-right">${row.profit}</TableCell>
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
                {data.yearly.map((row) => (
                  <TableRow key={row.year}>
                    <TableCell className="font-medium">{row.year}</TableCell>
                    <TableCell className="text-right">{row.users}</TableCell>
                    <TableCell className="text-right">${row.revenue}</TableCell>
                    <TableCell className="text-right">${row.costs}</TableCell>
                    <TableCell className="text-right">${row.profit}</TableCell>
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
