import { signOut, useSession } from "next-auth/react";
import { type AppProps } from "next/app";
import Header from "~/components/common/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { ServerSidePropsContext } from "~/utils/types";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout({ providers }: { providers: AppProps }) {
  const { data: sessionData } = useSession();
  const router = useRouter();

  // useEffect(() => {
  if (sessionData) {
    try {
      signOut()
        .then(() => router.push("/login"))
        .catch((e) => console.error(e));
    } catch {
      console.log("error");
      router.push("/login").catch((err) => {
        console.error(err);
      });
    }
  }
  // }, [sessionData]);

  return (
    <>
      <Header session={sessionData} />
      <main className="flex min-h-screen flex-col items-center justify-center bg-primary">
        {/* pulse content */}

        <div className="w-full max-w-6xl -lg:px-8">
          <div className="flex min-h-screen w-full animate-pulse flex-row items-center bg-white/80 -lg:flex-col"></div>
        </div>
      </main>
    </>
  );
}
