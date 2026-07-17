import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luxury Enterprises',
  description: 'Enterprise resource planning for luxury brands',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
