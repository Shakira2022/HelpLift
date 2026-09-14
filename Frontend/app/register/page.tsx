"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Sparkles,
  Building,
  Briefcase,
} from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()

  const [role, setRole] = useState<"organization" | "giver" | null>(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!role) {
      setMessage("Please select a role first.")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        setMessage(result.message || "Registration failed.")
        setLoading(false)
        return
      }

      setMessage("Registration successful! Redirecting to login...")

      setTimeout(() => {
        router.push("/login")
      }, 1500)
    } catch (error) {
      console.error(error)
      setMessage(
        "Could not connect to the backend. Make sure your backend is running."
      )
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center py-20 px-4">

      {/* Heading */}
      <div className="text-center mb-12">

        <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-3 rounded-2xl shadow-lg inline-block mb-6">
          <Sparkles className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          Join HelpLift
        </h1>

        <p className="mt-3 text-slate-500">
          Create your HelpLift account
        </p>

      </div>

      {/* Role selection */}
      <div className="w-full max-w-xl grid grid-cols-2 gap-4 mb-10">

        <button
          type="button"
          onClick={() => setRole("organization")}
          className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
            role === "organization"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
          }`}
        >
          <Building className="w-8 h-8" />

          <span className="font-bold text-sm">
            Organization
          </span>
        </button>

        <button
          type="button"
          onClick={() => setRole("giver")}
          className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
            role === "giver"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
          }`}
        >
          <Briefcase className="w-8 h-8" />

          <span className="font-bold text-sm">
            Giver
          </span>
        </button>

      </div>

      {/* Form */}
      {role && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl space-y-8 pb-20"
        >

          <h2 className="text-2xl font-bold text-slate-900">
            {role === "organization"
              ? "Organization Account"
              : "Giver Account"}
          </h2>

          {/* Name */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-blue-600 pb-2 outline-none text-slate-900"
            placeholder={
              role === "organization"
                ? "Organization Name"
                : "Full Name"
            }
            required
          />

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-blue-600 pb-2 outline-none text-slate-900"
            placeholder="Email Address"
            required
          />

          {/* Password */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-blue-600 pb-2 outline-none text-slate-900"
            placeholder="Password"
            minLength={6}
            required
          />

          {/* Message */}
          {message && (
            <div className="p-4 rounded-xl bg-slate-100 text-slate-700 text-sm">
              {message}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full shadow-lg transition-all"
          >
            {loading ? "Creating Account..." : "Complete Registration"}

            {!loading && (
              <ArrowRight className="ml-2 h-5 w-5" />
            )}
          </Button>

        </form>
      )}

      {/* Login link */}
      <p className="mt-8 text-sm text-slate-500">
        Already have an account?{" "}

        <Link
          href="/login"
          className="text-blue-600 font-bold hover:underline"
        >
          Sign In
        </Link>
      </p>

    </div>
  )
}

