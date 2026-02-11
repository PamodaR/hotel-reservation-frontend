import React from 'react';

const Table = ({ headers, children, className = '' }) => {
    return (
        <div className={`overflow-x-auto rounded-xl border border-surface-200 shadow-soft bg-white ${className}`}>
            <table className="w-full text-sm text-left text-surface-600">
                <thead className="text-xs text-surface-700 uppercase bg-surface-50 border-b border-surface-200">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="px-6 py-4 font-semibold tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                    {children}
                </tbody>
            </table>
        </div>
    );
};

export const TableRow = ({ children, className = '', ...props }) => (
    <tr
        className={`bg-white hover:bg-surface-50 transition-colors duration-150 ${className}`}
        {...props}
    >
        {children}
    </tr>
);

export const TableCell = ({ children, className = '', ...props }) => (
    <td className={`px-6 py-4 whitespace-nowrap ${className}`} {...props}>
        {children}
    </td>
);

export default Table;
