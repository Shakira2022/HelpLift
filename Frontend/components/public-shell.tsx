"use client"

import { usePathname } from "next/navigation"
import PublicNavbar from "@/components/public-navbar"

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const pathnameLower = pathname.toLowerCase()

  const isDashboardPage =
    pathnameLower.startsWith("/dashboard") ||
    pathnameLower.startsWith("/givers-dashboard") ||
    pathnameLower.startsWith("/organisation-dashboard") ||
    pathnameLower.startsWith("/admin-dashboard")

  if (isDashboardPage) {
    return <>{children}</>
  }

  return (
    <>
      <PublicNavbar />
      {children}
    </>
  )
}