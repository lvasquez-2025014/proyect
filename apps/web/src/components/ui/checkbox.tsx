import { InputHTMLAttributes, forwardRef } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, className = '', ...props }, ref) => {
    return (
      <label htmlFor={id} className="inline-flex items-center gap-2 cursor-pointer select-none group">
        <input ref={ref} id={id} type="checkbox" className="hidden peer" {...props} />
        <span className="w-3.5 h-3.5 border border-white/20 rounded-[3px] transition-all duration-300 peer-checked:bg-accent peer-checked:border-accent group-hover:border-white/40">
          <svg
            className="opacity-0 peer-checked:opacity-100 transition-opacity"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M3 7l3 3 5-5"
              stroke="#050505"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="text-xs text-text-secondary">{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
export { Checkbox };
