"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <Button onClick={() => signIn("email", { callbackUrl: "/events" })}>
      Login
    </Button>
  );
};

export default LoginButton;
