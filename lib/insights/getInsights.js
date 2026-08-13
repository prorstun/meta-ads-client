const apiRequest = require('../apiRequest');

async function getCampaignInsights(campaignId, { since, until } = {}) {
  const fields = [
    'campaign_name',
    'adset_name',
    'ad_name',
    'impressions',
    'clicks',
    'spend',
    'inline_link_clicks',
    'actions'
  ].join(',');

  const params = { fields };
  if (since && until) {
    params.time_range = JSON.stringify({ since, until });
  }

  const res = await apiRequest.get(`/${campaignId}/insights`, { params });
  return res.data;
}

module.exports = { getCampaignInsights };
