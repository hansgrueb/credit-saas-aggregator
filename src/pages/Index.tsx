
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, CreditCard, Layers, Shield } from "lucide-react";
import { NavLink } from "react-router-dom";
import FinancialProjectionTable from "@/components/FinancialProjectionTable";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-navy to-light-blue py-24 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Professional AI Solutions with <span className="underline decoration-white/50">Pay-As-You-Go</span> Pricing
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
            Access premium AI models without monthly subscriptions. Load credits and use them when you need, on the models that work best for your specific tasks.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-navy hover:bg-white/90">
              <NavLink to="/models">
                Explore AI Models <ArrowRight className="ml-2 h-5 w-5" />
              </NavLink>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <NavLink to="/financial-plan">
                View Financial Plan <BarChart3 className="ml-2 h-5 w-5" />
              </NavLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">A Better Way to Use AI</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-12 w-12 bg-light-blue/10 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-light-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pay As You Go</h3>
              <p className="text-gray-600">
                Only pay for what you use with our credit-based system. No recurring subscriptions or hidden fees.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-12 w-12 bg-light-blue/10 rounded-full flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-light-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple AI Models</h3>
              <p className="text-gray-600">
                Access a wide range of specialized AI models from different providers, all in one platform.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-12 w-12 bg-light-blue/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-light-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">
                Clear cost structure with detailed usage tracking. Know exactly how your credits are being spent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Plan Preview Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Financial Plan Preview</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our detailed financial projections show the growth path from the initial freelancer target market to larger agency clients.
          </p>
          
          <FinancialProjectionTable />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-navy text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Join now and receive 100 free credits to explore the platform and see how it can benefit your business.
          </p>
          <Button asChild size="lg" className="bg-light-blue hover:bg-white hover:text-navy">
            <NavLink to="/dashboard">
              Try Platform For Free
            </NavLink>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
