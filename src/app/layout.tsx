import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { HomeModeProvider } from "@/context/HomeModeContext";
import SiteUnreachable from "@/app/main.js";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Planitt - Plan Your Dreams with Us",
  description: "Planitt provides integrated financial advisory and technical solutions including SIP, insurance, NPS, app development, web development, cloud, and cybersecurity services.",
  keywords: "fintech, financial planning, mutual funds, SIP, insurance, NPS, app development, website development, cloud services, cybersecurity, digital transformation",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children: _children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        <ThemeProvider>
          <HomeModeProvider>
            <SiteUnreachable />
          </HomeModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
