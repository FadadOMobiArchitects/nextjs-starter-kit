import { Locale, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Providers from "@/components/providers/providers";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  return <Providers>{children}</Providers>;
}
