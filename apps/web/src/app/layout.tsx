import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextAuthProvider from "../providers/next-auth-provider";
import RecoilRootLayout from "../providers/recoil-root-provider";
import Navbar from "@/components/navbar/navbar";
import NavbarProfile from "@/components/navbar/navbar-profile";
import Footer from "@/components/footer/footer";
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
        <RecoilRootLayout>
          <NextAuthProvider>
            <Navbar>
              <NavbarProfile />
            </Navbar>
            {children}
            <Footer/>
          </NextAuthProvider>
        </RecoilRootLayout>
      </body>
    </html>
  );
}
