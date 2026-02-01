
import React from 'react';
import { motion } from 'framer-motion';

const CTA: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="p-12 md:p-24 rounded-[40px] bg-gradient-to-br from-purple-900/20 to-indigo-900/10 border border-white/10 text-center flex flex-col items-center backdrop-blur-3xl shadow-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black mb-8 leading-tight tracking-tight"
          >
            Ready to elevate your <br />
            digital presence?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mb-12 max-w-2xl font-light"
          >
            Join thousands of forward-thinking companies leveraging AI to transform 
            their operations and maximize conversion rates.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white text-black px-10 py-5 rounded-2xl text-xl font-bold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
          >
            Start Your Free Trial
          </motion.button>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-purple-600/10 blur-[120px] rounded-full" />
    </section>
  );
};

export default CTA;
