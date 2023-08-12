import { api } from "~/utils/api";
import { getProviders, signOut, useSession } from "next-auth/react";
import { type AppProps } from "next/app";
import Header from "~/components/common/Header";
import { useRouter } from "next/router";

export default function Logout({ providers }: { providers: AppProps }) {
  const { data: sessionData } = useSession();

  if (sessionData) {
    try {
      signOut();
    } catch {
      console.log("error");
    }
  }

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-primary">
        {/* pulse content */}

        <div className="w-full max-w-6xl -lg:px-8">
          <div className="flex h-screen w-full animate-pulse flex-row items-center bg-white/80 -lg:flex-col"></div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  context.res.writeHead(302, { Location: "/login" });
  context.res.end();
  return {};
}
