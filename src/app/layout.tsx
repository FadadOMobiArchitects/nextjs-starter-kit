import { Geist, Geist_Mono } from "next/font/google";
import { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Starter Kit Next.js",
  description:
    "A starter kit for Next.js applications with i18n, authentication, and more.",
  authors: [{ name: "Oussama Fadad" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  return (
    <html lang={cookieStore.get("NEXT_LOCALE")?.value === "en" ? "en" : "fr"}>
      <body
        className={`${geistSans.className} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
