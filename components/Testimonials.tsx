
import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    author: "Harsha Gaddipati",
    role: "Co-Founder",
    company: "Slashy",
    avatar: "https://picsum.photos/200/200?random=1",
    content: "The commitment is insane. They stayed up until 2 AM to ensure our launch flows were perfect. The conversion jump was immediate."
  },
  {
    author: "Nirman Dave",
    role: "CEO",
    company: "Zams",
    avatar: "https://picsum.photos/200/200?random=2",
    content: "We switched because they handled the complex edge cases other agencies ignored. Our ROI grew by 4x in the first quarter."
  },
  {
    author: "Tomisin Jenrola",
    role: "Founder & CEO",
    company: "SwarmZero",
    avatar: "https://picsum.photos/200/200?random=3",
    content: "Before this, our integrations were slow and resource-heavy. Now, everything is a plug-and-play reflex. Truly magical."
  },
  {
    author: "Sharon Yeh",
    role: "Staff Product Manager",
    company: "Deepgram",
    avatar: "https://picsum.photos/200/200?random=4",
    content: "They turned a messy 3-service workflow into a single seamless call. We saved hundreds of engineering hours."
  }
];

const TestimonialCard: React.FC<{ author: string; role: string; company: string; content: string; avatar: string }> = ({ author, role, company, content, avatar }) => (
  <div className="flex-shrink-0 w-[400px] p-8 rounded-3xl bg-white/[0.02] border border-white/5 mr-8 relative">
    <div className="flex items-center gap-4 mb-6">
      <img src={avatar} alt={author} className="w-12 h-12 rounded-full border border-white/10" />
      <div>
        <h4 className="font-bold text-white/90">{author}</h4>
        <p className="text-xs text-gray-500 font-medium">{role} @ {company}</p>
      </div>
    </div>
    <p className="text-gray-400 text-base leading-relaxed font-light">
      &ldquo;{content}&rdquo;
    </p>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <div className="w-full">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-black mb-4 italic">Social Proof</h2>
        <p className="text-gray-500 text-lg">Don't take our word for it. Look at the numbers.</p>
      </div>

      <div className="relative flex overflow-hidden py-10 group">
        <motion.div
          animate={{ x: [0, -1600] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </motion.div>

        {/* Faders */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
        {[
          { label: 'Active Users', val: '10.9K+' },
          { label: 'Predictions Daily', val: '500M+' },
          { label: 'Accuracy Rate', val: '99.8%' },
          { label: 'AI Support', val: '24/7' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.val}</div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
