"use client";
import { usePathname } from "next/navigation";
import Footer from "./footer";

const removeFooterFromPaths = ["/problem", "/signin"];

export default function FooterProvider() {

  const pathname = usePathname();

  return (
    <>
      {removeFooterFromPaths.some(path => pathname.startsWith(path)) ? (
        <></>
      ) : (
        <Footer />
      )}
    </>
  );
}
