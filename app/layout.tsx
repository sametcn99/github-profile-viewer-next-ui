import Footer from "@/components/home/Footer";
import { getSiteUrl } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import React from "react";
import Navbar from "../components/Navbar";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

/**
 * Metadata object to configure the <head> and properties of the webpage.
 * Includes title, description, open graph tags, twitter tags, favicon.
 * Used by _app.tsx to populate metadata in next.js.
 */
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    template: "%s | GPV",
    default: "Github Profile Viewer",
  },
  description:
    "Explore GitHub and Gist profile statistics effortlessly, utilizing the GitHub REST API to retrieve comprehensive information.",
  applicationName: "Github Profile Viewer",
  keywords: "github profile viewer, github stats, github profile",
  creator: "sametcn99",
  publisher: "sametcn99",
  robots: "index, follow",
  openGraph: {
    title: {
      template: "%s | GPV",
      default: "Github Profile Viewer",
    },
    description:
      "Explore GitHub and Gist profile statistics effortlessly, utilizing the GitHub REST API to retrieve comprehensive information.",
    type: "website",
    url: getSiteUrl(),
    images: ["/icons/icon512.png"],
    locale: "en_US",
    siteName: "Github Profile Viewer",
    emails: "sametcn99@gmail.com",
  },
  icons: {
    icon: "/icons/icon512.png",
    shortcut: "/icons/icon512.png",
    apple: "/icons/icon512.png",
    username: "sametcn99",
  },
  twitter: {
    site: "Github Profile Viewer",
    title: "Github Profile Viewer",
    description:
      "Explore GitHub and Gist profile statistics effortlessly, utilizing the GitHub REST API to retrieve comprehensive information.",
    card: "summary_large_image",
    images: ["/icons/icon512.png"],
    creator: "sametcn99",
    creatorId: "@sametcn99",
  },
};

/**
 * Viewport configuration for responsive design.
 * Sets width to device width, initial scale to 1,
 * and allows user scaling.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <Theme
            appearance="dark"
            accentColor="gray"
            grayColor="slate"
            radius="large"
          >
            <main className="container mx-auto flex flex-col gap-4">
              <Navbar />
              {children}
              <Footer />
            </main>
          </Theme>
          <Analytics />
          <SpeedInsights />
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9043926174238983"
            crossOrigin="anonymous"
          />
        </body>
        <GoogleAnalytics gaId="G-N9EB4H11MT" />
      </html>
    </ClerkProvider>
  );
}
