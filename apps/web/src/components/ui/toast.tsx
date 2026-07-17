'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const typeStyles = {
  success: 'bg-accent/10 border-accent/30 text-accent',
  error: 'bg-red-500/10 border-red-500/30 text-red-400',
  info: 'bg-white/5 border-hairline text-text-secondary',
};

export function Toast({ message, type = 'info', onClose, duration = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 rounded-lg border px-5 py-3 text-sm backdrop-blur-xl transition-all duration-300 ${typeStyles[type]} ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
    >
      {message}
    </div>
  );
}
