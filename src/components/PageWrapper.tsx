"use client";
import { useTheme } from "@/utils/themeContext";

type childrenProp = {
  children: React.ReactNode;
};

export default function PageWrapper({ children }: childrenProp) {
  const { background } = useTheme();
  return <div style={{ background: background }}>{children}</div>;
}
