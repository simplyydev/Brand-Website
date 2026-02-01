
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[140vh] flex flex-col items-center pt-48 overflow-hidden">
      {/* Abstract Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
        <div className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] bg-[#050505]" />
      </div>

      {/* Noise Texture Overlays */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-soft-light bg-[url('https://framerusercontent.com/images/Ld5rehJeVSvAo6QUAszpLLedKSo.png?width=503&height=310')] bg-repeat" />

      <div className="container relative z-10 px-6 max-w-4xl text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-purple-400 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          MOTO GROWTH PROTOCOLS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-black tracking-tight leading-[1.1] text-white/90 mb-8"
        >
          Skills that <span className="italic font-medium text-purple-400">evolve</span> with your brand.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl font-light leading-relaxed"
        >
          Precision engineering for high-converting digital products. We don't just build sites; we build automated machines that turn <span className="text-white font-medium">interest into revenue.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-purple-500/20 active:scale-95">
            Launch Your Site
          </button>
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl text-lg font-bold transition-all active:scale-95">
            Explore Results
          </button>
        </motion.div>

        {/* Feature Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, type: 'spring' }}
          className="mt-24 w-full max-w-5xl aspect-video bg-[#0A0A0A] rounded-3xl border border-white/10 shadow-2xl relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-50" />
          
          {/* Mock Dashboard / Design UI */}
          <div className="p-8 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                <div className="w-3 h-3 rounded-full bg-green-500/20" />
              </div>
              <div className="h-6 w-48 bg-white/5 rounded-md" />
            </div>
            
            <div className="grid grid-cols-12 gap-6 flex-1">
              <div className="col-span-8 flex flex-col gap-6">
                <div className="h-32 bg-white/5 rounded-2xl border border-white/5 p-6 flex items-end">
                   <div className="h-2 w-1/3 bg-purple-500/40 rounded" />
                </div>
                <div className="grid grid-cols-2 gap-6 h-full">
                  <div className="bg-white/5 rounded-2xl border border-white/5" />
                  <div className="bg-white/5 rounded-2xl border border-white/5" />
                </div>
              </div>
              <div className="col-span-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-4">
                 <div className="w-20 h-20 rounded-full border-4 border-purple-500/20 border-t-purple-500" />
                 <span className="text-2xl font-bold">99.8%</span>
                 <span className="text-gray-500 text-xs uppercase">MG PRECISION</span>
              </div>
            </div>
          </div>

          {/* Glowing element */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/20 blur-[100px] pointer-events-none group-hover:bg-purple-600/30 transition-all duration-700" />
        </motion.div>
      </div>

      {/* Social Proof Bar */}
      <div className="mt-32 w-full border-y border-white/5 bg-white/[0.02] py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold mb-8">Powering growth for industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             <div className="text-2xl font-bold tracking-tighter">ALTERA</div>
             <div className="text-2xl font-bold tracking-tighter italic">ZOOM</div>
             <div className="text-2xl font-bold tracking-tighter">HUBSPOT</div>
             <div className="text-2xl font-bold tracking-tighter uppercase">Wabi</div>
             <div className="text-2xl font-bold tracking-tighter">GITHUB</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
