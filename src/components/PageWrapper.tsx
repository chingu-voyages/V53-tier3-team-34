"use client";
import { useCreateEventTheme } from "@/app/create/provider";

type childrenProp = {
  children: React.ReactNode;
};

export default function PageWrapper({ children }: childrenProp) {
  const { theme } = useCreateEventTheme();
  return <div className={theme.pageBgImage}>{children}</div>;
}
