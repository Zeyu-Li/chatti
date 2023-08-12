import { getProviders, getSession } from "next-auth/react";

export async function protectedPage(context: any) {
  const providers = await getProviders();
  const session = await getSession(context);

  if (!session) {
    context.res.writeHead(302, { Location: "/login" });
    context.res.end();
    return {};
  }
  return {
    props: { providers },
  };
}
