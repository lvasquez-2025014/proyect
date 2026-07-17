import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const variantStyles = {
  primary:
    'bg-gradient-to-b from-accent-light via-[#CFA95E] to-accent-dark text-surface shadow-[0_4px_15px_rgba(158,122,49,0.2),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(158,122,49,0.4),inset_0_1px_0_rgba(255,255,255,0.55)] active:translate-y-0.5 active:scale-[0.98]',
  ghost: 'bg-transparent text-text-secondary hover:text-text-primary',
  outline:
    'border border-hairline bg-transparent text-text-primary hover:bg-white/5',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-[1.15rem] text-[0.9rem]',
  lg: 'px-8 py-4 text-base',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, className = '', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`relative overflow-hidden rounded-md font-ui font-semibold uppercase tracking-[0.12em] transition-all duration-500 ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        {...props}
      >
        {variant === 'primary' && (
          <span className="absolute inset-0 rounded-md border border-white/25 pointer-events-none" />
        )}
        {loading && (
          <span className="mr-2 inline-block w-4 h-4 border-2 border-surface/20 border-t-surface rounded-full animate-spin-slow align-middle" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button, type ButtonProps };
