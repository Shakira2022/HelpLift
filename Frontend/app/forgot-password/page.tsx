"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Mail, 
  ChevronLeft, 
  Sparkles, 
  Loader2, 
  Send,
  ShieldCheck
} from "lucide-react"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        router.push("/login")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isSubmitted, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call for password reset
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-background overflow-x-hidden">
      
      {/* --- BACKGROUND DECORATIONS --- */}
      <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[50%] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 w-full max-w-[600px] px-6 pb-10 pt-32 flex flex-col items-center z-20">
        
        {!isSubmitted ? (
          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* WELCOME/INFO SECTION */}
            <div className="text-center space-y-4 mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mx-auto">
                <ShieldCheck className="w-4 h-4" />
                <span>Security Recovery</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground leading-none">
                LOST YOUR <span className="text-primary italic">KEY?</span>
              </h1>
              
              <p className="text-muted-foreground text-lg max-w-sm mx-auto">
                Enter your university email address and we'll send you a secure link to reset your account access.
              </p>
            </div>

            {/* FORM SECTION */}
            <div className="w-full px-4 md:px-8">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/80 ml-1">University Email</label>
                  <div className="relative group">
                    <div className="absolute left-0 bottom-3 pl-2">
                      <Mail className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    </div>
                    <input 
                      type="email" 
                      placeholder="name@university.ac.uk" 
                      className="flex w-full pl-10 h-12 bg-transparent border-0 border-b-2 border-border focus:ring-0 focus:outline-none focus:border-primary transition-all text-foreground"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg rounded-2xl transition-all shadow-xl shadow-primary/20 active:scale-[0.98]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending Link...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      Send Recovery Link
                      <Send className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-12 text-center">
                <p className="text-xs text-muted-foreground/60 leading-relaxed italic">
                  Cannot access your email? Please contact <span className="text-primary font-bold cursor-pointer hover:underline">Campus Support</span> for identity verification.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* SUCCESS STATE */
          <div className="w-full text-center space-y-8 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto border-2 border-primary/20">
              <Send className="w-10 h-10 text-primary" />
            </div>
            
            <div className="space-y-3">
              <h2 className="text-4xl font-black tracking-tight">Check your Inbox</h2>
              <p className="text-muted-foreground text-lg">
                A secure recovery link has been sent to <br />
                <span className="text-foreground font-bold underline decoration-primary/30 decoration-2">{email}</span>
              </p>
            </div>

            <div className="pt-4 space-y-4">
              <Button 
                variant="outline" 
                onClick={() => setIsSubmitted(false)}
                className="rounded-full px-8 border-border hover:bg-muted font-bold"
              >
                Try a different email
              </Button>
              <p className="text-sm text-muted-foreground">
                Didn't receive it? Check your spam or <span className="text-primary font-bold cursor-pointer hover:underline">Resend</span>
              </p>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER STRIP */}
      <footer className="w-full py-8 text-center mt-auto">
         <p className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em]">
            Secure Student Authentication Protocol v2.5
         </p>
      </footer>
    </div>
  )
}