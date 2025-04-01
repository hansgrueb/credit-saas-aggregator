
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const BusinessModelOverview = () => {
  return (
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
  );
};

export default BusinessModelOverview;
