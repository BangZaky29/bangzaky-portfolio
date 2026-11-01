import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#101726] border border-cyan-400/60 text-white font-mono text-xs shadow-[0_8px_30px_rgba(6,182,212,0.3)] backdrop-blur-md"
      >
        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>{message}</span>
      </motion.div>
    </AnimatePresence>
  );
}

