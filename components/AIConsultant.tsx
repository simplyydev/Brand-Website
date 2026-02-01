
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import { getConversionAudit } from '../geminiService';
import { AuditResult } from '../types';

const AIConsultant: React.FC = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    
    setLoading(true);
    const auditData = await getConversionAudit(description);
    if (auditData) {
      setResult(auditData);
    }
    setLoading(false);
  };

  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="px-4 py-1.5 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
          <Sparkles className="w-3 h-3" />
          Live AI Laboratory
        </div>
        <h2 className="text-4xl md:text-5xl font-black mb-6">Free AI Conversion Audit</h2>
        <p className="text-gray-400 max-w-2xl font-light text-lg">
          Tell our Gemini-powered engine about your current website or a new business idea. 
          Get instant, high-level conversion tips and a score.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleAudit} className="relative group">
          <input 
            type="text"
            placeholder="Describe your website or project (e.g., 'E-commerce store selling high-end headphones for audiophiles')..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-16 bg-[#050505] border border-white/10 rounded-2xl px-6 pr-40 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-all shadow-2xl"
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white px-6 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Search className="w-4 h-4" />
                Audit Now
              </>
            )}
          </button>
        </form>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 p-8 bg-white/5 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl" />
              
              <div className="flex flex-col md:flex-row gap-12 relative z-10">
                <div className="flex-shrink-0 flex flex-col items-center justify-center">
                  <div className="relative">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-white/5"
                      />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={364.4}
                        initial={{ strokeDashoffset: 364.4 }}
                        animate={{ strokeDashoffset: 364.4 - (result.score / 100) * 364.4 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-purple-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-4xl font-black">{result.score}</span>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Score</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                      <AlertCircle className="w-4 h-4 text-purple-400" />
                      Priority Recommendations
                    </h4>
                    <ul className="space-y-3">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                      AI Optimization Tips
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed italic">
                      "{result.tips}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIConsultant;
