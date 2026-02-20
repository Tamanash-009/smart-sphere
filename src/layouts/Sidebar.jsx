import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    MessageSquareText,
    FileText,
    Scale,
    Settings,
    LogOut
} from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { name: 'Legal Assistant', icon: MessageSquareText, path: '/chatbot' },
        { name: 'Doc Simplifier', icon: FileText, path: '/simplifier' },
        { name: 'Rights Aware', icon: Scale, path: '/rights' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

    return (
        <div className="hidden md:flex flex-col h-screen w-72 bg-legal-navy text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-legal-gold rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            </div>

            {/* Logo Area */}
            <div className="p-8 z-10">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-legal-gold to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
                        <Scale className="text-legal-navy w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold font-serif tracking-tight">LegalEase</span>
                </div>
                <p className="text-xs text-legal-gold/80 pl-14">The People's Court</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 py-4 z-10" aria-label="Main navigation">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        aria-label={item.name}
                        className={({ isActive }) => clsx(
                            "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group",
                            isActive
                                ? "bg-white/10 text-white shadow-inner backdrop-blur-sm border border-white/5"
                                : "text-blue-200 hover:bg-white/5 hover:text-white"
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon size={20} className={clsx("transition-transform group-hover:scale-110")} aria-hidden="true" />
                                <span className="font-medium text-sm tracking-wide">{item.name}</span>
                                {isActive && <div className="ml-auto w-1.5 h-1.5 bg-legal-gold rounded-full shadow-[0_0_8px_rgba(197,160,89,0.8)]" aria-hidden="true"></div>}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* User Section */}
            <div className="p-4 m-4 rounded-2xl bg-gradient-to-b from-indigo-900/50 to-indigo-950/50 border border-indigo-800/50 z-10">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-legal-gold flex items-center justify-center text-legal-navy font-bold shadow-md">
                        JS
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold truncate">John Smith</p>
                        <p className="text-xs text-blue-300 truncate">john@example.com</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        if (window.confirm("Are you sure you want to sign out?")) {
                            localStorage.removeItem('token');
                            window.location.href = '/login';
                        }
                    }}
                    data-testid="sidebar-signout"
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                    <LogOut size={14} />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
