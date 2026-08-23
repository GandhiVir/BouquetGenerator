import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";

export const metadata: Metadata = {
  title: "Bouquet Studio",
  description: "Create custom digital bouquets online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[radial-gradient(circle_at_top,#fffaf8,white_35%,#f8f2ec_100%)] text-stone-800">
        <Header />
        {children}
      </body>
    </html>
  );
}
