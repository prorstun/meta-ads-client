const apiRequest = require('../apiRequest');

async function createCampaign({ name, objective, status = 'PAUSED' }) {
  const adAccountId = process.env.META_AD_ACCOUNT_ID;
  const res = await apiRequest.post(`/${adAccountId}/campaigns`, {
    name,
    objective,
    status,
    special_ad_categories: []
  });
  return res.data;
}

module.exports = { createCampaign };
