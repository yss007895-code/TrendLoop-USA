'use client';
import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  products?: Array<{ name: string; reason: string; link: string }>;
}

export default function Chatbot() {
  const siteKey = 'stylemedaily';
  const assistantName = 'Mia - Style Advisor';
  const primaryColor = '#D4956A';
  const apiUrl = '/api/chat';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSessionId(`${Date.now()}-${Math.random().toString(36).slice(2)}`);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, site: siteKey, session_id: sessionId, page_context: document.title }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.text || 'Sorry, please try again.', products: data.products }]);
      if (data.session_id) setSessionId(data.session_id);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Connection issue. Please try again.' }]);
    }
    setIsLoading(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-transform hover:scale-110" style={{ backgroundColor: primaryColor }} aria-label="Chat">
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        )}
      </button>
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col max-h-[500px]">
          <div className="px-4 py-3 rounded-t-2xl text-white font-semibold flex items-center gap-2" style={{ backgroundColor: primaryColor }}>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />{assistantName}
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-[200px]">
            {messages.length === 0 && <div className="text-center text-gray-400 text-sm py-8">Ask me about fashion tips, outfits, and product recommendations!</div>}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${msg.role === 'user' ? 'text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`} style={msg.role === 'user' ? { backgroundColor: primaryColor } : undefined}>
                  {msg.text}
                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-2 space-y-1 border-t border-gray-200 dark:border-gray-600 pt-2">
                      {msg.products.map((p, j) => (
                        <a key={j} href={p.link} target="_blank" rel="noopener noreferrer" className="block text-blue-600 dark:text-blue-400 hover:underline text-xs">{p.name} - {p.reason}</a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && <div className="flex justify-start"><div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2 text-sm text-gray-500"><span className="animate-pulse">Thinking...</span></div></div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder="Ask about fashion..." className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" maxLength={500} />
              <button onClick={sendMessage} disabled={isLoading || !input.trim()} className="px-3 py-2 rounded-lg text-white text-sm font-medium disabled:opacity-50" style={{ backgroundColor: primaryColor }}>Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
