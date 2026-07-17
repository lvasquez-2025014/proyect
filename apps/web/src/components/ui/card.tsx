import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ glow = true, children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative w-full max-w-[440px] overflow-hidden rounded-xl bg-gradient-to-br from-[rgba(22,22,22,0.5)] to-[rgba(10,10,10,0.75)] backdrop-blur-[50px] saturate-[140%] border border-hairline shadow-[0_4px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05),0_40px_120px_rgba(0,0,0,0.85)] transition-shadow duration-500 ${className}`}
        {...props}
      >
        {glow && (
          <div className="absolute inset-0 rounded-xl pointer-events-none border border-transparent opacity-45 transition-opacity duration-500 [background:linear-gradient(135deg,rgba(214,179,106,0.25)_0%,rgba(255,255,255,0.02)_50%,rgba(214,179,106,0.25)_100%)_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] group-hover:opacity-95" />
        )}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')]" />
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
export { Card, type CardProps };
