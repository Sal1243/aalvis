import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import { LOCALES } from "@/lib/locales";
import { SITE } from "@/lib/site";
import { IM } from "@/lib/images";
import Chrome from "@/components/chrome";
import "@/styles/base.css";
import "@/styles/globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});
const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = (routing.locales as readonly string[]).includes(params.locale) ? params.locale : routing.defaultLocale;
  const m = (await import(`../../../messages/${locale}.json`)).default as {
    meta: { home: { title: string; description: string } };
  };
  const languages: Record<string, string> = { "x-default": `${SITE.url}/en/` };
  for (const l of LOCALES) languages[l] = `${SITE.url}/${l}/`;
  return {
    title: m.meta.home.title,
    description: m.meta.home.description,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: `/${locale}/`, languages },
    openGraph: {
      type: "website",
      siteName: "AALVIS",
      title: m.meta.home.title,
      description: m.meta.home.description,
      locale,
      alternateLocale: LOCALES.filter((l) => l !== locale),
      url: `${SITE.url}/${locale}/`,
      images: [{ url: IM.hero.url, width: IM.hero.w, height: IM.hero.h, alt: "AALVIS — gold and diamond jewellery" }],
    },
    twitter: { card: "summary_large_image", title: m.meta.home.title, description: m.meta.home.description },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "AALVIS",
        url: SITE.url,
        description: "International maison of gold and diamond jewellery.",
        logo: IM.hero.url,
      },
      {
        "@type": "WebSite",
        name: "AALVIS",
        url: SITE.url,
        inLanguage: locale,
      },
    ],
  };
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${cormorant.variable} ${jost.variable} font-sans`}>
        <NextIntlClientProvider messages={messages}>
          <Chrome />
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
