import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center mt-auto transition-colors">
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                <span className="font-bold text-legal-navy dark:text-legal-gold block mb-1">Disclaimer</span>
                LegalEase is an AI-powered educational tool. The information provided here is for general guidance only and
                <span className="font-bold text-red-600 dark:text-red-400"> does not constitute professional legal advice.</span>
                {' '}Please consult a qualified attorney for specific legal matters.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">© {new Date().getFullYear()} LegalEase Rights Initiative. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
