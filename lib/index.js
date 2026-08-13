require('dotenv').config();
const { validateToken } = require('../index');

async function main() {
  try {
    const user = await validateToken();
    console.log('Token valid. User:', user.name);
  } catch (err) {
    console.error('Gagal terhubung ke Meta Ads API:', err.message);
    console.log('Pastikan META_ACCESS_TOKEN di file .env sudah diisi dengan benar.');
  }
}

main();
