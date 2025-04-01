
/**
 * CEO Financial Model for SaaS AI Credit Aggregator
 * 
 * This standalone model provides comprehensive financial projections
 * for internal executive planning and decision-making.
 */

// Types for financial inputs and outputs
export interface BusinessMetrics {
  // Market sizing
  totalAddressableMarket: number; // Total addressable market (in users)
  marketShareGoal: number; // Percentage of market to capture
  timeToReachGoalYears: number; // Years to reach market share goal
  
  // User acquisition
  initialUsers: number; // Starting user count
  monthlyGrowthRate: number; // Percentage growth month-over-month
  userAcquisitionCost: number; // Cost to acquire one user (CAC)
  churnRate: number; // Monthly churn rate percentage
  
  // Revenue model
  avgInitialCreditPurchase: number; // First purchase (in dollars)
  avgMonthlyCreditPurchase: number; // Recurring purchase (in dollars)
  conversionRate: number; // Free to paid conversion percentage
  markupOnAICosts: number; // Percentage markup on AI costs
  serviceFee: number; // Additional service fee percentage
  
  // Costs
  aiProviderCostPercentage: number; // Percentage of credit value
  infrastructureCostsBase: number; // Base infrastructure costs
  infrastructureCostsPerUser: number; // Additional cost per user
  teamCostsBase: number; // Base team costs
  teamGrowthTriggerUsers: number; // User count that triggers team growth
  teamCostIncreasePercentage: number; // Team cost increase when triggered
  marketingBudgetBase: number; // Base marketing budget
  marketingBudgetPercentageOfRevenue: number; // Additional as percentage of revenue
}

export interface FinancialSnapshot {
  month: number;
  year: number;
  label: string;
  users: {
    total: number;
    paying: number;
    new: number;
    lost: number;
  };
  revenue: {
    initialPurchases: number;
    recurringPurchases: number;
    total: number;
    mrr: number; // Monthly recurring revenue
  };
  costs: {
    aiProvider: number;
    infrastructure: number;
    team: number;
    marketing: number;
    userAcquisition: number;
    total: number;
  };
  metrics: {
    grossMargin: number; // Percentage
    netMargin: number; // Percentage
    cac: number; // Customer acquisition cost
    ltv: number; // Lifetime value
    ltvCacRatio: number;
    paybackPeriod: number; // In months
    runwayMonths: number; // Assuming current burn rate
  };
  cash: {
    burn: number;
    balance: number;
  };
}

export interface FinancialProjection {
  // Organized projections
  monthlyData: FinancialSnapshot[];
  quarterlyData: FinancialSnapshot[];
  yearlyData: FinancialSnapshot[];
  
  // Key metrics over time
  userGrowth: { label: string; users: number }[];
  revenue: { label: string; value: number }[];
  costs: { label: string; value: number }[];
  margins: { label: string; gross: number; net: number }[];
  runway: { label: string; months: number }[];
  ltvCac: { label: string; value: number }[];
  
  // Summary and highlights
  breakEvenMonth: number | null;
  breakEvenDate: string | null;
  peakBurnMonth: { month: number; amount: number };
  totalInvestmentNeeded: number;
}

/**
 * Generates comprehensive financial projections based on business metrics
 */
export function generateCEOFinancialModel(
  metrics: BusinessMetrics,
  initialCapital: number = 500000,
  projectionYears: number = 5
): FinancialProjection {
  const totalMonths = projectionYears * 12;
  const monthlyData: FinancialSnapshot[] = [];
  
  let currentUsers = metrics.initialUsers;
  let currentCash = initialCapital;
  let breakEvenMonth: number | null = null;
  let peakBurn = { month: 0, amount: 0 };
  
  // Initialize charting datasets
  const userGrowthData: { label: string; users: number }[] = [];
  const revenueData: { label: string; value: number }[] = [];
  const costsData: { label: string; value: number }[] = [];
  const marginsData: { label: string; gross: number; net: number }[] = [];
  const runwayData: { label: string; months: number }[] = [];
  const ltvCacData: { label: string; value: number }[] = [];
  
  // Calculate the average lifetime of a user (in months) based on churn rate
  const averageUserLifetime = metrics.churnRate > 0 
    ? 1 / (metrics.churnRate / 100) 
    : 60; // Cap at 5 years if churn is 0
  
  // Calculate lifetime value based on average purchase and lifetime
  const calculateLTV = (userCount: number, monthlyPurchase: number): number => {
    return userCount > 0 
      ? (monthlyPurchase * averageUserLifetime * (1 + metrics.markupOnAICosts / 100) * (1 + metrics.serviceFee / 100))
      : 0;
  };
  
  // Calculate runway based on current cash and burn rate
  const calculateRunway = (cash: number, monthlyBurn: number): number => {
    return monthlyBurn > 0 ? Math.max(0, Math.floor(cash / monthlyBurn)) : 999;
  };
  
  // Calculate team costs with step function increases
  const calculateTeamCosts = (userCount: number): number => {
    if (userCount <= 0) return metrics.teamCostsBase;
    
    const teamSizeMultiplier = 1 + Math.floor(userCount / metrics.teamGrowthTriggerUsers) * 
      (metrics.teamCostIncreasePercentage / 100);
    
    return metrics.teamCostsBase * teamSizeMultiplier;
  };
  
  // Generate month-by-month projections
  for (let month = 0; month < totalMonths; month++) {
    const year = Math.floor(month / 12) + 1;
    const monthOfYear = (month % 12) + 1;
    const label = `Y${year}M${monthOfYear}`;
    
    // Calculate user growth
    const growthRate = 1 + (metrics.monthlyGrowthRate / 100);
    const newUsers = month === 0 
      ? currentUsers 
      : Math.floor(currentUsers * (growthRate - 1));
    
    const churnedUsers = Math.floor(currentUsers * (metrics.churnRate / 100));
    currentUsers = currentUsers + newUsers - churnedUsers;
    
    const payingUsers = Math.floor(currentUsers * (metrics.conversionRate / 100));
    
    // Calculate revenue
    const initialPurchaseRevenue = newUsers * metrics.avgInitialCreditPurchase * 
      (metrics.conversionRate / 100);
    
    const recurringPurchaseRevenue = payingUsers * metrics.avgMonthlyCreditPurchase;
    
    const totalBaseRevenue = initialPurchaseRevenue + recurringPurchaseRevenue;
    
    // Apply markup and service fee
    const adjustedRevenue = totalBaseRevenue * 
      (1 + metrics.markupOnAICosts / 100) * 
      (1 + metrics.serviceFee / 100);
    
    // Calculate costs
    const aiProviderCosts = totalBaseRevenue * (metrics.aiProviderCostPercentage / 100);
    
    const infrastructureCosts = metrics.infrastructureCostsBase + 
      (currentUsers * metrics.infrastructureCostsPerUser);
    
    const teamCosts = calculateTeamCosts(currentUsers);
    
    const marketingCosts = metrics.marketingBudgetBase + 
      (adjustedRevenue * (metrics.marketingBudgetPercentageOfRevenue / 100));
    
    const userAcquisitionCosts = newUsers * metrics.userAcquisitionCost;
    
    const totalCosts = aiProviderCosts + infrastructureCosts + 
      teamCosts + marketingCosts + userAcquisitionCosts;
    
    // Calculate profit/loss
    const monthlyProfit = adjustedRevenue - totalCosts;
    const grossMargin = adjustedRevenue > 0 
      ? ((adjustedRevenue - aiProviderCosts) / adjustedRevenue) * 100 
      : 0;
    
    const netMargin = adjustedRevenue > 0 
      ? (monthlyProfit / adjustedRevenue) * 100 
      : -100;
    
    // Calculate LTV and CAC
    const ltv = calculateLTV(payingUsers, metrics.avgMonthlyCreditPurchase);
    const cac = metrics.userAcquisitionCost;
    const ltvCacRatio = cac > 0 ? ltv / cac : 0;
    
    // Calculate payback period
    const monthlyNetPerUser = payingUsers > 0 
      ? (adjustedRevenue - aiProviderCosts) / payingUsers 
      : 0;
    
    const paybackPeriod = monthlyNetPerUser > 0 
      ? cac / monthlyNetPerUser 
      : 999;
    
    // Update cash balance
    currentCash += monthlyProfit;
    
    // Calculate runway
    const burnRate = monthlyProfit < 0 ? Math.abs(monthlyProfit) : 0;
    const runway = calculateRunway(currentCash, burnRate);
    
    // Track break-even point
    if (breakEvenMonth === null && monthlyProfit > 0) {
      breakEvenMonth = month;
    }
    
    // Track peak burn
    if (monthlyProfit < 0 && Math.abs(monthlyProfit) > peakBurn.amount) {
      peakBurn = { month, amount: Math.abs(monthlyProfit) };
    }
    
    // Create financial snapshot for this month
    const snapshot: FinancialSnapshot = {
      month: monthOfYear,
      year,
      label,
      users: {
        total: currentUsers,
        paying: payingUsers,
        new: newUsers,
        lost: churnedUsers
      },
      revenue: {
        initialPurchases: Math.round(initialPurchaseRevenue),
        recurringPurchases: Math.round(recurringPurchaseRevenue),
        total: Math.round(adjustedRevenue),
        mrr: Math.round(recurringPurchaseRevenue * (1 + metrics.markupOnAICosts / 100) * (1 + metrics.serviceFee / 100))
      },
      costs: {
        aiProvider: Math.round(aiProviderCosts),
        infrastructure: Math.round(infrastructureCosts),
        team: Math.round(teamCosts),
        marketing: Math.round(marketingCosts),
        userAcquisition: Math.round(userAcquisitionCosts),
        total: Math.round(totalCosts)
      },
      metrics: {
        grossMargin: Math.round(grossMargin),
        netMargin: Math.round(netMargin),
        cac,
        ltv: Math.round(ltv),
        ltvCacRatio: parseFloat(ltvCacRatio.toFixed(2)),
        paybackPeriod: parseFloat(paybackPeriod.toFixed(1)),
        runwayMonths: runway
      },
      cash: {
        burn: burnRate > 0 ? Math.round(burnRate) : 0,
        balance: Math.round(currentCash)
      }
    };
    
    // Add to dataset
    monthlyData.push(snapshot);
    
    // Add to chart datasets (every 3 months for clarity)
    if (month % 3 === 0) {
      userGrowthData.push({ label, users: currentUsers });
      revenueData.push({ label, value: Math.round(adjustedRevenue) });
      costsData.push({ label, value: Math.round(totalCosts) });
      marginsData.push({ 
        label, 
        gross: parseFloat(grossMargin.toFixed(1)), 
        net: parseFloat(netMargin.toFixed(1)) 
      });
      runwayData.push({ label, months: runway });
      ltvCacData.push({ label, value: parseFloat(ltvCacRatio.toFixed(2)) });
    }
  }
  
  // Generate quarterly data
  const quarterlyData: FinancialSnapshot[] = [];
  for (let year = 1; year <= projectionYears; year++) {
    for (let quarter = 1; quarter <= 4; quarter++) {
      const startMonth = (year - 1) * 12 + (quarter - 1) * 3;
      if (startMonth >= monthlyData.length) continue;
      
      const quarterSnapshots = monthlyData.slice(
        startMonth,
        Math.min(startMonth + 3, monthlyData.length)
      );
      
      if (quarterSnapshots.length === 0) continue;
      
      // Aggregate quarterly data
      const aggregatedSnapshot: FinancialSnapshot = {
        month: 0, // Not applicable for quarters
        year,
        label: `Y${year}Q${quarter}`,
        users: {
          total: quarterSnapshots[quarterSnapshots.length - 1].users.total,
          paying: quarterSnapshots[quarterSnapshots.length - 1].users.paying,
          new: quarterSnapshots.reduce((sum, snap) => sum + snap.users.new, 0),
          lost: quarterSnapshots.reduce((sum, snap) => sum + snap.users.lost, 0)
        },
        revenue: {
          initialPurchases: quarterSnapshots.reduce((sum, snap) => sum + snap.revenue.initialPurchases, 0),
          recurringPurchases: quarterSnapshots.reduce((sum, snap) => sum + snap.revenue.recurringPurchases, 0),
          total: quarterSnapshots.reduce((sum, snap) => sum + snap.revenue.total, 0),
          mrr: quarterSnapshots[quarterSnapshots.length - 1].revenue.mrr
        },
        costs: {
          aiProvider: quarterSnapshots.reduce((sum, snap) => sum + snap.costs.aiProvider, 0),
          infrastructure: quarterSnapshots.reduce((sum, snap) => sum + snap.costs.infrastructure, 0),
          team: quarterSnapshots.reduce((sum, snap) => sum + snap.costs.team, 0),
          marketing: quarterSnapshots.reduce((sum, snap) => sum + snap.costs.marketing, 0),
          userAcquisition: quarterSnapshots.reduce((sum, snap) => sum + snap.costs.userAcquisition, 0),
          total: quarterSnapshots.reduce((sum, snap) => sum + snap.costs.total, 0)
        },
        metrics: {
          grossMargin: quarterSnapshots.reduce((sum, snap) => sum + snap.metrics.grossMargin, 0) / quarterSnapshots.length,
          netMargin: quarterSnapshots.reduce((sum, snap) => sum + snap.metrics.netMargin, 0) / quarterSnapshots.length,
          cac: quarterSnapshots[quarterSnapshots.length - 1].metrics.cac,
          ltv: quarterSnapshots[quarterSnapshots.length - 1].metrics.ltv,
          ltvCacRatio: quarterSnapshots[quarterSnapshots.length - 1].metrics.ltvCacRatio,
          paybackPeriod: quarterSnapshots[quarterSnapshots.length - 1].metrics.paybackPeriod,
          runwayMonths: quarterSnapshots[quarterSnapshots.length - 1].metrics.runwayMonths
        },
        cash: {
          burn: quarterSnapshots.reduce((sum, snap) => sum + snap.cash.burn, 0) / quarterSnapshots.length,
          balance: quarterSnapshots[quarterSnapshots.length - 1].cash.balance
        }
      };
      
      quarterlyData.push(aggregatedSnapshot);
    }
  }
  
  // Generate yearly data
  const yearlyData: FinancialSnapshot[] = [];
  for (let year = 1; year <= projectionYears; year++) {
    const startMonth = (year - 1) * 12;
    if (startMonth >= monthlyData.length) continue;
    
    const yearSnapshots = monthlyData.slice(
      startMonth,
      Math.min(startMonth + 12, monthlyData.length)
    );
    
    if (yearSnapshots.length === 0) continue;
    
    // Aggregate yearly data
    const aggregatedSnapshot: FinancialSnapshot = {
      month: 0, // Not applicable for years
      year,
      label: `Year ${year}`,
      users: {
        total: yearSnapshots[yearSnapshots.length - 1].users.total,
        paying: yearSnapshots[yearSnapshots.length - 1].users.paying,
        new: yearSnapshots.reduce((sum, snap) => sum + snap.users.new, 0),
        lost: yearSnapshots.reduce((sum, snap) => sum + snap.users.lost, 0)
      },
      revenue: {
        initialPurchases: yearSnapshots.reduce((sum, snap) => sum + snap.revenue.initialPurchases, 0),
        recurringPurchases: yearSnapshots.reduce((sum, snap) => sum + snap.revenue.recurringPurchases, 0),
        total: yearSnapshots.reduce((sum, snap) => sum + snap.revenue.total, 0),
        mrr: yearSnapshots[yearSnapshots.length - 1].revenue.mrr
      },
      costs: {
        aiProvider: yearSnapshots.reduce((sum, snap) => sum + snap.costs.aiProvider, 0),
        infrastructure: yearSnapshots.reduce((sum, snap) => sum + snap.costs.infrastructure, 0),
        team: yearSnapshots.reduce((sum, snap) => sum + snap.costs.team, 0),
        marketing: yearSnapshots.reduce((sum, snap) => sum + snap.costs.marketing, 0),
        userAcquisition: yearSnapshots.reduce((sum, snap) => sum + snap.costs.userAcquisition, 0),
        total: yearSnapshots.reduce((sum, snap) => sum + snap.costs.total, 0)
      },
      metrics: {
        grossMargin: yearSnapshots.reduce((sum, snap) => sum + snap.metrics.grossMargin, 0) / yearSnapshots.length,
        netMargin: yearSnapshots.reduce((sum, snap) => sum + snap.metrics.netMargin, 0) / yearSnapshots.length,
        cac: yearSnapshots[yearSnapshots.length - 1].metrics.cac,
        ltv: yearSnapshots[yearSnapshots.length - 1].metrics.ltv,
        ltvCacRatio: yearSnapshots[yearSnapshots.length - 1].metrics.ltvCacRatio,
        paybackPeriod: yearSnapshots[yearSnapshots.length - 1].metrics.paybackPeriod,
        runwayMonths: yearSnapshots[yearSnapshots.length - 1].metrics.runwayMonths
      },
      cash: {
        burn: yearSnapshots.reduce((sum, snap) => sum + snap.cash.burn, 0) / yearSnapshots.length,
        balance: yearSnapshots[yearSnapshots.length - 1].cash.balance
      }
    };
    
    yearlyData.push(aggregatedSnapshot);
  }
  
  // Format break-even date
  const breakEvenDate = breakEvenMonth !== null 
    ? `Year ${Math.floor(breakEvenMonth / 12) + 1}, Month ${(breakEvenMonth % 12) + 1}` 
    : null;
  
  // Calculate total investment needed (maximum negative cash balance)
  let minCashBalance = initialCapital;
  for (const snapshot of monthlyData) {
    minCashBalance = Math.min(minCashBalance, snapshot.cash.balance);
  }
  
  const totalInvestmentNeeded = minCashBalance < 0 
    ? Math.abs(minCashBalance) + initialCapital 
    : initialCapital;
  
  return {
    monthlyData,
    quarterlyData,
    yearlyData,
    userGrowth: userGrowthData,
    revenue: revenueData,
    costs: costsData,
    margins: marginsData,
    runway: runwayData,
    ltvCac: ltvCacData,
    breakEvenMonth,
    breakEvenDate,
    peakBurnMonth: peakBurn,
    totalInvestmentNeeded
  };
}

/**
 * Creates default business model assumptions optimized for a 
 * credit-based SaaS AI aggregator targeting freelancers and agencies
 */
export function getDefaultBusinessMetrics(): BusinessMetrics {
  return {
    // Market sizing
    totalAddressableMarket: 500000, // 500k freelancers and small agencies
    marketShareGoal: 5, // Aim for 5% of the market
    timeToReachGoalYears: 5, // Over 5 years
    
    // User growth
    initialUsers: 50, // Starting with 50 users in month 1
    monthlyGrowthRate: 30, // 30% month-over-month growth
    userAcquisitionCost: 100, // $100 per acquired user
    churnRate: 5, // 5% monthly churn
    
    // Revenue model
    avgInitialCreditPurchase: 50, // $50 average first purchase
    avgMonthlyCreditPurchase: 75, // $75 per month ongoing
    conversionRate: 15, // 15% free to paid conversion
    markupOnAICosts: 30, // 30% markup on AI provider costs
    serviceFee: 5, // 5% service fee
    
    // Costs
    aiProviderCostPercentage: 70, // 70% of credit value goes to AI providers
    infrastructureCostsBase: 1000, // $1,000/month base infra costs
    infrastructureCostsPerUser: 0.25, // $0.25 per user per month
    teamCostsBase: 15000, // $15,000/month initial team costs
    teamGrowthTriggerUsers: 1000, // Add team members every 1,000 users
    teamCostIncreasePercentage: 20, // 20% increase in team costs per threshold
    marketingBudgetBase: 3500, // $3,500/month base marketing
    marketingBudgetPercentageOfRevenue: 10 // 10% of revenue goes to marketing
  };
}

/**
 * CEO-level summary: Returns key business insights and metrics for executive decision-making
 */
export function getExecutiveSummary(projection: FinancialProjection): {
  keyMetrics: Record<string, string | number>;
  recommendations: string[];
  risks: string[];
  milestones: Array<{ month: number; description: string }>;
} {
  const { monthlyData, yearlyData, breakEvenMonth, totalInvestmentNeeded } = projection;
  
  // Final month data
  const finalMonth = monthlyData[monthlyData.length - 1];
  const y1 = yearlyData[0];
  const finalYear = yearlyData[yearlyData.length - 1];
  
  // Calculate key metrics
  const maxUsers = Math.max(...monthlyData.map(m => m.users.total));
  const maxRevenue = Math.max(...monthlyData.map(m => m.revenue.total));
  const finalMRR = finalMonth.revenue.mrr;
  const finalARR = finalMRR * 12;
  
  // Find months with negative margin
  const monthsWithNegativeMargin = monthlyData.filter(m => m.metrics.netMargin < 0).length;
  
  // Find capital efficiency
  const capitalEfficiency = finalARR > 0 ? totalInvestmentNeeded / finalARR : 0;
  
  // Format currency
  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(2)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    }
    return `$${amount}`;
  };
  
  // Calculate Rule of 40
  const ruleOf40 = (finalMonth.metrics.netMargin + (finalMRR > 0 
    ? ((finalMonth.users.total - monthlyData[monthlyData.length - 2].users.total) 
      / monthlyData[monthlyData.length - 2].users.total) * 100 
    : 0));
  
  // Key metrics for executive dashboard
  const keyMetrics = {
    "Total Users (End of Projection)": finalMonth.users.total,
    "Paying Users (End of Projection)": finalMonth.users.paying,
    "First Year Revenue": formatCurrency(y1.revenue.total),
    "Final Year Revenue": formatCurrency(finalYear.revenue.total),
    "Monthly Recurring Revenue (Final)": formatCurrency(finalMRR),
    "Annual Recurring Revenue (Final)": formatCurrency(finalARR),
    "Total Investment Required": formatCurrency(totalInvestmentNeeded),
    "Break Even Month": breakEvenMonth !== null ? `Month ${breakEvenMonth + 1}` : "Beyond projection period",
    "LTV/CAC Ratio (Final)": finalMonth.metrics.ltvCacRatio.toFixed(2),
    "Gross Margin (Final)": `${Math.round(finalMonth.metrics.grossMargin)}%`,
    "Net Margin (Final)": `${Math.round(finalMonth.metrics.netMargin)}%`,
    "Rule of 40 Score (Final)": ruleOf40.toFixed(1),
    "Capital Efficiency": capitalEfficiency.toFixed(2),
  };
  
  // Generate recommendations based on metrics
  const recommendations = [];
  
  if (finalMonth.metrics.ltvCacRatio < 3) {
    recommendations.push("Improve LTV/CAC ratio by reducing acquisition costs or increasing customer lifetime value");
  }
  
  if (finalMonth.metrics.paybackPeriod > 12) {
    recommendations.push("Reduce customer payback period through improved monetization or reduced acquisition costs");
  }
  
  if (finalMonth.metrics.grossMargin < 50) {
    recommendations.push("Increase gross margins by negotiating better terms with AI providers or adjusting pricing model");
  }
  
  if (monthsWithNegativeMargin > 24) {
    recommendations.push("Extend fundraising runway to accommodate longer path to profitability");
  }
  
  if (finalMonth.users.total < 1000) {
    recommendations.push("Accelerate user growth strategies to achieve scale faster");
  }
  
  if (finalMonth.metrics.netMargin < 10) {
    recommendations.push("Focus on operational efficiency to improve net margins");
  }
  
  if (capitalEfficiency > 1.5) {
    recommendations.push("Improve capital efficiency by finding ways to generate more revenue with less investment");
  }
  
  // Always include general strategic recommendations
  recommendations.push("Continually optimize AI model pricing to maximize value for users while maintaining healthy margins");
  recommendations.push("Consider strategic partnerships with AI providers to reduce cost structure");
  recommendations.push("Develop tiered service levels to appeal to different customer segments");
  
  // Generate risk factors
  const risks = [
    "AI provider pricing changes could impact margins significantly",
    "Emerging competitors could increase CAC and reduce growth rate",
    "Changes in AI regulations could require compliance investments",
    "Higher than projected churn would significantly impact unit economics",
    "Slower growth than projected would extend cash runway requirements",
    "Technical scaling challenges may require additional infrastructure investment"
  ];
  
  // Generate key business milestones
  const milestones = [];
  
  // First 100 users
  const milestone100Users = monthlyData.findIndex(m => m.users.total >= 100);
  if (milestone100Users >= 0) {
    milestones.push({
      month: milestone100Users,
      description: "Reach 100 total users"
    });
  }
  
  // First 1000 users
  const milestone1000Users = monthlyData.findIndex(m => m.users.total >= 1000);
  if (milestone1000Users >= 0) {
    milestones.push({
      month: milestone1000Users,
      description: "Reach 1,000 total users"
    });
  }
  
  // First $10K MRR
  const milestone10kMRR = monthlyData.findIndex(m => m.revenue.mrr >= 10000);
  if (milestone10kMRR >= 0) {
    milestones.push({
      month: milestone10kMRR,
      description: "Achieve $10K MRR"
    });
  }
  
  // First $100K MRR
  const milestone100kMRR = monthlyData.findIndex(m => m.revenue.mrr >= 100000);
  if (milestone100kMRR >= 0) {
    milestones.push({
      month: milestone100kMRR,
      description: "Achieve $100K MRR"
    });
  }
  
  // Break even
  if (breakEvenMonth !== null) {
    milestones.push({
      month: breakEvenMonth,
      description: "Reach break-even (positive cash flow)"
    });
  }
  
  // First month with 3+ LTV/CAC ratio
  const milestoneLTV = monthlyData.findIndex(m => m.metrics.ltvCacRatio >= 3);
  if (milestoneLTV >= 0) {
    milestones.push({
      month: milestoneLTV,
      description: "Achieve 3:1 LTV:CAC ratio"
    });
  }
  
  return {
    keyMetrics,
    recommendations,
    risks,
    milestones: milestones.sort((a, b) => a.month - b.month)
  };
}

/**
 * Generate a scenario analysis with varying assumptions
 */
export function generateScenarioAnalysis(
  baseMetrics: BusinessMetrics,
  scenarioVariations: Array<{
    name: string;
    description: string;
    metricChanges: Partial<BusinessMetrics>;
  }>,
  initialCapital: number = 500000,
  projectionYears: number = 3
): Record<string, any> {
  const baseScenario = generateCEOFinancialModel(baseMetrics, initialCapital, projectionYears);
  const baseSummary = getExecutiveSummary(baseScenario);
  
  const scenarios: Record<string, any> = {
    base: {
      name: "Base Case",
      description: "Expected business trajectory with current assumptions",
      projection: baseScenario,
      summary: baseSummary
    }
  };
  
  // Generate each scenario
  for (const scenario of scenarioVariations) {
    const scenarioMetrics = { ...baseMetrics, ...scenario.metricChanges };
    const projection = generateCEOFinancialModel(scenarioMetrics, initialCapital, projectionYears);
    const summary = getExecutiveSummary(projection);
    
    scenarios[scenario.name.toLowerCase().replace(/\s+/g, '_')] = {
      name: scenario.name,
      description: scenario.description,
      projection,
      summary
    };
  }
  
  // Compare key metrics across scenarios
  const compareMetrics = [
    "Total Users (End of Projection)",
    "Final Year Revenue",
    "Annual Recurring Revenue (Final)",
    "Break Even Month",
    "LTV/CAC Ratio (Final)",
    "Net Margin (Final)",
    "Total Investment Required"
  ];
  
  const comparison: Record<string, Record<string, any>> = {};
  
  for (const metric of compareMetrics) {
    comparison[metric] = {};
    for (const [key, scenario] of Object.entries(scenarios)) {
      comparison[metric][scenario.name] = scenario.summary.keyMetrics[metric];
    }
  }
  
  return {
    scenarios,
    comparison
  };
}

/**
 * Example usage of the CEO Financial Model
 */
export function getExampleCEOFinancialModel() {
  // Get default business metrics
  const baseMetrics = getDefaultBusinessMetrics();
  
  // Generate a range of alternate scenarios
  const scenarioVariations = [
    {
      name: "Conservative Growth",
      description: "Lower growth rate and higher acquisition costs",
      metricChanges: {
        monthlyGrowthRate: 15,
        userAcquisitionCost: 150,
        churnRate: 7
      }
    },
    {
      name: "Aggressive Growth",
      description: "Higher growth rate with increased marketing spend",
      metricChanges: {
        monthlyGrowthRate: 40,
        marketingBudgetBase: 7000,
        marketingBudgetPercentageOfRevenue: 15,
        userAcquisitionCost: 130
      }
    },
    {
      name: "Higher Monetization",
      description: "Higher average purchase amounts with improved conversion",
      metricChanges: {
        avgInitialCreditPurchase: 75,
        avgMonthlyCreditPurchase: 100,
        conversionRate: 20
      }
    },
    {
      name: "Market Pressure",
      description: "Competitive pressure requiring lower margins",
      metricChanges: {
        markupOnAICosts: 20,
        serviceFee: 3,
        userAcquisitionCost: 120
      }
    }
  ];
  
  // Generate base model projections with $500K initial capital
  const model = generateCEOFinancialModel(baseMetrics, 500000, 5);
  
  // Generate executive summary
  const summary = getExecutiveSummary(model);
  
  // Generate scenario analysis
  const scenarios = generateScenarioAnalysis(baseMetrics, scenarioVariations, 500000, 5);
  
  return {
    baseModel: model,
    executiveSummary: summary,
    scenarios
  };
}
