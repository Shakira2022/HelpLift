"use client"
import { useState } from "react"

export default function GiverRegistration() {
  const [type, setType] = useState("Individual")

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-10 flex justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-8 border shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Giver Registration</h1>

        <div className="mt-8 space-y-4">
          <div className="flex gap-3">
            <button onClick={()=>setType("Individual")} className={`flex-1 h-12 rounded-full font-bold border transition ${type==="Individual"?"bg-slate-900 text-white border-slate-900":"bg-white text-slate-700"}`}>Individual</button>
            <button onClick={()=>setType("Business")} className={`flex-1 h-12 rounded-full font-bold border transition ${type==="Business"?"bg-slate-900 text-white border-slate-900":"bg-white text-slate-700"}`}>Business</button>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 ml-1">{type==="Individual"?"Full Name":"Business Name"}</label>
            <input placeholder={type==="Individual"?"e.g. John Doe":"e.g. HelpLift Pty Ltd"} className="w-full h-12 px-4 mt-1 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 ml-1">Email Address</label>
            <input placeholder="e.g. giver@email.com - verification will be sent" className="w-full h-12 px-4 mt-1 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 ml-1">Password</label>
            <input placeholder="Create a strong password" type="password" className="w-full h-12 px-4 mt-1 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 ml-1">Preferred Need Type</label>
              <select className="w-full h-12 px-3 mt-1 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select need</option>
                <option>Food</option>
                <option>Clothes</option>
                <option>Education</option>
                <option>Medical</option>
                <option>Shelter</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 ml-1">Preferred Location</label>
              <select className="w-full h-12 px-3 mt-1 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select location</option>
                <option>Pretoria</option>
                <option>Johannesburg</option>
                <option>Durban</option>
                <option>Cape Town</option>
                <option>Vanderbijlpark</option>
              </select>
            </div>
          </div>

          <button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold mt-2">Create Account & Send Verification →</button>


          <p className="text-center text-sm text-slate-500">Already have account? <a href="/login" className="text-blue-600 font-semibold">Login</a></p>
        </div>
      </div>
    </div>
  )
}