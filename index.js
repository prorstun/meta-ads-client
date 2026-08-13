require('dotenv').config();

const apiRequest = require('./lib/apiRequest');
const { validateToken } = require('./lib/auth');
const { createCampaign } = require('./lib/campaigns/createCampaign');
const { createAdSet } = require('./lib/adsets/createAdSet');
const { createAdCreative } = require('./lib/creatives/createAdCreative');
const { getCampaignInsights } = require('./lib/insights/getInsights');

module.exports = {
  apiRequest,
  validateToken,
  createCampaign,
  createAdSet,
  createAdCreative,
  getCampaignInsights
};
