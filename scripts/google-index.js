const { google } = require('googleapis');

async function main() {
  const keyJson = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  const auth = new google.auth.GoogleAuth({
    credentials: keyJson,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const client = await auth.getClient();
  const urls = (process.env.NEW_POSTS || '').split(',').filter(Boolean);

  for (const url of urls) {
    const res = await client.request({
      url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
      method: 'POST',
      data: { url, type: 'URL_UPDATED' },
    });
    console.log('Indexed:', url, res.status);
  }
}

main().catch(console.error);
