"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Building2, MapPin, Mail, Phone, ShieldCheck, ArrowLeft } from "lucide-react"

type Organization = {
  _id: string
  name: string
  type: string
  description?: string
  mission?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  province?: string
  isVerified: boolean
  createdAt?: string
}

export default function OrganizationProfilePage() {
  const params = useParams<{ id: string }>()
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false
    fetch(`/api/organizations/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        if (data?._id) setOrganization(data)
        else setError(data?.message || "Organization not found.")
      })
      .catch(() => !cancelled && setError("Organizations service is unavailable."))
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [params.id])

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/organizations" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600">
          <ArrowLeft className="w-4 h-4" /> All organizations
        </Link>

        {loading && <p className="mt-8 text-slate-500">Loading organization...</p>}
        {error && <p className="mt-8 text-rose-600">{error}</p>}

        {organization && (
          <div className="mt-8 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Building2 className="w-8 h-8" />
              </div>
              {organization.isVerified && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Organization
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mt-5">{organization.name}</h1>
            <p className="text-slate-500 mt-1">{organization.type}</p>

            {(organization.city || organization.province || organization.address) && (
              <p className="flex items-center gap-1.5 text-sm text-slate-500 mt-3">
                <MapPin className="w-4 h-4" />
                {organization.address || [organization.city, organization.province].filter(Boolean).join(", ")}
              </p>
            )}

            {organization.mission && (
              <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-100 p-5">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Mission</div>
                <p className="text-slate-700 leading-relaxed">{organization.mission}</p>
              </div>
            )}

            {organization.description && (
              <p className="text-slate-600 leading-relaxed mt-6">{organization.description}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100">
              {organization.email && (
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail className="w-4 h-4 text-blue-600" /> {organization.email}
                </div>
              )}
              {organization.phone && (
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Phone className="w-4 h-4 text-blue-600" /> {organization.phone}
                </div>
              )}
            </div>

            <p className="text-sm text-slate-400 mt-8">
              Want to support this organization? <Link href="/register" className="text-blue-600 font-semibold">Register as a giver</Link> to browse and respond to their posted needs.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
