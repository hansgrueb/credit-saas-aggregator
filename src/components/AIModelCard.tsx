
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  creditCost: number;
  category: string;
  bestFor: string[];
}

interface AIModelCardProps {
  model: AIModel;
}

const AIModelCard = ({ model }: AIModelCardProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{model.name}</CardTitle>
            <CardDescription className="text-sm">{model.provider}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-navy/5 text-navy">
            {model.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-4">{model.description}</p>
        <div className="space-y-2">
          <div className="text-sm font-medium">Best for:</div>
          <div className="flex flex-wrap gap-1">
            {model.bestFor.map((use, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {use}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="font-medium text-navy">
          <span className="text-lg">{model.creditCost}</span> credits
        </div>
        <Button className="bg-light-blue hover:bg-navy transition-colors">Use Model</Button>
      </CardFooter>
    </Card>
  );
};

export default AIModelCard;
