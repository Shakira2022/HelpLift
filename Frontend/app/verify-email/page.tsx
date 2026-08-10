"use client"

import { useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, XCircle, Loader2, ArrowRight, Sparkles, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function VerifyEmailContent() {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState("We are verifying your credentials with the UniHive network...")

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus('success')
        setMessage(result.message)
        setTimeout(() => router.push("/login"), 4000)
      } else {
        setStatus('error')
        setMessage(result.message)
      }
    } catch (err) {
      setStatus('error')
      setMessage("A server error occurred. Please try again later.")
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground overflow-hidden px-6">
      
      {/* Background Decorative Glows - Kept Exactly the same */}
      <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[50%] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <main className="w-full max-w-[550px] z-20 flex flex-col items-center">
        
        {/* Header Section - Kept Exactly the same */}
        <div className="text-center space-y-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground leading-none">
            ACCOUNT <span className="text-primary italic">VERIFICATION.</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Finalizing your secure access to UniHive.
          </p>
        </div>

        {/* Status Card - Styling preserved, logic added */}
        <div className="w-full p-10 bg-card border border-border rounded-3xl shadow-2xl shadow-primary/5 text-center space-y-8 animate-in zoom-in-95 duration-500">
          
          {status === 'loading' && (
            <div className="flex flex-col items-center gap-6 py-4">
              <div className="relative">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-primary animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight">System Check</h3>
                <p className="text-muted-foreground text-sm max-w-[280px] mx-auto">Verifying your token...</p>
              </div>
            </div>
          )}

          {status === 'idle' && (
            <form onSubmit={handleVerify} className="space-y-6 text-left">
               <div className="space-y-2 group">
                <label className="text-xs font-black uppercase tracking-widest text-foreground/60 ml-1">Verification Token</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-0 bottom-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    placeholder="Paste your code from email..." 
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="pl-8 h-12 bg-transparent border-0 border-b-2 border-border focus-visible:ring-0 focus-visible:border-primary rounded-none transition-all font-mono"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit"
                className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg rounded-2xl transition-all shadow-xl shadow-primary/20"
              >
                Complete Verification
              </Button>
            </form>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center gap-6">
              <div className="p-4 bg-primary/10 rounded-full animate-bounce">
                <CheckCircle2 className="w-16 h-16 text-primary" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-black text-foreground tracking-tight">SUCCESS!</h2>
                <p className="text-muted-foreground font-medium leading-relaxed italic underline decoration-primary/30 underline-offset-4">
                  {message}
                </p>
                <div className="pt-4 flex flex-col items-center gap-2">
                    <Loader2 className="w-5 h-5 text-primary/40 animate-spin" />
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Redirecting to login</p>
                </div>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center gap-6">
              <div className="p-4 bg-red-100 rounded-full">
                <XCircle className="w-16 h-16 text-red-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-foreground tracking-tight">VERIFICATION FAILED</h2>
                <p className="text-muted-foreground text-sm px-4">{message}</p>
              </div>
              <Button 
                onClick={() => setStatus('idle')} 
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl transition-all"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>

        {/* Footer Text - Kept Exactly the same */}
        <p className="mt-8 text-[11px] text-center text-muted-foreground/60 leading-relaxed max-w-sm mx-auto">
          Need help? Contact our support team or check our Safety Charter for verification guidelines.
        </p>
      </main>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}