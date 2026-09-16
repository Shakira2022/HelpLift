"use client"

import Link from "next/link"
import { HeartHandshake, MapPin, Quote, Star, Building2 } from "lucide-react"
import { impactStories } from "@/lib/impact-stories"

export default function ImpactStoriesPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900">Impact Stories</h1>
        <p className="text-slate-500 mt-3 max-w-2xl">
          Real outcomes from needs that verified organizations fulfilled through HelpLift givers.
        </p>

        <div className="space-y-6 mt-10">
          {impactStories.map((story) => (
            <div key={story.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: story.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 mt-5">{story.title}</h3>

              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {story.organization}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {story.location}</span>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-100 p-6">
                <Quote className="w-6 h-6 text-blue-200 mb-3" />
                <p className="text-slate-700 leading-relaxed">{story.review}</p>
                <p className="text-sm font-semibold text-slate-500 mt-4">— {story.reviewer}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-slate-400 mt-10 text-center">
          Want to see more organizations doing this work? <Link href="/organizations" className="text-blue-600 font-semibold">Browse verified organizations</Link>.
        </p>
      </div>
    </div>
  )
}
