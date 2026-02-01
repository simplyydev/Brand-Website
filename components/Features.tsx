
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Cpu, Layout, BarChart3, Fingerprint } from 'lucide-react';

const FeatureCard: React.FC<{ title: string; desc: string; icon: React.ReactNode; tag: string }> = ({ title, desc, icon, tag }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="group p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10">
      <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white/90">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm mb-6">{desc}</p>
      <span className="text-[10px] font-bold text-purple-400/60 uppercase tracking-widest">{tag}</span>
    </div>
  </motion.div>
);

const Features: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
        <div className="max-w-xl">
          <span className="text-purple-500 font-bold tracking-widest text-xs uppercase mb-4 block">Core Capabilities</span>
          <h2 className="text-4xl md:text-6xl font-black text-white/90 leading-tight">
            Engineered for <br /><span className="text-purple-500">Unstoppable</span> Growth
          </h2>
        </div>
        <p className="text-gray-400 max-w-sm font-light leading-relaxed mb-4">
          Three pillars of intelligent design designed to transform your business into a high-revenue ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <FeatureCard 
          icon={<Cpu className="w-6 h-6" />}
          title="Neural Processing"
          desc="Advanced patterns that adapt and evolve with your user data. We design sites that learn how to sell."
          tag="10B+ Params Analyzed"
        />
        <FeatureCard 
          icon={<BarChart3 className="w-6 h-6" />}
          title="Predictive Analytics"
          desc="Forecast trends and outcomes with industry-leading accuracy. Know what your buyers want before they do."
          tag="99.8% Accuracy"
        />
        <FeatureCard 
          icon={<Zap className="w-6 h-6" />}
          title="Automated Workflows"
          desc="Intelligent automation that eliminates repetitive tasks and optimizes buyer journey paths in real-time."
          tag="85% Faster"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all cursor-default">
           <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
             <ShieldCheck className="w-5 h-5" />
           </div>
           <div>
             <h4 className="font-bold">Enterprise-Grade Security</h4>
             <p className="text-xs text-gray-500">End-to-end encryption and compliance ready for the fortune 500.</p>
           </div>
        </div>
        <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all cursor-default">
           <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400">
             <Fingerprint className="w-5 h-5" />
           </div>
           <div>
             <h4 className="font-bold">Seamless Identity</h4>
             <p className="text-xs text-gray-500">OAuth2 and custom auth protocols built specifically for high-trust flows.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
