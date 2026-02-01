
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import AIConsultant from './components/AIConsultant';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      // If signed in, ensure we hide auth screen/landing
      if (session) setShowAuth(false);
    });

    // 3. Scroll Listener
    const handleScroll = () => {
      setIsStickyVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#050505]" />;
  }

  // Route: Dashboard
  if (session) {
    return <Dashboard />;
  }

  // Route: Auth
  if (showAuth) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowAuth(false)}
          className="absolute top-6 left-6 z-50 text-gray-400 hover:text-white text-sm"
        >
          ← Back to Home
        </button>
        <Auth />
      </div>
    );
  }

  // Route: Landing Page
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
      <Navbar onSignIn={() => setShowAuth(true)} />

      <main>
        <Hero />

        <section id="features" className="relative z-10 py-24 bg-[#050505]">
          <div className="max-w-7xl mx-auto px-6">
            <Features />
          </div>
        </section>

        <section id="ai-audit" className="py-24 bg-[#0A0A0A] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <AIConsultant />
          </div>
        </section>

        <section id="social-proof" className="py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <Testimonials />
          </div>
        </section>

        <CTA />
      </main>

      <Footer />

      {/* Persistent Call-to-Action */}
      <AnimatePresence>
        {isStickyVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-6"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl flex items-center justify-between shadow-2xl">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Limited Slots</span>
                <span className="text-sm font-medium">Ready to convert?</span>
              </div>
              <button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20">
                Book My Audit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
