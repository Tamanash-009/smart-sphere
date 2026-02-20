import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Scale, AlertTriangle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { api } from '../services/api';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Namaste! I am your LegalEase assistant specialized in Indian Law. I can help you with Consumer Protection, Labor Rights, and Cyber Laws.",
            sender: 'ai'
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await api.ai.chat(userMsg.text);
            const aiMsg = { id: Date.now() + 1, text: response.reply || response.text || "I understood. Here is the legal info...", sender: 'ai' };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("Chat API Error:", error);
            // Fallback
            setTimeout(() => {
                let responseText = "I'm having trouble connecting to the server. But here is a simulated response based on your keywords.";
                const lowerInput = userMsg.text.toLowerCase();

                if (lowerInput.includes('consumer') || lowerInput.includes('refund')) {
                    responseText = "Under the Consumer Protection Act, 2019, you have the right to seek redressal against unfair trade practices.";
                } else if (lowerInput.includes('labor') || lowerInput.includes('wage')) {
                    responseText = "Per Indian Labor Laws, you are entitled to a minimum wage and safe working conditions.";
                } else if (lowerInput.includes('cyber') || lowerInput.includes('hack')) {
                    responseText = "The Information Technology Act, 2000 covers cyber crimes in India.";
                }
                const aiMsg = { id: Date.now() + 1, text: responseText, sender: 'ai' };
                setMessages(prev => [...prev, aiMsg]);
            }, 1000);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-theme(spacing.32))] md:h-[calc(100vh-theme(spacing.24))] bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 dark:border-gray-700 overflow-hidden relative">
            {/* Disclaimer Overlay */}
            <div className="absolute top-0 w-full bg-yellow-50/90 py-1 px-4 text-[10px] md:text-xs text-center text-yellow-800 border-b border-yellow-100 z-10 font-medium">
                <AlertTriangle size={12} className="inline mr-1 mb-0.5" />
                Not a replacement for professional legal advice. Information provided is for educational purposes only.
            </div>

            {/* Header */}
            <div className="pt-8 pb-4 px-6 bg-white/80 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-legal-navy to-indigo-600 flex items-center justify-center shadow-lg">
                    <Scale className="text-white w-5 h-5" />
                </div>
                <div>
                    <h2 className="font-bold text-legal-navy dark:text-legal-gold text-lg leading-tight">Legal Assistant</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Powered by Google Gemini AI</p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={clsx(
                            "flex gap-3 max-w-[90%] sm:max-w-[80%] lg:max-w-[70%]",
                            msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
                        )}
                    >
                        <div className={clsx(
                            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm",
                            msg.sender === 'user' ? "bg-legal-gold text-legal-navy" : "bg-white dark:bg-gray-700 text-legal-navy dark:text-legal-gold border border-gray-100 dark:border-gray-600"
                        )}>
                            {msg.sender === 'user' ? <User size={16} /> : <Sparkles size={16} className="text-legal-navy" />}
                        </div>

                        <div className={clsx(
                            "p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed font-sans",
                            msg.sender === 'user'
                                ? "bg-legal-navy dark:bg-indigo-900 text-white rounded-tr-none"
                                : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-gray-600"
                        )}>
                            {msg.text}
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center">
                            <Sparkles size={14} className="text-legal-navy" />
                        </div>
                        <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 flex gap-1.5 items-center">
                            <span className="w-1.5 h-1.5 bg-legal-navy/40 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-legal-navy/40 rounded-full animate-bounce delay-75"></span>
                            <span className="w-1.5 h-1.5 bg-legal-navy/40 rounded-full animate-bounce delay-150"></span>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 relative z-20">
                <label className="relative flex items-center gap-2 bg-legal-paper dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus-within:border-legal-navy dark:focus-within:border-legal-gold focus-within:ring-2 focus-within:ring-legal-navy/10 dark:focus-within:ring-legal-gold/10 transition-all p-1">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
                        disabled={isTyping}
                        placeholder={isTyping ? "LegalEase is thinking..." : "Ask about Consumer, Labor, or Cyber laws..."}
                        className="flex-1 px-4 py-3 bg-transparent border-none outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:opacity-50"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="p-3 bg-legal-navy text-white rounded-lg hover:bg-indigo-950 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center"
                    >
                        {isTyping ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={18} />}
                    </button>
                </label>
            </div>
        </div>
    );
};

export default Chatbot;
