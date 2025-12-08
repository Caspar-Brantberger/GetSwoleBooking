import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
    return (
    <div className="flex flex-col gap-1 w-full">
    {label && <label className="text-sm font-medium">{label}</label>}
    <input
        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
    />
    </div>
    );
};

export  default Input;