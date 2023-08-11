import Heading from "~/components/SEO/Heading";
import Footer from "~/components/common/Footer";
import Header from "~/components/common/Header";
import Hero from "~/components/landing/Hero";
import Showcase from "~/components/landing/Showcase";
import TryIt from "~/components/landing/TryIt";
import Why from "~/components/landing/Why";

export default function Home() {
  return (
    <>
      <Heading />
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-primary">
        <Hero />
        <Showcase />
        <Why />
        <TryIt />
        <Footer />
      </main>
    </>
  );
}
