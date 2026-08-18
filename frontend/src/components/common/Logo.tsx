import React from 'react';

interface LogoProps {
  className?: string;
  width?: number | string;
  theme?: 'light' | 'dark';
  isCompact?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  width = 135,
  theme = 'light',
  isCompact = false,
}) => {
  const fillColor = theme === 'light' ? '#F8FAFC' : '#0F172A';
  const playColor = '#FF5722'; // Sunset Orange accent

  if (isCompact) {
    return (
      <div className={`flex items-center justify-center select-none ${className}`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 shrink-0"
          aria-label="XPLAY5 Icon"
        >
          <rect
            width="40"
            height="40"
            rx="8"
            fill="rgba(255,87,34,0.12)"
            stroke="rgba(255,87,34,0.3)"
            strokeWidth="1"
          />
          <path
            d="M17 14l9 6-9 6V14z"
            fill={playColor}
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 320 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width }}
        className="max-w-full h-auto"
        aria-label="XPLAY5 Logo"
      >
        {/* X */}
        <path
          d="M10 10h12.5l13.5 24 13.5-24H62L43.5 40 64 70H51.5L38 49 24.5 70H12l20.5-30L10 10z"
          fill={fillColor}
        />

        {/* P */}
        <path
          d="M72 10h22c10 0 17.5 5.5 17.5 14.5s-7.5 14.5-17.5 14.5H84v21H72V10zm12 11v9h10c4 0 6.5-1.5 6.5-4.5s-2.5-4.5-6.5-4.5H84z"
          fill={fillColor}
        />

        {/* L */}
        <path
          d="M120 10h12v48h19v12h-31V10z"
          fill={fillColor}
        />

        {/* A - Stylized with a play icon in negative space */}
        <path
          d="M158 70L177.5 10h11L208 70H195.5l-4-14h-16.5l-4 14H158zm23.5-24.5l-5.7-18.5-5.7 18.5h11.4z"
          fill={fillColor}
        />
        {/* Stylized play button triangle inside the "A" region */}
        <path
          d="M176.5 30l10.5 6-10.5 6V30z"
          fill={playColor}
        />

        {/* Y */}
        <path
          d="M216 10h12.5l12.5 24 12.5-24H266l-20.5 32v28H233.5V42L216 10z"
          fill={fillColor}
        />

        {/* 5 */}
        <path
          d="M275 10h26v10.5H286.5v12.5c2.5-1 6-1.5 9-1.5 8.5 0 14.5 5 14.5 14s-6 14.5-15 14.5c-7.5 0-13-3.5-15-7.5l10-6c1.5 2 3.5 3.5 6 3.5 3.5 0 5-2 5-5s-1.5-5-5-5c-3 0-6.5 1.5-8.5 3L275 10z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};
