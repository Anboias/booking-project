import { Inter } from "next/font/google";

import "../lib/globals.css";

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
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} antialiased h-full`}
      >
        {children}
      </body>
    </html>
  );
}
