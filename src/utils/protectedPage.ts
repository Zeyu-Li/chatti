import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "~/server/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export async function protectedPage(req: NextApiRequest, res: NextApiResponse) {
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
