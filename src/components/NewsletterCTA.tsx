export default function NewsletterCTA() {
  return (
    <div className="border border-gray-100 rounded-xl p-8 text-center bg-white">
      <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">The Weekly Style Edit</h3>
      <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
        Outfit ideas, trend analysis, and curated picks delivered every Thursday.
      </p>
      <iframe
        src="https://trendloopusa.substack.com/embed"
        title="Newsletter signup form"
        width="100%"
        height="130"
        style={{ border: '1px solid #EEE', background: 'white', borderRadius: '12px', maxWidth: '480px', display: 'block', margin: '0 auto' }}
        frameBorder={0}
        scrolling="no"
      />
      <p className="text-[11px] text-gray-400 mt-3">No spam. Unsubscribe anytime.</p>
    </div>
  );
}
