
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

interface FinancialAssumptions {
  initialUsers: number;
  monthlyGrowthRate: number;
  conversionRate: number;
  avgInitialCreditPurchase: number;
  avgMonthlyCreditPurchase: number;
  markupOnAICosts: number;
  serviceFee: number;
  aiProviderCostPercentage: number;
  infrastructureCosts: number;
  teamCosts: number;
  marketingCosts: number;
}

interface DynamicFinancialPlanFormProps {
  assumptions: FinancialAssumptions;
  onUpdateAssumptions: (assumptions: FinancialAssumptions) => void;
}

const DynamicFinancialPlanForm = ({ 
  assumptions,
  onUpdateAssumptions 
}: DynamicFinancialPlanFormProps) => {
  const { toast } = useToast();
  const [formState, setFormState] = useState<FinancialAssumptions>(assumptions);
  
  const handleInputChange = (field: keyof FinancialAssumptions, value: number) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleApplyChanges = () => {
    onUpdateAssumptions(formState);
    toast({
      title: "Assumptions Updated",
      description: "The financial model has been recalculated with your new assumptions.",
    });
  };
  
  const handleResetForm = () => {
    setFormState(assumptions);
    toast({
      description: "Form reset to current values.",
    });
  };

  return (
    <Tabs defaultValue="user-growth" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="user-growth">User Growth</TabsTrigger>
        <TabsTrigger value="revenue">Revenue Model</TabsTrigger>
        <TabsTrigger value="costs">Costs</TabsTrigger>
      </TabsList>
      
      {/* User Growth Tab */}
      <TabsContent value="user-growth" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label htmlFor="initialUsers">Initial Users</Label>
            <div className="flex items-center gap-4">
              <Slider 
                id="initialUsers"
                min={10} 
                max={200}
                step={10}
                value={[formState.initialUsers]} 
                onValueChange={(values) => handleInputChange('initialUsers', values[0])}
              />
              <Input 
                type="number" 
                value={formState.initialUsers}
                onChange={(e) => handleInputChange('initialUsers', parseInt(e.target.value) || 0)}
                className="w-24"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="monthlyGrowthRate">Monthly Growth Rate (%)</Label>
            <div className="flex items-center gap-4">
              <Slider 
                id="monthlyGrowthRate"
                min={5} 
                max={100}
                step={1}
                value={[formState.monthlyGrowthRate]} 
                onValueChange={(values) => handleInputChange('monthlyGrowthRate', values[0])}
              />
              <Input 
                type="number" 
                value={formState.monthlyGrowthRate}
                onChange={(e) => handleInputChange('monthlyGrowthRate', parseInt(e.target.value) || 0)}
                className="w-24"
              />
            </div>
          </div>
        
          <div className="space-y-4">
            <Label htmlFor="conversionRate">Conversion Rate (Trial to Paid) (%)</Label>
            <div className="flex items-center gap-4">
              <Slider 
                id="conversionRate"
                min={1} 
                max={30}
                step={1}
                value={[formState.conversionRate]} 
                onValueChange={(values) => handleInputChange('conversionRate', values[0])}
              />
              <Input 
                type="number" 
                value={formState.conversionRate}
                onChange={(e) => handleInputChange('conversionRate', parseInt(e.target.value) || 0)}
                className="w-24"
              />
            </div>
          </div>
        </div>
      </TabsContent>
      
      {/* Revenue Model Tab */}
      <TabsContent value="revenue" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label htmlFor="avgInitialCreditPurchase">Average Initial Credit Purchase ($)</Label>
            <div className="flex items-center gap-4">
              <Slider 
                id="avgInitialCreditPurchase"
                min={10} 
                max={200}
                step={5}
                value={[formState.avgInitialCreditPurchase]} 
                onValueChange={(values) => handleInputChange('avgInitialCreditPurchase', values[0])}
              />
              <Input 
                type="number" 
                value={formState.avgInitialCreditPurchase}
                onChange={(e) => handleInputChange('avgInitialCreditPurchase', parseInt(e.target.value) || 0)}
                className="w-24"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="avgMonthlyCreditPurchase">Average Monthly Credit Purchase ($)</Label>
            <div className="flex items-center gap-4">
              <Slider 
                id="avgMonthlyCreditPurchase"
                min={25} 
                max={200}
                step={5}
                value={[formState.avgMonthlyCreditPurchase]} 
                onValueChange={(values) => handleInputChange('avgMonthlyCreditPurchase', values[0])}
              />
              <Input 
                type="number" 
                value={formState.avgMonthlyCreditPurchase}
                onChange={(e) => handleInputChange('avgMonthlyCreditPurchase', parseInt(e.target.value) || 0)}
                className="w-24"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="markupOnAICosts">Markup on AI Model Costs (%)</Label>
            <div className="flex items-center gap-4">
              <Slider 
                id="markupOnAICosts"
                min={10} 
                max={100}
                step={5}
                value={[formState.markupOnAICosts]} 
                onValueChange={(values) => handleInputChange('markupOnAICosts', values[0])}
              />
              <Input 
                type="number" 
                value={formState.markupOnAICosts}
                onChange={(e) => handleInputChange('markupOnAICosts', parseInt(e.target.value) || 0)}
                className="w-24"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="serviceFee">Additional Service Fee (%)</Label>
            <div className="flex items-center gap-4">
              <Slider 
                id="serviceFee"
                min={0} 
                max={20}
                step={1}
                value={[formState.serviceFee]} 
                onValueChange={(values) => handleInputChange('serviceFee', values[0])}
              />
              <Input 
                type="number" 
                value={formState.serviceFee}
                onChange={(e) => handleInputChange('serviceFee', parseInt(e.target.value) || 0)}
                className="w-24"
              />
            </div>
          </div>
        </div>
      </TabsContent>
      
      {/* Costs Tab */}
      <TabsContent value="costs" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label htmlFor="aiProviderCostPercentage">AI Provider Costs (% of credit value)</Label>
            <div className="flex items-center gap-4">
              <Slider 
                id="aiProviderCostPercentage"
                min={50} 
                max={90}
                step={1}
                value={[formState.aiProviderCostPercentage]} 
                onValueChange={(values) => handleInputChange('aiProviderCostPercentage', values[0])}
              />
              <Input 
                type="number" 
                value={formState.aiProviderCostPercentage}
                onChange={(e) => handleInputChange('aiProviderCostPercentage', parseInt(e.target.value) || 0)}
                className="w-24"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="infrastructureCosts">Infrastructure & Hosting ($/month)</Label>
            <div className="flex items-center gap-4">
              <Slider 
                id="infrastructureCosts"
                min={500} 
                max={5000}
                step={100}
                value={[formState.infrastructureCosts]} 
                onValueChange={(values) => handleInputChange('infrastructureCosts', values[0])}
              />
              <Input 
                type="number" 
                value={formState.infrastructureCosts}
                onChange={(e) => handleInputChange('infrastructureCosts', parseInt(e.target.value) || 0)}
                className="w-24"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="teamCosts">Team & Development ($/month)</Label>
            <div className="flex items-center gap-4">
              <Slider 
                id="teamCosts"
                min={5000} 
                max={30000}
                step={1000}
                value={[formState.teamCosts]} 
                onValueChange={(values) => handleInputChange('teamCosts', values[0])}
              />
              <Input 
                type="number" 
                value={formState.teamCosts}
                onChange={(e) => handleInputChange('teamCosts', parseInt(e.target.value) || 0)}
                className="w-24"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="marketingCosts">Marketing & Sales ($/month)</Label>
            <div className="flex items-center gap-4">
              <Slider 
                id="marketingCosts"
                min={1000} 
                max={10000}
                step={500}
                value={[formState.marketingCosts]} 
                onValueChange={(values) => handleInputChange('marketingCosts', values[0])}
              />
              <Input 
                type="number" 
                value={formState.marketingCosts}
                onChange={(e) => handleInputChange('marketingCosts', parseInt(e.target.value) || 0)}
                className="w-24"
              />
            </div>
          </div>
        </div>
      </TabsContent>
      
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={handleResetForm}>Reset</Button>
        <Button onClick={handleApplyChanges}>Apply Changes</Button>
      </div>
    </Tabs>
  );
};

export default DynamicFinancialPlanForm;
