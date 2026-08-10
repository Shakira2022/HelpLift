"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  HeartHandshake, 
  ShieldCheck, 
  ArrowRight, 
  MapPin, 
  Send, 
  Star, 
  Plus, 
  Minus, 
  Sparkles, 
  LayoutDashboard, 
  Gift,
  Users,
  CheckCircle2,
  Quote,
  Search
} from "lucide-react"

// -------------------- Data (HelpLift Ecosystem) --------------------
const impactStories = [
  {
    id: 1,
    title: "School Supplies for 200 Children",
    organization: "Hope Academy Foundation",
    location: "Johannesburg Central",
    review: "Thanks to the HelpLift community, we received enough stationery and backpacks to equip our entire incoming class. The platform made coordinating the drop-off seamless.",
    reviewer: "Director Sarah M.",
    rating: 5
  },
  {
    id: 2,
    title: "Winter Blankets Distribution",
    organization: "Community Care NPO",
    location: "Cape Town Shelters",
    review: "We posted an urgent need for 500 blankets before the cold front hit. Within 48 hours, verified givers had matched and fulfilled our entire request.",
    reviewer: "Jason K., Operations Lead",
    rating: 5
  }
]

const faqs = [
  { question: "How do you verify organizations?", answer: "Every organization undergoes a strict vetting process. Our Main Admin reviews their registration documents, tax exemption status, and community footprint before approving their profile." },
  { question: "What is the Gift Library?", answer: "The Gift Library allows individuals and businesses to proactively post offerings—like surplus inventory, free professional services, or bulk goods. Organizations can then browse and request these offerings." },
  { question: "Is HelpLift free to use?", answer: "Yes, the platform is entirely free for verified organizations to post needs and for givers to browse and fulfill them." },
]

export default function LandingPage() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeStoryIndex, setActiveStoryIndex] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [faqSearchQuery, setFaqSearchQuery] = useState("")

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStoryIndex((prev) => (prev + 1) % impactStories.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const currentStory = impactStories[activeStoryIndex]

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Platform", id: "platform" },
    { name: "Impact", id: "impact" },
    { name: "FAQ", id: "faq" },
  ]

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-blue-100 selection:text-blue-900 scroll-smooth font-sans">
      
      {/* --- FLOATING GLASS NAVIGATION --- */}
      <nav 
        className={`fixed top-6 left-0 right-0 z-[100] transition-all duration-500 flex justify-center px-4`}
      >
        <div className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-full max-w-3xl" 
            : "bg-white/60 backdrop-blur-md border border-slate-100/50 shadow-sm w-full max-w-4xl"
        }`}>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-1.5 rounded-full shadow-md shadow-blue-200">
              <HeartHandshake className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900">HelpLift</span>
          </div>
          
          <div className="hidden md:flex items-center gap-1 bg-slate-50/50 p-1 rounded-full border border-slate-100">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScrollToSection(e, link.id)}
                className="px-5 py-2 rounded-full text-sm font-semibold text-slate-500 hover:text-slate-900 hover:bg-white hover:shadow-sm transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          <button 
            onClick={() => router.push("/login")}
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 bg-slate-900 border border-transparent rounded-full hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200 hover:-translate-y-0.5"
          >
            Sign In
          </button>
        </div>
      </nav>

      <main>
        {/* --- HERO SECTION --- */}
        <section id="home" className="relative pt-5 pb-5 md:pt-30 md:pb-10 overflow-hidden px-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-300/20 rounded-full blur-[120px] -z-10 mix-blend-multiply opacity-60" />
          
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Giving made <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">transparent.</span>
              <br className="hidden md:block" /> Impact made real.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Connect directly with verified organizations. Whether offering goods, services, or funding, HelpLift guarantees your contribution reaches those who need it most.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button 
                onClick={() => router.push("/register")}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full shadow-[0_8px_30px_rgb(37,99,235,0.24)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.4)] hover:-translate-y-0.5 overflow-hidden w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Join the Platform 
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
              
              <button className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 transition-all duration-300 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm w-full sm:w-auto">
                View Open Needs
              </button>
            </div>
            
            <div className="pt-2 flex flex-wrap items-center justify-center gap-8 text-sm font-semibold text-slate-400">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Verified NPOs</div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Zero Platform Fees</div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Direct Impact</div>
            </div>
          </div>
        </section>

        {/* --- MODERN BENTO BOX FEATURES (PLATFORM) --- */}
        <section id="platform" className="max-w-6xl mx-auto px-4 py-2">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">A structured ecosystem.</h2>
            <p className="text-lg text-slate-500 mt-4 leading-relaxed">Replacing chaotic group chats with streamlined, secure philanthropy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
            <div className="md:col-span-2 relative overflow-hidden bg-white border border-slate-100 rounded-[2.5rem] p-10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-slate-200 transition-all duration-500 group flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] transition-opacity duration-500 group-hover:opacity-[0.04]">
                <Gift className="w-64 h-64 text-purple-900" />
              </div>
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center border border-purple-100 mb-6 group-hover:scale-110 transition-transform duration-500">
                <Gift className="w-6 h-6 text-purple-600" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">The Gift Library</h3>
                <p className="text-slate-500 leading-relaxed max-w-md text-lg">
                  Don't wait for a need to be posted. Proactively list surplus inventory, bulk goods, or pro-bono services for verified organizations to claim.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white border border-slate-100 rounded-[2.5rem] p-10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-slate-200 transition-all duration-500 group flex flex-col justify-between">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100 mb-6 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Trust</h3>
                <p className="text-slate-500 leading-relaxed">
                  Every entity undergoes strict vetting for tax status and community footprint before joining.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden bg-white border border-slate-100 rounded-[2.5rem] p-10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-slate-200 transition-all duration-500 group flex flex-col justify-between">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 mb-6 group-hover:scale-110 transition-transform duration-500">
                <LayoutDashboard className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Central Dashboard</h3>
                <p className="text-slate-500 leading-relaxed">
                  Track open requests, coordinate drop-offs, and generate fulfillment reports.
                </p>
              </div>
            </div>

            <div className="md:col-span-2 relative overflow-hidden bg-white border border-slate-100 rounded-[2.5rem] p-10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-slate-200 transition-all duration-500 group flex flex-col justify-between">
               <div className="absolute -bottom-10 -right-10 p-8 opacity-[0.02] transition-opacity duration-500 group-hover:opacity-[0.04]">
                <Users className="w-72 h-72 text-orange-900" />
              </div>
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center border border-orange-100 mb-6 group-hover:scale-110 transition-transform duration-500">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Direct Matching</h3>
                <p className="text-slate-500 leading-relaxed max-w-md text-lg">
                  Our system intelligently alerts givers about new needs that align with their specific geographic location and historical giving preferences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- IMPACT STORIES --- */}
        <section id="impact" className="py-15 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-[#FAFAFA] -z-10" />
          
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-xl">
                <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Real impact, documented.</h2>
                <p className="text-lg text-slate-500 mt-4 leading-relaxed">See how verified contributions are actively shaping and supporting local communities.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setActiveStoryIndex((prev) => (prev - 1 + impactStories.length) % impactStories.length)}
                  className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:shadow-sm transition-all hover:-translate-x-0.5"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                <button 
                  onClick={() => setActiveStoryIndex((prev) => (prev + 1) % impactStories.length)}
                  className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:shadow-sm transition-all hover:translate-x-0.5"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative min-h-[500px]">
              <div className="absolute right-0 top-0 w-full md:w-2/3 h-[400px] md:h-[500px] rounded-[2.5rem] bg-slate-100 overflow-hidden shadow-lg border border-slate-200">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 opacity-50 mix-blend-multiply" />
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <HeartHandshake className="w-64 h-64" />
                </div>
              </div>

              <div className="relative pt-32 md:pt-16 md:w-1/2 z-10" key={`rev-${currentStory.id}`}>
                <div className="bg-white/80 backdrop-blur-xl border border-white p-10 md:p-14 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] animate-in fade-in slide-in-from-left-8 duration-700">
                    <Quote className="w-10 h-10 text-blue-200 mb-6" />
                    
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
                      <MapPin className="w-3.5 h-3.5" /> {currentStory.location}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{currentStory.title}</h3>
                    
                    <div className="flex gap-1 mb-6">
                      {[...Array(currentStory.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <blockquote className="text-lg text-slate-600 leading-relaxed font-medium mb-10">
                      "{currentStory.review}"
                    </blockquote>
                    
                    <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                      <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center shadow-md">
                        <span className="text-white font-bold">{currentStory.reviewer.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{currentStory.reviewer}</div>
                        <div className="text-sm font-medium text-blue-600">{currentStory.organization}</div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ / CONTACT SECTION --- */}
        <section id="faq" className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Common Questions</h2>
                <p className="text-slate-500 mt-2">Everything you need to know about the platform.</p>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Search className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={faqSearchQuery}
                  onChange={(e) => setFaqSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-5 py-3.5 bg-[#FAFAFA] border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium"
                />
              </div>

              <div className="space-y-2">
                {faqs
                  .filter(faq => 
                    faq.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) || 
                    faq.answer.toLowerCase().includes(faqSearchQuery.toLowerCase())
                  )
                  .map((faq, index) => (
                  <div key={index} className="border-b border-slate-200 last:border-0 group">
                    <button 
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className={`font-bold text-lg transition-colors ${openFaq === index ? 'text-blue-600' : 'text-slate-800 group-hover:text-blue-600'}`}>
                        {faq.question}
                      </span>
                      <div className={`ml-4 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-blue-600' : 'text-slate-400'}`}>
                        {openFaq === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
                      <p className="text-slate-500 leading-relaxed pr-8">
                         {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-2xl -z-10" />
               <h3 className="text-2xl font-bold mb-2 text-slate-900">Partner with us</h3>
               <p className="text-slate-500 mb-8">Need help registering your organization? Reach out.</p>
               
               <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="hello@organization.org" 
                      className="w-full px-5 py-4 bg-[#FAFAFA] border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium"
                    />
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Message</label>
                    <textarea 
                      placeholder="How can we assist you?" 
                      rows={4}
                      className="w-full px-5 py-4 bg-[#FAFAFA] border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full group inline-flex items-center justify-center px-6 py-4 text-sm font-bold text-white transition-all duration-300 bg-slate-900 rounded-2xl hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200 hover:-translate-y-0.5">
                     <span className="flex items-center gap-2">
                       Send Message <Send className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                     </span>
                  </button>
               </form>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2 rounded-xl shadow-sm">
                <HeartHandshake className="w-6 h-6 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900">HelpLift</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-bold text-slate-500">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Safety Center</a>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-slate-100 text-center text-sm font-medium text-slate-400">
            © 2026 HelpLift. Empowering verified community support.
          </div>
        </footer>
      </main>
    </div>
  )
}