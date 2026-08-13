const apiRequest = require('../apiRequest');

async function createAdCreative({ name, pageId, link, imageUrl, callToAction = 'SHOP_NOW' }) {
  const adAccountId = process.env.META_AD_ACCOUNT_ID;
  const res = await apiRequest.post(`/${adAccountId}/adcreatives`, {
    name,
    object_story_spec: {
      page_id: pageId,
      link_data: {
        link,
        image_url: imageUrl,
        call_to_action: { type: callToAction }
      }
    }
  });
  return res.data;
}

module.exports = { createAdCreative };
