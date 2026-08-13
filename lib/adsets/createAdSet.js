const apiRequest = require('../apiRequest');

async function createAdSet({
  name,
  campaignId,
  dailyBudget,
  targeting,
  status = 'PAUSED'
}) {
  const adAccountId = process.env.META_AD_ACCOUNT_ID;
  const res = await apiRequest.post(`/${adAccountId}/adsets`, {
    name,
    campaign_id: campaignId,
    daily_budget: dailyBudget,
    billing_event: 'IMPRESSIONS',
    optimization_goal: 'OUTCOME_CLICKS',
    bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
    status,
    targeting
  });
  return res.data;
}

module.exports = { createAdSet };
