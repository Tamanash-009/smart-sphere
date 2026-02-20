import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Scale, Lock, Mail, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Full Name is required";
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const response = await api.auth.register(formData.name, formData.email, formData.password);
            localStorage.setItem('token', response.token);
            navigate('/');
        } catch (error) {
            console.error("Registration Error:", error);
            alert("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-legal-paper dark:bg-gray-900">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-50 z-0 pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-legal-navy/10 rounded-full blur-3xl"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-legal-gold/10 rounded-full blur-3xl"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md glass p-8 rounded-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-legal-gold rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Scale className="text-legal-navy w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold font-serif text-legal-navy dark:text-legal-gold mb-2">Join LegalEase</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-sans">Start your legal journey today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} focus:border-legal-gold focus:ring-2 focus:ring-legal-gold/20 outline-none transition-all bg-white/50 dark:bg-gray-800/50 dark:text-white dark:placeholder:text-gray-500`}
                                placeholder="John Smith"
                                value={formData.name}
                                onChange={(e) => {
                                    setFormData({ ...formData, name: e.target.value });
                                    if (errors.name) setErrors({ ...errors, name: null });
                                }}
                            />
                        </div>
                        {errors.name && <p className="text-xs text-red-500 ml-1">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} focus:border-legal-gold focus:ring-2 focus:ring-legal-gold/20 outline-none transition-all bg-white/50 dark:bg-gray-800/50 dark:text-white dark:placeholder:text-gray-500`}
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({ ...formData, email: e.target.value });
                                    if (errors.email) setErrors({ ...errors, email: null });
                                }}
                            />
                        </div>
                        {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                type="password"
                                className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} focus:border-legal-gold focus:ring-2 focus:ring-legal-gold/20 outline-none transition-all bg-white/50 dark:bg-gray-800/50 dark:text-white dark:placeholder:text-gray-500`}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => {
                                    setFormData({ ...formData, password: e.target.value });
                                    if (errors.password) setErrors({ ...errors, password: null });
                                }}
                            />
                        </div>
                        {errors.password && <p className="text-xs text-red-500 ml-1">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-legal-navy text-white py-3.5 rounded-xl font-bold text-lg hover:bg-indigo-900 transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>Sign Up <ArrowRight size={20} /></>
                        )}
                    </button>
                </form>

                <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
                    Already have an account? {' '}
                    <NavLink to="/login" className="text-legal-navy font-bold hover:underline">
                        Sign In
                    </NavLink>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
