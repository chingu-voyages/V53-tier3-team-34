"use client";
import { ThemeProvider } from "@/providers/themeProvider";
import { SessionProvider } from "next-auth/react";
import PreviewEvent from "./_templates/PreviewEvent";

export default function Page() {
  return (
    <SessionProvider>
      <ThemeProvider>
        <PreviewEvent />
      </ThemeProvider>
    </SessionProvider>
  );
}
