
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, TrendingUp } from "lucide-react";

interface CreditBalanceProps {
  currentBalance: number;
  spentThisMonth: number;
}

const CreditBalance = ({ currentBalance, spentThisMonth }: CreditBalanceProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-navy to-light-blue text-white">
        <CardTitle className="text-xl flex justify-between items-center">
          <span>Your Credit Balance</span>
          <TrendingUp className="w-5 h-5" />
        </CardTitle>
        <CardDescription className="text-white/80">Manage your AI usage credits</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-6">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm text-gray-500">Available Credits</span>
            <span className="text-3xl font-bold">{currentBalance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-gray-500">Spent This Month</span>
            <span className="text-lg text-gray-600">{spentThisMonth.toLocaleString()}</span>
          </div>
        </div>
        <Button className="w-full bg-light-blue hover:bg-navy transition-colors">
          <CreditCard className="mr-2 h-4 w-4" /> Add More Credits
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreditBalance;
