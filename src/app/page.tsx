import { AboutBrand } from "@/components/home/AboutBrand";
import { BrandIntro } from "@/components/home/BrandIntro";
import { Collections } from "@/components/home/Collections";
import { Gallery } from "@/components/home/Gallery";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Inquiry } from "@/components/home/Inquiry";
import { SignatureExperience } from "@/components/home/SignatureExperience";
import { Testimonials } from "@/components/home/Testimonials";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ivory focus:px-4 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="content">
        <Hero />
        <BrandIntro />
        <Collections />
        <SignatureExperience />
        <HowItWorks />
        <Gallery />
        <AboutBrand />
        <Testimonials />
        <Inquiry />
      </main>
      <Footer />
    </>
  );
}
