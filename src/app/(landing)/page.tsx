
import { Hero } from "@/components/landing/Hero";
import Footer from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Loader = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-gray-50/5">
    <div className="relative w-full max-w-sm h-12 rounded-md overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-emerald-300 animate-shimmer" />
    </div>
  </div>
);

const AboutSection = dynamic(() => import("@/components/landing/About"), {
  loading: () => <Loader />,
});

export default async function LandingPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Suspense fallback={<Loader />}>

          <Suspense fallback={<Loader />}>
            <AboutSection />
          </Suspense>

        </Suspense>
      </main>
      <Footer />
    </>
  );
}
