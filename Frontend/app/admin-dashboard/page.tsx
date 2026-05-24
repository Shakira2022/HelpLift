"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  HeartHandshake,
  LayoutDashboard,
  Building2,
  FileCheck2,
  ClipboardList,
  Gift,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  MoreHorizontal,
  Menu,
  X,
  Check,
  AlertTriangle,
  ShieldCheck,
  MessageCircle,
  Ticket,
  Activity,
  Tag,
  Archive,
  Eye,
  UserCheck,
  UserX,
  Clock,
  Filter,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Lock,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ReceiptText,
  FolderCheck,
  Flag,
  ListChecks,
  LogOut,
} from "lucide-react"

// -------------------- Types --------------------
type AdminTab =
  | "dashboard"
  | "organization-approvals"
  | "need-approvals"
  | "gift-approvals"
  | "organizations"
  | "users"
  | "needs"
  | "gift-library"
  | "categories"
  | "reports"
  | "compliance"
  | "support"
  | "settings"
  | "activity"

type StatusTone = "blue" | "emerald" | "amber" | "rose" | "slate"

// -------------------- Mock Data --------------------
const adminProfile = {
  id: "ADM-001",
  fullName: "Test Admin",
  email: "admin@example.com",
  phone: "+27 11 555 0199",
  roleType: "Super Admin",
  accountStatus: "Active",
  permissions: "Full platform access",
  lastLogin: "Today, 10:35",
  dateCreated: "01 April 2026",
}

const dashboardMetrics = [
  { label: "Pending organization approvals", value: "7", helper: "3 submitted today", icon: Building2 },
  { label: "Pending need approvals", value: "14", helper: "5 marked urgent", icon: ClipboardList },
  { label: "Pending gift approvals", value: "9", helper: "2 expiring soon", icon: Gift },
  { label: "Support tickets", value: "11", helper: "4 high priority", icon: Ticket },
  { label: "Active organizations", value: "82", helper: "12 joined this month", icon: ShieldCheck },
  { label: "Active givers", value: "1,248", helper: "31% anonymous preference", icon: Users },
  { label: "Open needs", value: "156", helper: "42 in progress", icon: FolderCheck },
  { label: "Fulfilled needs", value: "438", helper: "24 completed this week", icon: Check },
]

const organizationApprovals = [
  {
    id: "ORG-APP-001",
    name: "Hope Academy Foundation",
    type: "Non-profit Organization",
    registrationNumber: "NPO-2024/01892",
    contactPerson: "Sarah Mokoena",
    contactEmail: "support@hopeacademy.org",
    contactPhone: "+27 11 555 0182",
    address: "Johannesburg Central, Gauteng",
    mission: "Supporting learners with school resources, nutrition support, and mentorship.",
    submittedDate: "23 May 2026",
    verificationStatus: "Pending Review",
    documents: ["NPO certificate", "Director ID", "Activity report"],
    riskNote: "Low risk. Documents appear complete.",
  },
  {
    id: "ORG-APP-002",
    name: "Community Care Network",
    type: "Welfare Group",
    registrationNumber: "NPO-2023/04415",
    contactPerson: "Jason Khumalo",
    contactEmail: "admin@communitycare.org",
    contactPhone: "+27 21 555 0147",
    address: "Cape Town, Western Cape",
    mission: "Emergency support for families, shelters, and elderly community members.",
    submittedDate: "22 May 2026",
    verificationStatus: "More Information Required",
    documents: ["NPO certificate", "Tax document missing"],
    riskNote: "Tax/NPO proof requires clearer upload.",
  },
  {
    id: "ORG-APP-003",
    name: "Ubuntu Youth Centre",
    type: "Community Group",
    registrationNumber: "COMM-2026/00118",
    contactPerson: "Nomsa Dlamini",
    contactEmail: "hello@ubuntuyouth.org",
    contactPhone: "+27 31 555 0110",
    address: "Durban, KwaZulu-Natal",
    mission: "Youth skills development, after-school care, and community outreach.",
    submittedDate: "21 May 2026",
    verificationStatus: "Pending Review",
    documents: ["Community proof", "Coordinator ID", "Reference letter"],
    riskNote: "Needs manual verification because it is not an NPO.",
  },
]

const needApprovals = [
  {
    id: "NEED-APP-001",
    title: "Winter Blanket Drive",
    organization: "Community Care Network",
    category: "Clothing & Shelter",
    urgency: "Emergency",
    location: "Cape Town Shelters",
    beneficiaryType: "Families",
    quantity: "500 blankets",
    submittedDate: "23 May 2026",
    approvalStatus: "Pending",
    duplicateWarning: "No duplicate detected",
    description: "Warm blankets required for families affected by winter conditions.",
  },
  {
    id: "NEED-APP-002",
    title: "After-school Meal Support",
    organization: "Hope Academy Foundation",
    category: "Food",
    urgency: "Medium",
    location: "Alexandra",
    beneficiaryType: "Learners",
    quantity: "1,200 meal packs",
    submittedDate: "22 May 2026",
    approvalStatus: "Pending",
    duplicateWarning: "Similar need posted 18 days ago",
    description: "Meal packs for an after-school study programme.",
  },
  {
    id: "NEED-APP-003",
    title: "Clinic Transport Assistance",
    organization: "Ubuntu Youth Centre",
    category: "Transport",
    urgency: "High",
    location: "Durban",
    beneficiaryType: "Community group",
    quantity: "6 shuttle trips",
    submittedDate: "21 May 2026",
    approvalStatus: "More Information Required",
    duplicateWarning: "No duplicate detected",
    description: "Transport required for community clinic appointments.",
  },
]

const giftApprovals = [
  {
    id: "GIFT-APP-001",
    title: "Bulk School Shoes Available",
    giver: "StepForward Shoes",
    giverType: "Business",
    offeringType: "Goods",
    category: "Clothing",
    quantity: "90 pairs",
    location: "Johannesburg",
    expiryDate: "30 June 2026",
    anonymousStatus: "Public",
    approvalStatus: "Pending",
    description: "New school shoes available for verified school-related needs.",
  },
  {
    id: "GIFT-APP-002",
    title: "Free Career Guidance Sessions",
    giver: "Anonymous Giver",
    giverType: "Individual",
    offeringType: "Service",
    category: "Education",
    quantity: "3 workshops",
    location: "Online / In-person",
    expiryDate: "15 June 2026",
    anonymousStatus: "Anonymous",
    approvalStatus: "Pending",
    description: "Professional career guidance for learners or youth groups.",
  },
  {
    id: "GIFT-APP-003",
    title: "Food Parcel Stock",
    giver: "Ubuntu Retail Group",
    giverType: "Company",
    offeringType: "Goods",
    category: "Food",
    quantity: "150 parcels",
    location: "Soweto",
    expiryDate: "05 June 2026",
    anonymousStatus: "Public",
    approvalStatus: "Pending",
    description: "Food parcels ready for matching with a verified need.",
  },
]

const organizations = [
  {
    id: "ORG-001",
    name: "Hope Academy Foundation",
    type: "Non-profit Organization",
    location: "Johannesburg, Gauteng",
    verificationStatus: "Verified",
    accountStatus: "Active",
    postedNeeds: 28,
    fulfilledNeeds: 19,
    joinedDate: "03 April 2026",
    lastActivity: "Today",
  },
  {
    id: "ORG-002",
    name: "Community Care Network",
    type: "Welfare Group",
    location: "Cape Town, Western Cape",
    verificationStatus: "Pending",
    accountStatus: "Review",
    postedNeeds: 12,
    fulfilledNeeds: 7,
    joinedDate: "12 May 2026",
    lastActivity: "Yesterday",
  },
  {
    id: "ORG-003",
    name: "Ubuntu Youth Centre",
    type: "Community Group",
    location: "Durban, KwaZulu-Natal",
    verificationStatus: "Verified",
    accountStatus: "Active",
    postedNeeds: 17,
    fulfilledNeeds: 11,
    joinedDate: "28 March 2026",
    lastActivity: "2 days ago",
  },
]

const users = [
  {
    id: "USR-001",
    name: "Mpho Ndlovu",
    email: "mpho@example.com",
    phone: "+27 82 555 0161",
    userType: "Giver",
    role: "Individual",
    accountStatus: "Active",
    verificationStatus: "Email Verified",
    joinedDate: "08 May 2026",
    lastLogin: "Today",
    anonymousPreference: "Enabled",
  },
  {
    id: "USR-002",
    name: "BrightPath Office Supplies",
    email: "admin@brightpath.co.za",
    phone: "+27 11 555 0144",
    userType: "Giver",
    role: "Business",
    accountStatus: "Active",
    verificationStatus: "Email Verified",
    joinedDate: "30 April 2026",
    lastLogin: "Yesterday",
    anonymousPreference: "Disabled",
  },
  {
    id: "USR-003",
    name: "Hope Academy Foundation",
    email: "support@hopeacademy.org",
    phone: "+27 11 555 0182",
    userType: "Organization",
    role: "Organization Admin",
    accountStatus: "Active",
    verificationStatus: "Verified",
    joinedDate: "03 April 2026",
    lastLogin: "Today",
    anonymousPreference: "Not applicable",
  },
  {
    id: "USR-004",
    name: "Test Admin",
    email: "admin@example.com",
    phone: "+27 11 555 0199",
    userType: "Admin",
    role: "Super Admin",
    accountStatus: "Active",
    verificationStatus: "Internal",
    joinedDate: "01 April 2026",
    lastLogin: "Today",
    anonymousPreference: "Not applicable",
  },
]

const platformNeeds = [
  {
    id: "NEED-001",
    title: "School Supplies for Grade 8 Learners",
    organization: "Hope Academy Foundation",
    category: "Education",
    urgency: "High",
    status: "Open",
    approvalStatus: "Approved",
    progress: 72,
    datePosted: "18 May 2026",
    assignedGiver: "BrightPath Office Supplies",
    anonymousSupporters: 3,
  },
  {
    id: "NEED-002",
    title: "Winter Blanket Drive",
    organization: "Community Care Network",
    category: "Clothing & Shelter",
    urgency: "Emergency",
    status: "In Progress",
    approvalStatus: "Approved",
    progress: 54,
    datePosted: "13 May 2026",
    assignedGiver: "Ubuntu Retail Group",
    anonymousSupporters: 6,
  },
  {
    id: "NEED-003",
    title: "After-school Meal Support",
    organization: "Hope Academy Foundation",
    category: "Food",
    urgency: "Medium",
    status: "Pending",
    approvalStatus: "Pending",
    progress: 0,
    datePosted: "22 May 2026",
    assignedGiver: "Not assigned",
    anonymousSupporters: 0,
  },
]

const giftLibraryItems = [
  {
    id: "GIFT-001",
    title: "Bulk School Shoes Available",
    giver: "StepForward Shoes",
    type: "Goods",
    category: "Clothing",
    quantity: "90 pairs",
    status: "Available",
    approvalStatus: "Approved",
    matchedNeed: "Not matched",
    expiryDate: "30 June 2026",
  },
  {
    id: "GIFT-002",
    title: "Free Career Guidance Session",
    giver: "Anonymous Giver",
    type: "Service",
    category: "Education",
    quantity: "3 sessions",
    status: "Matched",
    approvalStatus: "Approved",
    matchedNeed: "Youth Mentorship Workshop",
    expiryDate: "15 June 2026",
  },
  {
    id: "GIFT-003",
    title: "Food Parcel Stock",
    giver: "Ubuntu Retail Group",
    type: "Goods",
    category: "Food",
    quantity: "150 parcels",
    status: "Pending Approval",
    approvalStatus: "Pending",
    matchedNeed: "Not matched",
    expiryDate: "05 June 2026",
  },
]

const categories = [
  { id: "CAT-001", name: "Education", needs: 48, giftOfferings: 21, status: "Active" },
  { id: "CAT-002", name: "Food", needs: 35, giftOfferings: 18, status: "Active" },
  { id: "CAT-003", name: "Medical", needs: 16, giftOfferings: 7, status: "Active" },
  { id: "CAT-004", name: "Clothing & Shelter", needs: 27, giftOfferings: 14, status: "Active" },
  { id: "CAT-005", name: "Transport", needs: 12, giftOfferings: 6, status: "Active" },
  { id: "CAT-006", name: "Professional Services", needs: 18, giftOfferings: 11, status: "Active" },
]

const supportTickets = [
  {
    id: "TCK-001",
    subject: "Cannot upload verification document",
    requester: "Community Care Network",
    type: "Organization Support",
    priority: "High",
    status: "Open",
    assignedTo: "Verification Admin",
    createdDate: "23 May 2026",
  },
  {
    id: "TCK-002",
    subject: "Anonymous receipt request",
    requester: "Anonymous Giver",
    type: "Donation Support",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Support Admin",
    createdDate: "22 May 2026",
  },
  {
    id: "TCK-003",
    subject: "Need appears duplicated",
    requester: "Platform Monitoring",
    type: "Compliance",
    priority: "High",
    status: "Open",
    assignedTo: "Super Admin",
    createdDate: "21 May 2026",
  },
]

const activityLogs = [
  { id: "ACT-001", actor: "Test Admin", action: "Approved organization", target: "Hope Academy Foundation", time: "Today, 10:20" },
  { id: "ACT-002", actor: "Verification Admin", action: "Requested more information", target: "Community Care Network", time: "Today, 09:52" },
  { id: "ACT-003", actor: "System", action: "Flagged duplicate warning", target: "After-school Meal Support", time: "Yesterday, 16:30" },
  { id: "ACT-004", actor: "Support Admin", action: "Updated ticket status", target: "TCK-002", time: "Yesterday, 14:15" },
  { id: "ACT-005", actor: "Test Admin", action: "Approved gift offering", target: "Bulk School Shoes Available", time: "20 May 2026, 11:04" },
]

const reportMetrics = [
  { label: "Total users", value: "1,412", trend: "+12% this month" },
  { label: "Total organizations", value: "82", trend: "7 pending approvals" },
  { label: "Total givers", value: "1,248", trend: "391 anonymous enabled" },
  { label: "Total needs", value: "594", trend: "156 currently open" },
  { label: "Fulfilled needs", value: "438", trend: "73.7% fulfillment ratio" },
  { label: "Average fulfillment time", value: "4.8 days", trend: "18% faster than last month" },
  { label: "Gift library usage", value: "64%", trend: "42 active matches" },
  { label: "Impact story engagement", value: "18,420", trend: "views and interactions" },
]

// -------------------- Helpers --------------------
const toneClasses: Record<StatusTone, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  rose: "bg-rose-50 text-rose-700 border-rose-100",
  slate: "bg-slate-50 text-slate-700 border-slate-200",
}

function getStatusTone(status: string): StatusTone {
  const value = status.toLowerCase()
  if (value.includes("approved") || value.includes("verified") || value.includes("active") || value.includes("completed") || value.includes("fulfilled")) return "emerald"
  if (value.includes("pending") || value.includes("review") || value.includes("progress") || value.includes("open")) return "amber"
  if (value.includes("high") || value.includes("emergency") || value.includes("rejected") || value.includes("flagged") || value.includes("suspended")) return "rose"
  if (value.includes("available") || value.includes("matched") || value.includes("medium")) return "blue"
  return "slate"
}

function Badge({ children, tone = "slate" }: { children: React.ReactNode; tone?: StatusTone }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${toneClasses[tone]}`}>
      {children}
    </span>
  )
}

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white border border-slate-200 rounded-[1.75rem] ${className}`}>{children}</div>
}

function SectionHeader({
  title,
  subtitle,
  action,
}: {
  icon?: React.ElementType
  title: string
  subtitle: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
        <p className="text-slate-500 mt-1 leading-relaxed">{subtitle}</p>
      </div>
      {action}
    </div>
  )
}

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-slate-900 rounded-2xl hover:bg-slate-800 transition-all"
    >
      {children}
    </button>
  )
}

function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all"
    >
      {children}
    </button>
  )
}

// -------------------- Main Page --------------------
export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard")
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const primaryTabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "organization-approvals" as const, label: "Org Approvals", icon: Building2 },
    { id: "need-approvals" as const, label: "Need Approvals", icon: ClipboardList },
    { id: "gift-approvals" as const, label: "Gift Approvals", icon: Gift },
    { id: "organizations" as const, label: "Organizations", icon: ShieldCheck },
    { id: "users" as const, label: "Users", icon: Users },
    { id: "reports" as const, label: "Reports", icon: BarChart3 },
  ]

  const moreTabs = [
    { id: "needs" as const, label: "Needs", icon: FolderCheck },
    { id: "gift-library" as const, label: "Gift Library", icon: Gift },
    { id: "categories" as const, label: "Categories", icon: Tag },
    { id: "compliance" as const, label: "Compliance", icon: Flag },
    { id: "support" as const, label: "Support Tickets", icon: Ticket },
    { id: "activity" as const, label: "Activity Logs", icon: Activity },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ]

  const allTabs = [...primaryTabs, ...moreTabs]
  const activeTabLabel = allTabs.find((tab) => tab.id === activeTab)?.label || "Dashboard"

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab)
    setIsMoreOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("userId")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans">
      {/* Top Navigation */}
      <nav className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4">
        <div className="flex items-center justify-between px-6 py-3 rounded-full bg-white/90 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-full max-w-7xl">
          <button onClick={() => router.push("/")} className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-1.5 rounded-full shadow-md shadow-blue-200">
              <HeartHandshake className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-slate-900">HelpLift Admin</span>
          </button>

          <div className="hidden xl:flex items-center gap-1 bg-slate-50/70 p-1 rounded-full border border-slate-100">
            {primaryTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
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

            <button
              onClick={() => setIsMoreOpen(true)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 text-slate-500 hover:text-slate-900 hover:bg-white"
            >
              <MoreHorizontal className="w-4 h-4" />
              More
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTabChange("support")}
              className="relative w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-white transition-all"
            >
              <Ticket className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-semibold flex items-center justify-center">4</span>
            </button>

            <button
              onClick={() => handleTabChange("activity")}
              className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-white transition-all"
            >
              <Activity className="w-5 h-5" />
            </button>

            <button
              onClick={() => handleTabChange("settings")}
              className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all"
              title="Admin profile and settings"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>

            <button
              onClick={handleLogout}
              className="hidden md:flex w-10 h-10 rounded-full bg-white border border-rose-100 text-rose-600 items-center justify-center hover:bg-rose-50 transition-all"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsMoreOpen(true)}
              className="xl:hidden w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-16">
        <section className="max-w-7xl mx-auto px-4">
          <div className="mb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-blue-600 mb-2">Admin Control Centre</p>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
                {activeTabLabel}
              </h1>
              <p className="text-slate-500 text-lg mt-3 max-w-3xl leading-relaxed">
                Manage verification, approvals, users, platform activity, reporting, compliance, and support from one central admin workspace.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative min-w-[280px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search platform records..."
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                />
              </div>
              <SecondaryButton>
                <Filter className="w-4 h-4" /> Filters
              </SecondaryButton>
            </div>
          </div>

          {activeTab === "dashboard" && <DashboardTab setActiveTab={handleTabChange} />}
          {activeTab === "organization-approvals" && <OrganizationApprovalsTab />}
          {activeTab === "need-approvals" && <NeedApprovalsTab />}
          {activeTab === "gift-approvals" && <GiftApprovalsTab />}
          {activeTab === "organizations" && <OrganizationsTab />}
          {activeTab === "users" && <UsersTab />}
          {activeTab === "needs" && <NeedsManagementTab />}
          {activeTab === "gift-library" && <GiftLibraryManagementTab />}
          {activeTab === "categories" && <CategoriesTab />}
          {activeTab === "reports" && <ReportsTab />}
          {activeTab === "compliance" && <ComplianceTab />}
          {activeTab === "support" && <SupportTab />}
          {activeTab === "settings" && <SettingsTab />}
          {activeTab === "activity" && <ActivityTab />}
        </section>
      </main>

      <SideSheet
        open={isMoreOpen}
        title="Admin navigation"
        subtitle="Open other platform administration sections."
        onClose={() => setIsMoreOpen(false)}
      >
        <div className="space-y-2">
          {allTabs.map((tab) => {
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center justify-between gap-3 p-4 rounded-2xl border transition-all ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span className="font-semibold">{tab.label}</span>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </button>
            )
          })}
        </div>
      </SideSheet>
    </div>
  )
}

// -------------------- Tabs --------------------
function DashboardTab({ setActiveTab }: { setActiveTab: (tab: AdminTab) => void }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardMetrics.map((metric) => {
          return (
            <button
              key={metric.label}
              onClick={() => {
                if (metric.label.includes("organization")) setActiveTab("organization-approvals")
                else if (metric.label.includes("need")) setActiveTab("need-approvals")
                else if (metric.label.includes("gift")) setActiveTab("gift-approvals")
                else if (metric.label.includes("ticket")) setActiveTab("support")
                else if (metric.label.includes("givers")) setActiveTab("users")
                else setActiveTab("reports")
              }}
              className="bg-white border border-slate-200 rounded-[1.5rem] p-5 text-left hover:bg-slate-50 transition-all"
            >
              <div className="flex items-center justify-end mb-4">
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </div>
              <div className="text-3xl font-semibold tracking-tight text-slate-900">{metric.value}</div>
              <div className="font-semibold text-slate-700 mt-1">{metric.label}</div>
              <div className="text-sm text-slate-400 mt-2">{metric.helper}</div>
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <SectionCard className="p-8">
          <SectionHeader
            icon={ListChecks}
            title="Pending approval queue"
            subtitle="Main items requiring admin review."
            action={<SecondaryButton onClick={() => setActiveTab("organization-approvals")}><Eye className="w-4 h-4" /> Review All</SecondaryButton>}
          />

          <div className="space-y-3">
            <QueueItem title="Organization approvals" count="7" text="Verify submitted documents and registration information." onClick={() => setActiveTab("organization-approvals")} />
            <QueueItem title="Need approvals" count="14" text="Approve or reject submitted public needs." onClick={() => setActiveTab("need-approvals")} />
            <QueueItem title="Gift library approvals" count="9" text="Review giver offerings before they become visible." onClick={() => setActiveTab("gift-approvals")} />
            <QueueItem title="Support tickets" count="11" text="Resolve technical, verification, and donation support requests." onClick={() => setActiveTab("support")} />
          </div>
        </SectionCard>

        <SectionCard className="p-8">
          <SectionHeader
            icon={Activity}
            title="Recent platform activity"
            subtitle="Latest important admin and system events."
          />

          <div className="space-y-4">
            {activityLogs.slice(0, 4).map((activity) => (
              <div key={activity.id} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                <div>
                  <div className="font-semibold text-slate-900">{activity.action}</div>
                  <p className="text-sm text-slate-500 mt-1">{activity.actor} · {activity.target}</p>
                  <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <SectionCard className="p-8 xl:col-span-2">
          <SectionHeader
            icon={BarChart3}
            title="Platform snapshot"
            subtitle="High-level performance of users, needs, giving, and fulfillment."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ProgressRow label="Fulfilled needs ratio" value={74} />
            <ProgressRow label="Gift library usage" value={64} />
            <ProgressRow label="Organization verification completion" value={89} />
            <ProgressRow label="Support response progress" value={58} />
          </div>
        </SectionCard>

        <SectionCard className="p-8">
          <SectionHeader icon={AlertTriangle} title="Admin alerts" subtitle="Items needing attention." />
          <div className="space-y-3">
            <AlertCard tone="rose" title="5 urgent needs pending" text="Review emergency needs before they go public." />
            <AlertCard tone="amber" title="3 duplicate warnings" text="Check possible duplicate needs before approval." />
            <AlertCard tone="blue" title="4 high priority tickets" text="Support team should respond today." />
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

function OrganizationApprovalsTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={Building2}
        title="Organization approvals"
        subtitle="Review organization registrations, supporting documents, mission, contact details, and verification status."
      />

      <div className="space-y-5">
        {organizationApprovals.map((org) => (
          <SectionCard key={org.id} className="p-6">
            <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge tone={getStatusTone(org.verificationStatus)}>{org.verificationStatus}</Badge>
                  <Badge>{org.type}</Badge>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">{org.name}</h3>
                <p className="text-slate-500 mt-3 max-w-3xl leading-relaxed">{org.mission}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <PrimaryButton><Check className="w-4 h-4" /> Approve</PrimaryButton>
                <SecondaryButton><AlertTriangle className="w-4 h-4" /> Request Info</SecondaryButton>
                <SecondaryButton><X className="w-4 h-4" /> Reject</SecondaryButton>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
              <MiniDetail label="Registration number" value={org.registrationNumber} />
              <MiniDetail label="Contact person" value={org.contactPerson} />
              <MiniDetail label="Email" value={org.contactEmail} />
              <MiniDetail label="Phone" value={org.contactPhone} />
              <MiniDetail label="Address" value={org.address} />
              <MiniDetail label="Submitted" value={org.submittedDate} />
            </div>

            <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Documents</div>
              <div className="flex flex-wrap gap-2">
                {org.documents.map((doc) => <Badge key={doc}>{doc}</Badge>)}
              </div>
              <p className="text-sm text-slate-500 mt-3">{org.riskNote}</p>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

function NeedApprovalsTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={ClipboardList}
        title="Need approvals"
        subtitle="Review submitted needs before they become public to givers."
      />

      <div className="space-y-5">
        {needApprovals.map((need) => (
          <ApprovalCard
            key={need.id}
            title={need.title}
            subtitle={need.description}
            badges={[need.approvalStatus, need.urgency, need.category]}
            details={[
              ["Organization", need.organization],
              ["Location", need.location],
              ["Beneficiary type", need.beneficiaryType],
              ["Quantity / value", need.quantity],
              ["Submitted", need.submittedDate],
              ["Duplicate warning", need.duplicateWarning],
            ]}
          />
        ))}
      </div>
    </div>
  )
}

function GiftApprovalsTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={Gift}
        title="Gift library approvals"
        subtitle="Approve or reject giver goods, services, and financial support offerings."
      />

      <div className="space-y-5">
        {giftApprovals.map((giftItem) => (
          <ApprovalCard
            key={giftItem.id}
            title={giftItem.title}
            subtitle={giftItem.description}
            badges={[giftItem.approvalStatus, giftItem.offeringType, giftItem.anonymousStatus]}
            details={[
              ["Giver", giftItem.giver],
              ["Giver type", giftItem.giverType],
              ["Category", giftItem.category],
              ["Quantity / value", giftItem.quantity],
              ["Location", giftItem.location],
              ["Expiry date", giftItem.expiryDate],
            ]}
          />
        ))}
      </div>
    </div>
  )
}

function OrganizationsTab() {
  return (
    <ManagementTable
      icon={ShieldCheck}
      title="Organization management"
      subtitle="Manage verified, pending, active, suspended, and inactive organizations."
      headers={["Organization", "Type", "Location", "Verification", "Needs", "Activity", "Action"]}
      rows={organizations.map((org) => [
        <NameCell key="name" title={org.name} subtitle={org.id} />,
        org.type,
        org.location,
        <Badge key="verification" tone={getStatusTone(org.verificationStatus)}>{org.verificationStatus}</Badge>,
        `${org.postedNeeds} posted · ${org.fulfilledNeeds} fulfilled`,
        org.lastActivity,
        <SecondaryButton key="action"><Eye className="w-4 h-4" /> View</SecondaryButton>,
      ])}
    />
  )
}

function UsersTab() {
  return (
    <ManagementTable
      icon={Users}
      title="User management"
      subtitle="Manage givers, organizations, admins, account statuses, and verification states."
      headers={["User", "Type", "Role", "Status", "Verification", "Anonymous", "Action"]}
      rows={users.map((user) => [
        <NameCell key="name" title={user.name} subtitle={user.email} />,
        user.userType,
        user.role,
        <Badge key="status" tone={getStatusTone(user.accountStatus)}>{user.accountStatus}</Badge>,
        user.verificationStatus,
        user.anonymousPreference,
        <SecondaryButton key="action"><Settings className="w-4 h-4" /> Manage</SecondaryButton>,
      ])}
    />
  )
}

function NeedsManagementTab() {
  return (
    <ManagementTable
      icon={FolderCheck}
      title="Needs management"
      subtitle="Monitor all needs across organizations, approval status, fulfillment progress, and assigned givers."
      headers={["Need", "Organization", "Category", "Status", "Progress", "Assigned giver", "Action"]}
      rows={platformNeeds.map((need) => [
        <NameCell key="name" title={need.title} subtitle={need.id} />,
        need.organization,
        need.category,
        <Badge key="status" tone={getStatusTone(need.status)}>{need.status}</Badge>,
        `${need.progress}%`,
        need.assignedGiver,
        <SecondaryButton key="action"><Eye className="w-4 h-4" /> View</SecondaryButton>,
      ])}
    />
  )
}

function GiftLibraryManagementTab() {
  return (
    <ManagementTable
      icon={Gift}
      title="Gift library management"
      subtitle="Monitor all giver offerings, matches, expiry dates, and approval statuses."
      headers={["Offering", "Giver", "Type", "Status", "Matched need", "Expiry", "Action"]}
      rows={giftLibraryItems.map((giftItem) => [
        <NameCell key="name" title={giftItem.title} subtitle={giftItem.id} />,
        giftItem.giver,
        `${giftItem.type} · ${giftItem.category}`,
        <Badge key="status" tone={getStatusTone(giftItem.status)}>{giftItem.status}</Badge>,
        giftItem.matchedNeed,
        giftItem.expiryDate,
        <SecondaryButton key="action"><Eye className="w-4 h-4" /> View</SecondaryButton>,
      ])}
    />
  )
}

function CategoriesTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={Tag}
        title="Categories"
        subtitle="Manage support categories used for needs, gift library offerings, search, and reporting."
        action={<PrimaryButton><Tag className="w-4 h-4" /> Add Category</PrimaryButton>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {categories.map((category) => (
          <SectionCard key={category.id} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge tone={getStatusTone(category.status)}>{category.status}</Badge>
                <h3 className="text-xl font-semibold text-slate-900 mt-4">{category.name}</h3>
                <p className="text-slate-500 mt-2">{category.needs} needs · {category.giftOfferings} gift offerings</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white transition-all">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

function ReportsTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={BarChart3}
        title="Reports and analytics"
        subtitle="Review platform totals, user growth, need fulfillment, gift library usage, and impact engagement."
        action={<SecondaryButton><TrendingUp className="w-4 h-4" /> Export Report</SecondaryButton>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {reportMetrics.map((metric) => (
          <SectionCard key={metric.label} className="p-5">
            <div className="text-sm font-semibold text-slate-500">{metric.label}</div>
            <div className="text-3xl font-semibold tracking-tight text-slate-900 mt-4">{metric.value}</div>
            <div className="text-sm text-slate-400 mt-2">{metric.trend}</div>
          </SectionCard>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SectionCard className="p-8">
          <SectionHeader icon={ClipboardList} title="Most active categories" subtitle="Mock distribution of platform support activity." />
          <div className="space-y-5">
            <ProgressRow label="Education" value={42} />
            <ProgressRow label="Food" value={24} />
            <ProgressRow label="Clothing & Shelter" value={21} />
            <ProgressRow label="Transport" value={13} />
          </div>
        </SectionCard>

        <SectionCard className="p-8">
          <SectionHeader icon={MapPin} title="Most active locations" subtitle="Mock distribution by platform location." />
          <div className="space-y-5">
            <ProgressRow label="Gauteng" value={48} />
            <ProgressRow label="Western Cape" value={22} />
            <ProgressRow label="KwaZulu-Natal" value={18} />
            <ProgressRow label="Other provinces" value={12} />
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

function ComplianceTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={Flag}
        title="Compliance"
        subtitle="Monitor duplicate needs, suspicious records, privacy risks, and platform safety issues."
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <AlertCard tone="rose" title="3 duplicate warnings" text="Needs with similar descriptions or locations require manual checking." />
        <AlertCard tone="amber" title="2 privacy review items" text="Supporting documents may contain sensitive beneficiary information." />
        <AlertCard tone="blue" title="6 records need audit notes" text="Admin review notes are recommended for higher-risk decisions." />
      </div>

      <SectionCard className="p-8">
        <SectionHeader icon={AlertTriangle} title="Flagged records" subtitle="Records requiring admin attention before approval or publication." />

        <div className="space-y-3">
          <FlaggedItem title="After-school Meal Support" text="Similar need posted by same organization 18 days ago." status="Duplicate Warning" />
          <FlaggedItem title="Community Activity Report" text="Document upload includes unclear dates and programme details." status="Review Required" />
          <FlaggedItem title="Clinic Transport Assistance" text="Beneficiary details must be anonymized before approval." status="Privacy Check" />
        </div>
      </SectionCard>
    </div>
  )
}

function SupportTab() {
  return (
    <ManagementTable
      icon={Ticket}
      title="Support tickets"
      subtitle="Handle support requests, verification questions, donation queries, and platform issues."
      headers={["Ticket", "Requester", "Type", "Priority", "Status", "Assigned", "Action"]}
      rows={supportTickets.map((ticket) => [
        <NameCell key="ticket" title={ticket.subject} subtitle={ticket.id} />,
        ticket.requester,
        ticket.type,
        <Badge key="priority" tone={getStatusTone(ticket.priority)}>{ticket.priority}</Badge>,
        <Badge key="status" tone={getStatusTone(ticket.status)}>{ticket.status}</Badge>,
        ticket.assignedTo,
        <SecondaryButton key="action"><MessageCircle className="w-4 h-4" /> Open</SecondaryButton>,
      ])}
    />
  )
}

function SettingsTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={Settings}
        title="Platform settings"
        subtitle="Manage admin profile, platform rules, categories, notification settings, and account security."
        action={<PrimaryButton><Check className="w-4 h-4" /> Save Changes</PrimaryButton>}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-6">
        <SectionCard className="p-8">
          <SectionHeader icon={ShieldCheck} title="Admin profile" subtitle="Current signed-in admin account." />
          <div className="space-y-4">
            <InfoRow icon={UserCheck} label="Full name" value={adminProfile.fullName} />
            <InfoRow icon={Mail} label="Email" value={adminProfile.email} />
            <InfoRow icon={Phone} label="Phone" value={adminProfile.phone} />
            <InfoRow icon={Lock} label="Permissions" value={adminProfile.permissions} />
          </div>
        </SectionCard>

        <SectionCard className="p-8">
          <SectionHeader icon={Settings} title="Platform controls" subtitle="Mock settings for approval and moderation rules." />
          <div className="space-y-4">
            <ToggleRow title="Require admin approval for new needs" text="Needs must be reviewed before becoming public." enabled />
            <ToggleRow title="Require approval for gift library offerings" text="Giver offerings must be checked before organizations can request them." enabled />
            <ToggleRow title="Enable duplicate need warnings" text="Automatically flag possible duplicate records." enabled />
            <ToggleRow title="Allow public anonymous donor mentions" text="Show Anonymous Giver when selected by givers." enabled />
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

function ActivityTab() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        icon={Activity}
        title="Activity logs"
        subtitle="Track admin actions, system flags, approvals, rejections, and status changes."
      />

      <SectionCard className="p-8">
        <div className="space-y-4">
          {activityLogs.map((activity) => (
            <div key={activity.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 last:border-0 pb-4 last:pb-0">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{activity.action}</div>
                  <p className="text-sm text-slate-500 mt-1">{activity.actor} · {activity.target}</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-400">{activity.time}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

// -------------------- Reusable Components --------------------
function ApprovalCard({
  title,
  subtitle,
  badges,
  details,
}: {
  title: string
  subtitle: string
  badges: string[]
  details: [string, string][]
}) {
  return (
    <SectionCard className="p-6">
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {badges.map((badge) => (
              <Badge key={badge} tone={getStatusTone(badge)}>{badge}</Badge>
            ))}
          </div>
          <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
          <p className="text-slate-500 mt-3 max-w-3xl leading-relaxed">{subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <PrimaryButton><Check className="w-4 h-4" /> Approve</PrimaryButton>
          <SecondaryButton><AlertTriangle className="w-4 h-4" /> Request Info</SecondaryButton>
          <SecondaryButton><X className="w-4 h-4" /> Reject</SecondaryButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
        {details.map(([label, value]) => <MiniDetail key={label} label={label} value={value} />)}
      </div>
    </SectionCard>
  )
}

function ManagementTable({
  icon,
  title,
  subtitle,
  headers,
  rows,
}: {
  icon: React.ElementType
  title: string
  subtitle: string
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader icon={icon} title={title} subtitle={subtitle} />

      <SectionCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {headers.map((header) => (
                  <th key={header} className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition-colors">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="p-5 text-sm font-medium text-slate-600 whitespace-nowrap">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}

function NameCell({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <div className="font-semibold text-slate-900">{title}</div>
      <div className="text-sm text-slate-400 mt-1">{subtitle}</div>
    </div>
  )
}

function QueueItem({
  title,
  count,
  text,
  onClick,
}: {
  title: string
  count: string
  text: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all text-left"
    >
      <div>
        <div className="font-semibold text-slate-900">{title}</div>
        <p className="text-sm text-slate-500 mt-1">{text}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-semibold text-slate-900">
          {count}
        </span>
        <ChevronRight className="w-4 h-4 text-slate-300" />
      </div>
    </button>
  )
}

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
      <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-600 shrink-0">
        <Icon className="w-5 h-5" />
      </div>

      <div>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</div>
        <div className="font-semibold text-slate-800 mt-1 leading-snug">{value}</div>
      </div>
    </div>
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

function ProgressRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-slate-700">{label}</span>
        <span className="font-semibold text-slate-900">{value}%</span>
      </div>

      <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full rounded-full bg-blue-600" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function FlaggedItem({ title, text, status }: { title: string; text: string; status: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
      <div>
        <div className="font-semibold text-slate-900">{title}</div>
        <p className="text-sm text-slate-500 mt-1">{text}</p>
      </div>
      <Badge tone={getStatusTone(status)}>{status}</Badge>
    </div>
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

      <button className={`relative w-12 h-7 rounded-full transition-all shrink-0 ${enabled ? "bg-blue-600" : "bg-slate-300"}`}>
        <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${enabled ? "left-6" : "left-1"}`} />
      </button>
    </div>
  )
}
