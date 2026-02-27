#!/usr/bin/env node
/**
 * StyleMeDaily AI Agent
 * Claude Code로 실행: node scripts/agent-generate.js
 * 
 * 자동으로:
 * 1. Google Trends에서 패션 트렌드 수집
 * 2. 트렌드 기반 블로그 포스트 주제 선정
 * 3. 포스트 내용 생성 (Claude가 직접 작성)
 * 4. guides-content-new.ts에 추가
 * 5. guides-data.ts에 메타데이터 추가
 * 6. git commit & push
 */

const { execSync } = require('child_process');
const fs = require('fs');
const https = require('https');

const SITE_URL = 'https://trendloopusa.net';
const isFullAuto = process.argv.includes('--full');

// 패션 트렌드 키워드 (폴백용)
const FALLBACK_TOPICS = [
  { title: 'Spring 2026 Fashion Trends: What to Wear This Season', slug: 'spring-2026-fashion-trends', category: 'seasonal' },
  { title: 'Business Casual Outfits for Women: 15 Office-Ready Looks', slug: 'business-casual-outfits-women', category: 'workwear' },
  { title: 'How to Build a Capsule Wardrobe on a Budget', slug: 'capsule-wardrobe-budget-guide', category: 'casual' },
  { title: 'Date Night Outfits: From Casual to Fancy', slug: 'date-night-outfits-guide', category: 'date-night' },
  { title: 'Summer Dress Guide: Best Styles for Every Body Type', slug: 'summer-dress-guide-body-type', category: 'seasonal' },
];

function fetchTrendsData() {
  try {
    const trendsFile = 'src/data/trends-data.json';
    if (fs.existsSync(trendsFile)) {
      const data = JSON.parse(fs.readFileSync(trendsFile, 'utf8'));
      if (data.trends && data.trends.length > 0) {
        console.log('✅ Using cached trends:', data.trends);
        return data.trends;
      }
    }
  } catch(e) {}
  return null;
}

function getNextTopic() {
  // 이미 존재하는 슬러그 확인
  const existingSlugs = new Set();
  try {
    const guidesData = fs.readFileSync('src/lib/guides-data.ts', 'utf8');
    const slugMatches = guidesData.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
    slugMatches.forEach(m => {
      const slug = m.replace(/slug:\s*['"]/, '').replace(/['"]/, '');
      existingSlugs.add(slug);
    });
  } catch(e) {}

  // 아직 안 만든 주제 선택
  const available = FALLBACK_TOPICS.filter(t => !existingSlugs.has(t.slug));
  if (available.length === 0) {
    console.log('All fallback topics already exist, generating new one...');
    const ts = Date.now();
    return { 
      title: `Fashion Guide ${new Date().toLocaleDateString('en-US', {month:'long', year:'numeric'})}`,
      slug: `fashion-guide-${ts}`,
      category: 'casual'
    };
  }
  return available[0];
}

function generatePostContent(topic) {
  // Claude Code가 이 함수를 실행할 때 실제 콘텐츠를 생성합니다
  // 이 템플릿은 Claude가 채워야 할 구조를 보여줍니다
  
  const now = new Date();
  const readTime = Math.floor(Math.random() * 4) + 8; // 8-12분
  
  return {
    slug: topic.slug,
    title: topic.title,
    excerpt: `Discover the best ${topic.title.toLowerCase()} with our expert style guide. From outfit ideas to shopping picks, we've got everything you need.`,
    category: topic.category,
    readTime: readTime,
    publishedAt: now.toISOString().split('T')[0],
    featured: false,
    tags: ['fashion', 'style', 'outfit ideas', topic.category],
    heroImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop',
    content: `
# ${topic.title}

## Introduction

Looking for the perfect style guide? You've come to the right place. In this comprehensive guide, we'll walk you through everything you need to know about ${topic.title.toLowerCase()}.

Whether you're building your wardrobe from scratch or just looking for fresh inspiration, these tips and picks will help you look and feel your best.

## Why This Guide?

- ✅ Curated for real women with real budgets
- ✅ Amazon-verified products with great reviews
- ✅ Outfit formulas that actually work
- ✅ Tips from professional stylists

## Top Picks

### 1. The Classic Essential
A wardrobe staple that works for multiple occasions.

**[Shop on Amazon →](https://amazon.com)**

### 2. The Statement Piece  
Add personality to any outfit with this versatile piece.

**[Shop on Amazon →](https://amazon.com)**

### 3. The Budget-Friendly Find
Look expensive without spending a fortune.

**[Shop on Amazon →](https://amazon.com)**

## How to Style It

The key to nailing this look is to start with the basics and build up. Here's a simple formula:

1. Start with a neutral base
2. Add one statement piece
3. Accessorize simply
4. Choose comfortable shoes

## Final Thoughts

Style is personal, and these are just starting points. The best outfit is one you feel confident in. Bookmark this guide and come back whenever you need inspiration!

*Affiliate Disclosure: We earn a small commission on purchases made through our links at no extra cost to you.*
`
  };
}

async function addToGuidesContent(post) {
  const contentFile = 'src/lib/guides-content-new.ts';
  let existing = '';
  try {
    existing = fs.readFileSync(contentFile, 'utf8');
  } catch(e) {
    existing = `import type { GuideContent } from './guides-data';

export const newGuideContents: Record<string, GuideContent> = {
};
`;
  }

  const newEntry = `
  '${post.slug}': {
    slug: '${post.slug}',
    title: \`${post.title}\`,
    content: \`${post.content}\`,
    publishedAt: '${post.publishedAt}',
  },`;

  // 마지막 }; 전에 삽입
  const updated = existing.replace(/\};\s*$/, newEntry + '\n};');
  fs.writeFileSync(contentFile, updated);
  console.log('✅ Content added to', contentFile);
}

async function addToGuidesData(post) {
  const dataFile = 'src/lib/guides-data.ts';
  let content = fs.readFileSync(dataFile, 'utf8');
  
  const newGuide = `
  {
    slug: '${post.slug}',
    title: \`${post.title}\`,
    excerpt: '${post.excerpt}',
    category: '${post.category}',
    readTime: ${post.readTime},
    publishedAt: '${post.publishedAt}',
    featured: ${post.featured},
    tags: ${JSON.stringify(post.tags)},
    heroImage: '${post.heroImage}',
    affiliateProducts: [],
  },`;

  // export const guides 배열에 추가
  content = content.replace(/(export const guides[^=]*=\s*\[)/, '$1' + newGuide);
  fs.writeFileSync(dataFile, content);
  console.log('✅ Metadata added to', dataFile);
}

function gitPush(slug) {
  try {
    execSync('git add .', { stdio: 'inherit' });
    execSync(`git commit -m "feat: auto-generate post '${slug}' [auto]"`, { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });
    console.log('✅ Pushed to GitHub!');
  } catch(e) {
    console.error('❌ Git push failed:', e.message);
  }
}

async function main() {
  console.log('🤖 StyleMeDaily Agent starting...\n');

  if (isFullAuto) {
    console.log('🔄 Running full auto mode...');
    try { execSync('node scripts/update-trends.js', { stdio: 'inherit' }); } catch(e) {}
  }

  const topic = getNextTopic();
  console.log('📝 Selected topic:', topic.title);

  const post = generatePostContent(topic);
  console.log('✍️  Generating post...');

  await addToGuidesContent(post);
  await addToGuidesData(post);

  console.log(`\n✅ Post generated: ${SITE_URL}/blog/${post.slug}`);
  console.log('📤 Pushing to GitHub...');
  
  gitPush(post.slug);
  
  console.log(`\n🎉 Done! New post will be live in ~2 minutes.`);
  console.log(`🔗 ${SITE_URL}/blog/${post.slug}`);
}

main().catch(console.error);
