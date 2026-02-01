
import React, { useEffect, useState } from 'react';
import { supabase, UserStats, Profile } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LogOut, Target, DollarSign, Users, Save, Loader,
    LayoutDashboard, Settings, User, TrendingUp, Bell
} from 'lucide-react';
import MetricVisualizer from './MetricVisualizer';


type Tab = 'overview' | 'settings';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [profile, setProfile] = useState<Profile | null>(null);

    // Avatar Color State
    const [avatarColor, setAvatarColor] = useState('from-purple-500 to-indigo-500');

    useEffect(() => {
        const savedColor = localStorage.getItem('moto_theme_avatar');
        if (savedColor) setAvatarColor(savedColor);
    }, []);

    const handleColorChange = (colorClass: string) => {
        setAvatarColor(colorClass);
        localStorage.setItem('moto_theme_avatar', colorClass);
    };

    // Stats State
    const [stats, setStats] = useState<UserStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editMode, setEditMode] = useState(false);

    // Form inputs for Stats
    const [goal, setGoal] = useState('');
    const [income, setIncome] = useState('');
    const [clients, setClients] = useState(0);

    // Form inputs for Profile Settings
    const [settingsName, setSettingsName] = useState('');
    const [settingsWebsite, setSettingsWebsite] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Fetch Profile
            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            // Fetch Stats
            const { data: statsData } = await supabase
                .from('user_stats')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (profileData) {
                setProfile(profileData);
                setSettingsName(profileData.full_name || '');
                setSettingsWebsite(profileData.website || '');
            }

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

    const handleSaveStats = async () => {
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

    const handleSaveProfile = async () => {
        if (!profile) return;
        setSaving(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ full_name: settingsName, website: settingsWebsite })
                .eq('id', profile.id);

            if (error) throw error;
            setProfile({ ...profile, full_name: settingsName, website: settingsWebsite });
        } catch (error) {
            console.error('Error updating profile:', error);
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
        <div className="min-h-screen bg-[#050505] text-white font-sans flex overflow-hidden">

            {/* Sidebar */}
            <aside className="w-20 lg:w-64 border-r border-white/5 bg-[#050505] flex flex-col justify-between hidden md:flex shrink-0">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-black italic text-xs">MG</div>
                        <span className="font-bold text-lg tracking-tight hidden lg:block">MOTO.AI</span>
                    </div>

                    <nav className="flex flex-col gap-2">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-purple-600/10 text-purple-400 font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <LayoutDashboard size={20} />
                            <span className="hidden lg:block">Overview</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-purple-600/10 text-purple-400 font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <Settings size={20} />
                            <span className="hidden lg:block">Settings</span>
                        </button>
                    </nav>
                </div>

                <div className="p-6 border-t border-white/5">
                    <button
                        onClick={() => supabase.auth.signOut()}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full text-left"
                    >
                        <LogOut size={20} />
                        <span className="hidden lg:block">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Nav (Bottom) */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0A0A0A] border-t border-white/10 flex items-center justify-around z-50">
                <button onClick={() => setActiveTab('overview')} className={`p-3 rounded-full ${activeTab === 'overview' ? 'text-purple-400 bg-purple-500/10' : 'text-gray-400'}`}>
                    <LayoutDashboard size={24} />
                </button>
                <button onClick={() => setActiveTab('settings')} className={`p-3 rounded-full ${activeTab === 'settings' ? 'text-purple-400 bg-purple-500/10' : 'text-gray-400'}`}>
                    <Settings size={24} />
                </button>
                <button onClick={() => supabase.auth.signOut()} className="p-3 rounded-full text-gray-400 hover:text-red-400">
                    <LogOut size={24} />
                </button>
            </nav>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto h-screen relative">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold capitalize">{activeTab}</h2>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-500 border border-black" />
                        </button>
                        <div className={`h-8 w-8 rounded-full bg-gradient-to-r ${avatarColor} flex items-center justify-center text-xs font-bold border border-white/20 shadow-lg`}>
                            {profile?.full_name?.charAt(0) || 'U'}
                        </div>
                    </div>
                </header>

                <div className="p-6 lg:p-10 pb-24 md:pb-10 max-w-7xl mx-auto">

                    <AnimatePresence mode="wait">
                        {activeTab === 'overview' && (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                {/* Welcome Section */}
                                <div>
                                    <h1 className="text-3xl font-black mb-1">Welcome back, <span className="text-purple-400">{profile?.full_name?.split(' ')[0]}</span></h1>
                                    <p className="text-gray-400">Here's what's happening with your agency today.</p>
                                </div>

                                {/* Metric Visualizer */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <MetricVisualizer goal={goal} income={income} clients={clients} />
                                </motion.div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Validated Goal Card */}
                                    <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-all group relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="flex justify-between items-start mb-4 relative z-10">
                                            <div className="p-2 bg-white/5 rounded-lg text-purple-400">
                                                <Target size={24} />
                                            </div>
                                            {editMode && <span className="text-xs text-purple-400 font-mono">EDITING</span>}
                                        </div>
                                        <div className="relative z-10">
                                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Monthly Goal</p>
                                            {editMode ? (
                                                <input value={goal} onChange={(e) => setGoal(e.target.value)} className="bg-white/5 border border-white/10 rounded px-2 py-1 w-full text-xl font-bold" />
                                            ) : (
                                                <h3 className="text-3xl font-bold text-white tracking-tight">{goal}</h3>
                                            )}
                                        </div>
                                    </div>

                                    {/* Income Card */}
                                    <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-green-500/30 transition-all group relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="flex justify-between items-start mb-4 relative z-10">
                                            <div className="p-2 bg-white/5 rounded-lg text-green-400">
                                                <DollarSign size={24} />
                                            </div>
                                        </div>
                                        <div className="relative z-10">
                                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Revenue</p>
                                            {editMode ? (
                                                <input value={income} onChange={(e) => setIncome(e.target.value)} className="bg-white/5 border border-white/10 rounded px-2 py-1 w-full text-xl font-bold" />
                                            ) : (
                                                <h3 className="text-3xl font-bold text-white tracking-tight">{income}</h3>
                                            )}
                                        </div>
                                    </div>

                                    {/* Clients Card */}
                                    <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-blue-500/30 transition-all group relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="flex justify-between items-start mb-4 relative z-10">
                                            <div className="p-2 bg-white/5 rounded-lg text-blue-400">
                                                <Users size={24} />
                                            </div>
                                        </div>
                                        <div className="relative z-10">
                                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Active Clients</p>
                                            {editMode ? (
                                                <input type="number" value={clients} onChange={(e) => setClients(parseInt(e.target.value) || 0)} className="bg-white/5 border border-white/10 rounded px-2 py-1 w-full text-xl font-bold" />
                                            ) : (
                                                <h3 className="text-3xl font-bold text-white tracking-tight">{clients}</h3>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Edit Actions */}
                                <div className="flex justify-end border-t border-white/5 pt-6">
                                    {editMode ? (
                                        <div className="flex gap-3">
                                            <button onClick={() => setEditMode(false)} className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white">Cancel</button>
                                            <button onClick={handleSaveStats} disabled={saving} className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                                                {saving ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
                                                Save Updates
                                            </button>
                                        </div>
                                    ) : (
                                        <button onClick={() => setEditMode(true)} className="text-sm font-medium text-purple-400 hover:text-purple-300 flex items-center gap-2">
                                            Edit Metrics <TrendingUp size={14} />
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'settings' && (
                            <motion.div
                                key="settings"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-2xl"
                            >
                                <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8">
                                    <h3 className="text-xl font-bold mb-6">Profile Settings</h3>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Display Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                                <input
                                                    value={settingsName}
                                                    onChange={(e) => setSettingsName(e.target.value)}
                                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:border-purple-500/50 focus:outline-none transition-colors"
                                                    placeholder="Your Name"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Website URL</label>
                                            <div className="relative">
                                                <LayoutDashboard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                                <input
                                                    value={settingsWebsite}
                                                    onChange={(e) => setSettingsWebsite(e.target.value)}
                                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:border-purple-500/50 focus:outline-none transition-colors"
                                                    placeholder="https://yourwebsite.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Avatar Theme</label>
                                            <div className="flex gap-3">
                                                {[
                                                    'from-purple-500 to-indigo-500',
                                                    'from-blue-500 to-cyan-500',
                                                    'from-green-500 to-emerald-500',
                                                    'from-red-500 to-orange-500',
                                                    'from-pink-500 to-rose-500'
                                                ].map((gradient) => (
                                                    <button
                                                        key={gradient}
                                                        onClick={() => handleColorChange(gradient)}
                                                        className={`w-10 h-10 rounded-full bg-gradient-to-r ${gradient} border-2 transition-all ${avatarColor === gradient ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-4 flex justify-end">
                                            <button
                                                onClick={handleSaveProfile}
                                                disabled={saving}
                                                className="bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded-xl font-bold text-sm transition-transform active:scale-95 flex items-center gap-2"
                                            >
                                                {saving && <Loader size={16} className="animate-spin" />}
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
