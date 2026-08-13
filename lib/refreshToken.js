require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const APP_ID = '1752955589359736';
const APP_SECRET = process.env.META_APP_SECRET;
const GRAPH_VERSION = 'v19.0';

async function refreshToken() {
  if (!APP_SECRET) {
    throw new Error('META_APP_SECRET belum diisi di file .env');
  }

  const currentToken = process.env.META_ACCESS_TOKEN;
  const uri = `https://graph.facebook.com/${GRAPH_VERSION}/oauth/access_token`;
  const res = await axios.get(uri, {
    params: {
      grant_type: 'fb_exchange_token',
      client_id: APP_ID,
      client_secret: APP_SECRET,
      fb_exchange_token: currentToken
    }
  });

  const { access_token, expires_in } = res.data;
  const days = Math.floor(expires_in / 86400);

  const envPath = path.join(__dirname, '..', '.env');
  let env = fs.readFileSync(envPath, 'utf8');
  env = env.replace(/META_ACCESS_TOKEN=.*/m, `META_ACCESS_TOKEN=${access_token}`);
  fs.writeFileSync(envPath, env);

  console.log(`Token berhasil diperpanjang. Berlaku ${days} hari (${expires_in} detik).`);
  return access_token;
}

if (require.main === module) {
  refreshToken().catch((err) => {
    console.error('Gagal memperpanjang token:', err.message);
  });
}

module.exports = { refreshToken };
