
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface MetricVisualizerProps {
    goal: string;
    income: string;
    clients: number;
}

const MetricVisualizer: React.FC<MetricVisualizerProps> = ({ goal, income, clients }) => {

    // Parse values to simple numbers for calculations
    const numericGoal = useMemo(() => {
        const val = parseFloat(goal.replace(/[^0-9.]/g, ''));
        return isNaN(val) ? 10000 : val; // Default to 10k if empty/invalid
    }, [goal]);

    const numericIncome = useMemo(() => {
        const val = parseFloat(income.replace(/[^0-9.]/g, ''));
        return isNaN(val) ? 0 : val;
    }, [income]);

    // Calculate Progress (0 to 1+)
    const progress = numericGoal > 0 ? numericIncome / numericGoal : 0;
    const isGoalMet = progress >= 1;

    // Dynamic Styles based on progress
    const coreColor = isGoalMet ? '#10b981' : '#a855f7'; // Emerald vs Purple
    const glowIntensity = Math.min(progress + 0.2, 1.5);
    const rotationSpeed = Math.max(20 - (clients * 0.5), 2); // Faster with more clients (lower duration)

    return (
        <div className="relative w-full h-[300px] flex items-center justify-center overflow-hidden rounded-3xl bg-black/40 border border-white/5 backdrop-blur-sm group">

            {/* Background Grid Flux */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

            {/* Central Holographic Core */}
            <motion.div
                className="relative z-10 w-32 h-32 rounded-full flex items-center justify-center"
                animate={{
                    boxShadow: [
                        `0 0 20px ${coreColor}40`,
                        `0 0 60px ${coreColor}60`,
                        `0 0 20px ${coreColor}40`
                    ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Inner Core */}
                <div className="w-24 h-24 rounded-full bg-black border border-white/10 flex flex-col items-center justify-center z-20 relative">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">FLOW RATE</span>
                    <span className={`text-2xl font-black ${isGoalMet ? 'text-green-400' : 'text-purple-400'}`}>
                        {(progress * 100).toFixed(1)}%
                    </span>
                </div>

                {/* Rotating Rings (Goal Progress) */}
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full border border-transparent"
                        style={{
                            borderTopColor: coreColor,
                            opacity: 0.3 - (i * 0.05),
                            scale: 1 + (i * 0.2)
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10 + (i * 5), repeat: Infinity, ease: "linear" }}
                    />
                ))}

                {/* Pulse Ring (Activity) */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-white/10"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>

            {/* Orbital Particles (Clients) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[...Array(Math.min(clients || 5, 20))].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[200px] h-[200px] rounded-full"
                        style={{ rotate: i * (360 / Math.min(clients, 20)) }}
                        animate={{ rotate: [i * (360 / Math.min(clients, 20)), i * (360 / Math.min(clients, 20)) + 360] }}
                        transition={{ duration: rotationSpeed + (i % 3), repeat: Infinity, ease: "linear" }}
                    >
                        <motion.div
                            className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]"
                            style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Data Overlay Label */}
            <div className="absolute bottom-4 left-6">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isGoalMet ? 'bg-green-500' : 'bg-purple-500'} animate-pulse`} />
                    <span className="text-xs font-mono text-gray-400 uppercase">System Status: {isGoalMet ? 'OPTIMAL' : 'ACCUMULATING'}</span>
                </div>
            </div>

            <div className="absolute top-4 right-6 text-right">
                <div className="text-xs font-mono text-gray-500 uppercase">Client Orbit</div>
                <div className="text-xl font-bold text-blue-400">{clients} <span className="text-xs font-normal text-gray-600">ACTIVE</span></div>
            </div>

        </div>
    );
};

export default MetricVisualizer;
