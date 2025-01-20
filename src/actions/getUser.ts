import { AuthConfig } from "@/app/api/auth/[...nextauth]/config";
import { getServerSession } from "next-auth";
import prisma from "../../prisma/client";

const getUser = async () => {
  try {
    const session = await getServerSession(AuthConfig);

    if (!session?.user?.email) {
      return null;
    }

    const userEmail = session.user?.email;

    const user = prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getUser;
