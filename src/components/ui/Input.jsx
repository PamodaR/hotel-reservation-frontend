import React from 'react';

const Input = ({
    type = 'text',
    label,
    id,
    name,
    value,
    onChange,
    placeholder = '',
    error = '',
    icon: Icon,
    className = '',
    required = false,
    ...props
}) => {
    return (
        <div className={`relative ${className}`}>
            {label && (
                <label
                    htmlFor={id || name}
                    className="block text-sm font-medium text-surface-700 mb-2"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-400">
                        <Icon size={20} />
                    </div>
                )}
                <input
                    type={type}
                    id={id || name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`
                        block w-full px-4 py-3 
                        bg-white/50 backdrop-blur-sm border 
                        ${error ? 'border-red-500 focus:ring-red-500' : 'border-surface-200 focus:ring-primary-500 focus:border-primary-500'}
                        rounded-xl shadow-sm 
                        text-surface-900 placeholder-surface-400
                        focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200
                        ${Icon ? 'pl-10' : ''}
                    `}
                    placeholder={placeholder}
                    required={required}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600 animate-slide-up">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
