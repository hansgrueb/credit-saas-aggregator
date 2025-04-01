
import Header from "@/components/Header";
import FinancialProjectionTable from "@/components/FinancialProjectionTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Projection</CardTitle>
              <CardDescription>Monthly revenue forecast (first year)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={revenueData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => ['$' + value, 'Revenue']} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#00d4ff" 
                    fill="url(#colorRevenue)" 
                  />
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Monthly active users forecast (first year)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={usersData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, 'Users']} />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#0a2540" 
                    fill="url(#colorUsers)" 
                  />
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0a2540" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0a2540" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <FinancialProjectionTable />
        
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
        
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Business Model Overview</CardTitle>
            <CardDescription>Credit-based SaaS platform for AI model access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Core Revenue Model</h3>
                <p className="text-gray-600">
                  The platform operates on a credit-based system where users purchase credits that can be spent on various AI models. Revenue is generated through a markup on the base cost of AI model usage. This allows freelancers and agencies to access premium AI models without committing to multiple subscription plans.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Target Market: Phase 1</h3>
                <p className="text-gray-600">
                  The initial target market consists of freelancers and small marketing agencies who need access to multiple AI tools but find individual subscriptions cost-prohibitive or inefficient. The platform allows them to pay only for what they use across various AI models.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Future Expansion: Phase 2</h3>
                <p className="text-gray-600">
                  After establishing a strong base of freelancer and agency users, the platform will expand to offer enterprise-level solutions with subscription options, volume discounts, and customized AI model access for larger organizations with more predictable usage patterns.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Competitive Advantage</h3>
                <p className="text-gray-600">
                  The platform's unique value proposition is the flexibility of a credit-based system across multiple AI providers, eliminating the need for users to manage separate subscriptions while still providing access to best-in-class AI models for specific use cases.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FinancialPlan;
