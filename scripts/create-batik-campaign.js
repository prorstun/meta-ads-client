require('dotenv').config();
const { createBatikCampaign } = require('../lib/campaignBuilder');

async function main() {
  const config = {
    name: process.env.CAMPAIGN_NAME || 'Kampanye Batik',
    dailyBudget: parseInt(process.env.DAILY_BUDGET || '150000', 10),
    link: process.env.PRODUCT_LINK,
    imageUrl: process.env.PRODUCT_IMAGE_URL,
    productName: process.env.PRODUCT_NAME || 'Batik Khas Nusantara',
    status: process.env.CAMPAIGN_STATUS || 'PAUSED'
  };

  const result = await createBatikCampaign(config);
  console.log('Selesai. ID kampanye:', result.campaignId);
}

main().catch((err) => {
  console.error('Gagal membuat kampanye:', err.message);
  if (err.response) {
    console.error('Detail dari Meta:', JSON.stringify(err.response.data));
  }
});
