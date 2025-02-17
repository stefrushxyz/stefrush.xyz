import { MatrixRain } from "@stefrushxyz/ui/components/matrix-rain";
import type { Metadata } from "next";

import "@fontsource-variable/jetbrains-mono";
import "@stefrushxyz/ui/globals.css";

export const metadata: Metadata = {
  title: "Stefan Rush",
  description: "Personal website of Stefan Rush",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark">
        <MatrixRain />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
