import { setRequestLocale } from "next-intl/server";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Collections from "@/components/collections";
import Featured from "@/components/featured";
import Story from "@/components/story";
import Craft from "@/components/craft";
import Campaign from "@/components/campaign";
import Gallery from "@/components/gallery";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";
import WhatsAppFab from "@/components/whatsapp-fab";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }, { locale: "de" }, { locale: "es" }, { locale: "it" }, { locale: "pt" }, { locale: "nl" }];
}

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <div className="alv" data-locale={locale}>
      <Header />
      <main>
        <Hero />
        <Collections />
        <Featured />
        <Story />
        <Craft />
        <Campaign />
        <Gallery />
        <Testimonials />
        <Contact />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
