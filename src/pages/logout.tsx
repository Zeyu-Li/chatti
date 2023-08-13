import { signOut, useSession } from "next-auth/react";
import { type AppProps } from "next/app";
import Header from "~/components/common/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { ServerSidePropsContext } from "~/utils/types";

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

export async function getServerSideProps({ req, res }: ServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
}
