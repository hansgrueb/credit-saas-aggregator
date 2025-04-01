
interface FinancialAssumptions {
  initialUsers: number;
  monthlyGrowthRate: number;
  conversionRate: number;
  avgInitialCreditPurchase: number;
  avgMonthlyCreditPurchase: number;
  markupOnAICosts: number;
  serviceFee: number;
  aiProviderCostPercentage: number;
  infrastructureCosts: number;
  teamCosts: number;
  marketingCosts: number;
}

interface FinancialData {
  month: string;
  users: number;
  revenue: number;
  costs: number;
  profit: number;
}

interface FinancialProjections {
  revenueData: Array<{ month: string; revenue: number }>;
  usersData: Array<{ month: string; users: number }>;
  monthlyData: FinancialData[];
  quarterlyData: FinancialData[];
  yearlyData: FinancialData[];
}

export const calculateFinancialProjections = (
  assumptions: FinancialAssumptions
): FinancialProjections => {
  const {
    initialUsers,
    monthlyGrowthRate,
    conversionRate,
    avgInitialCreditPurchase,
    avgMonthlyCreditPurchase,
    markupOnAICosts,
    serviceFee,
    aiProviderCostPercentage,
    infrastructureCosts,
    teamCosts,
    marketingCosts,
  } = assumptions;

  const MONTHS = 12;
  const YEARS = 3;
  
  const monthlyData: FinancialData[] = [];
  const revenueChartData: Array<{ month: string; revenue: number }> = [];
  const usersChartData: Array<{ month: string; users: number }> = [];
  
  // Fixed monthly costs
  const fixedMonthlyCosts = infrastructureCosts + teamCosts + marketingCosts;
  
  let currentUsers = initialUsers;
  let totalUsers = initialUsers;
  let accumulatedRevenue = 0;
  let accumulatedCosts = 0;
  
  for (let year = 1; year <= YEARS; year++) {
    for (let month = 1; month <= MONTHS; month++) {
      const monthLabel = year === 1 ? `Month ${month}` : `Y${year}M${month}`;
      const quarterLabel = `Y${year}Q${Math.ceil(month / 3)}`;
      const yearLabel = `Year ${year}`;
      
      // Calculate new users this month
      const growthFactor = 1 + (monthlyGrowthRate / 100);
      const newUsers = Math.floor(month === 1 && year === 1 ? initialUsers : currentUsers * (growthFactor - 1));
      currentUsers += newUsers;
      
      // Calculate paid users (based on conversion rate)
      const paidUsers = Math.floor(currentUsers * (conversionRate / 100));
      
      // Calculate revenue
      const initialRevenue = newUsers * (avgInitialCreditPurchase);
      const recurringRevenue = paidUsers * avgMonthlyCreditPurchase;
      const totalRevenue = initialRevenue + recurringRevenue;
      
      // Apply markup and service fee
      const adjustedRevenue = totalRevenue * (1 + markupOnAICosts / 100) * (1 + serviceFee / 100);
      
      // Calculate variable costs (AI provider costs)
      const aiProviderCosts = totalRevenue * (aiProviderCostPercentage / 100);
      
      // Calculate total costs
      const totalCosts = aiProviderCosts + fixedMonthlyCosts;
      
      // Calculate profit
      const profit = adjustedRevenue - totalCosts;
      
      // Round values for display
      const roundedRevenue = Math.round(adjustedRevenue);
      const roundedCosts = Math.round(totalCosts);
      const roundedProfit = Math.round(profit);
      
      accumulatedRevenue += roundedRevenue;
      accumulatedCosts += roundedCosts;
      
      // Add to datasets
      monthlyData.push({
        month: monthLabel,
        users: currentUsers,
        revenue: roundedRevenue,
        costs: roundedCosts,
        profit: roundedProfit,
      });
      
      // Add to chart data (first year only for charts)
      if (year === 1) {
        revenueChartData.push({
          month: `Month ${month}`,
          revenue: roundedRevenue,
        });
        
        usersChartData.push({
          month: `Month ${month}`,
          users: currentUsers,
        });
      }
    }
  }
  
  // Create quarterly data (aggregate every 3 months)
  const quarterlyData: FinancialData[] = [];
  for (let year = 1; year <= YEARS; year++) {
    for (let quarter = 1; quarter <= 4; quarter++) {
      const startIdx = (year - 1) * 12 + (quarter - 1) * 3;
      const endIdx = startIdx + 2;
      
      if (startIdx >= monthlyData.length) continue;
      
      let quarterUsers = 0;
      let quarterRevenue = 0;
      let quarterCosts = 0;
      let quarterProfit = 0;
      
      for (let i = startIdx; i <= endIdx && i < monthlyData.length; i++) {
        quarterUsers = Math.max(quarterUsers, monthlyData[i].users);
        quarterRevenue += monthlyData[i].revenue;
        quarterCosts += monthlyData[i].costs;
        quarterProfit += monthlyData[i].profit;
      }
      
      quarterlyData.push({
        month: `Year ${year} Q${quarter}`,
        users: quarterUsers,
        revenue: quarterRevenue,
        costs: quarterCosts,
        profit: quarterProfit,
      });
    }
  }
  
  // Create yearly data (aggregate every 12 months)
  const yearlyData: FinancialData[] = [];
  for (let year = 1; year <= YEARS; year++) {
    const startIdx = (year - 1) * 12;
    const endIdx = startIdx + 11;
    
    let yearUsers = 0;
    let yearRevenue = 0;
    let yearCosts = 0;
    let yearProfit = 0;
    
    for (let i = startIdx; i <= endIdx && i < monthlyData.length; i++) {
      yearUsers = Math.max(yearUsers, monthlyData[i].users);
      yearRevenue += monthlyData[i].revenue;
      yearCosts += monthlyData[i].costs;
      yearProfit += monthlyData[i].profit;
    }
    
    yearlyData.push({
      month: `Year ${year}`,
      users: yearUsers,
      revenue: yearRevenue,
      costs: yearCosts,
      profit: yearProfit,
    });
  }
  
  return {
    revenueData: revenueChartData,
    usersData: usersChartData,
    monthlyData: monthlyData.slice(0, 12), // Show only first year in monthly view
    quarterlyData,
    yearlyData,
  };
};
