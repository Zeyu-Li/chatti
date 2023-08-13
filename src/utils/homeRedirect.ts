import { getProviders, getSession } from "next-auth/react";
import { ServerSidePropsContext } from "./types";

export async function homeRedirect(context: ServerSidePropsContext) {
  const providers = await getProviders();
  const session = await getSession(context);

  if (session) {
    context.res.writeHead(302, { Location: "/home" });
    context.res.end();
    return {
      props: { session },
    };
  }
  return {
    props: { providers },
  };
}
