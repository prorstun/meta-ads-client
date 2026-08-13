const apiRequest = require('./apiRequest');

async function validateToken() {
  try {
    const res = await apiRequest.get('/me', {
      params: { fields: 'id,name' }
    });
    return res.data;
  } catch (err) {
    const message = err.response?.data?.error?.message || err.message;
    throw new Error('Gagal memvalidasi token: ' + message);
  }
}

module.exports = { validateToken };
