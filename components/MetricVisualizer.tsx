
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface MetricVisualizerProps {
    goal: string;
    income: string;
    clients: number;
}

const MetricVisualizer: React.FC<MetricVisualizerProps> = ({ goal, income, clients }) => {

    const numericGoal = useMemo(() => {
        const val = parseFloat(goal.replace(/[^0-9.]/g, ''));
        return isNaN(val) ? 10000 : val;
    }, [goal]);

    const numericIncome = useMemo(() => {
        const val = parseFloat(income.replace(/[^0-9.]/g, ''));
        return isNaN(val) ? 0 : val;
    }, [income]);

    const progress = numericGoal > 0 ? numericIncome / numericGoal : 0;

    // Generate simulated history data based on current income
    // This creates a smooth curve ending at current income
    const dataPoints = useMemo(() => {
        const points = [];
        const steps = 7; // 7 days/points
        for (let i = 0; i < steps; i++) {
            // Random variation but generally increasing trend relative to current income
            const factor = (i / (steps - 1));
            // Simulate realistic growth curve
            const val = numericIncome * (0.3 + (factor * 0.7)) * (0.9 + Math.random() * 0.2);
            points.push(val);
        }
        // Force last point to be exactly current income
        points[points.length - 1] = numericIncome;
        return points;
    }, [numericIncome]);

    // Calculate Grid Lines (SVG coordinates 0-100)
    // Max Y is Goal or Income * 1.2
    const maxY = Math.max(numericGoal, numericIncome * 1.1);

    const getY = (val: number) => {
        return 100 - ((val / maxY) * 80); // 80% height usage, flipped Y
    };

    const getX = (idx: number) => {
        return (idx / (dataPoints.length - 1)) * 100;
    };

    // Generate Path d attribute
    const pathD = useMemo(() => {
        let d = `M ${getX(0)} ${getY(dataPoints[0])}`;
        for (let i = 1; i < dataPoints.length; i++) {
            // Cubic bezier for smoothness
            const x = getX(i);
            const y = getY(dataPoints[i]);
            const prevX = getX(i - 1);
            const prevY = getY(dataPoints[i - 1]);
            const cp1x = prevX + (x - prevX) / 2;
            const cp1y = prevY;
            const cp2x = prevX + (x - prevX) / 2;
            const cp2y = y;
            d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
        }
        return d;
    }, [dataPoints, maxY]);

    // Area Path (closed)
    const areaD = `${pathD} L 100 100 L 0 100 Z`;

    const isGoalMet = progress >= 1;
    const coreColor = isGoalMet ? '#10b981' : '#a855f7'; // Emerald vs Purple

    return (
        <div className="relative w-full h-[300px] bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* Header / Legend */}
            <div className="absolute top-6 left-6 z-10">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: coreColor }} />
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Revenue Projection</span>
                </div>
                <div className="text-2xl font-black text-white tracking-tight">
                    {(progress * 100).toFixed(1)}% <span className="text-sm font-medium text-gray-500">of Monthly Goal</span>
                </div>
            </div>

            {/* Chart Area */}
            <div className="absolute inset-0 px-6 pb-0 pt-20">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Goal Line */}
                    <line
                        x1="0" y1={getY(numericGoal)}
                        x2="100" y2={getY(numericGoal)}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="0.5"
                        strokeDasharray="2 2"
                    />
                    <text x="100" y={getY(numericGoal) - 2} textAnchor="end" fontSize="3" fill="rgba(255,255,255,0.3)">GOAL</text>

                    {/* Gradient Definition */}
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={coreColor} stopOpacity="0.3" />
                            <stop offset="100%" stopColor={coreColor} stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Area Fill */}
                    <motion.path
                        d={areaD}
                        fill="url(#chartGradient)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, d: areaD }}
                        transition={{ duration: 1 }}
                    />

                    {/* Line Stroke */}
                    <motion.path
                        d={pathD}
                        fill="none"
                        stroke={coreColor}
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1, d: pathD }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    {/* Data Points */}
                    {dataPoints.map((val, i) => (
                        <motion.circle
                            key={i}
                            cx={getX(i)}
                            cy={getY(val)}
                            r="1"
                            fill="#0A0A0A"
                            stroke={coreColor}
                            strokeWidth="0.5"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, cy: getY(val) }}
                            transition={{ delay: 1 + (i * 0.1) }}
                        />
                    ))}
                </svg>
            </div>

            {/* Hover Floating Data (Simulated) */}
            <div className="absolute bottom-6 right-6 text-right">
                <span className="text-xs text-gray-500 uppercase block mb-1">Projected End</span>
                <span className="text-xl font-bold text-white">${(numericIncome * 1.2).toLocaleString()}</span>
            </div>

        </div>
    );
};

export default MetricVisualizer;
