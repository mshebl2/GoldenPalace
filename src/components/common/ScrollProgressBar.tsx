'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-[#D4A63D] via-[#F5D77A] to-[#D4A63D] shadow-[0_0_12px_rgba(212,166,61,0.8)]"
        style={{
          scaleX,
          transformOrigin: '100% 50%', // Right to left for Arabic RTL
        }}
      />
    </div>
  );
};
