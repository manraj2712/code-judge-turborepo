"use client";
import { usePathname } from "next/navigation";
import Footer from "./footer";

const removeFooterFromPaths = ["/problem","/signin"];

export default function FooterProvider() {
  return <>{!removeFooterFromPaths.includes(usePathname()) && <Footer />}</>;
}
