import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextAuthProvider from "../providers/next-auth-provider";
import RecoilRootLayout from "../providers/recoil-root-provider";
import Navbar from "@/components/navbar/navbar";
import NavbarProfile from "@/components/navbar/navbar-profile";
import FooterProvider from "@/components/footer/footer-provider";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeStreax",
  description: "Your coding companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <RecoilRootLayout>
            <NextAuthProvider>
              <Toaster position="bottom-center" />
              <Navbar>
                <NavbarProfile />
              </Navbar>
              <div className="flex-grow flex flex-col">{children}</div>
              <FooterProvider />
            </NextAuthProvider>
          </RecoilRootLayout>
        </div>
      </body>
    </html>
  );
}
