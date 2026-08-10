import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import PublicShell from "@/components/public-shell"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

// layout.tsx

export const metadata: Metadata = {
  title: "Student Homes - Find Your Perfect Accommodation",
  description: "Discover and apply to student accommodation...",
  manifest: "/manifest.json", // <-- ADD THIS
  appleWebApp: {              // <-- ADD THIS FOR IPHONE
    capable: true,
    statusBarStyle: "default",
    title: "Student Homes",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport = {
  themeColor: "#ffffff", // Change this to match your app's header color
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents zooming which makes it feel more like an app
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <PublicShell>
            {children}
          </PublicShell>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
