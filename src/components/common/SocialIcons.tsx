import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

/**
 * Modern Official WhatsApp Icon SVG (Pixel-perfect, crisp, brand-accurate)
 */
export const ModernWhatsAppIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size || 24}
    height={size || 24}
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M12.031 2C6.496 2 2 6.494 2 12.029c0 1.954.562 3.782 1.536 5.334L2 22l4.808-1.508a10.02 10.02 0 0 0 5.223 1.537c5.535 0 10.031-4.494 10.031-10.029C22.062 6.494 17.566 2 12.031 2zm0 18.286c-1.636 0-3.155-.472-4.444-1.285l-.319-.199-3.084.968.989-2.997-.208-.33a8.23 8.23 0 0 1-1.229-4.389c0-4.57 3.717-8.286 8.295-8.286 4.577 0 8.294 3.716 8.294 8.286 0 4.57-3.717 8.286-8.294 8.286zm4.764-6.195c-.261-.131-1.547-.763-1.787-.85-.24-.087-.414-.131-.588.131-.174.262-.676.85-.828 1.025-.152.174-.305.196-.566.065-.262-.131-1.104-.407-2.103-1.298-.778-.693-1.303-1.55-1.455-1.811-.153-.262-.016-.404.115-.534.118-.117.262-.305.392-.458.131-.153.175-.262.262-.436.087-.175.044-.327-.022-.458-.065-.131-.588-1.417-.806-1.942-.212-.51-.427-.44-.588-.448-.152-.008-.327-.01-.501-.01-.175 0-.458.065-.698.327-.24.262-.915.894-.915 2.18s.937 2.529 1.068 2.703c.131.175 1.843 2.813 4.464 3.945.624.269 1.11.43 1.49.551.627.2 1.198.172 1.649.105.503-.075 1.547-.632 1.765-1.243.218-.611.218-1.134.153-1.243-.066-.109-.24-.175-.502-.305z" />
  </svg>
);

/**
 * Modern Sleek Phone / Call Icon SVG
 */
export const ModernPhoneIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size || 24}
    height={size || 24}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    <path d="M14.05 2a9 9 0 0 1 8 7.94" strokeWidth="2" opacity="0.75" />
    <path d="M14.05 6A5 5 0 0 1 18 10" strokeWidth="2" opacity="0.9" />
  </svg>
);

/**
 * Modern Instagram Brand SVG
 */
export const ModernInstagramIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size || 24}
    height={size || 24}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
  </svg>
);

/**
 * Modern X (Twitter) Official Vector SVG
 */
export const ModernXIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size || 24}
    height={size || 24}
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/**
 * Modern LinkedIn Official Vector SVG
 */
export const ModernLinkedInIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size || 24}
    height={size || 24}
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

/**
 * Modern YouTube Official Vector SVG
 */
export const ModernYouTubeIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size || 24}
    height={size || 24}
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

/**
 * Modern TikTok Vector SVG
 */
export const ModernTikTokIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size || 24}
    height={size || 24}
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.37 6.37 0 0 0-.86-.06A6.34 6.34 0 0 0 3.1 15.7a6.34 6.34 0 0 0 10.82 4.48c1.68-1.68 2.22-4.13 2.22-6.51V8.04c1.39 1 3.06 1.57 4.82 1.6v-3.5a4.84 4.84 0 0 1-1.37-.45z" />
  </svg>
);

/**
 * Modern Google Maps / Google Reviews SVG
 */
export const ModernGoogleMapsIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size || 24}
    height={size || 24}
    fill="none"
    className={className}
    {...props}
  >
    <path
      d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7.13 11.4 7.44 11.66.17.14.37.21.56.21s.39-.07.56-.21C12.87 21.4 20 15.25 20 10c0-4.42-3.58-8-8-8zm0 11.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Modern Google Local Guide Badge SVG
 */
export const GoogleLocalGuideStarBadge: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
  className = '',
}) => (
  <div
    style={{ width: size, height: size }}
    className={`relative rounded-full bg-[#EA4335] flex items-center justify-center shadow-md ring-2 ring-white shrink-0 ${className}`}
    title="Google Local Guide"
  >
    <svg
      viewBox="0 0 24 24"
      width={Math.round(size * 0.65)}
      height={Math.round(size * 0.65)}
      fill="white"
    >
      <path d="M12 2l2.4 6.9h7.2l-5.8 4.3 2.2 7-6-4.4-6 4.4 2.2-7-5.8-4.3h7.2z" />
    </svg>
  </div>
);

