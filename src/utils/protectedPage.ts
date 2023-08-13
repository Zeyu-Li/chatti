import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "~/server/auth";

export async function protectedPage(req: any, res: any) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.writeHead(302, { Location: "/login" });
    res.end();
    return {
      props: {},
    };
  }
  return {
    props: {
      session,
    },
  };
}
