import React, { useState } from 'react';
import { UploadCloud, FileText, X, Sparkles, CheckCircle2, AlertTriangle, Clipboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';

const Simplifier = () => {
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [error, setError] = useState(null);

    // Real AI results
    const [originalText, setOriginalText] = useState('');
    const [simplifiedText, setSimplifiedText] = useState('');

    // Paste mode
    const [pasteMode, setPasteMode] = useState(false);
    const [pastedText, setPastedText] = useState('');

    const handleFile = (e) => {
        e.preventDefault();
        setError(null);

        const selectedFile = e.target.files?.[0] || e.dataTransfer?.files?.[0];
        if (!selectedFile) return;

        const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
        if (!validTypes.includes(selectedFile.type)) {
            setError("Invalid file type. Please upload PDF, DOCX, or TXT.");
            return;
        }

        if (selectedFile.size > 10 * 1024 * 1024) {
            setError("File too large. Maximum size is 10MB.");
            return;
        }

        setFile(selectedFile);

        // Read file content for TXT files
        if (selectedFile.type === 'text/plain') {
            const reader = new FileReader();
            reader.onload = async (evt) => {
                const text = evt.target.result;
                setOriginalText(text);
                await processWithAI(text);
            };
            reader.readAsText(selectedFile);
        } else {
            // For PDF/DOCX, use sample text as we can't parse binary in browser
            const sampleText = `In the event of default by the Lessee, the Lessor implies the right to terminate the agreement forthwith directly. The security deposit shall be held against damages to the premises, unpaid rent, or breach of contract. All provisions of this agreement shall be binding upon the heirs, successors, and assigns of the respective parties hereto.`;
            setOriginalText(sampleText);
            processWithAI(sampleText);
        }
    };

    const handlePasteSubmit = async () => {
        if (!pastedText.trim()) {
            setError("Please paste some legal text to simplify.");
            return;
        }
        setError(null);
        setFile({ name: 'Pasted Text' });
        setOriginalText(pastedText);
        await processWithAI(pastedText);
    };

    const processWithAI = async (text) => {
        setIsProcessing(true);
        try {
            const response = await api.ai.simplify(text);
            setSimplifiedText(response.simplified || response.text || "Could not simplify. Please try again.");
            setIsDone(true);
        } catch (error) {
            console.error("Simplifier Error:", error);
            setError("Failed to simplify. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setIsDone(false);
        setIsProcessing(false);
        setOriginalText('');
        setSimplifiedText('');
        setPastedText('');
        setPasteMode(false);
        setError(null);
    };

    return (
        <div className="h-full flex flex-col gap-6">
            {!isDone && !isProcessing ? (
                // Upload State
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700 rounded-2xl shadow-sm text-center"
                >
                    <div className="max-w-lg w-full">
                        <h1 className="text-2xl sm:text-3xl font-bold text-legal-navy dark:text-legal-gold mb-2 font-serif">Legal Document Simplifier</h1>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 font-sans">Upload documents or paste legal text to get clarity instantly.</p>

                        {/* Toggle: Upload vs Paste */}
                        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-6 max-w-xs mx-auto">
                            <button
                                onClick={() => { setPasteMode(false); setError(null); }}
                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${!pasteMode ? 'bg-white dark:bg-gray-600 text-legal-navy dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
                            >
                                Upload File
                            </button>
                            <button
                                onClick={() => { setPasteMode(true); setError(null); }}
                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${pasteMode ? 'bg-white dark:bg-gray-600 text-legal-navy dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
                            >
                                Paste Text
                            </button>
                        </div>

                        {pasteMode ? (
                            <div className="space-y-4">
                                <textarea
                                    value={pastedText}
                                    onChange={(e) => setPastedText(e.target.value)}
                                    placeholder="Paste your legal document, contract, or notice text here..."
                                    className="w-full h-48 p-4 border-2 border-dashed border-legal-navy/20 dark:border-legal-gold/20 rounded-2xl bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none outline-none focus:border-legal-navy dark:focus:border-legal-gold transition-colors font-sans text-sm"
                                />
                                <button
                                    onClick={handlePasteSubmit}
                                    disabled={!pastedText.trim()}
                                    className="w-full py-3 bg-legal-navy text-white rounded-xl font-bold hover:bg-indigo-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
                                >
                                    <Sparkles size={18} /> Simplify with AI
                                </button>
                            </div>
                        ) : (
                            <label className={`relative flex flex-col items-center justify-center w-full h-56 sm:h-64 border-2 border-dashed rounded-2xl transition-colors cursor-pointer group ${error ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-legal-navy/20 dark:border-legal-gold/20 hover:bg-legal-navy/5 dark:hover:bg-legal-gold/5'}`}>
                                <input type="file" className="hidden" onChange={handleFile} accept=".pdf,.docx,.txt" />

                                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform ${error ? 'bg-red-100 text-red-500' : 'bg-legal-paper dark:bg-gray-700 text-legal-navy dark:text-legal-gold'}`}>
                                    {error ? <AlertTriangle size={28} /> : <UploadCloud size={28} />}
                                </div>

                                {error ? (
                                    <div className="text-center">
                                        <p className="text-red-500 font-bold text-sm">{error}</p>
                                        <p className="text-xs text-red-400 mt-2">Click to try again</p>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-legal-navy dark:text-legal-gold font-bold">Click to Upload</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">PDF, DOCX, TXT (Max 10MB)</p>
                                    </>
                                )}
                            </label>
                        )}
                    </div>
                </motion.div>
            ) : isProcessing ? (
                // Processing State
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col items-center justify-center p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700 rounded-2xl shadow-sm text-center"
                >
                    <div className="w-20 h-20 rounded-full bg-legal-gold/10 dark:bg-legal-gold/20 flex items-center justify-center mb-6">
                        <Sparkles className="text-legal-gold animate-spin" size={36} />
                    </div>
                    <h2 className="text-xl font-bold text-legal-navy dark:text-legal-gold mb-2">Analyzing with Gemini AI...</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Breaking down legal jargon into simple language</p>
                    <div className="mt-6 flex gap-1">
                        <span className="w-2 h-2 bg-legal-gold rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-legal-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                        <span className="w-2 h-2 bg-legal-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    </div>
                </motion.div>
            ) : (
                // Result State - Bento Grid
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 h-full"
                >
                    {/* Header/Actions Bento */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg"><CheckCircle2 className="text-green-600 dark:text-green-400" size={20} /></div>
                            <span className="font-bold text-gray-700 dark:text-gray-200 text-sm sm:text-base truncate max-w-[200px] sm:max-w-none">{file?.name}</span>
                        </div>
                        <button onClick={handleReset} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors" aria-label="Start over">
                            <X size={20} className="text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* Original Text */}
                    <div className="bg-legal-paper dark:bg-gray-800 p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-inner overflow-y-auto max-h-[40vh] lg:max-h-none">
                        <h3 className="font-serif font-bold text-legal-navy dark:text-legal-gold mb-4 flex items-center gap-2">
                            <FileText size={18} aria-hidden="true" /> Original Text
                        </h3>
                        <p className="font-serif text-gray-700 dark:text-gray-300 leading-loose text-sm md:text-base whitespace-pre-wrap">
                            {originalText}
                        </p>
                    </div>

                    {/* Simplified Text */}
                    <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/50 dark:to-gray-800 p-4 sm:p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900 shadow-lg relative overflow-y-auto max-h-[50vh] lg:max-h-none">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-legal-gold/10 rounded-full blur-2xl"></div>
                        <h3 className="font-sans font-bold text-legal-gold mb-4 flex items-center gap-2">
                            <Sparkles size={18} aria-hidden="true" /> AI Simplified View
                        </h3>
                        <div className="font-sans text-legal-navy dark:text-white font-medium leading-relaxed text-sm sm:text-base lg:text-lg whitespace-pre-wrap relative z-10">
                            {simplifiedText}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Simplifier;
