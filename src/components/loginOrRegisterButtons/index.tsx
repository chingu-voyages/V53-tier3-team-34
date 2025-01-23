import getUserSession from "@/actions/getUserSession";
import Link from "next/link";
import { Button } from "../ui/button";
import LoginButton from "./LoginButton";
import LogOutButton from "./LogoutButton";

const LoginOrRegisterButtons = async () => {
  const session = await getUserSession();
  return (
    <div className="flex flex-col gap-4 row-start-1 items-center">
      {session ? (
        <div className="flex gap-4 justify-center items-center">
          <div className="font-bold">{session.user?.email}</div>
          <LogOutButton />
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
