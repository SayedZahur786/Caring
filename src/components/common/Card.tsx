import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  onClick,
}) => {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-soft overflow-hidden
        transition-all duration-200 ease-in-out
        ${onClick ? 'cursor-pointer hover:shadow-elevated transform hover:-translate-y-1' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <div className="px-6 pt-6 pb-3">
          {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
        </div>
      )}
      
      <div className="px-6 py-4">{children}</div>
      
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">{footer}</div>
      )}
    </div>
  );
};

export default Card;