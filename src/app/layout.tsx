import type { Metadata } from "next";
import { Baloo_Tamma_2 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes"
import ClientLayout from "./components/clientLayout";

const baloo = Baloo_Tamma_2({
  variable: "--font-Baloo_Tamma_2",
  subsets: ["latin"],
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "Edgar Demeude",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${baloo.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
