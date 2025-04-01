
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";

const UnitEconomics = () => {
  const metrics = [
    { 
      metric: "Customer Acquisition Cost (CAC)", 
      value: "$22", 
      description: "Average cost to acquire one paying user"
    },
    { 
      metric: "Average Revenue Per User (ARPU)", 
      value: "$75/month", 
      description: "Average monthly spend on credits per active user"
    },
    { 
      metric: "Customer Lifetime Value (LTV)", 
      value: "$1,350", 
      description: "Average total revenue from a customer during their lifetime"
    },
    { 
      metric: "LTV:CAC Ratio", 
      value: "61:1", 
      description: "Ratio of customer lifetime value to acquisition cost"
    },
    { 
      metric: "Avg. Gross Margin", 
      value: "68%", 
      description: "Average profit percentage after direct costs (AI provider costs)"
    },
    { 
      metric: "Payback Period", 
      value: "0.3 months", 
      description: "Time required to recover the CAC"
    },
    { 
      metric: "Churn Rate", 
      value: "3.5%/month", 
      description: "Percentage of customers who stop using the service monthly"
    },
    { 
      metric: "User Retention (12 months)", 
      value: "65%", 
      description: "Percentage of users still active after 12 months"
    }
  ];

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Unit Economics</CardTitle>
        <CardDescription>Key financial metrics per customer</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metrics.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.metric}</TableCell>
                <TableCell className="text-right font-bold">{item.value}</TableCell>
                <TableCell className="text-gray-600">{item.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UnitEconomics;
