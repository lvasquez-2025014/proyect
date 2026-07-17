type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

interface TypographyProps {
  as?: HeadingLevel;
  variant?: 'ui' | 'serif' | 'serif-italic';
  color?: 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
  className?: string;
}

const fontMap = {
  ui: 'font-ui',
  serif: 'font-serif',
  'serif-italic': 'font-serif italic',
};
const colorMap = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  accent: 'text-accent',
};
const sizeMap: Record<HeadingLevel, string> = {
  h1: 'text-[2rem] leading-[1.2] md:text-[3.1rem]',
  h2: 'text-xl leading-snug',
  h3: 'text-lg leading-snug',
  h4: 'text-base leading-snug',
};

export function Typography({
  as: Tag = 'h2',
  variant = 'ui',
  color = 'primary',
  children,
  className = '',
}: TypographyProps) {
  return (
    <Tag className={`${fontMap[variant]} ${sizeMap[Tag]} ${colorMap[color]} ${className}`}>
      {children}
    </Tag>
  );
}
