import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./_components/providers/NextAuthProvider";
import { Toaster } from "sonner";
import { TanStackProvider } from "./_components/providers/TansStackProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saasify",
  description: "An Ai Powered Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <TanStackProvider>
          <body className={inter.className}>
            {children}
            <Toaster />
          </body>
        </TanStackProvider>
      </NextAuthProvider>
    </html>
  );
}
