
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreditBalance from "@/components/CreditBalance";
import UsageChart from "@/components/UsageChart";
import RecentActivityTable from "@/components/RecentActivityTable";
import Header from "@/components/Header";
import { Activity } from "@/components/RecentActivityTable";

const Dashboard = () => {
  const [dailyUsage, setDailyUsage] = useState([]);
  const [weeklyUsage, setWeeklyUsage] = useState([]);
  const [monthlyUsage, setMonthlyUsage] = useState([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  
  useEffect(() => {
    // In a real app, this would be fetched from an API
    setDailyUsage([
      { name: 'Mon', credits: 120 },
      { name: 'Tue', credits: 180 },
      { name: 'Wed', credits: 150 },
      { name: 'Thu', credits: 210 },
      { name: 'Fri', credits: 90 },
      { name: 'Sat', credits: 40 },
      { name: 'Sun', credits: 70 },
    ]);
    
    setWeeklyUsage([
      { name: 'Week 1', credits: 850 },
      { name: 'Week 2', credits: 1200 },
      { name: 'Week 3', credits: 950 },
      { name: 'Week 4', credits: 1100 },
    ]);
    
    setMonthlyUsage([
      { name: 'Jan', credits: 3200 },
      { name: 'Feb', credits: 4100 },
      { name: 'Mar', credits: 3800 },
      { name: 'Apr', credits: 4600 },
      { name: 'May', credits: 5200 },
      { name: 'Jun', credits: 4900 },
    ]);
    
    setRecentActivities([
      {
        id: '1',
        date: '2023-06-15',
        modelName: 'GPT-4',
        modelProvider: 'OpenAI',
        creditsUsed: 120,
        category: 'Text Generation'
      },
      {
        id: '2',
        date: '2023-06-14',
        modelName: 'Claude 2',
        modelProvider: 'Anthropic',
        creditsUsed: 85,
        category: 'Text Generation'
      },
      {
        id: '3',
        date: '2023-06-14',
        modelName: 'Stable Diffusion XL',
        modelProvider: 'Stability AI',
        creditsUsed: 210,
        category: 'Image Generation'
      },
      {
        id: '4',
        date: '2023-06-13',
        modelName: 'Whisper',
        modelProvider: 'OpenAI',
        creditsUsed: 60,
        category: 'Audio Transcription'
      },
      {
        id: '5',
        date: '2023-06-12',
        modelName: 'DALL-E 3',
        modelProvider: 'OpenAI',
        creditsUsed: 150,
        category: 'Image Generation'
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Monitor your credit usage and activity</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Credit Balance Card */}
          <CreditBalance currentBalance={3470} spentThisMonth={1630} />
          
          {/* Quick Stats Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Most Used Models</CardTitle>
              <CardDescription>Your top AI models this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">GPT-4</p>
                    <p className="text-sm text-gray-500">OpenAI</p>
                  </div>
                  <Badge variant="outline" className="bg-light-blue/10 text-light-blue">
                    620 credits
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">DALL-E 3</p>
                    <p className="text-sm text-gray-500">OpenAI</p>
                  </div>
                  <Badge variant="outline" className="bg-light-blue/10 text-light-blue">
                    490 credits
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Claude 2</p>
                    <p className="text-sm text-gray-500">Anthropic</p>
                  </div>
                  <Badge variant="outline" className="bg-light-blue/10 text-light-blue">
                    320 credits
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Usage By Category</CardTitle>
              <CardDescription>Credit distribution by AI type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-light-blue mr-2"></div>
                    <p>Text Generation</p>
                  </div>
                  <p className="font-medium">45%</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-navy mr-2"></div>
                    <p>Image Generation</p>
                  </div>
                  <p className="font-medium">32%</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                    <p>Audio Processing</p>
                  </div>
                  <p className="font-medium">15%</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                    <p>Other</p>
                  </div>
                  <p className="font-medium">8%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Usage Charts */}
        <div className="mb-8">
          <Tabs defaultValue="daily">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Credit Usage Over Time</h2>
              <TabsList>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="daily">
              <UsageChart 
                data={dailyUsage} 
                title="Daily Usage" 
                description="Credit usage over the past 7 days" 
              />
            </TabsContent>
            
            <TabsContent value="weekly">
              <UsageChart 
                data={weeklyUsage} 
                title="Weekly Usage" 
                description="Credit usage over the past 4 weeks" 
              />
            </TabsContent>
            
            <TabsContent value="monthly">
              <UsageChart 
                data={monthlyUsage} 
                title="Monthly Usage" 
                description="Credit usage over the past 6 months" 
              />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Recent Activity */}
        <RecentActivityTable activities={recentActivities} />
      </main>
    </div>
  );
};

export default Dashboard;
