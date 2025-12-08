import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children }) => {
    return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm">
        {children}
    </div>
    );
};

export default Card;