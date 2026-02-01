
import React from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onSignIn: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSignIn }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center font-black text-sm italic tracking-tighter">
            MG
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block uppercase">MOTO GROWTH</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</a>
          <a href="#ai-audit" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">AI Audit</a>
          <a href="#social-proof" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Results</a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Blog</a>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={onSignIn} className="text-sm font-medium text-white hover:text-purple-400 transition-colors hidden sm:block">Sign In</button>
          <button className="bg-white text-black px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
