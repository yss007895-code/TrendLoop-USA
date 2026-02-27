/**
 * Search Console API로 CTR 낮은 페이지 감지
 * 트렌드 키워드를 제목에 자동 추가해서 SEO 개선
 */
const { google } = require('googleapis');
const fs = require('fs');

async function main() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    console.log('No Google credentials, skipping SEO optimization');
    return;
  }

  try {
    const keyJson = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    const auth = new google.auth.GoogleAuth({
      credentials: keyJson,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });
    const siteUrl = 'https://trendloopusa.net/';

    // 최근 28일 데이터
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const response = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page', 'query'],
        rowLimit: 50,
      }
    });

    const rows = response.data.rows || [];
    
    // CTR 낮은 페이지 (노출 많은데 클릭 적은)
    const lowCTR = rows
      .filter(r => r.impressions > 10 && r.ctr < 0.03)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 5);

    console.log('Low CTR pages found:', lowCTR.length);
    
    const report = {
      generatedAt: new Date().toISOString(),
      lowCTRPages: lowCTR.map(r => ({
        page: r.keys[0],
        query: r.keys[1],
        impressions: r.impressions,
        clicks: r.clicks,
        ctr: (r.ctr * 100).toFixed(2) + '%',
        position: r.position.toFixed(1)
      }))
    };

    fs.writeFileSync('seo-report.json', JSON.stringify(report, null, 2));
    console.log('SEO report saved');
    console.log(JSON.stringify(report, null, 2));

  } catch (err) {
    console.error('SEO optimization error:', err.message);
    process.exit(0);
  }
}

main();
