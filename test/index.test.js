const { test } = require('node:test');
const assert = require('node:assert');

test('modul utama dapat dimuat', () => {
  const client = require('../index');
  assert.ok(client);
  assert.strictEqual(typeof client.validateToken, 'function');
  assert.strictEqual(typeof client.createCampaign, 'function');
  assert.strictEqual(typeof client.createAdSet, 'function');
  assert.strictEqual(typeof client.createAdCreative, 'function');
  assert.strictEqual(typeof client.getCampaignInsights, 'function');
});
