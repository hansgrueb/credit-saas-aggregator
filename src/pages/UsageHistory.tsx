import { useState } from "react";
import { Activity, RecentActivityTable } from "@/components/RecentActivityTable";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const usageHistoryData: Activity[] = [
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
    category: 'Audio Processing'
  },
  {
    id: '5',
    date: '2023-06-12',
    modelName: 'DALL-E 3',
    modelProvider: 'OpenAI',
    creditsUsed: 150,
    category: 'Image Generation'
  },
  {
    id: '6',
    date: '2023-06-10',
    modelName: 'GPT-3.5 Turbo',
    modelProvider: 'OpenAI',
    creditsUsed: 40,
    category: 'Text Generation'
  },
  {
    id: '7',
    date: '2023-06-08',
    modelName: 'Midjourney v5',
    modelProvider: 'Midjourney',
    creditsUsed: 180,
    category: 'Image Generation'
  },
  {
    id: '8',
    date: '2023-06-05',
    modelName: 'GPT-4',
    modelProvider: 'OpenAI',
    creditsUsed: 95,
    category: 'Text Generation'
  },
  {
    id: '9',
    date: '2023-06-03',
    modelName: 'PaLM 2',
    modelProvider: 'Google',
    creditsUsed: 70,
    category: 'Text Generation'
  },
  {
    id: '10',
    date: '2023-06-01',
    modelName: 'Whisper',
    modelProvider: 'OpenAI',
    creditsUsed: 55,
    category: 'Audio Processing'
  },
];

const UsageHistory = () => {
  const [filteredData, setFilteredData] = useState<Activity[]>(usageHistoryData);
  const [dateFilter, setDateFilter] = useState("");
  const [providerFilter, setProviderFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  
  const applyFilters = () => {
    let result = [...usageHistoryData];
    
    if (dateFilter) {
      result = result.filter(item => item.date.includes(dateFilter));
    }
    
    if (providerFilter) {
      result = result.filter(item => item.modelProvider === providerFilter);
    }
    
    if (categoryFilter) {
      result = result.filter(item => item.category === categoryFilter);
    }
    
    setFilteredData(result);
  };
  
  const resetFilters = () => {
    setDateFilter("");
    setProviderFilter("");
    setCategoryFilter("");
    setFilteredData(usageHistoryData);
  };
  
  const handleDownload = () => {
    // In a real app, this would generate a CSV download
    alert("CSV download functionality would be implemented here");
  };
  
  const providers = [...new Set(usageHistoryData.map(item => item.modelProvider))];
  const categories = [...new Set(usageHistoryData.map(item => item.category))];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Usage History</h1>
            <p className="text-gray-600">Detailed record of your AI model usage</p>
          </div>
          <Button variant="outline" onClick={handleDownload} className="flex items-center">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex items-center mb-4">
            <Filter className="mr-2 h-4 w-4 text-gray-500" />
            <h2 className="text-lg font-medium">Filter Usage Data</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
              <Select value={providerFilter} onValueChange={setProviderFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Providers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Providers</SelectItem>
                  {providers.map(provider => (
                    <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end gap-2">
              <Button className="bg-light-blue hover:bg-navy transition-colors" onClick={applyFilters}>
                Apply Filters
              </Button>
              <Button variant="outline" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <RecentActivityTable activities={filteredData} />
        
        {/* Summary */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">Usage Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500">Total Credits Used</p>
              <p className="text-2xl font-bold">
                {filteredData.reduce((sum, item) => sum + item.creditsUsed, 0).toLocaleString()}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Most Used Model</p>
              <p className="text-xl font-medium">
                {(() => {
                  const modelCounts = filteredData.reduce((acc, item) => {
                    acc[item.modelName] = (acc[item.modelName] || 0) + item.creditsUsed;
                    return acc;
                  }, {} as Record<string, number>);
                  
                  const mostUsed = Object.entries(modelCounts).sort((a, b) => b[1] - a[1])[0];
                  return mostUsed ? `${mostUsed[0]} (${mostUsed[1]} credits)` : 'None';
                })()}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Records Found</p>
              <p className="text-2xl font-bold">{filteredData.length}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UsageHistory;
