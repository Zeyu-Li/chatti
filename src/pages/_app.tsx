import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Kanit } from "next/font/google";
import Heading from "~/components/SEO/Heading";

// If loading a variable font, you don't need to specify the font weight
// const open_sans = Open_Sans({ subsets: ["latin"] });
const kanit = Kanit({
  subsets: ["latin"],
  weight: "400",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Heading />
      <span className={kanit.className}>
        <Component {...pageProps} />
      </span>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
