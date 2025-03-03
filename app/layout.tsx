import { Inter } from "next/font/google";
import StoreProvider from "@/lib/store/StoreProvider";
import OrbitProvider from "@/lib/orbit/orbit-provider";
import StyledComponentsRegistry from '@/lib/orbit/registry';
import React from "react";

import "@/lib/globals.css";
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en" className="h-full">
        <body
          className={`${inter.variable} antialiased h-full`}
        >
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
