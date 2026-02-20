import React, { useState, useEffect } from 'react';
import { User, Bell, Moon, Shield, LogOut, ChevronRight, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();

    // State for toggles with persistence
    const [notifications, setNotifications] = useState(() => {
        return localStorage.getItem('notifications') === 'true';
    });

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });

    // State for Profile Editing
    const [isEditing, setIsEditing] = useState(false);
    const [profileName, setProfileName] = useState('John Smith');

    // State for Sections
    const [showSecurity, setShowSecurity] = useState(false);

    // Effects to save state
    useEffect(() => {
        localStorage.setItem('notifications', notifications);
    }, [notifications]);

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
        // In a real app, we'd apply the theme class here
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to sign out?")) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const saveProfile = () => {
        setIsEditing(false);
        // In real app, API call here
        alert("Profile updated successfully!");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-legal-navy dark:text-legal-gold font-serif mb-2">Settings</h1>
                <p className="text-gray-500 dark:text-gray-400 font-sans">Manage your account preferences and app settings.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
                {/* Profile Header */}
                <div className="p-8 border-b border-gray-100 dark:border-gray-700 flex items-center gap-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative transition-colors duration-200">
                    <div className="w-20 h-20 rounded-full bg-legal-navy dark:bg-indigo-900 text-white text-2xl font-bold font-serif flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-gray-700">
                        {profileName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                        {isEditing ? (
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={profileName}
                                    onChange={(e) => setProfileName(e.target.value)}
                                    className="text-xl font-bold text-legal-navy dark:text-white font-serif border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded px-2 py-1"
                                />
                                <button onClick={saveProfile} className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200"><Save size={18} /></button>
                                <button onClick={toggleEdit} className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"><X size={18} /></button>
                            </div>
                        ) : (
                            <h2 className="text-xl font-bold text-legal-navy dark:text-white font-serif">{profileName}</h2>
                        )}
                        <p className="text-gray-500 dark:text-gray-400">john.smith@example.com</p>
                        {!isEditing && (
                            <button onClick={toggleEdit} className="mt-2 text-sm text-legal-gold font-bold hover:underline">Edit Profile</button>
                        )}
                    </div>
                </div>

                {/* Settings List */}
                <div className="divide-y divide-gray-50 dark:divide-gray-700">
                    {/* Notifications Toggle */}
                    <button
                        aria-label={`Notifications — ${notifications ? 'On' : 'Off'}`}
                        className="w-full text-left p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between cursor-pointer group"
                        onClick={() => setNotifications(!notifications)}
                        data-testid="settings-notifications"
                    >
                        <div className="flex items-center gap-4" role="presentation">
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors" aria-hidden="true">
                                <Bell size={20} />
                            </div>
                            <div role="presentation">
                                <span className="block font-bold text-gray-800 dark:text-white text-base" aria-hidden="true">Notifications</span>
                                <span className="block text-sm text-gray-500 dark:text-gray-400" aria-hidden="true">Manage email and push notifications</span>
                            </div>
                        </div>
                        <div className={`w-12 h-6 rounded-full relative transition-colors ${notifications ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-600'}`} aria-hidden="true">
                            <div className={`w-6 h-6 bg-white rounded-full shadow-md absolute top-0 transition-transform ${notifications ? 'left-6' : 'left-0'} transform scale-90`}></div>
                        </div>
                    </button>

                    {/* Dark Mode Toggle */}
                    <button
                        aria-label={`Dark Mode — ${darkMode ? 'On' : 'Off'}`}
                        className="w-full text-left p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between cursor-pointer group"
                        onClick={() => setDarkMode(!darkMode)}
                        data-testid="settings-darkmode"
                    >
                        <div className="flex items-center gap-4" role="presentation">
                            <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-xl text-purple-600 dark:text-purple-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition-colors" aria-hidden="true">
                                <Moon size={20} />
                            </div>
                            <div role="presentation">
                                <span className="block font-bold text-gray-800 dark:text-white text-base" aria-hidden="true">Dark Mode</span>
                                <span className="block text-sm text-gray-500 dark:text-gray-400" aria-hidden="true">Switch between light and dark themes</span>
                            </div>
                        </div>
                        <div className={`w-12 h-6 rounded-full relative transition-colors ${darkMode ? 'bg-purple-500' : 'bg-gray-200 dark:bg-gray-600'}`} aria-hidden="true">
                            <div className={`w-6 h-6 bg-white rounded-full shadow-md absolute top-0 transition-transform ${darkMode ? 'left-6' : 'left-0'} transform scale-90`}></div>
                        </div>
                    </button>

                    {/* Privacy & Security (Expandable) */}
                    <div className="group">
                        <button
                            aria-label={`Privacy & Security — ${showSecurity ? 'Expanded' : 'Collapsed'}`}
                            className="w-full text-left p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between cursor-pointer"
                            onClick={() => setShowSecurity(!showSecurity)}
                            data-testid="settings-privacy"
                        >
                            <div className="flex items-center gap-4" role="presentation">
                                <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-xl text-green-600 dark:text-green-400 group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors" aria-hidden="true">
                                    <Shield size={20} />
                                </div>
                                <div role="presentation">
                                    <span className="block font-bold text-gray-800 dark:text-white text-base" aria-hidden="true">Privacy & Security</span>
                                    <span className="block text-sm text-gray-500 dark:text-gray-400" aria-hidden="true">Change password and security questions</span>
                                </div>
                            </div>
                            <ChevronRight size={20} className={`text-gray-400 transition-transform ${showSecurity ? 'rotate-90' : ''}`} aria-hidden="true" />
                        </button>
                        {showSecurity && (
                            <div className="px-6 pb-6 pl-20 bg-gray-50/50 dark:bg-gray-900/50">
                                <button className="text-sm font-semibold text-legal-navy dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                    Change Password
                                </button>
                                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400" aria-hidden="true">Last changed: 3 months ago</div>
                            </div>
                        )}
                    </div>

                    {/* Sign Out */}
                    <button
                        aria-label="Sign Out of your account"
                        data-testid="settings-signout"
                        className="w-full text-left p-6 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-between cursor-pointer group"
                        onClick={handleLogout}
                    >
                        <div className="flex items-center gap-4" role="presentation">
                            <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-xl text-red-600 dark:text-red-400 group-hover:bg-red-100 dark:group-hover:bg-red-900/50 transition-colors" aria-hidden="true">
                                <LogOut size={20} />
                            </div>
                            <div role="presentation">
                                <span className="block font-bold text-red-600 dark:text-red-400 text-base" aria-hidden="true">Sign Out</span>
                                <span className="block text-sm text-red-400 dark:text-red-300" aria-hidden="true">Log out of your account</span>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
