import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';

const Rights = () => {
    const [selectedRight, setSelectedRight] = useState(null);

    const rightsData = [
        {
            id: 1,
            title: 'Consumer Rights',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800',
            description: 'Protection against unfair trade practices, defective goods, and service deficiencies.',
            details: ['Right to Safety', 'Right to Information', 'Right to Choose', 'Right to Seek Redressal'],
            link: 'https://consumerhelpline.gov.in/'
        },
        {
            id: 2,
            title: 'Labor Laws',
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
            description: 'Regulations ensuring fair wages, safe working conditions, and social security for workers.',
            details: ['Minimum Wages Act', 'Factories Act 1948', 'Maternity Benefit Act', 'PF & ESI Benefits'],
            link: 'https://labour.gov.in/'
        },
        {
            id: 3,
            title: 'Cyber Laws',
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
            description: 'Legal framework dealing with cybercrimes, electronic commerce, and data privacy.',
            details: ['Section 66A (Scrapped)', 'Data Privacy', 'Identity Theft', 'Cyber Stalking'],
            link: 'https://www.meity.gov.in/content/cyber-laws'
        },
        {
            id: 4,
            title: 'Property Rights',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
            description: 'Laws governing acquisition, ownership, possession, and tenancy of property.',
            details: ['Transfer of Property Act', 'Rent Control Act', 'Inheritance Rights', 'RERA Registration'],
            link: 'https://dolr.gov.in/'
        },
        {
            id: 5,
            title: 'Family Law',
            image: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?auto=format&fit=crop&q=80&w=800',
            description: 'Matters regarding marriage, divorce, adoption, and succession across religions.',
            details: ['Hindu Marriage Act', 'Special Marriage Act', 'Dowry Prohibition', 'Maintenance Rights'],
            link: 'https://legislative.gov.in/'
        }
    ];

    const [searchQuery, setSearchQuery] = useState('');

    const filteredRights = rightsData.filter(right =>
        right.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        right.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-serif text-legal-navy dark:text-legal-gold">Rights Awareness</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-sans">Visual guide to your fundamental rights in India.</p>
                </div>
                <div className="relative w-full sm:w-56 md:w-64">
                    <input
                        type="text"
                        placeholder="Search rights..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-4 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-legal-navy dark:focus:border-legal-gold shadow-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredRights.map((right) => (
                    <motion.div
                        key={right.id}
                        layoutId={`card-${right.id}`}
                        onClick={() => setSelectedRight(right)}
                        whileHover={{ y: -5 }}
                        className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
                    >
                        <img src={right.image} alt={right.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-legal-navy/90 via-legal-navy/40 to-transparent p-6 flex flex-col justify-end">
                            <h3 className="text-xl font-bold text-white mb-1 font-serif">{right.title}</h3>
                            <p className="text-white/80 text-sm font-sans line-clamp-1">{right.description}</p>
                            <div className="mt-3 flex items-center text-xs font-bold text-legal-gold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                Read More <ChevronRight size={14} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedRight && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedRight(null)}
                            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                        />
                        <motion.div
                            layoutId={`card-${selectedRight.id}`}
                            className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[85vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
                        >
                            <div className="relative h-48 md:h-64 flex-shrink-0">
                                <img src={selectedRight.image} alt={selectedRight.title} className="w-full h-full object-cover" />
                                <button
                                    onClick={() => setSelectedRight(null)}
                                    className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                                    <h2 className="text-3xl font-bold font-serif text-white">{selectedRight.title}</h2>
                                </div>
                            </div>

                            <div className="p-8 overflow-y-auto bg-white dark:bg-gray-800 flex-1">
                                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg font-sans leading-relaxed border-l-4 border-legal-gold pl-4">{selectedRight.description}</p>
                                <h3 className="font-bold text-legal-navy dark:text-legal-gold mb-4 font-sans uppercase text-sm tracking-wide">Key Provisions</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {selectedRight.details.map((detail, idx) => (
                                        <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600 flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-legal-navy dark:bg-legal-gold" aria-hidden="true"></div>
                                            <span className="font-medium text-gray-700 dark:text-gray-200">{detail}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                                    <a
                                        href={selectedRight.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-legal-navy text-white rounded-xl font-bold hover:bg-indigo-900 transition-colors shadow-lg shadow-indigo-900/20"
                                    >
                                        Visit Official Portal <ChevronRight size={18} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Rights;
