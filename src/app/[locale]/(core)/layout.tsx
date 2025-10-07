import { ReactNode } from "react";

export default async function CoreLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className="relative w-full overflow-x-hidden">{children}</div>;
}
