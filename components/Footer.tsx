
import React from 'react';
import { Twitter, Linkedin, Github, Youtube, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-black text-sm italic tracking-tighter">MG</div>
              <span className="font-bold text-xl tracking-tight uppercase">MOTO GROWTH</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-8 font-light">
              Next-generation design studio for intelligent automation and high-conversion web experiences.
            </p>
            <div className="flex items-center gap-4 text-gray-600">
              <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/50">Product</h5>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/50">Company</h5>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/50">Legal</h5>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Licenses</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 text-xs text-gray-600">
          <p>© 2026 Moto Growth Media. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
             <span>Status: <span className="text-green-500 font-medium">All systems operational</span></span>
             <p className="font-medium text-gray-500">Powered by MG Core</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
