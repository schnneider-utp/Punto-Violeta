import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RouteTransition from "@/components/RouteTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Punto Violeta UTP",
  description: "Mecanismo estudiantil para apoyar a la comunidad académica UTP",
  icons: {
    icon: "/logotipo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen gradient-page relative overflow-hidden" style={{ perspective: "1200px" }}>
          <RouteTransition>{children}</RouteTransition>
        </div>
      </body>
    </html>
  );
}
