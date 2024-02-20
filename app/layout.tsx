import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AddGameButton from "@/components/AddGameButton";

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
        <nav className="fixed bg-emerald-700 text-emerald-100 py-4 px-6 w-full flex justify-between items-center">
          <span className="text-xl font-medium">Try More TTRPGs</span>
          <AddGameButton />
        </nav>
        {children}
      </body>
    </html>
  );
}
