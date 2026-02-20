import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from '../components/BottomNav';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

const Layout = () => {
    return (
        <div className="flex h-screen bg-legal-paper dark:bg-gray-900 dark:text-gray-100 overflow-hidden font-sans transition-colors duration-200">
            {/* Desktop Sidebar - Hidden on Mobile */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-8 md:pb-8 scroll-smooth">
                    <div className="max-w-6xl mx-auto min-h-[calc(100vh-theme(spacing.32))]">
                        <Breadcrumbs />
                        <Outlet />
                    </div>
                    {/* Footer inside scrollable area, but with extra padding on mobile for bottom nav */}
                    <div className="md:hidden h-16"></div>
                    <Footer />
                </main>

                {/* Mobile Bottom Nav - Hidden on Desktop */}
                <BottomNav />
            </div>
        </div>
    );
};

export default Layout;
