import React, { Children } from 'react';

export const Card = ({ children, className = '', variant = 'glass' }) => {
    const baseStyles = "rounded-2xl p-6 transition-all duration-300 transform-gpu";

    const variants = {
        glass: "glass-card bg-white/70 backdrop-blur-xl border border-white/40 shadow-soft hover:shadow-medium hover:-translate-y-1 relative overflow-hidden",
        solid: "bg-white shadow-soft hover:shadow-medium hover:-translate-y-1 border border-surface-100",
        dark: "bg-surface-900 text-white shadow-medium",
    };

    return (
        <div className={`${baseStyles} ${variants[variant]} ${className}`}>
            {variant === 'glass' && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-50 blur-xl pointer-events-none" />
            )}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export const CardHeader = ({ children, className = '' }) => (
    <div className={`flex flex-col space-y-1.5 pb-4 border-b border-surface-100/50 mb-4 ${className}`}>
        {children}
    </div>
);

export const CardTitle = ({ children, className = '' }) => (
    <h3 className={`text-xl font-semibold leading-none tracking-tight text-surface-900 ${className}`}>
        {children}
    </h3>
);

export const CardContent = ({ children, className = '' }) => (
    <div className={`text-surface-600 ${className}`}>
        {children}
    </div>
);
