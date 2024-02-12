import Footer from "~/components/common/Footer";
import Header from "~/components/common/HeaderSessionAuto";
import Hero from "~/components/landing/Hero";
import Showcase from "~/components/landing/Showcase";
import TryIt from "~/components/landing/TryIt";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-primary">
        <Hero />
        <Showcase />
        <TryIt />
        <Footer />
      </main>
    </>
  );
}
