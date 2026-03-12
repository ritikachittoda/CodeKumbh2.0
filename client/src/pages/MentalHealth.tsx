import { useState, useEffect } from "react";
import axios from "axios";
import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/shared/PageHeader";
import { motion } from "framer-motion";
import { MessageCircle, BookOpen, BarChart3, Sparkles } from "lucide-react";

const selfCareTips = [
  { tip: "Take 5 deep breaths and release tension", emoji: "🧘" },
  { tip: "Write down 3 things you're grateful for", emoji: "📝" },
  { tip: "Step outside for a short walk", emoji: "🌿" },
  { tip: "Call someone you trust", emoji: "💕" },
  { tip: "Drink warm herbal tea", emoji: "🍵" },
  { tip: "Try a 5 minute meditation", emoji: "🌙" }
];

const MentalHealth = () => {

  const [journalEntry, setJournalEntry] = useState("");
  const [stressLevel, setStressLevel] = useState(3);
  const [saved, setSaved] = useState(false);
  const [journals, setJournals] = useState([]);

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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

    const userMessage = { role: "user", text: input };

    setMessages(prev => [...prev, userMessage]);

    const messageToSend = input;

    setInput("");
    setLoading(true);

    try {

      const res = await axios.post(CHAT_API, {
        message: `User stress level: ${stressLevel}. ${messageToSend}`
      });

      const botMessage = {
        role: "bot",
        text: res.data.reply
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (err) {
      console.error(err);
    }

    setLoading(false);

  };

  return (
    <PageLayout>

      <PageHeader
        title="Mental Wellness"
        subtitle="Journal, track stress, and get AI support"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

        {/* Stress Level */}
        <div className="bg-card rounded-2xl p-6 shadow-card">

          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={18} className="text-plum"/>
            <h3 className="font-bold">Stress Level</h3>
          </div>

          <div className="flex gap-3 mb-3">

            {[1,2,3,4,5].map(level => (

              <button
                key={level}
                onClick={() => setStressLevel(level)}
                className={`flex-1 h-14 rounded-xl font-bold ${
                  stressLevel === level
                    ? "gradient-plum text-white"
                    : "bg-muted"
                }`}
              >
                {level}
              </button>

            ))}

          </div>

        </div>

        {/* Journal */}
        <div className="bg-card rounded-2xl p-6 shadow-card">

          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={18}/>
            <h3 className="font-bold">Mood Journal</h3>
          </div>

          <textarea
            value={journalEntry}
            onChange={(e)=>setJournalEntry(e.target.value)}
            placeholder="How are you feeling?"
            className="w-full h-32 bg-muted rounded-xl p-3"
          />

          <button
            onClick={handleSave}
            className="mt-3 gradient-sage px-4 py-2 rounded-xl w-full"
          >
            {saved ? "Saved!" : "Save Entry"}
          </button>

        </div>

        {/* AI Chat Card */}
        <motion.div
          className="gradient-plum rounded-2xl p-6 flex flex-col justify-between"
        >

          <div>

            <div className="flex items-center gap-2 mb-3">
              <MessageCircle size={18}/>
              <h3 className="font-bold">AI Support</h3>
            </div>

            <p className="text-sm mb-6">
              Talk to our AI assistant about stress or anxiety.
            </p>

          </div>

          <button
            onClick={()=>setChatOpen(true)}
            className="bg-white px-4 py-2 rounded-xl"
          >
            <Sparkles size={14} className="inline mr-1"/>
            Start Conversation
          </button>

        </motion.div>

      </div>

      {/* Journal History */}

      <div className="bg-card rounded-2xl p-6 shadow-card mb-10">

        <h3 className="font-bold mb-4">Recent Journal Entries</h3>

        <div className="space-y-3">

          {journals.map(j => (

            <div key={j._id} className="bg-muted rounded-xl p-3">

              <p>{j.entry}</p>

              <p className="text-xs">
                Stress: {j.stressLevel} • {new Date(j.createdAt).toLocaleDateString()}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Self Care */}

      <h2 className="font-bold mb-4">Self Care Suggestions</h2>

      <div className="grid grid-cols-3 gap-3">

        {selfCareTips.map((item,i)=>(
          <div key={i} className="bg-plum-light rounded-xl p-3 flex gap-2">
            <span>{item.emoji}</span>
            <p>{item.tip}</p>
          </div>
        ))}

      </div>

      {/* Chatbot Popup */}

      {chatOpen && (

        <div className="fixed bottom-6 right-6 w-[350px] bg-white rounded-2xl shadow-xl border flex flex-col">

          <div className="p-3 border-b flex justify-between">
            <h4 className="font-bold text-sm">AI Assistant</h4>
            <button onClick={()=>setChatOpen(false)}>✕</button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 h-[300px]">

            {messages.map((m,i)=>(
              <div
                key={i}
                className={`p-2 rounded-lg text-sm ${
                  m.role==="user"
                    ? "bg-purple-500 text-white ml-auto"
                    : "bg-gray-200"
                }`}
              >
                {m.text}
              </div>
            ))}

            {loading && <p className="text-xs">AI typing...</p>}

          </div>

          <div className="flex border-t">

            <input
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 px-3 py-2 text-sm"
            />

            <button
              onClick={sendMessage}
              className="px-4 font-bold"
            >
              Send
            </button>

          </div>

        </div>

      )}

    </PageLayout>
  );
};

export default MentalHealth;