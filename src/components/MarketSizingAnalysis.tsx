
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";

const MarketSizingAnalysis = () => {
  const targetMarkets = [
    { 
      segment: "Freelance Content Creators", 
      totalTAM: "2.5M", 
      targetSAM: "800K", 
      yearOneTarget: "5K", 
      yearThreeTarget: "60K",
      avgMonthlySpend: "$75"
    },
    { 
      segment: "Small Marketing Agencies", 
      totalTAM: "450K", 
      targetSAM: "250K", 
      yearOneTarget: "1.2K", 
      yearThreeTarget: "25K",
      avgMonthlySpend: "$250"
    },
    { 
      segment: "Independent Consultants", 
      totalTAM: "1.8M", 
      targetSAM: "600K", 
      yearOneTarget: "3K", 
      yearThreeTarget: "45K",
      avgMonthlySpend: "$100"
    },
    { 
      segment: "SMB Marketing Teams", 
      totalTAM: "3.5M", 
      targetSAM: "1.2M", 
      yearOneTarget: "8K", 
      yearThreeTarget: "120K",
      avgMonthlySpend: "$350"
    }
  ];

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Market Sizing Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Target Segment</TableHead>
              <TableHead className="text-right">Total TAM</TableHead>
              <TableHead className="text-right">Target SAM</TableHead>
              <TableHead className="text-right">Year 1 Target</TableHead>
              <TableHead className="text-right">Year 3 Target</TableHead>
              <TableHead className="text-right">Avg. Monthly Spend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {targetMarkets.map((market, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{market.segment}</TableCell>
                <TableCell className="text-right">{market.totalTAM}</TableCell>
                <TableCell className="text-right">{market.targetSAM}</TableCell>
                <TableCell className="text-right">{market.yearOneTarget}</TableCell>
                <TableCell className="text-right">{market.yearThreeTarget}</TableCell>
                <TableCell className="text-right">{market.avgMonthlySpend}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MarketSizingAnalysis;
