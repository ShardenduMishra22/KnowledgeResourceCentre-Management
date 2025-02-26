import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import localFont from "next/font/local";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { auth } from "@/auth"
import "./globals.css";

const ibmPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  title: {
    template: '%s | Li-Breeze',
    default: 'Li-Breeze - A Library Management System made By Shardendu Mishra',
  },
  description: 'An Application That can be used to manage Library System of college.',
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <html lang="en" className="dark">
      <SessionProvider session={session}>
        <body className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`} >
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
