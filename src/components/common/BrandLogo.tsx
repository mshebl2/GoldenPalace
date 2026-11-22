'use client';

import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  variant?: 'horizontal' | 'vertical' | 'emblem';
  theme?: 'gold' | 'white' | 'dark' | 'light';
  className?: string;
  height?: number;
  href?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  className = '',
  height = 42,
  href = '/',
}) => {
  const imgSrc =
    variant === 'vertical'
      ? '/images/brand/golden-palace-logo.png'
      : variant === 'emblem'
      ? '/images/brand/emblem.png'
      : '/images/brand/logo-horizontal.png';

  const content = (
    <div className={`inline-flex items-center select-none shrink-0 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt="القصر الذهبي للدهانات والديكورات الحديثة"
        style={{ height: `${height}px`, width: 'auto' }}
        className="object-contain filter drop-shadow-[0_2px_8px_rgba(212,166,61,0.15)] transition-transform duration-300 hover:scale-[1.02]"
        loading="eager"
      />
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-block focus:outline-none shrink-0"
        title="القصر الذهبي للدهانات والديكورات الحديثة"
      >
        {content}
      </Link>
    );
  }

  return content;
};
