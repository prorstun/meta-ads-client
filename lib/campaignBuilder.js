const apiRequest = require('./apiRequest');

const DEFAULT_TARGETING = {
  geo_locations: {
    countries: ['ID']
  },
  age_min: 18,
  age_max: 65,
  interests: [
    { id: '6003139266461', name: 'Batik' },
    { id: '6003318026764', name: 'Online Shopping' },
    { id: '6003128598810', name: 'Fashion' }
  ]
};

async function getFirstPage() {
  const res = await apiRequest.get('/me/accounts', {
    params: { fields: 'id,name' }
  });
  const page = res.data.data?.[0];
  if (!page) {
    throw new Error('Tidak ada Facebook Page yang ditemukan. Buat halaman dulu di facebook.com/pages/create');
  }
  return page;
}

async function createBatikCampaign({
  name = 'Kampanye Batik',
  objective = 'OUTCOME_TRAFFIC',
  dailyBudget = 150000,
  link,
  imageUrl,
  pageId,
  targeting = DEFAULT_TARGETING,
  productName = 'Batik Khas Nusantara',
  status = 'PAUSED'
}) {
  const adAccountId = process.env.META_AD_ACCOUNT_ID;

  if (!link || !imageUrl) {
    throw new Error('link (URL produk Shopee/TikTok) dan imageUrl wajib diisi.');
  }

  const page = pageId ? { id: pageId } : await getFirstPage();

  const campaignRes = await apiRequest.post(`/${adAccountId}/campaigns`, {
    name,
    objective,
    status,
    special_ad_categories: []
  });
  const campaignId = campaignRes.data.id;
  console.log('Campaign dibuat:', campaignId);

  const adSetRes = await apiRequest.post(`/${adAccountId}/adsets`, {
    name: `${name} - Adset`,
    campaign_id: campaignId,
    daily_budget: dailyBudget,
    billing_event: 'IMPRESSIONS',
    optimization_goal: 'OUTCOME_CLICKS',
    bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
    targeting,
    status
  });
  const adSetId = adSetRes.data.id;
  console.log('Adset dibuat:', adSetId);

  const creativeRes = await apiRequest.post(`/${adAccountId}/adcreatives`, {
    name: `${name} - Kreatif`,
    object_story_spec: {
      page_id: page.id,
      link_data: {
        link,
        message: `${productName} - Kualitas terbaik dengan harga terjangkau. Klik untuk belanja sekarang!`,
        name: productName,
        image_url: imageUrl,
        call_to_action: { type: 'SHOP_NOW' }
      }
    }
  });
  const creativeId = creativeRes.data.id;
  console.log('Kreatif dibuat:', creativeId);

  const adRes = await apiRequest.post(`/${adAccountId}/ads`, {
    name: `${name} - Ad`,
    adset_id: adSetId,
    creative: { creative_id: creativeId },
    status
  });
  console.log('Ad dibuat:', adRes.data.id);

  return {
    campaignId,
    adSetId,
    creativeId,
    adId: adRes.data.id
  };
}

module.exports = { createBatikCampaign, getFirstPage };
