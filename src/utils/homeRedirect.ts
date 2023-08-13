import { getProviders, getSession } from "next-auth/react";

export async function homeRedirect(context: any) {
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
