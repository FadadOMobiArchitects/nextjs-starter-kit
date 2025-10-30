import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export default async function Providers({
  children,
}: Readonly<{ children: ReactNode }>) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
      <Toaster />
    </NextIntlClientProvider>
  );
}
