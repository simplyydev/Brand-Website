import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onSignIn: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSignIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center font-black text-sm italic tracking-tighter shadow-lg shadow-purple-900/20">
            MG
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block uppercase">MOTO GROWTH</span>
          <span className="font-bold text-xl tracking-tight sm:hidden uppercase">MOTO</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</a>
          <a href="#ai-audit" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">AI Audit</a>
          <a href="#social-proof" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Results</a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Blog</a>
        </div>

        {/* Actions & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button onClick={onSignIn} className="hidden md:block text-sm font-medium text-white hover:text-purple-400 transition-colors">Sign In</button>
          <button onClick={onSignIn} className="hidden md:block bg-white text-black px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95">
            Get Started
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-[#050505]/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <a href="#features" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-400 hover:text-white">Features</a>
              <a href="#ai-audit" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-400 hover:text-white">AI Audit</a>
              <a href="#social-proof" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-400 hover:text-white">Results</a>
              <div className="h-px bg-white/10 my-2" />
              <button onClick={() => { onSignIn(); setIsOpen(false); }} className="text-left text-lg font-medium text-white">Sign In</button>
              <button className="bg-white text-black px-5 py-3 rounded-xl text-base font-bold text-center w-full">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
