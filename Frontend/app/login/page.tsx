"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Loader2, AlertCircle, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg("")

    try {
      // 1. Prepare device/location data for the API
      let deviceId = localStorage.getItem("deviceId")
      if (!deviceId) {
        deviceId =
          "dev_" +
          Math.random().toString(36).substr(2, 9) +
          Date.now().toString(36)

        localStorage.setItem("deviceId", deviceId)
      }

      const location =
        Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown"

      // 2. Call the API
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, deviceId, location }),
      })

      const data = await response.json()

      // 3. Handle Login Response
      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      // 4. Set Session Data
      localStorage.setItem("userId", data.user.id)
      localStorage.setItem("userRole", data.user.role)
      localStorage.setItem("userName", data.user.fullName)

      // 5. Redirect based on role
      if (data.user.role === "giver") {
        router.push("/givers-dashboard")
      } else if (data.user.role === "organization") {
        router.push("/organisation-dashboard")
      } else if (data.user.role === "admin") {
        router.push("/admin-dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (err: any) {
      setErrorMsg(err.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center py-20 px-4">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-12">
        <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-3 rounded-2xl shadow-lg inline-block mb-6">
          <Sparkles className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          Welcome Back
        </h1>

        <p className="text-lg text-slate-500 mt-3">
          Sign in to continue to HelpLift.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="w-full max-w-xl space-y-6">
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-700 text-sm font-bold">
            <AlertCircle className="h-5 w-5" /> {errorMsg}
          </div>
        )}

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400" />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-900"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-400" />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-900"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full py-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full shadow-lg transition-all"
          disabled={isLoading}
        >
          Sign In <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>

      <p className="mt-8 text-sm text-slate-500">
        New to the platform?{" "}
        <Link
          href="/register"
          className="text-blue-600 font-bold hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  )
}