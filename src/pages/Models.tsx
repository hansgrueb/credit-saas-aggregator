
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AIModel, AIModelCard } from "@/components/AIModelCard";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const Models = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const allModels: AIModel[] = [
    {
      id: "1",
      name: "GPT-4",
      provider: "OpenAI",
      description: "Advanced language model for complex text generation and understanding with high accuracy.",
      creditCost: 80,
      category: "Text Generation",
      bestFor: ["Content Creation", "Complex Analysis", "Code Generation"]
    },
    {
      id: "2",
      name: "GPT-3.5 Turbo",
      provider: "OpenAI",
      description: "Fast and efficient language model for general purpose text generation tasks.",
      creditCost: 20,
      category: "Text Generation",
      bestFor: ["Chat Applications", "Quick Responses", "Simple Content"]
    },
    {
      id: "3",
      name: "DALL-E 3",
      provider: "OpenAI",
      description: "High-quality image generation model capable of creating detailed visuals from text descriptions.",
      creditCost: 120,
      category: "Image Generation",
      bestFor: ["Marketing Visuals", "Concept Art", "Product Design"]
    },
    {
      id: "4",
      name: "Claude 2",
      provider: "Anthropic",
      description: "Advanced AI assistant focused on helpful, harmless, and honest interactions.",
      creditCost: 60,
      category: "Text Generation",
      bestFor: ["Long-Form Content", "Fact-Checking", "Nuanced Responses"]
    },
    {
      id: "5",
      name: "Stable Diffusion XL",
      provider: "Stability AI",
      description: "Open-source image generation model with excellent visual quality and creative flexibility.",
      creditCost: 100,
      category: "Image Generation",
      bestFor: ["Artistic Images", "Style Transfer", "Visual Variations"]
    },
    {
      id: "6",
      name: "Whisper",
      provider: "OpenAI",
      description: "Speech recognition system for transcription and translation with high accuracy across languages.",
      creditCost: 40,
      category: "Audio Processing",
      bestFor: ["Transcription", "Translation", "Meeting Notes"]
    },
    {
      id: "7",
      name: "Midjourney v5",
      provider: "Midjourney",
      description: "Image generation model known for highly aesthetic and artistic outputs.",
      creditCost: 110,
      category: "Image Generation",
      bestFor: ["Artistic Renders", "Conceptual Art", "Realistic Imagery"]
    },
    {
      id: "8",
      name: "PaLM 2",
      provider: "Google",
      description: "Large language model with strong reasoning capabilities and multilingual support.",
      creditCost: 70,
      category: "Text Generation",
      bestFor: ["Multilingual Content", "Research", "Data Analysis"]
    },
    {
      id: "9",
      name: "Cohere",
      provider: "Cohere",
      description: "Enterprise-focused language model designed for secure business applications.",
      creditCost: 50,
      category: "Text Generation",
      bestFor: ["Enterprise Use", "Customer Support", "Document Processing"]
    },
  ];
  
  const filteredModels = allModels.filter(model => 
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.bestFor.some(use => use.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const textModels = filteredModels.filter(model => model.category === "Text Generation");
  const imageModels = filteredModels.filter(model => model.category === "Image Generation");
  const audioModels = filteredModels.filter(model => model.category === "Audio Processing");
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">AI Models</h1>
          <p className="text-gray-600">Browse and use AI models from various providers</p>
        </div>
        
        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Models</TabsTrigger>
            <TabsTrigger value="text">Text Generation</TabsTrigger>
            <TabsTrigger value="image">Image Generation</TabsTrigger>
            <TabsTrigger value="audio">Audio Processing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModels.map(model => (
                <AIModelCard key={model.id} model={model} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="text">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {textModels.map(model => (
                <AIModelCard key={model.id} model={model} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="image">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {imageModels.map(model => (
                <AIModelCard key={model.id} model={model} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="audio">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {audioModels.map(model => (
                <AIModelCard key={model.id} model={model} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Models;
