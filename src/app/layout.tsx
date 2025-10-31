import { Geist, Geist_Mono } from "next/font/google";
import { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "fr";

  return (
    <html lang={locale} dir="ltr">
      <body
        className={`${geistSans.className} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
