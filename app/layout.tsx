import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || process.env.DEPLOY_PRIME_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: "Custom Chocolates in Hyderabad | NS CHOCOROOM",
  description: "Discover customized and designer chocolates by NS CHOCOROOM, with delivery throughout Hyderabad, Telangana. Browse the collection and contact us on Instagram.",
  keywords: ["custom chocolates Hyderabad", "designer chocolates Hyderabad", "chocolate hampers Hyderabad", "handmade chocolates", "NS CHOCOROOM"],
  creator: "NS CHOCOROOM",
  publisher: "NS CHOCOROOM",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "NS CHOCOROOM",
    title: "Custom Chocolates in Hyderabad | NS CHOCOROOM",
    description: "Customized and designer chocolates, with delivery throughout Hyderabad, Telangana.",
    images: [{ url: "/instagram-DBW5SX8yMA3.jpg", alt: "Custom chocolate hampers by NS CHOCOROOM" }],
  },
  twitter: { card: "summary_large_image", title: "Custom Chocolates in Hyderabad | NS CHOCOROOM", description: "Customized and designer chocolates, delivered throughout Hyderabad.", images: ["/instagram-DBW5SX8yMA3.jpg"] },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#24150e" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "NS CHOCOROOM",
    url: siteUrl,
    telephone: "+919885454762",
    areaServed: "Hyderabad, Telangana",
    sameAs: ["https://www.instagram.com/ns_chocoroom/"],
  };
  return <html lang="en"><head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} /></head><body>{children}</body></html>;
}
