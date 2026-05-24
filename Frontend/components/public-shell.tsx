"use client"

import { usePathname } from "next/navigation"
import PublicNavbar from "@/components/public-navbar"

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname.startsWith("/dashboard")) {
    return <>{children}</>
  }

  return (
    <>
      <PublicNavbar />
      {children}
    </>
  )
}
