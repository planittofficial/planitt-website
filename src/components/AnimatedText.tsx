'use client';

import { motion, type Variants } from 'framer-motion';

type AnimatedTextProps = {
  text: string;
  className?: string;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.024,
      delayChildren: 0.05,
    },
  },
  hover: {
    transition: {
      staggerChildren: 0.018,
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 22,
      mass: 0.8,
    },
  },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 24,
      mass: 0.7,
    },
  },
  hover: {
    y: -10,
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 22,
      mass: 0.7,
    },
  },
};

export default function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const lines = text.split('\n');

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={containerVariants}
      className={className}
    >
      {lines.map((line, lineIndex) => (
        <span key={`line-${lineIndex}`} className="block">
          {Array.from(line).map((character, index) => (
            <motion.span
              key={`${lineIndex}-${character}-${index}`}
              variants={letterVariants}
              className="inline-block will-change-transform"
            >
              {character === ' ' ? '\u00A0' : character}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}
