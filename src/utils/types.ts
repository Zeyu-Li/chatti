import type { NextApiRequest, NextApiResponse } from "next";

export interface ServerSidePropsContext {
  req: NextApiRequest;
  res: NextApiResponse;
}
