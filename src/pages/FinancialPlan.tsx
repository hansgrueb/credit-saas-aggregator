
import Header from "@/components/Header";
import FinancialProjectionTable from "@/components/FinancialProjectionTable";
import FinancialProjectionChart from "@/components/FinancialProjectionChart";
import BusinessModelAssumptions from "@/components/BusinessModelAssumptions";
import BusinessModelOverview from "@/components/BusinessModelOverview";
import MarketSizingAnalysis from "@/components/MarketSizingAnalysis";
import SensitivityAnalysis from "@/components/SensitivityAnalysis";
import UnitEconomics from "@/components/UnitEconomics";

const FinancialPlan = () => {
  const revenueData = [
    { month: "Month 1", revenue: 2500 },
    { month: "Month 2", revenue: 4000 },
    { month: "Month 3", revenue: 5500 },
    { month: "Month 4", revenue: 7500 },
    { month: "Month 5", revenue: 10000 },
    { month: "Month 6", revenue: 13000 },
    { month: "Month 7", revenue: 16000 },
    { month: "Month 8", revenue: 19500 },
    { month: "Month 9", revenue: 23000 },
    { month: "Month 10", revenue: 27000 },
    { month: "Month 11", revenue: 31500 },
    { month: "Month 12", revenue: 36000 },
  ];

  const usersData = [
    { month: "Month 1", users: 50 },
    { month: "Month 2", users: 80 },
    { month: "Month 3", users: 110 },
    { month: "Month 4", users: 150 },
    { month: "Month 5", users: 200 },
    { month: "Month 6", users: 260 },
    { month: "Month 7", users: 330 },
    { month: "Month 8", users: 410 },
    { month: "Month 9", users: 500 },
    { month: "Month 10", users: 600 },
    { month: "Month 11", users: 680 },
    { month: "Month 12", users: 750 },
  ];

  const assumptions = [
    { category: "User Acquisition", details: [
      { name: "Initial Users", value: "50 users" },
      { name: "Monthly Growth Rate", value: "25-35%" },
      { name: "CAC (Customer Acquisition Cost)", value: "$18-25 per user" },
      { name: "Conversion Rate (Trial to Paid)", value: "15%" },
    ]},
    { category: "Revenue Model", details: [
      { name: "Average Initial Credit Purchase", value: "$50" },
      { name: "Average Monthly Credit Purchase", value: "$75" },
      { name: "Markup on AI Model Costs", value: "30%" },
      { name: "Additional Service Fee", value: "5%" },
    ]},
    { category: "Costs", details: [
      { name: "AI Provider Costs", value: "70% of credit value" },
      { name: "Infrastructure & Hosting", value: "$800-1,200/month" },
      { name: "Team & Development", value: "$12,000-18,000/month" },
      { name: "Marketing & Sales", value: "$2,000-5,000/month" },
    ]},
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Financial Plan</h1>
          <p className="text-gray-600">Credit-based SaaS aggregator for freelancers and agencies</p>
        </div>
        
        <FinancialProjectionChart revenueData={revenueData} usersData={usersData} />
        
        <FinancialProjectionTable />
        
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
