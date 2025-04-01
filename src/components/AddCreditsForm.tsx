
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";

const AddCreditsForm = () => {
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState("medium");
  const [customAmount, setCustomAmount] = useState("");

  const creditPackages = [
    { id: "small", name: "Starter", credits: 1000, price: 10, popular: false },
    { id: "medium", name: "Professional", credits: 5000, price: 45, popular: true },
    { id: "large", name: "Agency", credits: 10000, price: 80, popular: false },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Credits Added Successfully",
      description: "Your credits have been added to your account.",
    });
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add Credits</CardTitle>
        <CardDescription>
          Choose a credit package or enter a custom amount
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <RadioGroup 
            value={selectedPackage} 
            onValueChange={setSelectedPackage}
            className="space-y-4"
          >
            {creditPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`flex items-center justify-between p-4 border rounded-lg ${
                  selectedPackage === pkg.id ? "border-light-blue bg-light-blue/5" : "border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={pkg.id} id={pkg.id} />
                  <div>
                    <Label htmlFor={pkg.id} className="text-base font-medium">
                      {pkg.name}
                      {pkg.popular && (
                        <Badge className="ml-2 bg-navy text-white">Popular</Badge>
                      )}
                    </Label>
                    <p className="text-sm text-gray-500">
                      {pkg.credits.toLocaleString()} credits
                    </p>
                  </div>
                </div>
                <div className="text-lg font-medium">${pkg.price}</div>
              </div>
            ))}

            <div
              className={`flex items-start p-4 border rounded-lg ${
                selectedPackage === "custom" ? "border-light-blue bg-light-blue/5" : "border-gray-200"
              }`}
            >
              <RadioGroupItem value="custom" id="custom" className="mt-2" />
              <div className="ml-3 flex-1">
                <Label htmlFor="custom" className="text-base font-medium">
                  Custom Amount
                </Label>
                <div className="mt-2 flex items-center">
                  <Input
                    type="number"
                    placeholder="Enter credit amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedPackage("custom");
                    }}
                    className="max-w-[140px]"
                  />
                  <span className="ml-2 text-sm text-gray-500">
                    {customAmount ? `$${(parseInt(customAmount) * 0.01).toFixed(2)}` : ""}
                  </span>
                </div>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-light-blue hover:bg-navy transition-colors">
            Complete Purchase
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddCreditsForm;
