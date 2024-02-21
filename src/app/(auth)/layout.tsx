import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "../../app/globals.css";
import { AuthLayout } from "@/components/Layout";
import { SessionProvider } from "@/context/SessionProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Day to dusk",
  description: "Day to dusk app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-sans`}>
        <SessionProvider>
          <AuthLayout>{children}</AuthLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
