import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/shared/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, BookOpen, BarChart3, Sparkles, Send, X, Heart, Calendar, Smile, ChevronRight } from "lucide-react";

const selfCareTips = [
  { tip: "Take 5 deep breaths and release tension", emoji: "🧘" },
  { tip: "Write down 3 things you're grateful for", emoji: "📝" },
  { tip: "Step outside for a short walk", emoji: "🌿" },
  { tip: "Call someone you trust", emoji: "💕" },
  { tip: "Drink warm herbal tea", emoji: "🍵" },
  { tip: "Try a 5 minute meditation", emoji: "🌙" }
];

const stressLabels: Record<number, string> = {
  1: "Calm",
  2: "Relaxed", 
  3: "Neutral",
  4: "Stressed",
  5: "Overwhelmed"
};

const stressColors: Record<number, string> = {
  1: "from-emerald-400 to-emerald-500",
  2: "from-teal-400 to-teal-500",
  3: "from-amber-400 to-amber-500",
  4: "from-orange-400 to-orange-500",
  5: "from-rose-400 to-rose-500"
};

interface Journal {
  _id: string;
  entry: string;
  stressLevel: number;
  createdAt: string;
}

interface Message {
  role: "user" | "bot";
  text: string;
}

const MentalHealth = () => {
  const [journalEntry, setJournalEntry] = useState("");
  const [stressLevel, setStressLevel] = useState(3);
  const [saved, setSaved] = useState(false);
  const [journals, setJournals] = useState<Journal[]>([]);
  
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const JOURNAL_API = "http://localhost:5000/api/journal";
  const CHAT_API = "http://localhost:5000/api/chat";

  const fetchJournals = async () => {
    try {
      const res = await axios.get(JOURNAL_API);
      setJournals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSave = async () => {
    if (!journalEntry.trim()) return;
    
    try {
      await axios.post(JOURNAL_API, {
        entry: journalEntry,
        stressLevel
      });
      
      setJournalEntry("");
      setSaved(true);
      fetchJournals();
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = { role: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    const messageToSend = input;
    
    setInput("");
    setLoading(true);
    
    try {
      const res = await axios.post(CHAT_API, {
        message: `User stress level: ${stressLevel}. ${messageToSend}`
      });
      
      const botMessage: Message = {
        role: "bot",
        text: res.data.reply
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    }
    
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageHeader
          title="Mental Wellness"
          subtitle="Journal your thoughts, track your stress, and get AI-powered support"
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
          {/* Stress Level Card */}
          <motion.div 
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 size={20} className="text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-800">Stress Level</h3>
            </div>

            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((level) => (
                <motion.button
                  key={level}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStressLevel(level)}
                  className={`flex-1 h-12 rounded-xl font-semibold transition-all duration-200 ${
                    stressLevel === level
                      ? `bg-gradient-to-br ${stressColors[level]} text-white shadow-md`
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {level}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 p-3 bg-slate-50 rounded-xl">
              <span className="text-sm text-slate-500">Current State</span>
              <span className={`font-medium ${
                stressLevel <= 2 ? "text-emerald-600" : 
                stressLevel === 3 ? "text-amber-600" : "text-rose-600"
              }`}>
                {stressLabels[stressLevel]}
              </span>
            </div>
          </motion.div>

          {/* Journal Card */}
          <motion.div 
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <BookOpen size={20} className="text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-800">Mood Journal</h3>
            </div>

            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="How are you feeling today? Write your thoughts here..."
              className="w-full h-28 bg-slate-50 rounded-xl p-4 text-slate-700 placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={!journalEntry.trim()}
              className={`mt-4 w-full py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                saved
                  ? "bg-emerald-500 text-white"
                  : journalEntry.trim()
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md hover:shadow-lg"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              {saved ? (
                <>
                  <Heart size={18} className="animate-pulse" />
                  Saved Successfully!
                </>
              ) : (
                "Save Entry"
              )}
            </motion.button>
          </motion.div>

          {/* AI Chat Card */}
          <motion.div
            className="bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-white">AI Support</h3>
              </div>

              <p className="text-purple-100 text-sm leading-relaxed mb-6">
                Need someone to talk to? Our AI assistant is here to provide 
                emotional support and coping strategies tailored to your stress level.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setChatOpen(true)}
              className="relative z-10 bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
              Start Conversation
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>

        {/* Journal History */}
        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Calendar size={20} className="text-indigo-600" />
            </div>
            <h3 className="font-semibold text-slate-800">Recent Journal Entries</h3>
          </div>

          {journals.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-xl">
              <Smile size={40} className="text-slate-300 mx-auto mb-3" />
              <p className="text-slate-400">No journal entries yet. Start writing!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {journals.map((j, index) => (
                <motion.div 
                  key={j._id} 
                  className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-purple-200 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <p className="text-slate-700 mb-3 leading-relaxed">{j.entry}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`px-3 py-1 rounded-full font-medium ${
                      j.stressLevel <= 2 ? "bg-emerald-100 text-emerald-700" :
                      j.stressLevel === 3 ? "bg-amber-100 text-amber-700" :
                      "bg-rose-100 text-rose-700"
                    }`}>
                      Stress: {j.stressLevel}/5
                    </span>
                    <span className="text-slate-400">
                      {new Date(j.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Self Care Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-rose-100 rounded-lg">
              <Heart size={20} className="text-rose-600" />
            </div>
            <h2 className="font-semibold text-slate-800 text-lg">Self Care Suggestions</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selfCareTips.map((item, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-xl p-4 flex items-start gap-3 border border-rose-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                whileHover={{ y: -3 }}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                <p className="text-slate-700 text-sm leading-relaxed">{item.tip}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Chatbot Popup */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              className="fixed bottom-6 right-6 w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Sparkles size={20} className="text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">AI Assistant</h4>
                    <p className="text-purple-200 text-xs">Always here to help</p>
                  </div>
                </div>
                <motion.button 
                  onClick={() => setChatOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={20} className="text-white" />
                </motion.button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[350px] min-h-[350px] bg-slate-50">
                {messages.length === 0 && (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle size={28} className="text-purple-500" />
                    </div>
                    <p className="text-slate-500 text-sm">
                      Hi there! I'm here to support you. How are you feeling today?
                    </p>
                  </div>
                )}
                
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-br-md"
                          : "bg-white text-slate-700 shadow-sm border border-slate-200 rounded-bl-md"
                      }`}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}
                
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-slate-400 text-xs pl-2"
                  >
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="w-2 h-2 bg-purple-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}
                        className="w-2 h-2 bg-purple-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                        className="w-2 h-2 bg-purple-400 rounded-full"
                      />
                    </div>
                    <span>AI is typing...</span>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-slate-100">
                <div className="flex gap-2 items-center">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2.5 bg-slate-100 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
                    className={`p-2.5 rounded-xl transition-all ${
                      input.trim() && !loading
                        ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-md"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    <Send size={18} />
                  </motion.button>
                </div>
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  Powered by AI • Responses are for support only
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Backdrop when chat is open */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setChatOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
          )}
        </AnimatePresence>
      </motion.div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </PageLayout>
  );
};

export default MentalHealth;