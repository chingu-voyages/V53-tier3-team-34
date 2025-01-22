"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const LogOutButton = () => {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/events/create" })}>
      Sign out
    </Button>
  );
};

export default LogOutButton;
