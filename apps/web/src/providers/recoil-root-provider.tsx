"use client";
import { RecoilRoot } from "recoil";

export default function RecoilRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
