import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Mail } from 'lucide-react';
import { useSite } from '../site/SiteContext';
import api from '../admin/api';

const AiAssistant = () => {
  const { identity, userProfile, settings, slug } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const rawName = userProfile?.name || identity?.heroTitle || settings?.heroTitle || (window.location.pathname.includes('sumaiya') ? 'Sumaiya' : 'Saker');
  const firstName = rawName.trim().split(' ')[0];
  const title = `${firstName}'s AI`;
  const email = userProfile?.email || identity?.email || settings?.email || '';
  const phone = settings?.phone || '';


  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: 'bot',
          text: `Hi! I am ${title}. How can I assist you with ${firstName}'s portfolio today?`,
        },
      ]);
    }
  }, [isOpen, firstName, title]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async e => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await api.post('/chat', { message: userMsg });
      const reply =
        res?.data?.reply ||
        res?.reply ||
        `You can reach ${firstName} at ${email || 'email'} or phone ${phone || 'phone'}.`;
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `You can reach ${firstName} at email: ${email || 'N/A'} or phone: ${phone || 'N/A'}.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-600 text-black px-4 py-3 rounded-full shadow-[0_0_25px_rgba(34,211,238,0.4)] font-semibold hover:scale-105 transition-all duration-300 text-sm sm:text-base"
          aria-label="Open AI Assistant"
        >
          <Bot size={20} />
          <span className="hidden sm:inline">{title}</span>
        </button>
      ) : (
        <div className="w-[90vw] sm:w-96 h-[500px] bg-[#080b11] border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{title}</h3>
                <p className="text-[10px] text-cyan-400 flex items-center gap-2">
                  <span>Online</span>
                  {email && (
                    <span className="flex items-center gap-1">
                      <Mail size={10} />
                      {email}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition"
              aria-label="Close chatbot"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#030712]/50 text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                    <Bot size={14} />
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-3.5 py-2.5 rounded-xl ${
                    m.sender === 'user'
                      ? 'bg-cyan-400 text-black font-medium'
                      : 'bg-white/10 text-white border border-white/5'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Bot size={14} />
                </div>
                <div className="bg-white/10 text-gray-400 px-3 py-2 rounded-xl text-xs animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSend}
            className="p-3 bg-[#080b11] border-t border-white/10 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={`Ask anything about ${firstName}...`}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-cyan-400 transition"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-cyan-400 text-black p-2.5 rounded-xl hover:bg-cyan-300 disabled:opacity-50 transition"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AiAssistant;