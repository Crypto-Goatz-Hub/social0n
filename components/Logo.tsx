'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { text: 'text-lg', box: 'text-sm px-1.5 py-0.5' },
    md: { text: 'text-2xl', box: 'text-base px-2 py-1' },
    lg: { text: 'text-4xl', box: 'text-xl px-3 py-1.5' },
  };

  return (
    <motion.div
      className="flex items-center gap-0.5"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      {/* Opening bracket */}
      <span className={`logo-bracket ${sizes[size].text}`}>[</span>

      {/* SOCIAL - gradient text */}
      <span className={`logo-social ${sizes[size].text} tracking-tight`}>
        SOCIAL
      </span>

      {/* 0N - in green box with white border */}
      <span className={`logo-on-box ${sizes[size].box} ml-1`}>
        0N
      </span>

      {/* Closing bracket */}
      <span className={`logo-bracket ${sizes[size].text}`}>]</span>
    </motion.div>
  );
}

export function LogoIcon() {
  return (
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-teal to-brand-green flex items-center justify-center shadow-glow-brand">
      <span className="text-white font-bold text-sm">S0N</span>
    </div>
  );
}
