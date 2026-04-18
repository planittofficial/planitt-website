'use client';

import { AnimatePresence, motion, useMotionValue, useTransform, type Variants } from 'framer-motion';
import { useMemo, useState } from 'react';

type AnimatedTextProps = {
  text: string;
  hoverText?: string;
  className?: string;
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.98,
  },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 22,
      mass: 0.7,
    },
  },
  hover: {
    y: -6,
    scale: 1.03,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 18,
      mass: 0.7,
    },
  },
};

export default function AnimatedText({ text, hoverText, className = '' }: AnimatedTextProps) {
  const [isActive, setIsActive] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useTransform(pointerY, [-100, 100], [10, -10]);
  const rotateY = useTransform(pointerX, [-100, 100], [-10, 10]);

  const displayText = useMemo(() => (isActive && hoverText ? hoverText : text), [isActive, hoverText, text]);
  const lines = useMemo(() => displayText.split('\n'), [displayText]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - target.left) / target.width - 0.5;
    const relativeY = (event.clientY - target.top) / target.height - 0.5;

    pointerX.set(relativeX * 80);
    pointerY.set(relativeY * 80);
  };

  return (
    <motion.div
      className="inline-block"
      style={{ perspective: 900 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
        setIsActive(false);
      }}
      onHoverStart={() => setIsActive(true)}
      onHoverEnd={() => setIsActive(false)}
    >
      <motion.h1
        className={`max-w-full break-words [overflow-wrap:anywhere] ${className}`}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        animate={isActive ? { scale: 1.02 } : { scale: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={displayText}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {lines.map((line, lineIndex) => (
              <span key={`line-${lineIndex}`} className="block">
                {Array.from(line).map((character, index) => (
                  <motion.span
                    key={`${lineIndex}-${character}-${index}`}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={isActive ? 'hover' : undefined}
                    className="inline-block will-change-transform"
                  >
                    {character === ' ' ? '\u00A0' : character}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.h1>
    </motion.div>
  );
}
