
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AssumptionDetail {
  name: string;
  value: string;
}

interface AssumptionCategory {
  category: string;
  details: AssumptionDetail[];
}

interface BusinessModelAssumptionsProps {
  assumptions: AssumptionCategory[];
}

const BusinessModelAssumptions = ({ assumptions }: BusinessModelAssumptionsProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Business Model Assumptions</h2>
      
      <Tabs defaultValue="user-acquisition">
        <TabsList className="mb-4">
          {assumptions.map((assumption, index) => (
            <TabsTrigger key={index} value={assumption.category.toLowerCase().replace(/\s+/g, '-')}>
              {assumption.category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {assumptions.map((assumption, index) => (
          <TabsContent key={index} value={assumption.category.toLowerCase().replace(/\s+/g, '-')}>
            <Card>
              <CardHeader>
                <CardTitle>{assumption.category} Assumptions</CardTitle>
                <CardDescription>Key metrics and projections</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {assumption.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex justify-between">
                      <span className="font-medium">{detail.name}</span>
                      <span className="text-gray-600">{detail.value}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default BusinessModelAssumptions;
