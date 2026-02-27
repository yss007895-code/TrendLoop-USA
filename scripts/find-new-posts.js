const { execSync } = require('child_process');
const fs = require('fs');

// Get changed files
const changed = execSync('git diff --name-only HEAD~1 HEAD').toString().trim();
const files = changed.split('\n').filter(f => f.includes('guides-content'));

const newSlugs = [];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  const slugMatches = content.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
  for (const match of slugMatches) {
    const slug = match.replace(/slug:\s*['"]/, '').replace(/['"]/, '');
    newSlugs.push('https://trendloopusa.net/blog/' + slug);
  }
}

console.log('Found slugs:', newSlugs);
const core = { setOutput: (k,v) => process.stdout.write('::set-output name=' + k + '::' + v + '\n') };
core.setOutput('new_posts', newSlugs.join(','));
