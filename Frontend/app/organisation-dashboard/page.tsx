"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  HeartHandshake,
  ShieldCheck,
  ArrowRight,
  MapPin,
  Send,
  Plus,
  Sparkles,
  LayoutDashboard,
  Gift,
  Users,
  CheckCircle2,
  Search,
  Building2,
  Bell,
  MessageCircle,
  FileCheck2,
  HandHeart,
  TrendingUp,
  Settings,
  ClipboardList,
  Eye,
  Clock,
  Truck,
  BadgeCheck,
  AlertTriangle,
  CalendarDays,
  MoreHorizontal,
  UploadCloud,
  Lock,
  BarChart3,
  Mail,
  Phone,
  Globe,
  MapPinned,
  Edit3,
  Check,
  X,
  Filter,
  ChevronRight,
  Archive,
  Megaphone,
  ImagePlus,
  ReceiptText,
  UserCheck,
  UserCircle,
  LogOut,
} from "lucide-react"

// -------------------- Types --------------------
type OrganizationTab =
  | "overview"
  | "profile"
  | "needs"
  | "givers"
  | "fulfillment"
  | "gift-library"
  | "impact"
  | "messages"
  | "notifications"
  | "analytics"
  | "settings"

type StatusTone = "blue" | "emerald" | "amber" | "rose" | "slate" | "purple" | "indigo"

// -------------------- Mock Data --------------------
const organizationProfile = {
  id: "ORG-1001",
  name: "Hope Academy Foundation",
  type: "Non-profit Organization",
  registrationNumber: "NPO-2024/01892",
  taxStatus: "Approved Section 18A Partner",
  verificationStatus: "Verified",
  accountStatus: "Active",
  location: "Johannesburg Central, Gauteng",
  province: "Gauteng",
  city: "Johannesburg",
  areasServed: ["Johannesburg CBD", "Soweto", "Alexandra", "Tembisa"],
  contactPerson: "Sarah Mokoena",
  contactRole: "Director",
  email: "support@hopeacademy.org",
  phone: "+27 11 555 0182",
  website: "www.hopeacademy.org",
  mission:
    "To support learners from low-income communities through education resources, nutrition support, mentorship, and school readiness programmes.",
  description:
    "Hope Academy Foundation works with schools, community centres, and local volunteers to identify verified education and welfare needs. The organization uses HelpLift to post needs, coordinate giver support, confirm fulfillment, and publish impact stories after support has been delivered.",
  verifiedDate: "12 May 2026",
  joinedDate: "03 April 2026",
  logoInitials: "HA",
}

const dashboardStats = [
  { label: "Total Needs", value: "28", helper: "12 active this month", icon: ClipboardList, tone: "blue" as StatusTone },
  { label: "Open Needs", value: "8", helper: "3 marked urgent", icon: Megaphone, tone: "slate" as StatusTone },
  { label: "Interested Givers", value: "46", helper: "14 waiting for review", icon: Users, tone: "slate" as StatusTone },
  { label: "Fulfilled Needs", value: "19", helper: "6 completed recently", icon: CheckCircle2, tone: "slate" as StatusTone },
]

const needs = [
  {
    id: "NEED-001",
    title: "School Supplies for Grade 8 Learners",
    category: "Education",
    urgency: "High",
    status: "Open",
    approval: "Approved",
    location: "Johannesburg Central",
    beneficiaryType: "School group",
    quantity: "200 stationery packs",
    estimatedValue: "R18,500",
    progress: 72,
    interestedGivers: 9,
    anonymousSupporters: 3,
    dateCreated: "18 May 2026",
    dueDate: "31 May 2026",
    description:
      "Stationery packs, school bags, calculators, and notebooks are needed for Grade 8 learners starting their second term support programme.",
  },
  {
    id: "NEED-002",
    title: "Winter Blanket Drive",
    category: "Clothing & Shelter",
    urgency: "Emergency",
    status: "In Progress",
    approval: "Approved",
    location: "Soweto",
    beneficiaryType: "Families",
    quantity: "500 blankets",
    estimatedValue: "R42,000",
    progress: 54,
    interestedGivers: 16,
    anonymousSupporters: 6,
    dateCreated: "13 May 2026",
    dueDate: "28 May 2026",
    description:
      "Warm blankets are required for families affected by the current winter conditions. Delivery coordination is already in progress.",
  },
  {
    id: "NEED-003",
    title: "After-school Meal Support",
    category: "Food",
    urgency: "Medium",
    status: "Pending Approval",
    approval: "Pending",
    location: "Alexandra",
    beneficiaryType: "Learners",
    quantity: "1,200 meal packs",
    estimatedValue: "R24,000",
    progress: 0,
    interestedGivers: 0,
    anonymousSupporters: 0,
    dateCreated: "22 May 2026",
    dueDate: "10 June 2026",
    description:
      "Meal packs are needed for the after-school study programme. The need is waiting for admin approval before going public.",
  },
  {
    id: "NEED-004",
    title: "Transport for Community Workshop",
    category: "Transport",
    urgency: "Low",
    status: "Draft",
    approval: "Not Submitted",
    location: "Tembisa",
    beneficiaryType: "Community group",
    quantity: "2 shuttle trips",
    estimatedValue: "R3,500",
    progress: 0,
    interestedGivers: 0,
    anonymousSupporters: 0,
    dateCreated: "23 May 2026",
    dueDate: "08 June 2026",
    description:
      "Transport support is needed for learners attending a weekend mentorship workshop.",
  },
]

const interestedGivers = [
  {
    id: "GIV-001",
    name: "Anonymous Giver",
    type: "Individual",
    supportType: "Money",
    supportDescription: "R5,000 contribution towards school supplies",
    value: "R5,000",
    need: "School Supplies for Grade 8 Learners",
    availability: "Available immediately",
    deliveryPreference: "Online transfer",
    status: "Pending Review",
    anonymous: true,
    dateSubmitted: "23 May 2026",
  },
  {
    id: "GIV-002",
    name: "BrightPath Office Supplies",
    type: "Business",
    supportType: "Goods",
    supportDescription: "120 notebooks, 80 pens, 40 calculators",
    value: "R11,200",
    need: "School Supplies for Grade 8 Learners",
    availability: "Drop-off on Friday",
    deliveryPreference: "Drop-off",
    status: "Accepted",
    anonymous: false,
    dateSubmitted: "21 May 2026",
  },
  {
    id: "GIV-003",
    name: "Thabo M.",
    type: "Individual",
    supportType: "Service",
    supportDescription: "Free transport assistance for blanket delivery",
    value: "2 trips",
    need: "Winter Blanket Drive",
    availability: "Weekend mornings",
    deliveryPreference: "Scheduled appointment",
    status: "Pending Review",
    anonymous: false,
    dateSubmitted: "22 May 2026",
  },
  {
    id: "GIV-004",
    name: "Ubuntu Retail Group",
    type: "Company",
    supportType: "Goods",
    supportDescription: "200 winter blankets from surplus stock",
    value: "R18,000",
    need: "Winter Blanket Drive",
    availability: "Ready for collection",
    deliveryPreference: "Pickup",
    status: "Accepted",
    anonymous: false,
    dateSubmitted: "20 May 2026",
  },
]

const fulfillments = [
  {
    id: "FUL-001",
    need: "Winter Blanket Drive",
    giver: "Ubuntu Retail Group",
    type: "Goods",
    method: "Pickup",
    plannedDate: "25 May 2026",
    status: "In Progress",
    giverConfirmation: "Confirmed available",
    organizationConfirmation: "Awaiting collection",
    proof: "Not uploaded yet",
  },
  {
    id: "FUL-002",
    need: "School Supplies for Grade 8 Learners",
    giver: "BrightPath Office Supplies",
    type: "Goods",
    method: "Drop-off",
    plannedDate: "27 May 2026",
    status: "Scheduled",
    giverConfirmation: "Confirmed",
    organizationConfirmation: "Pending delivery",
    proof: "Delivery note pending",
  },
  {
    id: "FUL-003",
    need: "Reading Corner Books",
    giver: "Anonymous Giver",
    type: "Money",
    method: "Online transfer",
    plannedDate: "16 May 2026",
    status: "Completed",
    giverConfirmation: "Confirmed",
    organizationConfirmation: "Received",
    proof: "Receipt uploaded",
  },
]

const giftLibraryRequests = [
  {
    id: "GIFT-001",
    title: "Bulk School Shoes Available",
    giver: "StepForward Shoes",
    type: "Goods",
    category: "Clothing",
    quantity: "90 pairs",
    location: "Johannesburg",
    expiry: "30 June 2026",
    status: "Matched",
    anonymous: false,
  },
  {
    id: "GIFT-002",
    title: "Free Career Guidance Session",
    giver: "Anonymous Giver",
    type: "Service",
    category: "Education",
    quantity: "3 workshop sessions",
    location: "Online / In-person",
    expiry: "15 June 2026",
    status: "Available",
    anonymous: true,
  },
  {
    id: "GIFT-003",
    title: "Food Parcel Stock",
    giver: "Ubuntu Retail Group",
    type: "Goods",
    category: "Food",
    quantity: "150 parcels",
    location: "Soweto",
    expiry: "05 June 2026",
    status: "Requested",
    anonymous: false,
  },
]

const impactStories = [
  {
    id: "STORY-001",
    title: "Reading Corner Books Delivered",
    relatedNeed: "Reading Corner Books",
    status: "Published",
    date: "18 May 2026",
    visibility: "Public",
    giverMention: "Anonymous mention",
    views: 1280,
    content:
      "A small reading corner was created for learners using donated books and shelves. The giver chose to remain anonymous publicly.",
  },
  {
    id: "STORY-002",
    title: "Mentorship Workshop Completed",
    relatedNeed: "Transport for Mentorship Workshop",
    status: "Draft",
    date: "Not published",
    visibility: "Private draft",
    giverMention: "Named mention pending approval",
    views: 0,
    content:
      "Draft story for the completed mentorship workshop. Photos and final beneficiary privacy review are still needed.",
  },
]

const documents = [
  { id: "DOC-001", name: "NPO Registration Certificate", type: "Registration", status: "Approved", uploaded: "03 April 2026" },
  { id: "DOC-002", name: "Tax Clearance / Section 18A Proof", type: "Tax", status: "Approved", uploaded: "03 April 2026" },
  { id: "DOC-003", name: "Director ID Verification", type: "Identity", status: "Approved", uploaded: "04 April 2026" },
  { id: "DOC-004", name: "Latest Community Activity Report", type: "Proof of Activity", status: "Review Required", uploaded: "22 May 2026" },
]

const messages = [
  {
    id: "MSG-001",
    sender: "BrightPath Office Supplies",
    subject: "Drop-off confirmation for stationery packs",
    relatedNeed: "School Supplies for Grade 8 Learners",
    body: "We can drop off the stationery packs on Friday at 10:00. Please confirm the delivery address and contact person.",
    date: "23 May 2026",
    unread: true,
  },
  {
    id: "MSG-002",
    sender: "HelpLift Verification Team",
    subject: "Community activity report needs update",
    relatedNeed: "Organization Verification",
    body: "Please upload the latest activity report with clearer dates and programme details.",
    date: "22 May 2026",
    unread: true,
  },
  {
    id: "MSG-003",
    sender: "Anonymous Giver",
    subject: "Question about donation receipt",
    relatedNeed: "School Supplies for Grade 8 Learners",
    body: "I would like to support the need anonymously, but I still need a receipt for my records.",
    date: "21 May 2026",
    unread: false,
  },
]

const notifications = [
  {
    id: "NOT-001",
    title: "New giver interest received",
    type: "Giver Interest",
    message: "A giver offered R5,000 towards School Supplies for Grade 8 Learners.",
    priority: "High",
    date: "23 May 2026",
    read: false,
  },
  {
    id: "NOT-002",
    title: "Document review required",
    type: "Verification",
    message: "Your latest community activity report requires an update before final review.",
    priority: "Medium",
    date: "22 May 2026",
    read: false,
  },
  {
    id: "NOT-003",
    title: "Fulfillment scheduled",
    type: "Fulfillment",
    message: "BrightPath Office Supplies scheduled a drop-off for 27 May 2026.",
    priority: "Normal",
    date: "22 May 2026",
    read: true,
  },
]

const analytics = [
  { label: "Average fulfillment time", value: "4.8 days", trend: "18% faster than last month" },
  { label: "Most supported category", value: "Education", trend: "42% of all support" },
  { label: "Anonymous support", value: "31%", trend: "Mostly financial contributions" },
  { label: "Impact story views", value: "3,840", trend: "1,280 this week" },
]

// -------------------- Helpers --------------------
const toneClasses: Record<StatusTone, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  emerald: "bg-emerald-50/70 text-emerald-700 border-emerald-100",
  amber: "bg-amber-50/70 text-amber-700 border-amber-100",
  rose: "bg-rose-50/70 text-rose-700 border-rose-100",
  slate: "bg-slate-50 text-slate-600 border-slate-200",
  purple: "bg-slate-50 text-slate-600 border-slate-200",
  indigo: "bg-slate-50 text-slate-600 border-slate-200",
}

function getStatusTone(status: string): StatusTone {
  const value = status.toLowerCase()
  if (value.includes("verified") || value.includes("approved") || value.includes("completed") || value.includes("active") || value.includes("accepted")) return "emerald"
  if (value.includes("pending") || value.includes("scheduled") || value.includes("review") || value.includes("progress")) return "amber"
  if (value.includes("urgent") || value.includes("emergency") || value.includes("required")) return "rose"
  if (value.includes("draft") || value.includes("private")) return "slate"
  if (value.includes("matched") || value.includes("available")) return "blue"
  return "indigo"
}

function Badge({ children, tone = "blue" }: { children: React.ReactNode; tone?: StatusTone }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold ${toneClasses[tone]}`}>
      {children}
    </span>
  )
}

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-slate-100 rounded-[2rem] shadow-sm ${className}`}>
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
        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
          <Icon className="w-5 h-5 text-slate-600" />
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

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="group inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 bg-blue-600 rounded-2xl shadow-sm hover:bg-blue-700 hover:-translate-y-0.5">
      {children}
    </button>
  )
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm">
      {children}
    </button>
  )
}

// -------------------- Main Page --------------------
export default function OrganizationPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<OrganizationTab>("overview")
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNeedStatus, setSelectedNeedStatus] = useState("All")

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
    { id: "needs" as const, label: "Needs", icon: ClipboardList },
    { id: "givers" as const, label: "Givers", icon: HandHeart },
    { id: "fulfillment" as const, label: "Fulfillment", icon: Truck },
    { id: "gift-library" as const, label: "Gift Library", icon: Gift },
    { id: "impact" as const, label: "Impact", icon: Sparkles },
    { id: "messages" as const, label: "Messages", icon: MessageCircle },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "analytics" as const, label: "Analytics", icon: BarChart3 },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ]

  const desktopNavigationTabs = tabs.filter(
    (tab) => !["messages", "notifications"].includes(tab.id)
  )

  const sheetNavigationTabs = [
    { id: "profile" as const, label: "Profile", icon: UserCircle },
    ...tabs,
  ]

  const filteredNeeds = useMemo(() => {
    return needs.filter((need) => {
      const matchesSearch = `${need.title} ${need.category} ${need.location}`.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = selectedNeedStatus === "All" || need.status === selectedNeedStatus
      return matchesSearch && matchesStatus
    })
  }, [searchQuery, selectedNeedStatus])

  const unreadMessages = messages.filter((message) => message.unread).length
  const unreadNotifications = notifications.filter((notification) => !notification.read).length

  const handleLogout = () => {
    localStorage.removeItem("userId")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans">
      {/* --- FLOATING GLASS NAVIGATION --- */}
      <nav className="fixed top-6 left-0 right-0 z-[100] transition-all duration-500 flex justify-center px-4">
        <div className="flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-full max-w-7xl">
          <button onClick={() => router.push("/")} className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-1.5 rounded-full shadow-md shadow-blue-200">
              <HeartHandshake className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">HelpLift</span>
          </button>

          <div className="hidden xl:flex items-center gap-1 bg-slate-50/60 p-1 rounded-full border border-slate-100">
            {desktopNavigationTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
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
            <button onClick={() => setActiveTab("messages")} className="relative w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-white transition-all">
              <MessageCircle className="w-5 h-5" />
              {unreadMessages > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">{unreadMessages}</span>}
            </button>
            <button onClick={() => setActiveTab("notifications")} className="relative w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-white transition-all">
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">{unreadNotifications}</span>}
            </button>
            <button
              onClick={() => setIsMoreOpen(true)}
              className="inline-flex xl:hidden items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300"
            >
              <MoreHorizontal className="w-4 h-4" />
              More
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              title="Profile"
              aria-label="Open organization profile"
              className={`hidden md:inline-flex items-center justify-center w-10 h-10 text-sm font-semibold transition-all duration-300 border rounded-full hover:-translate-y-0.5 ${
                activeTab === "profile"
                  ? "bg-slate-900 text-white border-transparent shadow-lg shadow-slate-200"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <UserCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <SideSheet
        open={isMoreOpen}
        title="Organization sections"
        subtitle="Open extra organization work areas without crowding the main navigation."
        onClose={() => setIsMoreOpen(false)}
      >
        <div className="space-y-2">
          {sheetNavigationTabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setIsMoreOpen(false)
                }}
                className={`w-full flex items-center justify-between gap-3 p-4 rounded-2xl transition-all text-left ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-100"
                }`}
              >
                <span className="flex items-center gap-3 font-semibold">
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </span>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </button>
            )
          })}
        </div>
      </SideSheet>

      <main className="pt-28 pb-16">
        <section className="max-w-6xl mx-auto px-4 mt-8">
          {activeTab === "overview" && <OverviewTab setActiveTab={setActiveTab} />}
          {activeTab === "profile" && <ProfileTab setActiveTab={setActiveTab} onLogout={handleLogout} />}
          {activeTab === "needs" && (
            <NeedsTab
              filteredNeeds={filteredNeeds}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedNeedStatus={selectedNeedStatus}
              setSelectedNeedStatus={setSelectedNeedStatus}
            />
          )}
          {activeTab === "givers" && <GiversTab />}
          {activeTab === "fulfillment" && <FulfillmentTab />}
          {activeTab === "gift-library" && <GiftLibraryTab />}
          {activeTab === "impact" && <ImpactTab />}
          {activeTab === "messages" && <MessagesTab />}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "settings" && <SettingsTab />}
        </section>
      </main>
    </div>
  )
}

// -------------------- Tabs --------------------
function ProfileTab({ setActiveTab, onLogout }: { setActiveTab: (tab: OrganizationTab) => void; onLogout: () => void }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 md:p-10 shadow-sm">
        <div className="absolute -top-10 -right-10 w-56 h-56 bg-blue-50 rounded-full blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-md shadow-blue-200 flex items-center justify-center text-white text-2xl font-bold shrink-0">
              {organizationProfile.logoInitials}
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge tone="emerald">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Organization
                </Badge>
                <Badge tone="blue">
                  <Building2 className="w-3.5 h-3.5" /> {organizationProfile.type}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                {organizationProfile.name}
              </h1>

              <p className="text-slate-500 text-lg mt-4 leading-relaxed max-w-2xl">
                {organizationProfile.mission}
              </p>

              <div className="flex flex-wrap gap-4 mt-6 text-sm font-semibold text-slate-500">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" /> {organizationProfile.location}
                </span>
                <span className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-blue-500" /> Verified {organizationProfile.verifiedDate}
                </span>
                <span className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-emerald-500" /> {organizationProfile.registrationNumber}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveTab("needs")}
              className="group inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 bg-blue-600 rounded-2xl shadow-sm hover:bg-blue-700 hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" /> Post Need
            </button>
            <SecondaryButton>
              <Eye className="w-4 h-4" /> Public Profile
            </SecondaryButton>
            <SecondaryButton>
              <UploadCloud className="w-4 h-4" /> Upload Proof
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
            icon={Building2}
            title="Public profile information"
            subtitle="This information is shown to givers and public visitors when they view the organization."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InfoRow icon={Mail} label="Email" value={organizationProfile.email} />
            <InfoRow icon={Phone} label="Phone" value={organizationProfile.phone} />
            <InfoRow icon={Globe} label="Website" value={organizationProfile.website} />
            <InfoRow icon={MapPinned} label="Areas served" value={organizationProfile.areasServed.join(", ")} />
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-slate-50 border border-slate-100 p-5">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Organization description
            </div>
            <p className="text-slate-600 leading-relaxed">{organizationProfile.description}</p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[2rem] p-8">
          <SectionHeader
            icon={ShieldCheck}
            title="Verification summary"
            subtitle="Trust information connected to this organization profile."
          />

          <div className="space-y-3">
            <MiniDetail label="Verification status" value={organizationProfile.verificationStatus} />
            <MiniDetail label="Account status" value={organizationProfile.accountStatus} />
            <MiniDetail label="Verified date" value={organizationProfile.verifiedDate} />
            <MiniDetail label="Registration number" value={organizationProfile.registrationNumber} />
            <MiniDetail label="Tax / NPO status" value={organizationProfile.taxStatus} />
            <MiniDetail label="Joined HelpLift" value={organizationProfile.joinedDate} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-8">
        <SectionHeader
          icon={FileCheck2}
          title="Verification documents"
          subtitle="Documents used for organization approval and ongoing trust checks."
          action={
            <PrimaryButton>
              <UploadCloud className="w-4 h-4" /> Upload Document
            </PrimaryButton>
          }
        />

        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-blue-600">
                  <FileCheck2 className="w-5 h-5" />
                </div>

                <div>
                  <div className="font-bold text-slate-900">{doc.name}</div>
                  <div className="text-sm text-slate-500">
                    {doc.type} · Uploaded {doc.uploaded}
                  </div>
                </div>
              </div>

              <Badge tone={getStatusTone(doc.status)}>{doc.status}</Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={onLogout}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-rose-600 bg-white border border-rose-100 rounded-2xl hover:bg-rose-50 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  )
}

function OverviewTab({ setActiveTab }: { setActiveTab: (tab: OrganizationTab) => void }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
          Organization overview
        </h1>
        <p className="text-slate-500 mt-2 leading-relaxed">
          A clean operational view of current needs, giver activity, fulfillment progress, and items that need attention.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat) => (
          <button
            key={stat.label}
            onClick={() => {
              if (stat.label.includes("Needs")) setActiveTab("needs")
              if (stat.label.includes("Givers")) setActiveTab("givers")
              if (stat.label.includes("Fulfilled")) setActiveTab("fulfillment")
            }}
            className="group bg-white border border-slate-200 rounded-2xl p-5 text-left hover:border-blue-200 hover:shadow-sm transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-medium text-slate-500">{stat.label}</div>
                <div className="text-3xl font-semibold tracking-tight text-slate-900 mt-3">{stat.value}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
            </div>
            <div className="text-sm text-slate-400 mt-4 pt-4 border-t border-slate-100">{stat.helper}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8">
        <div className="space-y-6">
          <SectionHeader
            icon={ClipboardList}
            title="Recent needs"
            subtitle="Latest needs created by the organization."
            action={
              <button
                onClick={() => setActiveTab("needs")}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View all needs <ArrowRight className="w-4 h-4" />
              </button>
            }
          />

          <div className="space-y-4">
            {needs.slice(0, 3).map((need) => (
              <NeedCompactCard key={need.id} need={need} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <SectionHeader
            icon={ClipboardList}
            title="Today’s work"
            subtitle="Important actions for the organization team."
          />

          <div className="space-y-3">
            <QuickAction
              icon={Plus}
              title="Post a new need"
              subtitle="Create a draft or submit a need for approval."
              onClick={() => setActiveTab("needs")}
            />
            <QuickAction
              icon={Users}
              title="Review interested givers"
              subtitle="14 giver offers are waiting for review."
              onClick={() => setActiveTab("givers")}
            />
            <QuickAction
              icon={Truck}
              title="Track fulfillment"
              subtitle="Confirm delivery, upload proof, and close completed support."
              onClick={() => setActiveTab("fulfillment")}
            />
            <QuickAction
              icon={ImagePlus}
              title="Create impact story"
              subtitle="Publish a story after a need is fulfilled."
              onClick={() => setActiveTab("impact")}
            />
          </div>

          <div className="space-y-3 pt-2">
            <AlertCard tone="rose" title="3 urgent needs require follow-up" text="Emergency and high urgency needs should be reviewed daily." />
            <AlertCard tone="amber" title="14 giver interests pending" text="Review offers before they expire or become unavailable." />
            <AlertCard tone="blue" title="1 document needs update" text="A community activity report requires clearer details." />
          </div>
        </div>
      </div>
    </div>
  )
}

function NeedsTab({
  filteredNeeds,
  searchQuery,
  setSearchQuery,
  selectedNeedStatus,
  setSelectedNeedStatus,
}: {
  filteredNeeds: typeof needs
  searchQuery: string
  setSearchQuery: (value: string) => void
  selectedNeedStatus: string
  setSelectedNeedStatus: (value: string) => void
}) {
  const statuses = ["All", "Open", "In Progress", "Pending Approval", "Draft"]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={ClipboardList}
        title="Needs management"
        subtitle="Create, edit, submit, monitor, and manage all needs posted by the organization."
        action={<PrimaryButton><Plus className="w-4 h-4" /> New Need</PrimaryButton>}
      />

      <SectionCard className="p-5">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search needs by title, category, or location..."
              className="w-full pl-12 pr-5 py-3.5 bg-[#FAFAFA] border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedNeedStatus(status)}
                className={`px-4 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
                  selectedNeedStatus === status ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-500 hover:bg-white hover:text-slate-900 border border-slate-100"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredNeeds.map((need) => (
          <SectionCard key={need.id} className="p-6 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge tone={getStatusTone(need.status)}>{need.status}</Badge>
                  <Badge tone={getStatusTone(need.urgency)}>{need.urgency}</Badge>
                  <Badge tone={getStatusTone(need.approval)}>{need.approval}</Badge>
                </div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">{need.title}</h3>
                <p className="text-slate-500 mt-3 leading-relaxed">{need.description}</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white transition-all shrink-0">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6 text-sm">
              <MiniDetail label="Category" value={need.category} />
              <MiniDetail label="Location" value={need.location} />
              <MiniDetail label="Quantity" value={need.quantity} />
              <MiniDetail label="Value" value={need.estimatedValue} />
              <MiniDetail label="Beneficiary" value={need.beneficiaryType} />
              <MiniDetail label="Due date" value={need.dueDate} />
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-500">Fulfillment progress</span>
                <span className="text-slate-900">{need.progress}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" style={{ width: `${need.progress}%` }} />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-5 border-t border-slate-100">
              <div className="text-sm text-slate-500 font-semibold">
                {need.interestedGivers} interested givers · {need.anonymousSupporters} anonymous
              </div>
              <div className="flex gap-2">
                <SecondaryButton><Eye className="w-4 h-4" /> View</SecondaryButton>
                <SecondaryButton><Edit3 className="w-4 h-4" /> Edit</SecondaryButton>
              </div>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

function GiversTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={HandHeart}
        title="Interested givers"
        subtitle="Review people, businesses, and anonymous supporters who offered help for organization needs."
        action={<SecondaryButton><Filter className="w-4 h-4" /> Filter Offers</SecondaryButton>}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {interestedGivers.map((giver) => (
          <SectionCard key={giver.id} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${giver.anonymous ? "bg-slate-50 text-slate-500 border-slate-100" : "bg-blue-50 text-blue-600 border-blue-100"}`}>
                  {giver.anonymous ? <Lock className="w-6 h-6" /> : <UserCheck className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{giver.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge tone="blue">{giver.type}</Badge>
                    <Badge tone={getStatusTone(giver.status)}>{giver.status}</Badge>
                    {giver.anonymous && <Badge tone="slate">Anonymous publicly</Badge>}
                  </div>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white transition-all">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 p-5 rounded-[1.5rem] bg-slate-50 border border-slate-100">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Support offered</div>
              <p className="text-slate-700 font-semibold leading-relaxed">{giver.supportDescription}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
              <MiniDetail label="Need" value={giver.need} />
              <MiniDetail label="Support type" value={giver.supportType} />
              <MiniDetail label="Quantity / value" value={giver.value} />
              <MiniDetail label="Availability" value={giver.availability} />
              <MiniDetail label="Delivery" value={giver.deliveryPreference} />
              <MiniDetail label="Submitted" value={giver.dateSubmitted} />
            </div>

            <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-100">
              <PrimaryButton><Check className="w-4 h-4" /> Accept</PrimaryButton>
              <SecondaryButton><MessageCircle className="w-4 h-4" /> Message</SecondaryButton>
              <SecondaryButton><X className="w-4 h-4" /> Decline</SecondaryButton>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

function FulfillmentTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={Truck}
        title="Fulfillment tracking"
        subtitle="Track delivery, giver confirmation, organization confirmation, proof uploads, and completion status."
        action={<PrimaryButton><UploadCloud className="w-4 h-4" /> Upload Proof</PrimaryButton>}
      />

      <div className="space-y-5">
        {fulfillments.map((item) => (
          <SectionCard key={item.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge tone={getStatusTone(item.status)}>{item.status}</Badge>
                  <Badge tone="blue">{item.type}</Badge>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item.need}</h3>
                <p className="text-slate-500 mt-2">Assigned giver: <span className="font-bold text-slate-700">{item.giver}</span></p>
              </div>
              <div className="flex gap-2">
                <SecondaryButton><ReceiptText className="w-4 h-4" /> Proof</SecondaryButton>
                <PrimaryButton><CheckCircle2 className="w-4 h-4" /> Mark Complete</PrimaryButton>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
              <TimelineStep active icon={CalendarDays} title="Planned" text={item.plannedDate} />
              <TimelineStep active={item.giverConfirmation.includes("Confirmed")} icon={UserCheck} title="Giver" text={item.giverConfirmation} />
              <TimelineStep active={item.organizationConfirmation.includes("Received")} icon={Building2} title="Organization" text={item.organizationConfirmation} />
              <TimelineStep active={item.proof.includes("uploaded")} icon={UploadCloud} title="Proof" text={item.proof} />
              <TimelineStep active={item.status === "Completed"} icon={CheckCircle2} title="Complete" text={item.status === "Completed" ? "Closed" : "Waiting"} />
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

function GiftLibraryTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={Gift}
        title="Gift library requests"
        subtitle="Browse available giver offerings, request suitable support, and match them to organization needs."
        action={<SecondaryButton><Search className="w-4 h-4" /> Browse Library</SecondaryButton>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {giftLibraryRequests.map((giftItem) => (
          <SectionCard key={giftItem.id} className="p-6 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 mb-5">
              <Gift className="w-6 h-6" />
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge tone={getStatusTone(giftItem.status)}>{giftItem.status}</Badge>
              <Badge tone="purple">{giftItem.type}</Badge>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{giftItem.title}</h3>
            <p className="text-slate-500 mt-2">Offered by {giftItem.giver}</p>

            <div className="space-y-3 mt-6">
              <MiniDetail label="Category" value={giftItem.category} />
              <MiniDetail label="Quantity / value" value={giftItem.quantity} />
              <MiniDetail label="Location" value={giftItem.location} />
              <MiniDetail label="Expiry date" value={giftItem.expiry} />
            </div>

            <div className="flex gap-2 mt-6 pt-5 border-t border-slate-100">
              <PrimaryButton><CheckCircle2 className="w-4 h-4" /> Request</PrimaryButton>
              <SecondaryButton><Eye className="w-4 h-4" /> View</SecondaryButton>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

function ImpactTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={Sparkles}
        title="Impact stories"
        subtitle="Publish transparent stories after needs are fulfilled while protecting beneficiary privacy."
        action={<PrimaryButton><ImagePlus className="w-4 h-4" /> New Story</PrimaryButton>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {impactStories.map((story) => (
          <SectionCard key={story.id} className="p-6 overflow-hidden relative">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-blue-50 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="h-44 rounded-[1.75rem] bg-gradient-to-tr from-blue-100 to-indigo-50 border border-slate-100 flex items-center justify-center mb-6">
                <HeartHandshake className="w-20 h-20 text-blue-600/20" />
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge tone={getStatusTone(story.status)}>{story.status}</Badge>
                <Badge tone={getStatusTone(story.visibility)}>{story.visibility}</Badge>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{story.title}</h3>
              <p className="text-slate-500 mt-3 leading-relaxed">{story.content}</p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <MiniDetail label="Related need" value={story.relatedNeed} />
                <MiniDetail label="Published" value={story.date} />
                <MiniDetail label="Giver mention" value={story.giverMention} />
                <MiniDetail label="Views" value={`${story.views}`} />
              </div>
              <div className="flex gap-2 mt-6 pt-5 border-t border-slate-100">
                <PrimaryButton><Send className="w-4 h-4" /> Publish</PrimaryButton>
                <SecondaryButton><Edit3 className="w-4 h-4" /> Edit</SecondaryButton>
              </div>
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
        subtitle="Communicate with givers and admins about needs, verification, and fulfillment."
        action={
          <PrimaryButton>
            <Send className="w-4 h-4" /> New Message
          </PrimaryButton>
        }
      />

      <div className="space-y-4">
        {messages.map((message) => (
          <SectionCard
            key={message.id}
            className={`p-6 ${message.unread ? "border-blue-100" : ""}`}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {message.unread && <Badge tone="blue">Unread</Badge>}
                  <Badge tone="slate">{message.relatedNeed}</Badge>
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {message.subject}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  From {message.sender} · {message.date}
                </p>

                <p className="text-slate-600 mt-4 leading-relaxed">
                  {message.body}
                </p>
              </div>

              <SecondaryButton>
                <ChevronRight className="w-4 h-4" /> Open
              </SecondaryButton>
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
        subtitle="Important updates about needs, giver interest, verification, fulfillment, and platform activity."
        action={
          <SecondaryButton>
            <Check className="w-4 h-4" /> Mark All Read
          </SecondaryButton>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {notifications.map((notification) => (
          <SectionCard key={notification.id} className="p-6">
            <div
              className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-5 ${
                toneClasses[getStatusTone(notification.priority)]
              }`}
            >
              <Bell className="w-5 h-5" />
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <Badge tone={getStatusTone(notification.priority)}>
                {notification.priority}
              </Badge>
              {!notification.read && <Badge tone="blue">New</Badge>}
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              {notification.title}
            </h3>

            <p className="text-slate-500 mt-3 leading-relaxed">
              {notification.message}
            </p>

            <div className="text-sm font-semibold text-slate-400 mt-5">
              {notification.type} · {notification.date}
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

function AnalyticsTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={BarChart3}
        title="Organization analytics"
        subtitle="High-level reporting for needs, giver engagement, anonymous support, fulfillment, and impact visibility."
        action={
          <SecondaryButton>
            <TrendingUp className="w-4 h-4" /> Export Report
          </SecondaryButton>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {analytics.map((item) => (
          <SectionCard key={item.label} className="p-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 mb-5">
              <BarChart3 className="w-6 h-6" />
            </div>

            <div className="text-3xl font-bold tracking-tight text-slate-900">
              {item.value}
            </div>

            <div className="font-bold text-slate-700 mt-1">
              {item.label}
            </div>

            <div className="text-sm text-slate-400 mt-2">
              {item.trend}
            </div>
          </SectionCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard className="p-8">
          <SectionHeader
            icon={ClipboardList}
            title="Needs by category"
            subtitle="Mock category breakdown based on current organization activity."
          />

          <div className="space-y-5">
            <ProgressRow label="Education" value={42} />
            <ProgressRow label="Food" value={24} />
            <ProgressRow label="Clothing & Shelter" value={21} />
            <ProgressRow label="Transport" value={13} />
          </div>
        </SectionCard>

        <SectionCard className="p-8">
          <SectionHeader
            icon={HandHeart}
            title="Giver support types"
            subtitle="Shows how givers are supporting the organization."
          />

          <div className="space-y-5">
            <ProgressRow label="Goods" value={46} />
            <ProgressRow label="Money" value={31} />
            <ProgressRow label="Services" value={15} />
            <ProgressRow label="Transport / Volunteering" value={8} />
          </div>
        </SectionCard>
      </div>

      <SectionCard className="p-8">
        <SectionHeader
          icon={Clock}
          title="Operational insights"
          subtitle="Useful mock insights for organization decision making."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AlertCard
            tone="emerald"
            title="Fulfillment improved"
            text="Average fulfillment time is currently 4.8 days, which is faster than last month."
          />
          <AlertCard
            tone="amber"
            title="Urgent needs need attention"
            text="Three urgent needs still require follow-up with interested givers."
          />
          <AlertCard
            tone="blue"
            title="Anonymous giving is active"
            text="31% of recent support was given anonymously, mainly through financial contributions."
          />
        </div>
      </SectionCard>
    </div>
  )
}

function SettingsTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={Settings}
        title="Organization settings"
        subtitle="Manage account preferences, privacy, notifications, and public visibility."
        action={
          <PrimaryButton>
            <Check className="w-4 h-4" /> Save Changes
          </PrimaryButton>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6">
        <SectionCard className="p-8">
          <SectionHeader
            icon={Building2}
            title="Account details"
            subtitle="Core account information for this organization."
          />

          <div className="space-y-4">
            <SettingsField label="Organization email" value={organizationProfile.email} />
            <SettingsField label="Contact person" value={organizationProfile.contactPerson} />
            <SettingsField label="Contact role" value={organizationProfile.contactRole} />
            <SettingsField label="Phone number" value={organizationProfile.phone} />
            <SettingsField label="City" value={organizationProfile.city} />
            <SettingsField label="Province" value={organizationProfile.province} />
          </div>
        </SectionCard>

        <SectionCard className="p-8">
          <SectionHeader
            icon={Lock}
            title="Privacy and visibility"
            subtitle="Control what public users and givers can see."
          />

          <div className="space-y-4">
            <ToggleRow
              title="Show organization profile publicly"
              text="Allow public users and givers to view the organization profile."
              enabled
            />
            <ToggleRow
              title="Show fulfilled needs"
              text="Display completed needs on the public profile."
              enabled
            />
            <ToggleRow
              title="Allow anonymous giver mentions"
              text="Mention anonymous supporters as Anonymous Giver in impact stories."
              enabled
            />
            <ToggleRow
              title="Show direct contact information"
              text="Allow public users to see email and phone details."
              enabled={false}
            />
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard className="p-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 mb-5">
            <Bell className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-bold text-slate-900">
            Notification settings
          </h3>

          <p className="text-slate-500 mt-2 leading-relaxed">
            Receive updates for new giver interests, admin reviews, fulfillment changes, and messages.
          </p>

          <div className="mt-5 space-y-3">
            <ToggleRow title="Email notifications" text="Receive important updates by email." enabled />
            <ToggleRow title="SMS notifications" text="Receive urgent need updates by SMS." enabled={false} />
          </div>
        </SectionCard>

        <SectionCard className="p-6">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-5">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-bold text-slate-900">
            Danger zone
          </h3>

          <p className="text-slate-500 mt-2 leading-relaxed">
            These actions affect organization visibility and access.
          </p>

          <div className="mt-5 space-y-3">
            <SecondaryButton>
              <Archive className="w-4 h-4" /> Request Deactivation
            </SecondaryButton>
            <SecondaryButton>
              <Lock className="w-4 h-4" /> Suspend Public Profile
            </SecondaryButton>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}


function SideSheet({
  open,
  title,
  subtitle,
  children,
  onClose,
}: {
  open: boolean
  title: string
  subtitle: string
  children: React.ReactNode
  onClose: () => void
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[200]">
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
      />

      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-[#FAFAFA] border-l border-white shadow-[0_20px_80px_rgba(15,23,42,0.16)] p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
            <p className="text-slate-500 mt-2 leading-relaxed">{subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {children}
      </aside>
    </div>
  )
}

// -------------------- Small Reusable Components --------------------
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
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </div>
        <div className="font-bold text-slate-800 mt-1 leading-snug">
          {value}
        </div>
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
      className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all text-left group"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-blue-600 transition-colors">
          <Icon className="w-4 h-4" />
        </div>

        <div>
          <div className="font-bold text-slate-900">{title}</div>
          <div className="text-sm text-slate-500">{subtitle}</div>
        </div>
      </div>

      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
    </button>
  )
}

function NeedCompactCard({ need }: { need: (typeof needs)[number] }) {
  return (
    <div className="p-5 rounded-[1.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge tone={getStatusTone(need.status)}>{need.status}</Badge>
            <Badge tone={getStatusTone(need.urgency)}>{need.urgency}</Badge>
          </div>

          <h3 className="font-bold text-slate-900 text-lg">
            {need.title}
          </h3>

          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            {need.location} · {need.category} · Due {need.dueDate}
          </p>
        </div>

        <div className="text-right">
          <div className="text-xl font-bold text-slate-900">
            {need.progress}%
          </div>
          <div className="text-xs font-semibold text-slate-400 uppercase">
            Progress
          </div>
        </div>
      </div>

      <div className="w-full h-2 rounded-full bg-white overflow-hidden mt-4">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
          style={{ width: `${need.progress}%` }}
        />
      </div>
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
  const marker = tone === "rose" ? "bg-rose-500" : tone === "amber" ? "bg-amber-500" : "bg-blue-500"

  return (
    <div className="p-4 rounded-2xl border border-slate-200 bg-white flex gap-3">
      <span className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${marker}`} />
      <div>
        <div className="font-semibold text-slate-900">{title}</div>
        <p className="text-sm mt-1 text-slate-500 leading-relaxed">{text}</p>
      </div>
    </div>
  )
}
function MiniDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
        {label}
      </div>
      <div className="text-sm font-semibold text-slate-800 mt-1 leading-snug">
        {value}
      </div>
    </div>
  )
}

function TimelineStep({
  active,
  icon: Icon,
  title,
  text,
}: {
  active: boolean
  icon: React.ElementType
  title: string
  text: string
}) {
  return (
    <div
      className={`p-4 rounded-2xl border ${
        active
          ? "bg-blue-50 border-blue-100 text-blue-700"
          : "bg-slate-50 border-slate-100 text-slate-400"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
          active ? "bg-white text-blue-600" : "bg-white text-slate-400"
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>

      <div className="font-bold">{title}</div>
      <div className="text-sm mt-1 opacity-80 leading-snug">{text}</div>
    </div>
  )
}

function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
      {children}
    </th>
  )
}

function TableCell({ children }: { children: React.ReactNode }) {
  return (
    <td className="p-5 text-sm font-semibold text-slate-600 whitespace-nowrap">
      {children}
    </td>
  )
}

function ProgressRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-slate-700">{label}</span>
        <span className="font-bold text-slate-900">{value}%</span>
      </div>

      <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

function SettingsField({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
        {label}
      </span>

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
        <div className="font-bold text-slate-900">{title}</div>
        <p className="text-sm text-slate-500 mt-1 leading-relaxed">{text}</p>
      </div>

      <button
        className={`relative w-12 h-7 rounded-full transition-all shrink-0 ${
          enabled ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  )
}