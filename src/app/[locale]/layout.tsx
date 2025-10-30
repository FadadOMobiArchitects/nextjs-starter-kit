import { Locale, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Providers from "@/providers/providers";
import { ReactNode } from "react";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  return <Providers>{children}</Providers>;
}
