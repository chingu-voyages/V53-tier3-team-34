import { AuthConfig } from "@/app/api/auth/[...nextauth]/config";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "../ui/button";
import LoginButton from "./LoginButton";

const LoginOrRegisterButtons = async () => {
  const session = await getServerSession(AuthConfig);

  return (
    <div className="flex flex-col gap-4 row-start-1 items-center">
      {session ? (
        <div className="flex gap-4 justify-center items-center">
          <div className="font-bold">{session.user?.email}</div>
          <Button variant="secondary">
            <Link href="/api/auth/signout">Sign out</Link>
          </Button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Button variant="secondary">
            <Link href="/register">Register</Link>
          </Button>
          <LoginButton />
        </div>
      )}
    </div>
  );
};

export default LoginOrRegisterButtons;
