import React from 'react';
import { MessageSquareText, FileText, Scale, ArrowRight, BookOpen } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
    const quickActions = [
        {
            title: 'Legal Assistant',
            description: 'Ask questions about Indian Law.',
            icon: MessageSquareText,
            path: '/chatbot',
            color: 'bg-indigo-50 text-indigo-700',
            btnColor: 'bg-indigo-600 hover:bg-indigo-700'
        },
        {
            title: 'Simplify Docs',
            description: 'Translate legalese into plain English.',
            icon: FileText,
            path: '/simplifier',
            color: 'bg-emerald-50 text-emerald-700',
            btnColor: 'bg-emerald-600 hover:bg-emerald-700'
        },
        {
            title: 'Your Rights',
            description: 'Know your protections as a citizen.',
            icon: Scale,
            path: '/rights',
            color: 'bg-amber-50 text-amber-700',
            btnColor: 'bg-amber-600 hover:bg-amber-700'
        }
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-20 md:pb-0">
            {/* Welcome Section */}
            <div className="bg-legal-navy dark:bg-gray-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-legal-gold opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 opacity-10 rounded-full transform -translate-x-1/3 translate-y-1/3 blur-3xl"></div>

                <div className="relative z-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-3 tracking-tight">Access to Justice</h1>
                    <p className="text-blue-100 dark:text-gray-300 max-w-xl text-lg font-sans leading-relaxed">
                        Empowering Indian citizens with simple legal tools. Understand your rights and navigate the law with confidence.
                    </p>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div>
                <h2 className="text-2xl font-bold text-legal-navy font-serif mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-legal-gold rounded-full"></span>
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {quickActions.map((action) => (
                        <NavLink
                            key={action.title}
                            to={action.path}
                            aria-label={`${action.title}: ${action.description}`}
                            className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 flex flex-col relative overflow-hidden"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner`}>
                                <action.icon size={26} aria-hidden="true" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-serif mb-2">{action.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6 flex-1 font-sans leading-relaxed">{action.description}</p>

                            <div className="flex items-center text-legal-navy dark:text-legal-gold font-bold text-sm tracking-wide group-hover:translate-x-2 transition-transform">
                                OPEN TOOL <ArrowRight size={16} className="ml-2" aria-hidden="true" />
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Daily Tip Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 flex flex-col md:flex-row items-start md:items-center gap-8 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-legal-gold/5 to-transparent"></div>

                <div className="bg-legal-navy/5 dark:bg-legal-gold/10 p-5 rounded-full ring-8 ring-legal-navy/5 dark:ring-legal-gold/5">
                    <BookOpen className="text-legal-navy dark:text-legal-gold w-10 h-10" aria-hidden="true" />
                </div>

                <div className="flex-1 relative z-10">
                    <h3 className="text-sm font-bold text-legal-gold uppercase tracking-widest mb-2">Legal Term of the Day</h3>
                    <h4 className="text-2xl font-serif font-bold text-legal-navy dark:text-white mb-2">"Habeas Corpus"</h4>
                    <p className="text-gray-600 dark:text-gray-300 font-sans leading-relaxed">
                        A writ requiring a person under arrest to be brought before a judge or into court, especially to secure the person's release unless lawful grounds are shown for their detention.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
