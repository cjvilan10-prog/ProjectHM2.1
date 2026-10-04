import React from 'react';

interface ResortLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export const ResortLogo: React.FC<ResortLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
}) => {
  const isLight = variant === 'light';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Custom Vector Emblem: Rising Sun, Ocean Wave, Palm Frond */}
      <div
        className={`${iconSizes[size]} shrink-0 rounded-full flex items-center justify-center p-1.5 transition-transform duration-300 hover:rotate-6 ${
          isLight ? 'bg-teal-500/20 text-teal-300 ring-1 ring-teal-400/30' : 'bg-teal-800 text-teal-100 shadow-sm'
        }`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Golden sun */}
          <circle cx="24" cy="20" r="10" fill="#F59E0B" fillOpacity="0.85" />
          {/* Ocean waves */}
          <path
            d="M6 34C12 30 18 36 24 33C30 30 36 36 42 33V42H6V34Z"
            fill="#0D9488"
          />
          <path
            d="M6 38C13 35 19 40 25 38C31 36 37 40 42 38V42H6V38Z"
            fill="#042F2E"
            fillOpacity="0.4"
          />
          {/* Tropical Palm Frond */}
          <path
            d="M17 38C17 26 23 16 32 12C28 17 26 24 28 35"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M24 20C28 18 34 20 37 23C32 23 28 22 25 21"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M22 25C26 24 32 27 34 30C30 30 26 28 23 26"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col leading-tight">
        <span
          className={`font-serif tracking-tight font-bold whitespace-nowrap ${textSizes[size]} ${
            isLight ? 'text-white' : 'text-stone-900'
          }`}
        >
          Oceana Haven
        </span>
        <span
          className={`text-[10px] tracking-widest uppercase font-medium ${
            isLight ? 'text-teal-200/80' : 'text-teal-800'
          }`}
        >
          Resort · Corong-Corong, El Nido
        </span>
      </div>
    </div>
  );
};
