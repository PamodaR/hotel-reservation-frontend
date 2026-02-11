import React from 'react';

const StatCard = ({ icon: Icon, title, value, change, trend = 'neutral' }) => {
    // trend: 'up', 'down', 'neutral'
    const trendColors = {
        up: 'text-green-500',
        down: 'text-red-500',
        neutral: 'text-surface-400',
    };

    return (
        <div
            className="flex items-center p-6 bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1 group"
        >
            <div className="flex-shrink-0 p-3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl 
                            group-hover:from-primary-500 group-hover:to-primary-600 
                            group-hover:text-white transition-all duration-300 text-primary-600">
                <Icon size={24} />
            </div>

            <div className="ml-5 w-full">
                <p className="text-sm font-medium text-surface-500 truncate">
                    {title}
                </p>

                <div className="flex items-baseline justify-between mt-1">
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-surface-900 to-surface-700">
                        {value}
                    </h3>

                    {change && (
                        <span
                            className={`text-sm font-medium ${trendColors[trend]} flex items-center`}
                        >
                            {change}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
