import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "OGpreview | Preview your OG images before deployment",
  description: "OGpreview.dev is a tool that helps you preview your OG images before deployment across various platforms.",
  openGraph: {
    title: "OGpreview | Preview your OG images before deployment", // keep it under 60 characters
    description: "OGpreview.dev is a tool that helps you preview your OG images before deployment across various platforms.", // keep it under 160 characters
    url: "https://ogpreview.dev",
    type: "website",

  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
