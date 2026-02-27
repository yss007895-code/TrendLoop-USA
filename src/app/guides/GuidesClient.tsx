'use client';
import { useState } from 'react';
import { guides, categories } from '@/lib/guides-data';
import GuideCard from '@/components/GuideCard';

export default function GuidesClient() {
  const [cat, setCat] = useState('all');
  const [search, setSearch] = useState('');
  const filtered = guides
    .filter(g => cat === 'all' || g.category === cat)
    .filter(g => !search || g.title.toLowerCase().includes(search.toLowerCase()) || g.description.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="pt-8">
      <div className="mb-8">
        <h1 className="section-title">Style Guides</h1>
        <p className="text-gray-400 mt-1">{guides.length} curated guides for every occasion</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input type="text" placeholder="Search guides..." value={search} onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100" />
      </div>
      <div className="flex gap-1 mb-8 overflow-x-auto pb-2 border-b border-gray-100">
        {categories.map(c => (
          <button key={c.slug} onClick={() => setCat(c.slug)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
              cat === c.slug ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400 hover:text-gray-600 border-b-2 border-transparent'
            }`}>
            {c.name}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400 mb-4">{filtered.length} guide{filtered.length !== 1 ? 's' : ''}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(g => <GuideCard key={g.slug} guide={g} />)}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 mb-3">No guides found. Try a different search or category.</p>
          <button onClick={() => { setCat('all'); setSearch(''); }} className="text-sm text-gray-500 hover:text-gray-900 font-medium">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
