"use server";

import { AuthConfig } from "@/app/api/auth/[...nextauth]/config";
import { getServerSession } from "next-auth";

const getUserSession = async () => {
  const session = await getServerSession(AuthConfig);

  return session;
};

export default getUserSession;
