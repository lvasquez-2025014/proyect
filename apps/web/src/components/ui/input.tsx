import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className = '', ...props }, ref) => {
    return (
      <div className="relative mb-8">
        <input
          ref={ref}
          id={id}
          className={`w-full bg-transparent border-b border-white/[0.15] pb-3 pt-1 text-sm text-text-primary outline-none transition-colors duration-500 focus:border-b-transparent peer ${className}`}
          placeholder=" "
          {...props}
        />
        <label
          htmlFor={id}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-white/35 tracking-[0.08em] transition-all duration-500 peer-focus:-top-3 peer-focus:text-[0.7rem] peer-focus:text-accent peer-focus:tracking-[0.12em] peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:text-accent"
        >
          {label}
        </label>
        <span className="absolute bottom-0 left-0 w-full h-px bg-accent scale-x-0 origin-left transition-transform duration-700 peer-focus:scale-x-100" />
      </div>
    );
  }
);

Input.displayName = 'Input';
export { Input, type InputProps };
