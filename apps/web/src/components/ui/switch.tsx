'use client';

import { useState } from 'react';

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

export function Switch({ checked: initial = false, onChange, label }: SwitchProps) {
  const [checked, setChecked] = useState(initial);

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex items-center gap-2 cursor-pointer`}
    >
      <span
        className={`relative inline-flex h-5 w-9 rounded-full transition-colors duration-300 ${checked ? 'bg-accent' : 'bg-white/15'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-300 ${checked ? 'translate-x-4' : ''}`}
        />
      </span>
      {label && <span className="text-xs text-text-secondary">{label}</span>}
    </button>
  );
}
