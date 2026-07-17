interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = { sm: 'w-4 h-4 border-2', md: 'w-6 h-6 border-2', lg: 'w-8 h-8 border-3' };

export function Loader({ size = 'md', className = '' }: LoaderProps) {
  return (
    <span
      className={`inline-block rounded-full border-surface/20 border-t-accent animate-spin-slow ${sizeMap[size]} ${className}`}
    />
  );
}
