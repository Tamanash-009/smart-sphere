import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4 font-sans" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-legal-navy dark:hover:text-legal-gold flex items-center gap-1 transition-colors">
                <Home size={14} aria-hidden="true" /> Home
            </Link>
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;

                return (
                    <React.Fragment key={name}>
                        <ChevronRight size={14} className="text-gray-300 dark:text-gray-600" aria-hidden="true" />
                        {isLast ? (
                            <span className="font-semibold text-legal-navy dark:text-legal-gold capitalize" aria-current="page">
                                {name}
                            </span>
                        ) : (
                            <Link to={routeTo} className="hover:text-legal-navy dark:hover:text-legal-gold capitalize transition-colors">
                                {name}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
