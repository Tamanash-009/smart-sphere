import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquareText, FileText, Scale, Settings } from 'lucide-react';
import clsx from 'clsx';

const BottomNav = () => {
    const navItems = [
        { name: 'Home', icon: LayoutDashboard, path: '/' },
        { name: 'Chat', icon: MessageSquareText, path: '/chatbot' },
        { name: 'Simplify', icon: FileText, path: '/simplifier' },
        { name: 'Rights', icon: Scale, path: '/rights' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-gray-200 dark:border-gray-700 z-50 pb-safe" aria-label="Mobile navigation">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        aria-label={item.name}
                        className={({ isActive }) => clsx(
                            "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                            isActive ? "text-legal-navy dark:text-legal-gold" : "text-gray-400 dark:text-gray-500 hover:text-legal-navy/70 dark:hover:text-legal-gold/70"
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                <div className={clsx(
                                    "p-1.5 rounded-full transition-all",
                                    isActive ? "bg-legal-gold/20" : "bg-transparent"
                                )}>
                                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
                                </div>
                                <span className="text-[10px] font-medium">{item.name}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default BottomNav;
