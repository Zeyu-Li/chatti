import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { type AppProps } from "next/app";
import Header from "~/components/common/Header";
import { useRouter } from "next/router";
import { homeRedirect } from "~/utils/homeRedirect";
import Title from "~/components/SEO/Title";
import { ServerSidePropsContext } from "~/utils/types";

export default function Login({ providers }: { providers: AppProps }) {
  const { data: sessionData } = useSession();
  const router = useRouter();

  if (sessionData) {
    router.push("/home").catch((err) => {
      console.error(err);
    });
  }

  return (
    <>
      <Header session={sessionData} />
      <Title title="PlayDate | Login" />
      <main className="flex min-h-screen flex-col items-center justify-center bg-primary">
        <div className="w-full max-w-6xl -lg:px-8">
          <div className="flex min-h-screen w-full flex-row items-center text-center -lg:flex-col -lg:pt-32">
            <div
              className="flex flex-1 flex-col justify-around rounded-2xl border-2 border-textPrimary p-40 px-4"
              id="top"
            >
              <div>
                <h1 className="text-7xl font-bold -lg:text-6xl">Sign in</h1>
              </div>
              <div>
                {/* call to action button of try now styled like mailchimp */}
                {/* popout on hover */}
                {Object.values(providers).map((provider) => (
                  <div key={provider.id}>
                    <button
                      onClick={() =>
                        void signIn(provider.id, {
                          callbackUrl: "/home",
                        })
                      }
                      title="Sign in with Google"
                      className="button-animation mt-20 rounded-full border-2 border-textPrimary px-10 py-3 text-2xl text-textPrimary no-underline transition"
                    >
                      Sign in with Google {">"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-1 justify-end">
              {/* <img
                src="/common/image/girl.png"
                alt="PlayDate avatar"
                className="h-full"
              /> */}
              <video
                autoPlay
                loop
                muted
                className="h-full"
                src="/common/animation/wave.webm"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: ServerSidePropsContext) {
  const session = await getSession(context);
  console.warn("session", session);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
      props: {},
    };
  }

  const providers = await getProviders();

  return {
    props: { providers },
  };
}
