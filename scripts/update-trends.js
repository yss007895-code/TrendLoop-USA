/**
 * Google Trends RSS를 파싱해서 패션 트렌드 키워드를 수집
 * 수집된 키워드를 trends-data.json에 저장
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const FASHION_KEYWORDS = ['fashion', 'outfit', 'style', 'dress', 'wardrobe', 'clothing', 'trend'];

function fetchTrends() {
  return new Promise((resolve, reject) => {
    const url = 'https://trends.google.com/trends/trendingsearches/daily/rss?geo=US';
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function parseTrends(xml) {
  const items = xml.match(/<title><!\[CDATA\[([^\]]+)\]\]><\/title>/g) || [];
  return items
    .map(item => item.replace(/<title><!\[CDATA\[/, '').replace(/\]\]><\/title>/, '').trim())
    .filter(title => FASHION_KEYWORDS.some(kw => title.toLowerCase().includes(kw)));
}

async function main() {
  try {
    console.log('Fetching Google Trends...');
    const xml = await fetchTrends();
    const trends = parseTrends(xml);
    console.log('Fashion trends found:', trends);

    const outputPath = path.join(process.cwd(), 'src/data/trends-data.json');
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const existing = fs.existsSync(outputPath) ? JSON.parse(fs.readFileSync(outputPath, 'utf8')) : { trends: [], lastUpdated: null };
    
    const updated = {
      trends: trends.slice(0, 10),
      lastUpdated: new Date().toISOString(),
      previousTrends: existing.trends || []
    };

    fs.writeFileSync(outputPath, JSON.stringify(updated, null, 2));
    console.log('Trends saved:', updated.trends.length, 'items');
    
    // GitHub Actions output
    const core = { setOutput: (k,v) => process.stdout.write('::set-output name=' + k + '::' + v + '\n') };
    core.setOutput('has_trends', trends.length > 0 ? 'true' : 'false');
    core.setOutput('trend_count', trends.length.toString());
  } catch (err) {
    console.error('Error fetching trends:', err.message);
    process.exit(0); // 실패해도 워크플로우 계속 진행
  }
}

main();
