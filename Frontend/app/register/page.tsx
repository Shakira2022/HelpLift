"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Building, Briefcase, FileText } from "lucide-react"

export default function RegisterPage() {
  const [role, setRole] = useState<"organization" | "giver" | null>(null)
  
  // State for Organization Fields
  const [orgName, setOrgName] = useState("")
  const [regNum, setRegNum] = useState("")
  const [orgType, setOrgType] = useState("School")
  const [address, setAddress] = useState("")
  const [province, setProvince] = useState("")
  const [city, setCity] = useState("")
  const [contact, setContact] = useState("")
  const [email, setEmail] = useState("")
  const [mission, setMission] = useState("")

  // State for Giver Fields
  const [accountType, setAccountType] = useState<"individual" | "business" | "group">("individual")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [categories, setCategories] = useState("")

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center py-20 px-4">
      
      <div className="text-center mb-12">
        <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-3 rounded-2xl shadow-lg inline-block mb-6">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Join HelpLift</h1>
      </div>

      <div className="w-full max-w-xl grid grid-cols-2 gap-4 mb-10">
        <button 
          onClick={() => setRole("organization")}
          className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${role === 'organization' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'}`}
        >
          <Building className="w-8 h-8" />
          <span className="font-bold text-sm">Organization</span>
        </button>
        <button 
          onClick={() => setRole("giver")}
          className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${role === 'giver' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'}`}
        >
          <Briefcase className="w-8 h-8" />
          <span className="font-bold text-sm">Giver</span>
        </button>
      </div>

      {role && (
        <form className="w-full max-w-xl space-y-8 animate-in fade-in slide-in-from-bottom-4 pb-20">
          
          {role === 'organization' ? (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">Organization Details</h2>
              <input value={orgName} onChange={(e) => setOrgName(e.target.value)} className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-blue-600 pb-2 outline-none text-slate-900 transition-all" placeholder="Organization Name" required />
              <input value={regNum} onChange={(e) => setRegNum(e.target.value)} className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-blue-600 pb-2 outline-none text-slate-900 transition-all" placeholder="Registration Number" required />
              <select value={orgType} onChange={(e) => setOrgType(e.target.value)} className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-blue-600 pb-2 outline-none text-slate-900">
                <option>School</option>
                <option>Church</option>
                <option>Non-Profit</option>
                <option>Welfare Group</option>
              </select>
              <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-blue-600 pb-2 outline-none text-slate-900" placeholder="Physical Address" required />
              <div className="grid grid-cols-2 gap-4">
                <input value={province} onChange={(e) => setProvince(e.target.value)} className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-blue-600 pb-2 outline-none text-slate-900" placeholder="Province" required />
                <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-blue-600 pb-2 outline-none text-slate-900" placeholder="City" required />
              </div>
              <input value={contact} onChange={(e) => setContact(e.target.value)} className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-blue-600 pb-2 outline-none text-slate-900" placeholder="Contact Person & Role" required />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-blue-600 pb-2 outline-none text-slate-900" placeholder="Contact Email" required />
              <textarea value={mission} onChange={(e) => setMission(e.target.value)} className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-blue-600 pb-2 outline-none text-slate-900 h-24" placeholder="Mission Statement" />
              
              <div className="space-y-4">
                <p className="text-sm font-semibold text-slate-700">Upload Supporting Documents</p>
                <div className="h-32 border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 transition-colors cursor-pointer">
                  <FileText className="w-8 h-8 mb-2" />
                  <span className="text-sm">Upload Registration/Tax Certificates</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">Giver Information</h2>
              <div className="flex gap-4 p-1 bg-slate-100 rounded-full">
                {["individual", "business", "group"].map((type) => (
                  <button key={type} type="button" onClick={() => setAccountType(type as any)} className={`flex-1 py-3 rounded-full capitalize text-sm font-bold transition-all ${accountType === type ? 'bg-white shadow-sm' : 'text-slate-500'}`}>
                    {type}
                  </button>
                ))}
              </div>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-blue-600 pb-2 outline-none text-slate-900" placeholder={accountType === 'individual' ? "Full Name" : "Business/Group Name"} required />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-blue-600 pb-2 outline-none text-slate-900" placeholder="Email Address" required />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-blue-600 pb-2 outline-none text-slate-900" placeholder="Phone Number" required />
              <input value={categories} onChange={(e) => setCategories(e.target.value)} className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-blue-600 pb-2 outline-none text-slate-900" placeholder="Preferred Support Categories" />
            </div>
          )}

          <Button type="submit" className="w-full py-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full shadow-lg transition-all">
            Complete Registration <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
      )}

      <p className="mt-8 text-sm text-slate-500">
        Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
      </p>
    </div>
  )
}