# SEO — Luxury ERP Landing Page

---

## Strategy

Although Luxury ERP is a SaaS application (behind login), the **landing/marketing site** must rank for high-intent keywords:

- "ERP para empresas de lujo" / "ERP for luxury brands"
- "Software de inventario para moda de lujo"
- "CRM para joyerías"
- "Sistema de facturación para hoteles de lujo"

We optimize for both organic (Google) and social previews (LinkedIn, Twitter, WhatsApp).

---

## Technical SEO

### Metadata

Every page uses `next/metadata`:

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: "Luxury Enterprises — ERP for Luxury Brands",
    template: "%s | Luxury Enterprises",
  },
  description:
    "All-in-one ERP platform designed for luxury fashion, jewelry, watches, and hospitality.",
  keywords: [
    "ERP luxury",
    "software inventario lujo",
    "CRM alta joyería",
    "facturación hoteles lujo",
  ],
  authors: [{ name: "Luxury Enterprises" }],
  creator: "Luxury Enterprises",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Luxury Enterprises",
    title: "Luxury Enterprises — ERP for Luxury Brands",
    description: "...",
    url: "https://luxuryenterprises.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Enterprises",
    description: "...",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
```

### Sitemap

```typescript
// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://luxuryenterprises.com";
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/features`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/pricing`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly", priority: 0.4 },
  ];
}
```

### Robots

```typescript
// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/"],
    },
    sitemap: "https://luxuryenterprises.com/sitemap.xml",
  };
}
```

### Canonical URLs

```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: "https://luxuryenterprises.com",
    languages: {
      en: "https://luxuryenterprises.com/en",
      es: "https://luxuryenterprises.com/es",
      fr: "https://luxuryenterprises.com/fr",
    },
  },
};
```

## Structured Data (JSON-LD)

```typescript
// Product schema for the ERP
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Luxury Enterprises",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "All-in-one ERP for luxury brands.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "124",
  },
};
```

## Core Web Vitals

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | < 2.5s | Next.js ISR/SSG, optimized images, CDN |
| FID | < 100ms | Minimal JavaScript, code splitting |
| CLS | < 0.1 | Explicit dimensions on all images, no layout shifts |

### Image Optimization

```typescript
import Image from "next/image";

<Image
  src="/hero.webp"
  alt="Luxury ERP Dashboard"
  width={1200}
  height={675}
  priority
  placeholder="blur"
/>;
```

## Internationalization (i18n)

- **Next.js App Router + next-intl** for routing.
- URL structure: `luxuryenterprises.com/en/`, `luxuryenterprises.com/es/`.
- hreflang tags auto-generated via `alternates.languages`.

## Blog Strategy

- `/blog` subdirectory with category and tag pages.
- Each blog post has its own `article` structured data.
- Internal linking between related posts and feature pages.
- Pillar content: "Ultimate Guide to ERP for Luxury Brands."

## Monitoring

- **Google Search Console** — index coverage, search queries.
- **Google Analytics 4** — traffic, user behavior.
- **Lighthouse CI** — Core Web Vitals in CI pipeline.
- **Ahrefs / Semrush** — keyword tracking (optional).

---

> The marketing site is built with SEO as a primary requirement, not an afterthought. Every page is optimized before deploy.
