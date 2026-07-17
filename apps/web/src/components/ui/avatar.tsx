interface AvatarProps {
  src?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' };

export function Avatar({ src, initials, size = 'md', className = '' }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt="avatar"
        className={`rounded-full object-cover ${sizeMap[size]} ${className}`}
      />
    );
  }
  return (
    <div
      className={`rounded-full bg-white/10 flex items-center justify-center font-ui font-medium text-text-secondary ${sizeMap[size]} ${className}`}
    >
      {initials || '?'}
    </div>
  );
}
