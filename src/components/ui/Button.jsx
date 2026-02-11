import React from 'react';

const Button = ({
    children,
    variant = 'primary', // primary, secondary, outline, ghost, gold
    size = 'md', // sm, md, lg
    className = '',
    isLoading = false,
    icon: Icon,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

    const variants = {
        primary: "bg-gradient-to-r from-primary-600 to-primary-800 text-white hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 focus:ring-primary-500",
        secondary: "bg-surface-100 text-surface-900 hover:bg-surface-200 hover:shadow-md focus:ring-surface-500",
        outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
        ghost: "text-surface-600 hover:bg-surface-100 hover:text-surface-900 focus:ring-surface-500",
        gold: "bg-gradient-to-r from-gold-400 to-gold-600 text-white hover:shadow-lg hover:shadow-gold-500/30 hover:-translate-y-0.5 focus:ring-gold-500",
        danger: "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg focus:ring-red-500",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        icon: "p-3",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : Icon ? (
                <Icon className={`w-5 h-5 ${children ? 'mr-2' : ''}`} />
            ) : null}
            {children}
        </button>
    );
};

export default Button;
