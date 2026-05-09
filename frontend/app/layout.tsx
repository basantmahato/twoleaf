import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "aos/dist/aos.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "TwoLeaf Services | Precision Software Architecture",
  description: "Next-generation digital agency specializing in high-performance software, AI systems, and scalable CRM infrastructure.",
  icons: {
    icon: "/fav-icon.png",
  },
};

import Providers from "./components/Providers";
import { Toaster } from "sonner";
import FloatingCTA from "./components/FloatingCTA";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-body-md text-on-background selection:bg-black selection:text-white antialiased`}
      >
        <Providers>
          {children}
          {/* <FloatingCTA /> */}
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
