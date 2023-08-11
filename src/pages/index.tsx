import { signIn, signOut, useSession } from "next-auth/react";
import Heading from "~/components/SEO/Heading";
import Footer from "~/components/common/Footer";
import Header from "~/components/common/Header";
import Hero from "~/components/landing/Hero";
import Showcase from "~/components/landing/Showcase";
import TryIt from "~/components/landing/TryIt";
import Why from "~/components/landing/Why";
import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

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

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
