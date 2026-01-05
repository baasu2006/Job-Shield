
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse, Chat } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const NegotiationSim: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [stressLevel, setStressLevel] = useState(20); // 0-100
  const chatRef = useRef<Chat | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    chatRef.current = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `
          You are 'Sarah', a seasoned HR Director at a top tech firm. 
          Your goal is to hire the candidate at the lowest possible market-fair rate.
          The user is a candidate negotiating their salary.
          - Be professional but firm.
          - Use common HR tactics (mentioning budget caps, total rewards package, other candidates).
          - Provide a 'Stress Level' update at the start of each of your responses in the format [STRESS: XX] where XX is 0-100 based on how aggressive or demanding the user is being.
          - Start by saying: 'We're very excited to offer you the role. We're looking at a base salary of $110,000. How does that sound?'
        `,
        temperature: 0.9
      }
    });
    setMessages([{ role: 'model', text: "We're very excited to offer you the role. We're looking at a base salary of $110,000. How does that sound?" }]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatRef.current || loading) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const result = await chatRef.current.sendMessageStream({ message: userMsg });
      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of result) {
        const text = (chunk as GenerateContentResponse).text;
        fullText += text;
        
        // Extract stress level if found
        const stressMatch = fullText.match(/\[STRESS:\s*(\d+)\]/i);
        if (stressMatch) {
          setStressLevel(parseInt(stressMatch[1]));
        }

        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'model', text: fullText.replace(/\[STRESS:\s*\d+\]/gi, '').trim() };
          return updated;
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[750px] flex flex-col bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden animate-in fade-in duration-500">
      {/* Header */}
      <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center font-bold text-xl">S</div>
          <div>
            <h3 className="font-bold">Sarah (HR Director)</h3>
            <p className="text-xs text-slate-400">Salary Negotiation Simulation</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Manager Stress Meter</p>
          <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${stressLevel > 70 ? 'bg-red-500' : stressLevel > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
              style={{ width: `${stressLevel}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Chat History */}
      <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 bg-slate-50/50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm shadow-sm ${
              m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl space-x-1 flex border border-slate-100 shadow-sm">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-75"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-slate-100">
        <form onSubmit={handleSend} className="flex gap-4">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Type your negotiation pitch..."
            className="flex-grow px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
          />
          <button 
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </form>
        <div className="mt-4 flex flex-wrap gap-2">
            {["I have a competing offer.", "Can we talk about equity?", "Based on my research...", "I'd like to sign today if..."].map(p => (
              <button 
                key={p}
                onClick={() => setInput(p)}
                className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-500 hover:border-indigo-500 hover:text-indigo-600 transition-all"
              >
                {p}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NegotiationSim;
