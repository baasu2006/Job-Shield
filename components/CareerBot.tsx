
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse, Chat } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const CareerBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<'General' | 'Interview' | 'Resume' | 'Skills'>('General');
  const chatRef = useRef<Chat | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const initChat = () => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    let systemInstruction = "You are 'Career Catalyst', an expert career coach. Help users prepare for jobs, crack interviews, and build skills.";
    
    if (activeMode === 'Interview') {
      systemInstruction = "You are an expert technical interviewer. Conduct a mock interview. Ask one professional question at a time, wait for the user's answer, and then provide constructive feedback before asking the next one.";
    } else if (activeMode === 'Resume') {
      systemInstruction = "You are a senior recruiter. Help the user improve their resume. Ask them to paste their experience and give them high-impact, results-oriented suggestions for bullet points.";
    } else if (activeMode === 'Skills') {
      systemInstruction = "You are a career strategist. Help the user build a learning roadmap for their target role. Suggest specific technologies, certifications, and project ideas.";
    }

    chatRef.current = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
  };

  // Initialize chat on first render or mode change
  useEffect(() => {
    initChat();
    // Add welcome message
    const welcome = activeMode === 'Interview' ? "Ready for your mock interview? What role are we practicing for today?" :
                  activeMode === 'Resume' ? "Paste a section of your resume, and I'll help you make it stand out!" :
                  activeMode === 'Skills' ? "Which domain do you want to master? Let's build a roadmap." :
                  "Hello! I'm your Career Catalyst. How can I help you reach your professional goals today?";
    
    setMessages([{ role: 'model', text: welcome }]);
  }, [activeMode]);

  const handleSend = async (e?: React.FormEvent, overrideText?: string) => {
    e?.preventDefault();
    const textToSend = overrideText || input;
    if (!textToSend.trim() || !chatRef.current || isLoading) return;

    const userMessage: Message = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatRef.current.sendMessageStream({ message: textToSend });
      
      let fullResponse = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of result) {
        const chunkText = (chunk as GenerateContentResponse).text;
        fullResponse += chunkText;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', text: fullResponse };
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Let's try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    { label: "Mock Interview", mode: 'Interview' as const },
    { label: "Fix Resume", mode: 'Resume' as const },
    { label: "Skill Path", mode: 'Skills' as const },
    { label: "Salary Negotiation", mode: 'General' as const },
  ];

  return (
    <div className="max-w-5xl mx-auto h-[700px] flex flex-col md:flex-row gap-6 animate-in fade-in duration-500">
      
      {/* Sidebar - Desktop Only */}
      <div className="hidden md:flex flex-col w-64 space-y-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Coach Modes</h3>
          <div className="space-y-2">
            {(['General', 'Interview', 'Resume', 'Skills'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setActiveMode(mode)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeMode === mode ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {mode === 'General' && '🧠 Career Advice'}
                {mode === 'Interview' && '🎙️ Mock Interview'}
                {mode === 'Resume' && '📄 Resume Review'}
                {mode === 'Skills' && '🚀 Skill Builder'}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-indigo-600 p-6 rounded-3xl text-white">
          <h4 className="font-bold text-sm mb-2">Pro Tip</h4>
          <p className="text-xs text-indigo-100 leading-relaxed">
            Be specific! Instead of "Help me with my job," try "How do I explain a 6-month gap on my resume?"
          </p>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              C
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Career Catalyst</h3>
              <div className="flex items-center text-[10px] text-emerald-600 font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
                AI Online
              </div>
            </div>
          </div>
          <button 
            onClick={() => {
              setMessages([]);
              initChat();
            }}
            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
            title="Reset Chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
        </div>

        {/* Message List */}
        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-6 space-y-6 scroll-smooth"
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-700 rounded-tl-none border border-slate-200 shadow-sm'
              }`}>
                {msg.text.split('\n').map((line, idx) => (
                  <p key={idx} className={idx > 0 ? 'mt-2' : ''}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 flex space-x-1.5">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-6 pb-2 flex space-x-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map(p => (
            <button
              key={p.label}
              onClick={() => {
                setActiveMode(p.mode);
                handleSend(undefined, `I want to practice: ${p.label}`);
              }}
              className="whitespace-nowrap px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold hover:bg-indigo-100 transition-colors border border-indigo-100"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-6 pt-2">
          <div className="relative flex items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${activeMode} Coach...`}
              disabled={isLoading}
              className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:bg-slate-300 transition-all shadow-md shadow-indigo-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-3 uppercase tracking-tighter">
            Powered by Gemini 3 Flash • Career Catalyst V2
          </p>
        </form>
      </div>
    </div>
  );
};

export default CareerBot;
