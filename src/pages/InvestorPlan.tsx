
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, DollarSign, Users, Calendar } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { getExampleCEOFinancialModel, generateCEOFinancialModel, getDefaultBusinessMetrics } from "@/utils/ceoFinancialModel";
import { useToast } from "@/components/ui/use-toast";

const InvestorPlan = () => {
  const { toast } = useToast();
  
  // Use the CEO financial model to get comprehensive financial data
  const { baseModel, executiveSummary, scenarios } = getExampleCEOFinancialModel();
  const { keyMetrics, recommendations, risks, milestones } = executiveSummary;
  
  // Format financial data for charts
  const revenueChartData = baseModel.revenue.map(item => ({
    name: item.label,
    revenue: item.value
  }));
  
  const userGrowthData = baseModel.userGrowth.map(item => ({
    name: item.label,
    users: item.users
  }));
  
  const scenarioRevenueData = Object.entries(scenarios.comparison["Final Year Revenue"]).map(([key, value]) => ({
    name: key,
    revenue: typeof value === 'string' ? 
      parseFloat(value.replace(/[^0-9.-]+/g, "")) : 
      0
  }));
  
  const financialHighlights = [
    { 
      title: "Total Investment", 
      value: keyMetrics["Total Investment Required"], 
      description: "Seed round funding target",
      icon: <DollarSign className="h-4 w-4 text-blue-500" />
    },
    { 
      title: "Break-even", 
      value: keyMetrics["Break Even Month"], 
      description: "Expected profitability timeline",
      icon: <Calendar className="h-4 w-4 text-green-500" />
    },
    { 
      title: "ARR Year 3", 
      value: keyMetrics["Annual Recurring Revenue (Final)"], 
      description: "Projected annual recurring revenue",
      icon: <TrendingUp className="h-4 w-4 text-purple-500" />
    },
    { 
      title: "Total Users", 
      value: keyMetrics["Total Users (End of Projection)"].toLocaleString(), 
      description: "Projected customer base",
      icon: <Users className="h-4 w-4 text-amber-500" />
    }
  ];

  const handleExportPdf = () => {
    toast({
      title: "Export Started",
      description: "Your investor pitch deck is being prepared for download.",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">AI Credits SaaS Platform</h1>
              <p className="text-indigo-100">Investment Opportunity Overview</p>
            </div>
            <Button variant="secondary" onClick={handleExportPdf}>
              <Download className="mr-2 h-4 w-4" /> Export Deck
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {financialHighlights.map((item, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-500">{item.title}</h3>
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{item.value}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Revenue Projections</CardTitle>
              <CardDescription>5-year financial forecast</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={revenueChartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#4f46e5" 
                    fill="url(#colorRevenue)" 
                  />
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Customer Growth</CardTitle>
              <CardDescription>Projected user acquisition</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={userGrowthData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value.toLocaleString(), 'Users']} />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#0ea5e9" 
                    fill="url(#colorUsers)" 
                  />
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-md mb-12">
          <CardHeader>
            <CardTitle>Scenario Analysis</CardTitle>
            <CardDescription>Revenue projections across different growth scenarios</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={scenarioRevenueData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Investment Opportunity</CardTitle>
              <CardDescription>Key metrics for investors</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(keyMetrics).slice(0, 7).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell className="font-medium">{key}</TableCell>
                      <TableCell className="text-right">{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Key Milestones</CardTitle>
              <CardDescription>Growth and development timeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-bold">
                        {milestone.month}
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="h-full w-0.5 bg-blue-100"></div>
                      )}
                    </div>
                    <div className="pt-1 pb-8">
                      <p className="font-medium">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Strategic Recommendations</CardTitle>
              <CardDescription>For investors and leadership team</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 pl-6 list-disc">
                {recommendations.map((recommendation, index) => (
                  <li key={index} className="text-gray-700">{recommendation}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>Potential challenges and mitigations</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 pl-6 list-disc">
                {risks.map((risk, index) => (
                  <li key={index} className="text-gray-700">{risk}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvestorPlan;
