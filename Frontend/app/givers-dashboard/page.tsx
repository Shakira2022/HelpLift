"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  HeartHandshake,
  LayoutDashboard,
  Search,
  Bookmark,
  HandHeart,
  Gift,
  ReceiptText,
  MessageCircle,
  Bell,
  Settings,
  User,
  MoreHorizontal,
  X,
  ArrowRight,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Clock,
  CalendarDays,
  Building2,
  Filter,
  Plus,
  Send,
  Eye,
  CreditCard,
  PackageCheck,
  Truck,
  Sparkles,
  Lock,
  Globe,
  Phone,
  Mail,
  Edit3,
  Check,
  AlertTriangle,
  Archive,
  Download,
  UploadCloud,
  SlidersHorizontal,
  Heart,
  LogOut,
  Banknote,
  BriefcaseBusiness,
  Users,
} from "lucide-react"

// -------------------- Types --------------------
type GiverTab =
  | "dashboard"
  | "browse"
  | "saved"
  | "interests"
  | "contributions"
  | "gift-library"
  | "messages"
  | "notifications"
  | "preferences"
  | "settings"
  | "profile"

type SheetType = "donate" | "interest" | "offering" | "need-details" | null

type StatusTone = "blue" | "emerald" | "amber" | "rose" | "slate"

// -------------------- Mock Data --------------------
const giverProfile = {
  id: "GIV-1001",
  accountType: "Individual",
  fullName: "Muhle Mabunda",
  businessName: "",
  publicDisplayName: "Muhle M.",
  email: "muhle@example.com",
  phone: "+27 72 555 0148",
  location: "Vereeniging, Gauteng",
  province: "Gauteng",
  city: "Vereeniging",
  preferredCategories: ["Education", "Food", "Clothing", "Transport"],
  preferredLocations: ["Gauteng", "Johannesburg", "Vereeniging"],
  supportTypes: ["Money", "Goods", "Services"],
  anonymousPreference: "Ask every time",
  defaultDisplay: "Public name",
  notificationMethod: "Email and app notification",
  paymentStatus: "Payment method ready",
  emailStatus: "Verified",
  accountStatus: "Active",
  joinedDate: "10 May 2026",
  lastLogin: "Today, 10:25",
}

const stats = [
  { label: "Saved Needs", value: "12", helper: "4 urgent needs saved" },
  { label: "Active Interests", value: "5", helper: "2 waiting for organization reply" },
  { label: "Completed Support", value: "18", helper: "Money, goods, and services" },
  { label: "Gift Offerings", value: "3", helper: "1 currently matched" },
]

const recommendedNeeds = [
  {
    id: "NEED-001",
    title: "School Supplies for Grade 8 Learners",
    organization: "Hope Academy Foundation",
    verified: true,
    category: "Education",
    urgency: "High",
    location: "Johannesburg Central",
    status: "Open",
    progress: 72,
    anonymousSupporters: 3,
    datePosted: "18 May 2026",
    dueDate: "31 May 2026",
    quantity: "200 stationery packs",
    value: "R18,500",
    description:
      "Stationery packs, school bags, calculators, and notebooks are needed for Grade 8 learners starting their second term support programme.",
  },
  {
    id: "NEED-002",
    title: "Winter Blanket Drive",
    organization: "Community Care NPO",
    verified: true,
    category: "Clothing",
    urgency: "Emergency",
    location: "Soweto",
    status: "In Progress",
    progress: 54,
    anonymousSupporters: 6,
    datePosted: "13 May 2026",
    dueDate: "28 May 2026",
    quantity: "500 blankets",
    value: "R42,000",
    description:
      "Warm blankets are needed for families affected by winter conditions. The organization is coordinating delivery and collection support.",
  },
  {
    id: "NEED-003",
    title: "After-school Meal Support",
    organization: "Bright Future Learning Centre",
    verified: true,
    category: "Food",
    urgency: "Medium",
    location: "Alexandra",
    status: "Open",
    progress: 31,
    anonymousSupporters: 2,
    datePosted: "22 May 2026",
    dueDate: "10 June 2026",
    quantity: "1,200 meal packs",
    value: "R24,000",
    description:
      "Meal packs are needed for learners attending after-school study sessions. Support can be financial or food parcels.",
  },
  {
    id: "NEED-004",
    title: "Transport for Mentorship Workshop",
    organization: "Youth Rise Network",
    verified: true,
    category: "Transport",
    urgency: "Low",
    location: "Tembisa",
    status: "Open",
    progress: 18,
    anonymousSupporters: 1,
    datePosted: "23 May 2026",
    dueDate: "08 June 2026",
    quantity: "2 shuttle trips",
    value: "R3,500",
    description:
      "Transport support is needed for learners attending a weekend mentorship workshop.",
  },
]

const savedNeeds = [
  { id: "SAVE-001", need: recommendedNeeds[0], savedDate: "23 May 2026" },
  { id: "SAVE-002", need: recommendedNeeds[1], savedDate: "21 May 2026" },
  { id: "SAVE-003", need: recommendedNeeds[3], savedDate: "20 May 2026" },
]

const interests = [
  {
    id: "INT-001",
    needTitle: "School Supplies for Grade 8 Learners",
    organization: "Hope Academy Foundation",
    supportType: "Money",
    value: "R5,000",
    anonymous: true,
    status: "Pending",
    submitted: "23 May 2026",
    accepted: "Not accepted yet",
    message: "I would like to support this need anonymously and receive a receipt.",
  },
  {
    id: "INT-002",
    needTitle: "Winter Blanket Drive",
    organization: "Community Care NPO",
    supportType: "Goods",
    value: "40 blankets",
    anonymous: false,
    status: "Accepted",
    submitted: "20 May 2026",
    accepted: "21 May 2026",
    message: "I can deliver the blankets on Saturday morning.",
  },
  {
    id: "INT-003",
    needTitle: "Transport for Mentorship Workshop",
    organization: "Youth Rise Network",
    supportType: "Service",
    value: "1 shuttle trip",
    anonymous: false,
    status: "Completed",
    submitted: "12 May 2026",
    accepted: "13 May 2026",
    message: "Transport was completed and confirmed by the organization.",
  },
]

const contributions = [
  {
    id: "CON-001",
    needTitle: "Reading Corner Books",
    organization: "Hope Academy Foundation",
    type: "Money",
    value: "R1,200",
    anonymous: true,
    date: "16 May 2026",
    receipt: "Available",
    impactStory: "Reading Corner Books Delivered",
    status: "Completed",
  },
  {
    id: "CON-002",
    needTitle: "Winter Blanket Drive",
    organization: "Community Care NPO",
    type: "Goods",
    value: "40 blankets",
    anonymous: false,
    date: "21 May 2026",
    receipt: "Proof uploaded",
    impactStory: "Pending",
    status: "In Progress",
  },
  {
    id: "CON-003",
    needTitle: "Mentorship Workshop Transport",
    organization: "Youth Rise Network",
    type: "Service",
    value: "1 shuttle trip",
    anonymous: false,
    date: "14 May 2026",
    receipt: "Confirmed",
    impactStory: "Mentorship Workshop Completed",
    status: "Completed",
  },
]

const giftOfferings = [
  {
    id: "GIFT-001",
    title: "Stationery Packs Available",
    type: "Goods",
    category: "Education",
    description: "50 stationery packs with notebooks, pens, pencils, and rulers.",
    quantity: "50 packs",
    location: "Vereeniging",
    availability: "25 May - 10 June 2026",
    expiry: "10 June 2026",
    anonymous: false,
    displayName: "Muhle M.",
    status: "Available",
    matchedNeed: "Not matched yet",
    created: "22 May 2026",
  },
  {
    id: "GIFT-002",
    title: "Free Website Support for NPO",
    type: "Service",
    category: "Professional Service",
    description: "Basic website updates or page setup for a verified community organization.",
    quantity: "5 hours",
    location: "Remote",
    availability: "Weekends",
    expiry: "30 June 2026",
    anonymous: false,
    displayName: "Muhle M.",
    status: "Pending Approval",
    matchedNeed: "Not matched yet",
    created: "20 May 2026",
  },
  {
    id: "GIFT-003",
    title: "Food Parcel Contribution",
    type: "Goods",
    category: "Food",
    description: "Non-perishable food parcel items for a family support need.",
    quantity: "20 parcels",
    location: "Gauteng",
    availability: "Ready for pickup",
    expiry: "05 June 2026",
    anonymous: true,
    displayName: "Anonymous Giver",
    status: "Matched",
    matchedNeed: "After-school Meal Support",
    created: "18 May 2026",
  },
]

const impactStories = [
  {
    id: "STORY-001",
    title: "Reading Corner Books Delivered",
    organization: "Hope Academy Foundation",
    relatedNeed: "Reading Corner Books",
    date: "18 May 2026",
    giverMention: "Anonymous Giver",
    summary:
      "Learners received books and shelves for a small reading corner. The contribution was kept anonymous publicly.",
  },
  {
    id: "STORY-002",
    title: "Mentorship Workshop Completed",
    organization: "Youth Rise Network",
    relatedNeed: "Mentorship Workshop Transport",
    date: "15 May 2026",
    giverMention: "Muhle M.",
    summary:
      "Transport support helped learners attend a weekend mentorship session.",
  },
]

const messages = [
  {
    id: "MSG-001",
    organization: "Hope Academy Foundation",
    relatedNeed: "School Supplies for Grade 8 Learners",
    subject: "Receipt preference confirmation",
    body: "Thank you for your interest. We can keep your contribution anonymous publicly and still issue a receipt for your records.",
    date: "23 May 2026",
    unread: true,
  },
  {
    id: "MSG-002",
    organization: "Community Care NPO",
    relatedNeed: "Winter Blanket Drive",
    subject: "Delivery coordination",
    body: "Please confirm if Saturday morning is still suitable for the blanket delivery.",
    date: "22 May 2026",
    unread: true,
  },
  {
    id: "MSG-003",
    organization: "Youth Rise Network",
    relatedNeed: "Mentorship Workshop Transport",
    subject: "Thank you for your support",
    body: "Your transport support was received and confirmed. We appreciate your contribution.",
    date: "15 May 2026",
    unread: false,
  },
]

const notifications = [
  {
    id: "NOT-001",
    title: "Interest received by organization",
    type: "Interest",
    related: "School Supplies for Grade 8 Learners",
    message: "Hope Academy Foundation received your interest and will review it soon.",
    date: "23 May 2026",
    priority: "Normal",
    read: false,
  },
  {
    id: "NOT-002",
    title: "Gift offering matched",
    type: "Gift Library",
    related: "After-school Meal Support",
    message: "Your food parcel offering has been matched to a verified need.",
    date: "22 May 2026",
    priority: "High",
    read: false,
  },
  {
    id: "NOT-003",
    title: "Impact story published",
    type: "Impact",
    related: "Reading Corner Books Delivered",
    message: "An impact story linked to your anonymous contribution has been published.",
    date: "18 May 2026",
    priority: "Normal",
    read: true,
  },
]

// -------------------- Helpers --------------------
const toneClasses: Record<StatusTone, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  rose: "bg-rose-50 text-rose-700 border-rose-100",
  slate: "bg-slate-50 text-slate-700 border-slate-100",
}

function getStatusTone(status: string): StatusTone {
  const value = status.toLowerCase()
  if (value.includes("completed") || value.includes("accepted") || value.includes("verified") || value.includes("available") || value.includes("ready")) return "emerald"
  if (value.includes("pending") || value.includes("progress") || value.includes("review") || value.includes("matched")) return "amber"
  if (value.includes("high") || value.includes("emergency") || value.includes("urgent")) return "rose"
  if (value.includes("open") || value.includes("normal")) return "blue"
  return "slate"
}

function Badge({ children, tone = "blue" }: { children: React.ReactNode; tone?: StatusTone }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${toneClasses[tone]}`}>
      {children}
    </span>
  )
}

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-slate-200 rounded-2xl shadow-sm ${className}`}>
      {children}
    </div>
  )
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  action,
}: {
  icon: React.ElementType
  title: string
  subtitle: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
          <p className="text-slate-500 mt-1 leading-relaxed">{subtitle}</p>
        </div>
      </div>
      {action}
    </div>
  )
}

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 bg-blue-600 rounded-2xl shadow-sm hover:bg-blue-700 hover:-translate-y-0.5"
    >
      {children}
    </button>
  )
}

function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300"
    >
      {children}
    </button>
  )
}

// -------------------- Main Page --------------------
export default function GiverDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<GiverTab>("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [sheetType, setSheetType] = useState<SheetType>(null)
  const [selectedNeed, setSelectedNeed] = useState<(typeof recommendedNeeds)[number] | null>(recommendedNeeds[0])

  const navTabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "browse" as const, label: "Browse Needs", icon: Search },
    { id: "saved" as const, label: "Saved", icon: Bookmark },
    { id: "interests" as const, label: "Interests", icon: HandHeart },
    { id: "contributions" as const, label: "Contributions", icon: ReceiptText },
    { id: "gift-library" as const, label: "Gift Library", icon: Gift },
  ]

  const moreTabs = [
    { id: "messages" as const, label: "Messages", icon: MessageCircle },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "preferences" as const, label: "Preferences", icon: SlidersHorizontal },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ]

  const categories = ["All", "Education", "Food", "Clothing", "Transport"]

  const filteredNeeds = useMemo(() => {
    return recommendedNeeds.filter((need) => {
      const matchesSearch = `${need.title} ${need.organization} ${need.category} ${need.location}`.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = categoryFilter === "All" || need.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, categoryFilter])

  const unreadMessages = messages.filter((message) => message.unread).length
  const unreadNotifications = notifications.filter((notification) => !notification.read).length

  const openSheet = (type: SheetType, need?: (typeof recommendedNeeds)[number]) => {
    if (need) setSelectedNeed(need)
    setSheetType(type)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans">
      {/* Floating Navigation */}
      <nav className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4">
        <div className="flex items-center justify-between px-5 py-3 rounded-full bg-white/85 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-full max-w-6xl">
          <button onClick={() => router.push("/")} className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-full shadow-sm">
              <HeartHandshake className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-slate-900">HelpLift</span>
          </button>

          <div className="hidden lg:flex items-center gap-1 bg-slate-50/70 p-1 rounded-full border border-slate-100">
            {navTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "text-slate-900 bg-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 hover:bg-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("messages")}
              className="relative w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-white transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              {unreadMessages > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-semibold flex items-center justify-center">{unreadMessages}</span>}
            </button>

            <button
              onClick={() => setActiveTab("notifications")}
              className="relative w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-white transition-all"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-semibold flex items-center justify-center">{unreadNotifications}</span>}
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                activeTab === "profile" ? "bg-slate-900 text-white border-slate-900" : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-white hover:text-blue-600"
              }`}
              aria-label="Profile"
            >
              <User className="w-5 h-5" />
            </button>

            <button
              onClick={() => setSheetType("need-details")}
              className="lg:hidden w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center transition-all"
              aria-label="Open menu"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-16">
        <section className="relative px-4 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[520px] bg-blue-300/20 rounded-full blur-[120px] -z-10 mix-blend-multiply opacity-70" />

          <div className="max-w-6xl mx-auto">
            <div className={activeTab === "dashboard" ? "mt-0" : "mt-8"}>
              {activeTab === "dashboard" && <DashboardTab setActiveTab={setActiveTab} openSheet={openSheet} />}
              {activeTab === "browse" && (
                <BrowseNeedsTab
                  needs={filteredNeeds}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  categoryFilter={categoryFilter}
                  setCategoryFilter={setCategoryFilter}
                  categories={categories}
                  openSheet={openSheet}
                />
              )}
              {activeTab === "saved" && <SavedNeedsTab openSheet={openSheet} />}
              {activeTab === "interests" && <InterestsTab />}
              {activeTab === "contributions" && <ContributionsTab />}
              {activeTab === "gift-library" && <GiftLibraryTab openSheet={openSheet} />}
              {activeTab === "messages" && <MessagesTab />}
              {activeTab === "notifications" && <NotificationsTab />}
              {activeTab === "preferences" && <PreferencesTab />}
              {activeTab === "settings" && <SettingsTab />}
              {activeTab === "profile" && <ProfileTab setActiveTab={setActiveTab} openSheet={openSheet} />}
            </div>
          </div>
        </section>
      </main>

      <SideSheet
        open={sheetType !== null}
        title={sheetType === "donate" ? "Make a donation" : sheetType === "interest" ? "Express interest" : sheetType === "offering" ? "Post gift offering" : "More"}
        subtitle={sheetType === "need-details" ? "Use these shortcuts on smaller screens." : "Complete the details below using mock data for now."}
        onClose={() => setSheetType(null)}
      >
        {sheetType === "donate" && <DonateSheet need={selectedNeed} />}
        {sheetType === "interest" && <InterestSheet need={selectedNeed} />}
        {sheetType === "offering" && <OfferingSheet />}
        {sheetType === "need-details" && (
          <div className="space-y-3">
            {[...navTabs, ...moreTabs, { id: "profile" as const, label: "Profile", icon: User }].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setSheetType(null)
                  }}
                  className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white transition-all text-left"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-slate-600" />
                    <span className="font-semibold text-slate-900">{tab.label}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </button>
              )
            })}
          </div>
        )}
      </SideSheet>
    </div>
  )
}

// -------------------- Page Sections --------------------
function DashboardIntro({
  setActiveTab,
  openSheet,
}: {
  setActiveTab: (tab: GiverTab) => void
  openSheet: (type: SheetType, need?: (typeof recommendedNeeds)[number]) => void
}) {
  return (
    <div className="relative overflow-hidden bg-white/85 backdrop-blur-xl border border-white rounded-[2rem] p-8 md:p-10 shadow-sm">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge tone="emerald"><CheckCircle2 className="w-3.5 h-3.5" /> {giverProfile.emailStatus}</Badge>
            <Badge tone="blue"><User className="w-3.5 h-3.5" /> {giverProfile.accountType} Giver</Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
            Welcome back, {giverProfile.publicDisplayName}
          </h1>

          <p className="text-slate-500 text-lg mt-4 leading-relaxed max-w-2xl">
            Browse verified needs, donate money, offer goods or services, track your contributions, and choose whether your support appears publicly or anonymously.
          </p>

          <div className="flex flex-wrap gap-4 mt-6 text-sm font-semibold text-slate-500">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-600" /> {giverProfile.location}</span>
            <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-blue-600" /> Anonymous: {giverProfile.anonymousPreference}</span>
            <span className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-blue-600" /> {giverProfile.paymentStatus}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <PrimaryButton onClick={() => setActiveTab("browse")}><Search className="w-4 h-4" /> Browse Needs</PrimaryButton>
          <SecondaryButton onClick={() => openSheet("donate", recommendedNeeds[0])}><Banknote className="w-4 h-4" /> Donate</SecondaryButton>
          <SecondaryButton onClick={() => openSheet("offering")}><Gift className="w-4 h-4" /> Post Offering</SecondaryButton>
          <SecondaryButton onClick={() => setActiveTab("preferences")}><SlidersHorizontal className="w-4 h-4" /> Preferences</SecondaryButton>
        </div>
      </div>
    </div>
  )
}

function DashboardTab({
  setActiveTab,
  openSheet,
}: {
  setActiveTab: (tab: GiverTab) => void
  openSheet: (type: SheetType, need?: (typeof recommendedNeeds)[number]) => void
}) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-500">{stat.label}</div>
            <div className="text-3xl font-semibold tracking-tight text-slate-900 mt-4">{stat.value}</div>
            <div className="text-sm text-slate-400 mt-2">{stat.helper}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <SectionCard className="p-8">
          <SectionHeader
            icon={Search}
            title="Recommended needs"
            subtitle="Needs matched to your categories, location, and support preferences."
            action={<SecondaryButton onClick={() => setActiveTab("browse")}>View All <ArrowRight className="w-4 h-4" /></SecondaryButton>}
          />

          <div className="space-y-4">
            {recommendedNeeds.slice(0, 3).map((need) => (
              <NeedRow key={need.id} need={need} openSheet={openSheet} />
            ))}
          </div>
        </SectionCard>

        <SectionCard className="p-8">
          <SectionHeader
            icon={Sparkles}
            title="Quick actions"
            subtitle="Common giver tasks."
          />

          <div className="space-y-3">
            <QuickAction icon={Search} title="Browse verified needs" subtitle="Find approved needs from trusted organizations." onClick={() => setActiveTab("browse")} />
            <QuickAction icon={HandHeart} title="View my interests" subtitle="Track offers you sent to organizations." onClick={() => setActiveTab("interests")} />
            <QuickAction icon={ReceiptText} title="Contribution history" subtitle="View receipts, proof, and completed support." onClick={() => setActiveTab("contributions")} />
            <QuickAction icon={Gift} title="Post gift offering" subtitle="Offer goods or services before matching." onClick={() => openSheet("offering")} />
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SectionCard className="p-8 lg:col-span-2">
          <SectionHeader icon={Clock} title="Active support activity" subtitle="Your latest interests and fulfillments." />
          <div className="space-y-4">
            {interests.slice(0, 3).map((item) => (
              <ActivityRow key={item.id} item={item} />
            ))}
          </div>
        </SectionCard>

        <SectionCard className="p-8">
          <SectionHeader icon={Bell} title="Important updates" subtitle="Items that need your attention." />
          <div className="space-y-3">
            <AlertCard tone="blue" title="2 unread messages" text="Organizations are waiting for your response." />
            <AlertCard tone="amber" title="1 offering matched" text="Your food parcel offering was matched to a need." />
            <AlertCard tone="emerald" title="Impact story published" text="A story linked to your anonymous contribution is live." />
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

function BrowseNeedsTab({
  needs,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  categories,
  openSheet,
}: {
  needs: typeof recommendedNeeds
  searchQuery: string
  setSearchQuery: (value: string) => void
  categoryFilter: string
  setCategoryFilter: (value: string) => void
  categories: string[]
  openSheet: (type: SheetType, need?: (typeof recommendedNeeds)[number]) => void
}) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={Search}
        title="Browse verified needs"
        subtitle="Search, filter, save, donate, or express interest in approved community needs."
        action={<SecondaryButton><Filter className="w-4 h-4" /> Filters</SecondaryButton>}
      />

      <SectionCard className="p-5">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search needs by title, organization, category, or location..."
              className="w-full pl-12 pr-5 py-3.5 bg-[#FAFAFA] border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-4 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all ${
                  categoryFilter === category ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-500 hover:bg-white hover:text-slate-900 border border-slate-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {needs.map((need) => (
          <NeedCard key={need.id} need={need} openSheet={openSheet} />
        ))}
      </div>
    </div>
  )
}

function SavedNeedsTab({ openSheet }: { openSheet: (type: SheetType, need?: (typeof recommendedNeeds)[number]) => void }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader icon={Bookmark} title="Saved needs" subtitle="Needs you saved for later review or support." />

      <div className="space-y-4">
        {savedNeeds.map((item) => (
          <SectionCard key={item.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge tone={getStatusTone(item.need.urgency)}>{item.need.urgency}</Badge>
                  <Badge tone="blue">{item.need.category}</Badge>
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{item.need.title}</h3>
                <p className="text-slate-500 mt-2">
                  {item.need.organization} · {item.need.location} · Saved {item.savedDate}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <SecondaryButton onClick={() => openSheet("need-details", item.need)}><Eye className="w-4 h-4" /> View</SecondaryButton>
                <PrimaryButton onClick={() => openSheet("donate", item.need)}><Banknote className="w-4 h-4" /> Donate</PrimaryButton>
              </div>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

function InterestsTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={HandHeart}
        title="My interests"
        subtitle="Track your money, goods, service, and transport offers sent to organizations."
      />

      <div className="space-y-4">
        {interests.map((interest) => (
          <SectionCard key={interest.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge tone={getStatusTone(interest.status)}>{interest.status}</Badge>
                  <Badge tone="blue">{interest.supportType}</Badge>
                  {interest.anonymous && <Badge tone="slate">Anonymous publicly</Badge>}
                </div>

                <h3 className="text-xl font-semibold text-slate-900">{interest.needTitle}</h3>
                <p className="text-slate-500 mt-2">{interest.organization}</p>
                <p className="text-slate-600 mt-4 leading-relaxed">{interest.message}</p>
              </div>

              <div className="min-w-[220px] space-y-3">
                <MiniDetail label="Value" value={interest.value} />
                <MiniDetail label="Submitted" value={interest.submitted} />
                <MiniDetail label="Accepted" value={interest.accepted} />
              </div>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

function ContributionsTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={ReceiptText}
        title="Contribution history"
        subtitle="View completed support, receipts, proof, and related impact stories."
        action={<SecondaryButton><Download className="w-4 h-4" /> Export</SecondaryButton>}
      />

      <div className="space-y-4">
        {contributions.map((contribution) => (
          <SectionCard key={contribution.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge tone={getStatusTone(contribution.status)}>{contribution.status}</Badge>
                  <Badge tone="blue">{contribution.type}</Badge>
                  {contribution.anonymous && <Badge tone="slate">Anonymous</Badge>}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{contribution.needTitle}</h3>
                <p className="text-slate-500 mt-2">{contribution.organization} · {contribution.date}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 min-w-[420px]">
                <MiniDetail label="Value" value={contribution.value} />
                <MiniDetail label="Receipt / proof" value={contribution.receipt} />
                <MiniDetail label="Impact story" value={contribution.impactStory} />
              </div>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

function GiftLibraryTab({ openSheet }: { openSheet: (type: SheetType) => void }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={Gift}
        title="My gift library offerings"
        subtitle="Post and manage goods, services, or financial support before they are matched to needs."
        action={<PrimaryButton onClick={() => openSheet("offering")}><Plus className="w-4 h-4" /> New Offering</PrimaryButton>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {giftOfferings.map((offering) => (
          <SectionCard key={offering.id} className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge tone={getStatusTone(offering.status)}>{offering.status}</Badge>
              <Badge tone="blue">{offering.type}</Badge>
              {offering.anonymous && <Badge tone="slate">Anonymous</Badge>}
            </div>

            <h3 className="text-xl font-semibold text-slate-900">{offering.title}</h3>
            <p className="text-slate-500 mt-3 leading-relaxed">{offering.description}</p>

            <div className="space-y-3 mt-6">
              <MiniDetail label="Category" value={offering.category} />
              <MiniDetail label="Quantity / value" value={offering.quantity} />
              <MiniDetail label="Location" value={offering.location} />
              <MiniDetail label="Matched need" value={offering.matchedNeed} />
              <MiniDetail label="Expiry" value={offering.expiry} />
            </div>

            <div className="flex gap-2 mt-6 pt-5 border-t border-slate-100">
              <SecondaryButton><Eye className="w-4 h-4" /> View</SecondaryButton>
              <SecondaryButton><Edit3 className="w-4 h-4" /> Edit</SecondaryButton>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

function MessagesTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={MessageCircle}
        title="Messages"
        subtitle="Communicate with organizations about your interests, donations, and delivery arrangements."
        action={<PrimaryButton><Send className="w-4 h-4" /> New Message</PrimaryButton>}
      />

      <div className="space-y-4">
        {messages.map((message) => (
          <SectionCard key={message.id} className={`p-6 ${message.unread ? "border-blue-100" : ""}`}>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {message.unread && <Badge tone="blue">Unread</Badge>}
                  <Badge tone="slate">{message.relatedNeed}</Badge>
                </div>

                <h3 className="text-xl font-semibold text-slate-900">{message.subject}</h3>
                <p className="text-sm text-slate-500 mt-1">From {message.organization} · {message.date}</p>
                <p className="text-slate-600 mt-4 leading-relaxed">{message.body}</p>
              </div>

              <SecondaryButton><ArrowRight className="w-4 h-4" /> Open</SecondaryButton>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

function NotificationsTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={Bell}
        title="Notifications"
        subtitle="Updates about interests, donations, matching, fulfillment, and impact stories."
        action={<SecondaryButton><Check className="w-4 h-4" /> Mark All Read</SecondaryButton>}
      />

      <div className="space-y-4">
        {notifications.map((notification) => (
          <SectionCard key={notification.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge tone={getStatusTone(notification.priority)}>{notification.priority}</Badge>
                  {!notification.read && <Badge tone="blue">New</Badge>}
                  <Badge tone="slate">{notification.type}</Badge>
                </div>

                <h3 className="text-xl font-semibold text-slate-900">{notification.title}</h3>
                <p className="text-slate-500 mt-3 leading-relaxed">{notification.message}</p>
                <div className="text-sm font-semibold text-slate-400 mt-4">{notification.related} · {notification.date}</div>
              </div>

              <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white transition-all shrink-0">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

function PreferencesTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={SlidersHorizontal}
        title="Giver preferences"
        subtitle="Control what needs are recommended and how your support is displayed."
        action={<PrimaryButton><Check className="w-4 h-4" /> Save Preferences</PrimaryButton>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard className="p-8">
          <SectionHeader icon={Heart} title="Support preferences" subtitle="Categories and locations you prefer to support." />
          <div className="space-y-4">
            <PreferenceTags label="Preferred categories" values={giverProfile.preferredCategories} />
            <PreferenceTags label="Preferred locations" values={giverProfile.preferredLocations} />
            <PreferenceTags label="Support types" values={giverProfile.supportTypes} />
            <SettingsField label="Maximum distance" value="50 km from current location" />
          </div>
        </SectionCard>

        <SectionCard className="p-8">
          <SectionHeader icon={Lock} title="Anonymous giving" subtitle="Default visibility settings for donations and offerings." />
          <div className="space-y-4">
            <ToggleRow title="Ask before each donation" text="Choose public or anonymous support each time." enabled />
            <ToggleRow title="Hide name on public impact stories" text="Show Anonymous Giver publicly when selected." enabled />
            <ToggleRow title="Allow internal receipt records" text="Admins and organizations can keep internal records for safety and receipts." enabled />
            <SettingsField label="Default public display name" value={giverProfile.publicDisplayName} />
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

function SettingsTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={Settings}
        title="Settings"
        subtitle="Manage account details, payment preference, notifications, privacy, and account status."
        action={<PrimaryButton><Check className="w-4 h-4" /> Save Changes</PrimaryButton>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6">
        <SectionCard className="p-8">
          <SectionHeader icon={User} title="Account details" subtitle="Basic information used for your giver account." />
          <div className="space-y-4">
            <SettingsField label="Full name" value={giverProfile.fullName} />
            <SettingsField label="Email" value={giverProfile.email} />
            <SettingsField label="Phone" value={giverProfile.phone} />
            <SettingsField label="City" value={giverProfile.city} />
            <SettingsField label="Province" value={giverProfile.province} />
          </div>
        </SectionCard>

        <SectionCard className="p-8">
          <SectionHeader icon={Bell} title="Notification settings" subtitle="Choose how you receive updates from HelpLift." />
          <div className="space-y-4">
            <ToggleRow title="Email notifications" text="Receive updates for interests, matching, and receipts." enabled />
            <ToggleRow title="App notifications" text="Receive alerts inside the platform." enabled />
            <ToggleRow title="SMS notifications" text="Receive urgent delivery or coordination updates." enabled={false} />
            <ToggleRow title="Weekly impact summary" text="Receive a weekly summary of your support impact." enabled />
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SectionCard className="p-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 mb-5">
            <CreditCard className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">Payment preference</h3>
          <p className="text-slate-500 mt-2 leading-relaxed">Manage donation payment readiness and receipt preferences.</p>
          <div className="mt-5 space-y-3">
            <MiniDetail label="Payment method" value={giverProfile.paymentStatus} />
            <MiniDetail label="Receipt preference" value="Always ask" />
          </div>
        </SectionCard>

        <SectionCard className="p-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 mb-5">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">Security</h3>
          <p className="text-slate-500 mt-2 leading-relaxed">Manage password updates and account protection.</p>
          <div className="mt-5 space-y-3">
            <MiniDetail label="Password status" value="Last updated 21 days ago" />
            <MiniDetail label="Email verification" value={giverProfile.emailStatus} />
          </div>
        </SectionCard>

        <SectionCard className="p-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 mb-5">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">Account status</h3>
          <p className="text-slate-500 mt-2 leading-relaxed">These actions affect your giver account access.</p>
          <div className="mt-5 space-y-3">
            <MiniDetail label="Status" value={giverProfile.accountStatus} />
            <SecondaryButton><Archive className="w-4 h-4" /> Request Deactivation</SecondaryButton>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

function ProfileTab({
  setActiveTab,
  openSheet,
}: {
  setActiveTab: (tab: GiverTab) => void
  openSheet: (type: SheetType, need?: (typeof recommendedNeeds)[number]) => void
}) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("userId")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    router.push("/login")
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 md:p-10 shadow-sm">
        <div className="absolute -top-10 -right-10 w-56 h-56 bg-blue-50 rounded-full blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-md shadow-blue-200 flex items-center justify-center text-white text-2xl font-bold shrink-0">
              {giverProfile.publicDisplayName.charAt(0)}
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge tone="emerald">
                  <ShieldCheck className="w-3.5 h-3.5" /> {giverProfile.emailStatus}
                </Badge>
                <Badge tone="blue">
                  <User className="w-3.5 h-3.5" /> {giverProfile.accountType} Giver
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                {giverProfile.fullName}
              </h1>

              <p className="text-slate-500 text-lg mt-4 leading-relaxed max-w-2xl">
                Manage your giver profile, anonymous giving preference, preferred support categories, saved needs, and contribution settings.
              </p>

              <div className="flex flex-wrap gap-4 mt-6 text-sm font-semibold text-slate-500">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" /> {giverProfile.location}
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-500" /> Anonymous: {giverProfile.anonymousPreference}
                </span>
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-500" /> {giverProfile.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveTab("browse")}
              className="group inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 bg-blue-600 rounded-2xl shadow-sm hover:bg-blue-700 hover:-translate-y-0.5"
            >
              <Search className="w-4 h-4" /> Browse Needs
            </button>
            <SecondaryButton onClick={() => openSheet("donate", recommendedNeeds[0])}>
              <Banknote className="w-4 h-4" /> Donate
            </SecondaryButton>
            <SecondaryButton onClick={() => openSheet("offering")}>
              <Gift className="w-4 h-4" /> Post Offering
            </SecondaryButton>
            <button
              onClick={() => setActiveTab("settings")}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm"
            >
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="bg-white border border-slate-100 rounded-[2rem] p-8">
          <SectionHeader
            icon={User}
            title="Public profile information"
            subtitle="This information controls how your giver profile appears to organizations and in contribution records."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InfoRow icon={Mail} label="Email" value={giverProfile.email} />
            <InfoRow icon={Phone} label="Phone" value={giverProfile.phone} />
            <InfoRow icon={MapPin} label="Location" value={giverProfile.location} />
            <InfoRow icon={Globe} label="Preferred locations" value={giverProfile.preferredLocations.join(", ")} />
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-slate-50 border border-slate-100 p-5">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Public display details
            </div>
            <p className="text-slate-600 leading-relaxed">
              Your public display name is <span className="font-semibold text-slate-800">{giverProfile.publicDisplayName}</span>. Your default display setting is <span className="font-semibold text-slate-800">{giverProfile.defaultDisplay}</span>, and anonymous giving is set to <span className="font-semibold text-slate-800">{giverProfile.anonymousPreference}</span>.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[2rem] p-8">
          <SectionHeader
            icon={ShieldCheck}
            title="Account summary"
            subtitle="Core account, verification, and payment information."
          />

          <div className="space-y-3">
            <MiniDetail label="Giver ID" value={giverProfile.id} />
            <MiniDetail label="Account type" value={giverProfile.accountType} />
            <MiniDetail label="Account status" value={giverProfile.accountStatus} />
            <MiniDetail label="Email verification" value={giverProfile.emailStatus} />
            <MiniDetail label="Payment status" value={giverProfile.paymentStatus} />
            <MiniDetail label="Joined HelpLift" value={giverProfile.joinedDate} />
            <MiniDetail label="Last login" value={giverProfile.lastLogin} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-8">
        <SectionHeader
          icon={SlidersHorizontal}
          title="Giving preferences"
          subtitle="Preferences used to recommend needs and control how your support is shown."
          action={
            <PrimaryButton onClick={() => setActiveTab("preferences")}>
              <Edit3 className="w-4 h-4" /> Update Preferences
            </PrimaryButton>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MiniDetail label="Preferred categories" value={giverProfile.preferredCategories.join(", ")} />
          <MiniDetail label="Support types" value={giverProfile.supportTypes.join(", ")} />
          <MiniDetail label="Preferred locations" value={giverProfile.preferredLocations.join(", ")} />
          <MiniDetail label="Anonymous preference" value={giverProfile.anonymousPreference} />
          <MiniDetail label="Notification method" value={giverProfile.notificationMethod} />
          <MiniDetail label="Business / group details" value={giverProfile.businessName || "Not applicable"} />
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={handleLogout}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-rose-600 bg-white border border-rose-100 rounded-2xl hover:bg-rose-50 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  )
}

// -------------------- Cards and Rows --------------------
function NeedCard({
  need,
  openSheet,
}: {
  need: (typeof recommendedNeeds)[number]
  openSheet: (type: SheetType, need?: (typeof recommendedNeeds)[number]) => void
}) {
  return (
    <SectionCard className="p-6 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge tone={getStatusTone(need.urgency)}>{need.urgency}</Badge>
            <Badge tone="blue">{need.category}</Badge>
            {need.verified && <Badge tone="emerald"><ShieldCheck className="w-3.5 h-3.5" /> Verified</Badge>}
          </div>
          <h3 className="text-xl font-semibold text-slate-900 leading-tight">{need.title}</h3>
          <p className="text-slate-500 mt-2">{need.organization}</p>
          <p className="text-slate-600 mt-4 leading-relaxed">{need.description}</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-white transition-all shrink-0">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <MiniDetail label="Location" value={need.location} />
        <MiniDetail label="Quantity / value" value={need.quantity} />
        <MiniDetail label="Estimated value" value={need.value} />
        <MiniDetail label="Due date" value={need.dueDate} />
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm font-semibold mb-2">
          <span className="text-slate-500">Fulfillment progress</span>
          <span className="text-slate-900">{need.progress}%</span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full rounded-full bg-blue-600" style={{ width: `${need.progress}%` }} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-5 border-t border-slate-100">
        <div className="text-sm text-slate-500 font-semibold">{need.anonymousSupporters} anonymous supporters</div>
        <div className="flex flex-wrap gap-2">
          <SecondaryButton onClick={() => openSheet("need-details", need)}><Eye className="w-4 h-4" /> View</SecondaryButton>
          <SecondaryButton onClick={() => openSheet("interest", need)}><HandHeart className="w-4 h-4" /> Interest</SecondaryButton>
          <PrimaryButton onClick={() => openSheet("donate", need)}><Banknote className="w-4 h-4" /> Donate</PrimaryButton>
        </div>
      </div>
    </SectionCard>
  )
}

function NeedRow({
  need,
  openSheet,
}: {
  need: (typeof recommendedNeeds)[number]
  openSheet: (type: SheetType, need?: (typeof recommendedNeeds)[number]) => void
}) {
  return (
    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white transition-all">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge tone={getStatusTone(need.urgency)}>{need.urgency}</Badge>
            <Badge tone="blue">{need.category}</Badge>
          </div>
          <h3 className="font-semibold text-slate-900 text-lg">{need.title}</h3>
          <p className="text-sm text-slate-500 mt-2">{need.organization} · {need.location}</p>
        </div>

        <div className="flex gap-2">
          <SecondaryButton onClick={() => openSheet("interest", need)}><HandHeart className="w-4 h-4" /> Interest</SecondaryButton>
          <PrimaryButton onClick={() => openSheet("donate", need)}><Banknote className="w-4 h-4" /> Donate</PrimaryButton>
        </div>
      </div>
    </div>
  )
}

function ActivityRow({ item }: { item: (typeof interests)[number] }) {
  return (
    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge tone={getStatusTone(item.status)}>{item.status}</Badge>
            <Badge tone="blue">{item.supportType}</Badge>
          </div>
          <h3 className="font-semibold text-slate-900">{item.needTitle}</h3>
          <p className="text-sm text-slate-500 mt-1">{item.organization} · {item.value}</p>
        </div>
        <div className="text-sm font-semibold text-slate-400">{item.submitted}</div>
      </div>
    </div>
  )
}

// -------------------- Sheets --------------------
function DonateSheet({ need }: { need: (typeof recommendedNeeds)[number] | null }) {
  return (
    <div className="space-y-5">
      {need && (
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="text-sm font-semibold text-slate-500">Need</div>
          <div className="font-semibold text-slate-900 mt-1">{need.title}</div>
          <div className="text-sm text-slate-500 mt-1">{need.organization}</div>
        </div>
      )}

      <SettingsField label="Donation amount" value="R500" />

      <div>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Suggested amounts</div>
        <div className="grid grid-cols-3 gap-2">
          {["R100", "R250", "R500", "R1,000", "R2,500", "Custom"].map((amount) => (
            <button key={amount} className="px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-700">
              {amount}
            </button>
          ))}
        </div>
      </div>

      <ToggleRow title="Donate anonymously" text="Public pages will show Anonymous Giver." enabled />
      <ToggleRow title="Request receipt" text="Keep a receipt for your records." enabled />

      <SettingsField label="Optional message" value="Thank you for the work you are doing." />

      <PrimaryButton><CheckCircle2 className="w-4 h-4" /> Confirm Donation</PrimaryButton>
    </div>
  )
}

function InterestSheet({ need }: { need: (typeof recommendedNeeds)[number] | null }) {
  return (
    <div className="space-y-5">
      {need && (
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="text-sm font-semibold text-slate-500">Need</div>
          <div className="font-semibold text-slate-900 mt-1">{need.title}</div>
          <div className="text-sm text-slate-500 mt-1">{need.organization}</div>
        </div>
      )}

      <SettingsField label="Support type" value="Goods" />
      <SettingsField label="Support description" value="Stationery packs and school supplies" />
      <SettingsField label="Quantity / value" value="50 stationery packs" />
      <SettingsField label="Availability" value="Available from Friday" />
      <SettingsField label="Delivery preference" value="Drop-off" />
      <ToggleRow title="Support anonymously" text="Hide public identity while keeping internal records." enabled={false} />
      <SettingsField label="Message to organization" value="I can assist with supplies and arrange delivery." />

      <PrimaryButton><Send className="w-4 h-4" /> Submit Interest</PrimaryButton>
    </div>
  )
}

function OfferingSheet() {
  return (
    <div className="space-y-5">
      <SettingsField label="Offering title" value="Stationery Packs Available" />
      <SettingsField label="Offering type" value="Goods" />
      <SettingsField label="Category" value="Education" />
      <SettingsField label="Description" value="50 stationery packs with notebooks, pens, pencils, and rulers." />
      <SettingsField label="Quantity / value" value="50 packs" />
      <SettingsField label="Conditions" value="Must be collected or delivered within Gauteng." />
      <SettingsField label="Location" value="Vereeniging" />
      <SettingsField label="Availability dates" value="25 May - 10 June 2026" />
      <SettingsField label="Expiry date" value="10 June 2026" />
      <ToggleRow title="Offer anonymously" text="Show this offering publicly as Anonymous Giver." enabled={false} />
      <ToggleRow title="Visible to verified organizations" text="Allow approved organizations to request this offering." enabled />
      <SecondaryButton><UploadCloud className="w-4 h-4" /> Upload Images</SecondaryButton>
      <PrimaryButton><Gift className="w-4 h-4" /> Submit Offering</PrimaryButton>
    </div>
  )
}

// -------------------- Small Reusable Components --------------------
function SideSheet({
  open,
  title,
  subtitle,
  onClose,
  children,
}: {
  open: boolean
  title: string
  subtitle: string
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[120] bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`fixed right-4 top-4 bottom-4 z-[130] w-[calc(100%-2rem)] max-w-md bg-white border border-slate-100 rounded-[2rem] shadow-2xl transition-all duration-300 overflow-hidden ${
          open ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">{subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white transition-all shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100%-104px)]">
          {children}
        </div>
      </aside>
    </>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
      <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-blue-600 shrink-0">
        <Icon className="w-5 h-5" />
      </div>

      <div>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</div>
        <div className="font-semibold text-slate-800 mt-1 leading-snug">{value}</div>
      </div>
    </div>
  )
}

function QuickAction({
  icon: Icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ElementType
  title: string
  subtitle: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white transition-all text-left group"
    >
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-600 group-hover:text-blue-600 transition-colors">
          <Icon className="w-5 h-5" />
        </div>

        <div>
          <div className="font-semibold text-slate-900">{title}</div>
          <div className="text-sm text-slate-500">{subtitle}</div>
        </div>
      </div>

      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
    </button>
  )
}

function MiniDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</div>
      <div className="text-sm font-semibold text-slate-800 mt-1 leading-snug">{value}</div>
    </div>
  )
}

function AlertCard({
  tone,
  title,
  text,
}: {
  tone: StatusTone
  title: string
  text: string
}) {
  return (
    <div className={`p-4 rounded-2xl border ${toneClasses[tone]}`}>
      <div className="font-semibold">{title}</div>
      <p className="text-sm mt-1 opacity-80 leading-relaxed">{text}</p>
    </div>
  )
}

function PreferenceTags({ label, values }: { label: string; values: string[] }) {
  return (
    <div>
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <Badge key={value} tone="blue">{value}</Badge>
        ))}
      </div>
    </div>
  )
}

function SettingsField({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{label}</span>
      <input
        value={value}
        readOnly
        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-semibold text-slate-700"
      />
    </label>
  )
}

function ToggleRow({
  title,
  text,
  enabled,
}: {
  title: string
  text: string
  enabled: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
      <div>
        <div className="font-semibold text-slate-900">{title}</div>
        <p className="text-sm text-slate-500 mt-1 leading-relaxed">{text}</p>
      </div>

      <button
        className={`relative w-12 h-7 rounded-full transition-all shrink-0 ${enabled ? "bg-blue-600" : "bg-slate-300"}`}
      >
        <span
          className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${enabled ? "left-6" : "left-1"}`}
        />
      </button>
    </div>
  )
}
