import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Scale, Lock, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // ... inside component
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        const newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        setLoading(true);
        try {
            const response = await api.auth.login(formData.email, formData.password);
            localStorage.setItem('token', response.token); // Save token
            // Redirect
            navigate('/');
        } catch (error) {
            console.error("Login Error:", error);
            alert("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-legal-paper dark:bg-gray-900">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-50 z-0 pointer-events-none"></div>
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-legal-navy/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-legal-gold/10 rounded-full blur-3xl"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md glass p-8 rounded-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-legal-navy rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Scale className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold font-serif text-legal-navy dark:text-legal-gold mb-2">Welcome Back</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-sans">Sign in to continue to LegalEase</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} focus:border-legal-navy dark:focus:border-legal-gold focus:ring-2 focus:ring-legal-navy/20 outline-none transition-all bg-white/50 dark:bg-gray-800/50 dark:text-white dark:placeholder:text-gray-500`}
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
                                className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} focus:border-legal-navy dark:focus:border-legal-gold focus:ring-2 focus:ring-legal-navy/20 outline-none transition-all bg-white/50 dark:bg-gray-800/50 dark:text-white dark:placeholder:text-gray-500`}
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

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded text-legal-navy focus:ring-legal-navy" />
                            <span className="text-gray-600 dark:text-gray-400">Remember me</span>
                        </label>
                        <a href="#" className="text-legal-navy dark:text-legal-gold font-semibold hover:underline">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-legal-navy text-white py-3.5 rounded-xl font-bold text-lg hover:bg-indigo-900 transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>Sign In <ArrowRight size={20} /></>
                        )}
                    </button>
                </form>

                <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
                    Don't have an account? {' '}
                    <NavLink to="/register" className="text-legal-navy font-bold hover:underline">
                        Create Account
                    </NavLink>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
