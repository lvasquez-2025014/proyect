interface BadgeProps {
  variant?: 'default' | 'accent' | 'outline';
  children: React.ReactNode;
  className?: string;
}

const variantMap = {
  default: 'bg-white/5 text-text-secondary',
  accent: 'bg-accent/10 text-accent',
  outline: 'border border-hairline text-text-primary',
};

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] font-medium ${variantMap[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
