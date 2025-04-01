
import { useState } from "react";
import Header from "@/components/Header";
import FinancialProjectionTable from "@/components/FinancialProjectionTable";
import FinancialProjectionChart from "@/components/FinancialProjectionChart";
import BusinessModelAssumptions from "@/components/BusinessModelAssumptions";
import BusinessModelOverview from "@/components/BusinessModelOverview";
import MarketSizingAnalysis from "@/components/MarketSizingAnalysis";
import SensitivityAnalysis from "@/components/SensitivityAnalysis";
import UnitEconomics from "@/components/UnitEconomics";
import DynamicFinancialPlanForm from "@/components/DynamicFinancialPlanForm";
import { calculateFinancialProjections } from "@/utils/financialCalculations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const FinancialPlan = () => {
  const { toast } = useToast();
  
  // Default assumptions
  const [financialAssumptions, setFinancialAssumptions] = useState({
    // User growth
    initialUsers: 50,
    monthlyGrowthRate: 30, // percentage
    conversionRate: 15, // percentage
    
    // Revenue model
    avgInitialCreditPurchase: 50, // dollars
    avgMonthlyCreditPurchase: 75, // dollars
    markupOnAICosts: 30, // percentage
    serviceFee: 5, // percentage
    
    // Costs
    aiProviderCostPercentage: 70, // percentage of credit value
    infrastructureCosts: 1000, // dollars per month
    teamCosts: 15000, // dollars per month
    marketingCosts: 3500 // dollars per month
  });
  
  // Calculate financial projections based on assumptions
  const financialData = calculateFinancialProjections(financialAssumptions);
  
  // Use the calculated data for visualizations
  const { revenueData, usersData, monthlyData, quarterlyData, yearlyData } = financialData;

  const assumptions = [
    { category: "User Acquisition", details: [
      { name: "Initial Users", value: `${financialAssumptions.initialUsers} users` },
      { name: "Monthly Growth Rate", value: `${financialAssumptions.monthlyGrowthRate}%` },
      { name: "Conversion Rate (Trial to Paid)", value: `${financialAssumptions.conversionRate}%` },
    ]},
    { category: "Revenue Model", details: [
      { name: "Average Initial Credit Purchase", value: `$${financialAssumptions.avgInitialCreditPurchase}` },
      { name: "Average Monthly Credit Purchase", value: `$${financialAssumptions.avgMonthlyCreditPurchase}` },
      { name: "Markup on AI Model Costs", value: `${financialAssumptions.markupOnAICosts}%` },
      { name: "Additional Service Fee", value: `${financialAssumptions.serviceFee}%` },
    ]},
    { category: "Costs", details: [
      { name: "AI Provider Costs", value: `${financialAssumptions.aiProviderCostPercentage}% of credit value` },
      { name: "Infrastructure & Hosting", value: `$${financialAssumptions.infrastructureCosts.toLocaleString()}/month` },
      { name: "Team & Development", value: `$${financialAssumptions.teamCosts.toLocaleString()}/month` },
      { name: "Marketing & Sales", value: `$${financialAssumptions.marketingCosts.toLocaleString()}/month` },
    ]},
  ];

  const handleSaveScenario = () => {
    toast({
      title: "Scenario Saved",
      description: "Your financial plan scenario has been saved.",
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "Export Started",
      description: "Your financial plan PDF is being generated.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Financial Plan</h1>
            <p className="text-gray-600">Credit-based SaaS aggregator for freelancers and agencies</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleSaveScenario}>
              <Save className="mr-2 h-4 w-4" /> Save Scenario
            </Button>
            <Button variant="outline" onClick={handleExportPDF}>
              <Download className="mr-2 h-4 w-4" /> Export PDF
            </Button>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Financial Model Inputs</CardTitle>
          </CardHeader>
          <CardContent>
            <DynamicFinancialPlanForm 
              assumptions={financialAssumptions} 
              onUpdateAssumptions={setFinancialAssumptions} 
            />
          </CardContent>
        </Card>
        
        <FinancialProjectionChart revenueData={revenueData} usersData={usersData} />
        
        <FinancialProjectionTable 
          monthlyData={monthlyData} 
          quarterlyData={quarterlyData} 
          yearlyData={yearlyData} 
        />
        
        <UnitEconomics />
        
        <MarketSizingAnalysis />
        
        <BusinessModelAssumptions assumptions={assumptions} />
        
        <SensitivityAnalysis />
        
        <BusinessModelOverview />
      </main>
    </div>
  );
};

export default FinancialPlan;
