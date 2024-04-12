import type { Metadata } from "next";
import {DM_Sans, DM_Serif_Display} from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Wishlist",
};


const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-dm-serif-display'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
    >
      <head>
        <link
            rel="icon"
            href="/icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
        />
      </head>
      <body className={`${dmSans.variable} ${dmSerifDisplay.variable}`}>{children}<Toaster /></body>
    </html>
  );
}
