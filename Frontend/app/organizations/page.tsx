"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Building2, MapPin, ShieldCheck, Search } from "lucide-react"

type Organization = {
  _id: string
  name: string
  type: string
  description?: string
  mission?: string
  city?: string
  province?: string
  isVerified: boolean
}

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    let cancelled = false
    fetch("/api/organizations")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        if (Array.isArray(data)) setOrganizations(data)
        else setError(data?.message || "Could not load organizations.")
      })
      .catch(() => !cancelled && setError("Organizations service is unavailable."))
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [])

  const verified = organizations.filter((org) => org.isVerified)
  const filtered = verified.filter((org) =>
    `${org.name} ${org.type} ${org.city} ${org.province}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900">Verified Organizations</h1>
        <p className="text-slate-500 mt-3 max-w-2xl">
          Browse non-profits, schools, churches, and welfare groups verified by HelpLift. Open a profile to see their mission and posted needs.
        </p>

        <div className="relative mt-8 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, type, or location"
            className="w-full h-12 pl-11 pr-4 rounded-full border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {loading && <p className="mt-10 text-slate-500">Loading organizations...</p>}
        {error && <p className="mt-10 text-rose-600">{error}</p>}

        {!loading && !error && filtered.length === 0 && (
          <p className="mt-10 text-slate-500">No verified organizations match your search yet.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          {filtered.map((org) => (
            <Link
              key={org._id}
              href={`/organizations/${org._id}`}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </span>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mt-4">{org.name}</h3>
              <p className="text-slate-500 text-sm mt-1">{org.type}</p>

              {(org.city || org.province) && (
                <p className="flex items-center gap-1.5 text-sm text-slate-500 mt-3">
                  <MapPin className="w-4 h-4" /> {[org.city, org.province].filter(Boolean).join(", ")}
                </p>
              )}

              {org.mission && (
                <p className="text-slate-600 mt-4 leading-relaxed line-clamp-2">{org.mission}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
