'use client';
import { useState } from 'react';
import Link from 'next/link';

const questions = [
  { q: 'What best describes your daily life?', options: ['Corporate / Office', 'Creative / Freelance', 'Stay-at-home Mom', 'Student / Campus Life'] },
  { q: 'Your ideal weekend outfit is...', options: ['Jeans & a nice top', 'Flowy dress & sandals', 'Athleisure everything', 'Something bold & trendy'] },
  { q: 'Your style icon is closest to...', options: ['Amal Clooney (classic elegance)', 'Zendaya (bold & fashion-forward)', 'Jennifer Aniston (effortless casual)', 'Hailey Bieber (streetwear chic)'] },
  { q: 'Your monthly fashion budget is...', options: ['Under $50', '$50–150', '$150–300', '$300+'] },
  { q: 'When shopping, you prioritize...', options: ['Quality & longevity', 'Trendy & fun', 'Comfort above all', 'Versatility & mix-match'] },
];

interface StyleResult {
  style: string;
  desc: string;
  guides: { title: string; slug: string }[];
  products: { name: string; price: string; url: string }[];
}

const styleProfiles: Record<string, StyleResult> = {
  classic: {
    style: 'Classic Chic',
    desc: 'You gravitate toward timeless pieces with a modern twist. Your wardrobe is built on quality basics that never go out of style, elevated with thoughtful accessories.',
    guides: [
      { title: 'Capsule Wardrobe Guide for Working Women', slug: 'capsule-wardrobe-working-women-2026' },
      { title: 'Professional Outfits for Women', slug: 'professional-outfits-women-2026' },
      { title: 'Best Affordable Blazers Under $100', slug: 'best-affordable-blazers-under-100' },
    ],
    products: [
      { name: 'Tailored Blazer', price: '$49', url: 'https://amzn.to/4rVjOFg' },
      { name: 'Silk Camisole', price: '$25', url: 'https://amzn.to/3Mro3JB' },
      { name: 'Wide Leg Pants', price: '$38', url: 'https://amzn.to/3ZCaw4S' },
      { name: 'Classic Pumps', price: '$45', url: 'https://amzn.to/3OhrhzW' },
    ],
  },
  trendy: {
    style: 'Trend Explorer',
    desc: 'You love staying ahead of the curve and experimenting with new looks. Your wardrobe is a mix of statement pieces and trend-forward essentials.',
    guides: [
      { title: 'Spring Fashion Trends 2026', slug: 'spring-fashion-trends-2026' },
      { title: '10 Must-Have Fashion Items for Spring 2026', slug: 'spring-2026-must-have-items' },
      { title: 'Spring 2026 Accessories Trends', slug: 'trending-spring-accessories-2026' },
    ],
    products: [
      { name: 'Leather Jacket', price: '$59', url: 'https://amzn.to/4az8Vlh' },
      { name: 'Satin Midi Dress', price: '$42', url: 'https://amzn.to/4tH7kT9' },
      { name: 'Oversized Sunglasses', price: '$18', url: 'https://amzn.to/4tEIRhl' },
      { name: 'Cigarette Jeans', price: '$42', url: 'https://amzn.to/4kJhrTx' },
    ],
  },
  casual: {
    style: 'Effortless Casual',
    desc: 'Comfort is queen but you never sacrifice style. You master the art of looking put-together in the most relaxed pieces.',
    guides: [
      { title: '15 Casual Outfits That Look Expensive', slug: 'casual-outfits-look-expensive' },
      { title: 'Best Jeans for Every Body Type', slug: 'best-jeans-every-body-type' },
      { title: 'Best White Sneakers for Women', slug: 'best-white-sneakers-women-2026' },
    ],
    products: [
      { name: 'Straight Leg Jeans', price: '$39', url: 'https://amzn.to/4rfVnSQ' },
      { name: 'White Sneakers', price: '$45', url: 'https://amzn.to/3Mro7cj' },
      { name: 'Oversized Linen Shirt', price: '$28', url: 'https://amzn.to/4rVjOFg' },
      { name: 'Crossbody Bag', price: '$24', url: 'https://amzn.to/4anggFT' },
    ],
  },
  streetwear: {
    style: 'Modern Minimalist',
    desc: 'Less is more for you. Clean lines, neutral tones, and a capsule approach define your wardrobe. Every piece earns its place.',
    guides: [
      { title: 'How to Build a Minimalist Wardrobe', slug: 'how-to-build-minimalist-wardrobe' },
      { title: 'Amazon Fashion Finds Under $30', slug: 'amazon-fashion-finds-under-30' },
      { title: '12 Affordable Fashion Brands', slug: 'affordable-fashion-brands-guide' },
    ],
    products: [
      { name: 'Ribbed Bodysuit', price: '$18', url: 'https://amzn.to/4tH7kT9' },
      { name: 'Classic White Camisole', price: '$25', url: 'https://amzn.to/3Mro3JB' },
      { name: 'Gold Layered Necklace Set', price: '$14', url: 'https://amzn.to/3Mro3JB' },
      { name: 'Versatile Wide Leg Pants', price: '$38', url: 'https://amzn.to/3ZCaw4S' },
    ],
  },
};

function computeResult(answers: number[]): StyleResult {
  const scores = { classic: 0, trendy: 0, casual: 0, streetwear: 0 };

  if (answers[0] === 0) { scores.classic += 3; scores.trendy += 1; }
  if (answers[0] === 1) { scores.trendy += 3; scores.streetwear += 1; }
  if (answers[0] === 2) { scores.casual += 3; scores.streetwear += 1; }
  if (answers[0] === 3) { scores.trendy += 2; scores.casual += 2; }

  if (answers[1] === 0) { scores.casual += 3; scores.classic += 1; }
  if (answers[1] === 1) { scores.trendy += 2; scores.classic += 2; }
  if (answers[1] === 2) { scores.casual += 3; scores.streetwear += 1; }
  if (answers[1] === 3) { scores.trendy += 3; scores.streetwear += 1; }

  if (answers[2] === 0) { scores.classic += 4; }
  if (answers[2] === 1) { scores.trendy += 4; }
  if (answers[2] === 2) { scores.casual += 4; }
  if (answers[2] === 3) { scores.streetwear += 4; }

  if (answers[3] === 0) { scores.streetwear += 2; scores.casual += 2; }
  if (answers[3] === 1) { scores.casual += 2; scores.classic += 1; }
  if (answers[3] === 2) { scores.classic += 2; scores.trendy += 1; }
  if (answers[3] === 3) { scores.classic += 2; scores.trendy += 2; }

  if (answers[4] === 0) { scores.classic += 3; scores.streetwear += 1; }
  if (answers[4] === 1) { scores.trendy += 3; scores.casual += 1; }
  if (answers[4] === 2) { scores.casual += 3; scores.streetwear += 1; }
  if (answers[4] === 3) { scores.streetwear += 3; scores.classic += 1; }

  const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);
  return styleProfiles[sorted[0][0]];
}

export default function StyleQuizClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [result, setResult] = useState<StyleResult | null>(null);

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setResult(computeResult(newAnswers));
      setStep(questions.length);
    }
  };

  const handleRetake = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
    setDone(false);
    setEmail('');
  };

  return (
    <div className="pt-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
          Discover Your Style Personality
        </h1>
        <p className="text-gray-400">Answer 5 quick questions for personalized recommendations.</p>
      </div>

      {step < questions.length ? (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-mono">{step + 1} / {questions.length}</span>
            <span className="text-xs text-gray-400">{Math.round(((step + 1) / questions.length) * 100)}% complete</span>
          </div>
          <div className="h-1 bg-gray-100 rounded-full mb-8 overflow-hidden" role="progressbar" aria-valuenow={step + 1} aria-valuemin={0} aria-valuemax={questions.length}>
            <div className="h-full bg-gray-900 rounded-full transition-all duration-500" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
          </div>

          <div className="card p-8 text-center">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-6">{questions[step].q}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {questions[step].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(i)}
                  className="p-4 rounded-xl text-left font-medium text-gray-700 bg-white border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : result && !done ? (
        <div className="card p-8 text-center animate-slide-up">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-mono mb-2">Your Style</p>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">{result.style}</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">{result.desc}</p>

          {/* Recommended Products */}
          <div className="text-left mb-6">
            <h3 className="font-display font-bold text-sm text-gray-900 mb-3">Your Starter Kit</h3>
            <div className="grid grid-cols-2 gap-2">
              {result.products.map((p, i) => (
                <a key={i} href={p.url} target="_blank" rel="noopener noreferrer nofollow sponsored"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                    <p className="text-xs font-mono text-gray-900">{p.price}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Recommended Guides */}
          <div className="text-left mb-6">
            <h3 className="font-display font-bold text-sm text-gray-900 mb-3">Recommended Guides</h3>
            <div className="space-y-2">
              {result.guides.map((g, i) => (
                <Link key={i} href={`/guides/${g.slug}`}
                  className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <span className="text-gray-300">&#8594;</span>
                  <span>{g.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-400 mb-3">Get your full style profile via email:</p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
              className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400" />
            <button onClick={() => setDone(true)} className="btn-primary text-sm !px-5">Get Results</button>
          </div>

          <button
            onClick={handleRetake}
            className="mt-4 text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      ) : result ? (
        <div className="card p-8 text-center animate-fade-in">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Check Your Inbox</h2>
          <p className="text-gray-400 mb-4">Your personalized style profile is on its way.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/guides" className="btn-primary inline-block">Browse Style Guides</Link>
            <button
              onClick={handleRetake}
              className="btn-secondary inline-block text-sm"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
