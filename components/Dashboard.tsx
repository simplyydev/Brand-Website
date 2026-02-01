
import React, { useEffect, useState } from 'react';
import { supabase, UserStats, Profile } from '../lib/supabase';
import { motion } from 'framer-motion';
import { LogOut, Target, DollarSign, Users, Save, Loader, Store } from 'lucide-react';
import CardScanner from './CardScanner';

const Dashboard = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [stats, setStats] = useState<UserStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editMode, setEditMode] = useState(false);

    // Form check
    const [goal, setGoal] = useState('');
    const [income, setIncome] = useState('');
    const [clients, setClients] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            const { data: statsData } = await supabase
                .from('user_stats')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (profileData) setProfile(profileData);
            if (statsData) {
                setStats(statsData);
                setGoal(statsData.goal);
                setIncome(statsData.income);
                setClients(statsData.clients);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!stats) return;
        setSaving(true);
        try {
            const { error } = await supabase
                .from('user_stats')
                .update({ goal, income, clients })
                .eq('id', stats.id);

            if (error) throw error;

            setStats({ ...stats, goal, income, clients });
            setEditMode(false);
        } catch (error) {
            console.error('Error updating stats:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
                <Loader className="animate-spin text-purple-500" size={32} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
            {/* Navbar Minimal */}
            <nav className="w-full border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="font-bold text-xl tracking-tighter">
                        MOTO<span className="text-purple-500">.AI</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400 hidden sm:block">Welcome, <span className="text-white font-medium">{profile?.full_name}</span></span>
                        <button
                            onClick={() => supabase.auth.signOut()}
                            className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
                            title="Sign Out"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-6 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-black mb-2">Agency <span className="text-purple-500">Command Center</span></h1>
                    <p className="text-gray-400 flex items-center gap-2">
                        <Store size={16} />
                        {profile?.website || 'No website linked'}
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Goal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/30 transition-colors"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Target size={100} />
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Monthly Goal</h3>
                        {editMode ? (
                            <input
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-2xl font-bold w-full focus:outline-none focus:border-purple-500"
                            />
                        ) : (
                            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{goal}</div>
                        )}
                    </motion.div>

                    {/* Income Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-green-500/30 transition-colors"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <DollarSign size={100} />
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Current Income</h3>
                        {editMode ? (
                            <input
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-2xl font-bold w-full focus:outline-none focus:border-green-500"
                            />
                        ) : (
                            <div className="text-4xl font-black text-green-400">{income}</div>
                        )}
                    </motion.div>

                    {/* Clients Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/30 transition-colors"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Users size={100} />
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Active Clients</h3>
                        {editMode ? (
                            <input
                                type="number"
                                value={clients}
                                onChange={(e) => setClients(parseInt(e.target.value) || 0)}
                                className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-2xl font-bold w-full focus:outline-none focus:border-blue-500"
                            />
                        ) : (
                            <div className="text-4xl font-black text-blue-400">{clients}</div>
                        )}
                    </motion.div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 mb-12">
                    {editMode ? (
                        <>
                            <button
                                onClick={() => setEditMode(false)}
                                className="px-6 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm font-bold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-lg transition-all text-sm font-bold flex items-center gap-2"
                            >
                                {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setEditMode(true)}
                            className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-bold"
                        >
                            Edit Metrics
                        </button>
                    )}
                </div>

                {/* Feature: Card Scanner */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="border border-white/5 rounded-3xl overflow-hidden bg-black/20 backdrop-blur-sm shadow-2xl relative min-h-[400px]"
                >
                    <div className="absolute top-4 left-6 z-10 text-xs font-mono text-purple-400">
                        LIVE TRAFFIC MONITOR
                    </div>
                    <div className="h-[400px]">
                        <CardScanner />
                    </div>
                </motion.div>

            </main>
        </div>
    );
};

export default Dashboard;
