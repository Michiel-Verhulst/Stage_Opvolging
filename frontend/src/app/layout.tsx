import "./globals.css";

import Providers from "@/components/Providers";
import Navbar from "@/components/navbar/Navbar";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/components/language-toggle/LanguageContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="min-h-full pb-2">
        <LanguageProvider>
          <Providers>
            <Navbar />
            <Toaster />
            <main className="h-full">{children}</main>
          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
export const metadata: Metadata = {
  title: "StageBegeleiding",
  description: "Beste app",
  icons: ["./ucll.png"],
};
