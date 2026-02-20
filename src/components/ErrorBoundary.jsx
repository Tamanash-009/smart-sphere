import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-legal-paper dark:bg-gray-900 p-6">
                    <div className="max-w-md w-full text-center">
                        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="text-red-600 dark:text-red-400 w-10 h-10" />
                        </div>
                        <h1 className="text-2xl font-bold font-serif text-legal-navy dark:text-white mb-3">
                            Something went wrong
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 font-sans">
                            An unexpected error occurred. Please try refreshing the page.
                        </p>
                        <pre className="text-xs text-left bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-6 overflow-auto max-h-40 text-red-600 dark:text-red-400 border border-gray-200 dark:border-gray-700">
                            {this.state.error && this.state.error.toString()}
                        </pre>
                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-legal-navy text-white rounded-xl font-bold hover:bg-indigo-900 transition-colors shadow-lg"
                        >
                            <RefreshCw size={18} />
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
