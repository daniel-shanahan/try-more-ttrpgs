import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Try More TTRPGs",
  description: "Get out of your comfort zone and try new TTRPGs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-emerald-100`}>
        {/* <nav className="fixed bg-emerald-700 text-emerald-100 py-4 px-6 w-full flex justify-between items-center">
          <span className="text-xl font-medium">Try More TTRPGs</span>
          <button className="rounded-lg bg-emerald-100 text-emerald-700 font-semibold shadow px-4 py-2 hover:shadow-xl hover:bg-emerald-50 hover:text-emerald-800 transition motion-reduce:transition-none">
            Add Game
          </button>
        </nav> */}
        {children}
      </body>
    </html>
  );
}
