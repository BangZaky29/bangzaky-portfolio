import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion, useInView } from 'motion/react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  chars?: string;
  triggerOnHover?: boolean;
}

const DEFAULT_CHARS = '!<>-_\\/[]{}—=+*^?#________ABCDEF0123456789';

/**
 * Terminal-style character scramble / decode reveal
 * Perfect for section eyebrows like "01 / ARCHITECTURAL STATEMENT"
 */
export function ScrambleText({
  text,
  className = '',
  scrambleSpeed = 30,
  chars = DEFAULT_CHARS,
  triggerOnHover = false,
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayText, setDisplayText] = useState(text);
  const isScrambling = useRef(false);

  const startScramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;

    const length = text.length;
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '/' || char === '-') return char;
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= length) {
        clearInterval(interval);
        setDisplayText(text);
        isScrambling.current = false;
      }

      iteration += 1 / 2;
    }, scrambleSpeed);
  };

  useEffect(() => {
    if (isInView) {
      startScramble();
    }
  }, [isInView, text]);

  return (
    <span
      ref={ref}
      onMouseEnter={triggerOnHover ? startScramble : undefined}
      className={`font-mono inline-block tracking-widest ${className}`}
    >
      {displayText}
    </span>
  );
}

interface RevealTitleProps {
  text: string;
  className?: string;
  delay?: number;
  highlightWords?: string[];
  highlightClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span';
}

/**
 * 3D masked slide-up title animation
 * Slides words up from an overflow-hidden mask with 3D rotateX and spring dampening
 */
export function RevealTitle({
  text,
  className = '',
  delay = 0,
  highlightWords = [],
  highlightClassName = '',
  as = 'h2',
}: RevealTitleProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Component = as;

  const words = text.split(' ');

  return (
    <Component ref={ref} className={`flex flex-wrap gap-x-3 gap-y-1 ${className}`}>
      {words.map((word, index) => {
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === word.toLowerCase() || word.toLowerCase().includes(hw.toLowerCase())
        );

        return (
          <span key={index} className="overflow-hidden inline-block py-1">
            <motion.span
              initial={{ y: '110%', opacity: 0, rotateX: 35 }}
              animate={isInView ? { y: '0%', opacity: 1, rotateX: 0 } : {}}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 18,
                delay: delay + index * 0.05,
              }}
              style={{ transformOrigin: 'top center', perspective: 1000 }}
              className={`inline-block ${isHighlight && highlightClassName ? highlightClassName : ''}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Component>
  );
}

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  yOffset?: number;
}

/**
 * Smooth fade up reveal for paragraphs and descriptions
 */
export function FadeUp({
  children,
  delay = 0.1,
  duration = 0.6,
  className = '',
  yOffset = 24,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

