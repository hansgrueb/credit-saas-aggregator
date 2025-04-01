
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SensitivityAnalysis = () => {
  const scenarios = {
    revenue: [
      { 
        scenario: "Conservative (70%)", 
        year1: "$128,500", 
        year2: "$315,000", 
        year3: "$630,000"
      },
      { 
        scenario: "Base Case (100%)", 
        year1: "$183,500", 
        year2: "$450,000", 
        year3: "$900,000"
      },
      { 
        scenario: "Optimistic (130%)", 
        year1: "$238,500", 
        year2: "$585,000", 
        year3: "$1,170,000"
      }
    ],
    costs: [
      { 
        scenario: "Higher Costs (120%)", 
        year1: "$69,700", 
        year2: "$144,000", 
        year3: "$276,000"
      },
      { 
        scenario: "Base Case (100%)", 
        year1: "$58,100", 
        year2: "$120,000", 
        year3: "$230,000"
      },
      { 
        scenario: "Lower Costs (80%)", 
        year1: "$46,500", 
        year2: "$96,000", 
        year3: "$184,000"
      }
    ],
    customerAcquisition: [
      { 
        scenario: "Slower Growth (70%)", 
        year1: "475 users", 
        year2: "1,050 users", 
        year3: "2,100 users"
      },
      { 
        scenario: "Base Case (100%)", 
        year1: "680 users", 
        year2: "1,500 users", 
        year3: "3,000 users"
      },
      { 
        scenario: "Faster Growth (130%)", 
        year1: "880 users", 
        year2: "1,950 users", 
        year3: "3,900 users"
      }
    ]
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Sensitivity Analysis</CardTitle>
        <CardDescription>Projections based on different scenarios</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="revenue">
          <TabsList className="mb-4">
            <TabsTrigger value="revenue">Revenue Scenarios</TabsTrigger>
            <TabsTrigger value="costs">Cost Scenarios</TabsTrigger>
            <TabsTrigger value="customerAcquisition">Customer Acquisition</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scenario</TableHead>
                  <TableHead className="text-right">Year 1</TableHead>
                  <TableHead className="text-right">Year 2</TableHead>
                  <TableHead className="text-right">Year 3</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scenarios.revenue.map((scenario, index) => (
                  <TableRow key={index} className={index === 1 ? "font-medium" : ""}>
                    <TableCell className={index === 1 ? "font-bold" : ""}>{scenario.scenario}</TableCell>
                    <TableCell className="text-right">{scenario.year1}</TableCell>
                    <TableCell className="text-right">{scenario.year2}</TableCell>
                    <TableCell className="text-right">{scenario.year3}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="costs">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scenario</TableHead>
                  <TableHead className="text-right">Year 1</TableHead>
                  <TableHead className="text-right">Year 2</TableHead>
                  <TableHead className="text-right">Year 3</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scenarios.costs.map((scenario, index) => (
                  <TableRow key={index} className={index === 1 ? "font-medium" : ""}>
                    <TableCell className={index === 1 ? "font-bold" : ""}>{scenario.scenario}</TableCell>
                    <TableCell className="text-right">{scenario.year1}</TableCell>
                    <TableCell className="text-right">{scenario.year2}</TableCell>
                    <TableCell className="text-right">{scenario.year3}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="customerAcquisition">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scenario</TableHead>
                  <TableHead className="text-right">Year 1</TableHead>
                  <TableHead className="text-right">Year 2</TableHead>
                  <TableHead className="text-right">Year 3</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scenarios.customerAcquisition.map((scenario, index) => (
                  <TableRow key={index} className={index === 1 ? "font-medium" : ""}>
                    <TableCell className={index === 1 ? "font-bold" : ""}>{scenario.scenario}</TableCell>
                    <TableCell className="text-right">{scenario.year1}</TableCell>
                    <TableCell className="text-right">{scenario.year2}</TableCell>
                    <TableCell className="text-right">{scenario.year3}</TableCell>
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

export default SensitivityAnalysis;
