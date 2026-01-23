import { useEffect, useState, useRef } from "react";
import { Users, FileText, BarChart3, MessageSquare, Bell, RefreshCw, CheckCircle, Settings, UserCheck, Handshake, Calculator, ClipboardCheck, UserCog, Check, X, Package, Target, Wrench, FileSignature, DollarSign, FolderOpen, Home, Building2, Mail, CalendarClock, Zap, HelpCircle, Search, Construction, UserCog2, TrendingUp, Cog, ShieldCheck, Lock, CalendarCheck, Wallet, HeartHandshake, ArrowRightLeft, UserCircle, CreditCard, Receipt, FileCheck, Ticket, Phone, LayoutDashboard, ClipboardList, Megaphone, CheckSquare, ClipboardX, HardHat, AlertTriangle, Smartphone, GraduationCap, Eye, FileBarChart, SearchCheck, BadgeCheck, HeartPulse, StickyNote, KeyRound, ShieldAlert, BookOpen, Activity, PieChart } from "lucide-react";
import screenPresales from "@/assets/screen-presales.png";
import screenLeadManagement from "@/assets/screen-lead-management.png";
import screenCpManagement from "@/assets/screen-cp-management.png";
import screenCostSheet from "@/assets/screen-cost-sheet.png";
import screenBookingApproval from "@/assets/screen-booking-approval.png";
import screenSalesExecutive from "@/assets/screen-sales-executive.png";
interface ModuleInfo {
  id: string;
  title: string;
  description: string;
  features: string[];
  screenImage: string;
}

// Pre-sales module data
const preSalesModuleData: Record<string, ModuleInfo> = {
  "lead-management": {
    id: "lead-management",
    title: "Lead Management",
    description: "Streamline your lead capture and nurturing process with our comprehensive lead management system.",
    features: ["Capture leads from multiple sources (website, social media, walk-ins)", "Automatic lead scoring based on engagement and behavior", "Smart lead distribution to sales executives", "Real-time lead status tracking and updates", "Automated follow-up reminders and notifications", "Lead conversion analytics and reporting", "Integration with marketing campaigns", "Duplicate lead detection and merging"],
    screenImage: screenLeadManagement
  },
  "cp-management": {
    id: "cp-management",
    title: "CP Management",
    description: "Manage your Channel Partners efficiently with complete visibility into their performance and payouts.",
    features: ["Channel Partner onboarding and verification", "Commission structure management and tracking", "Real-time payout calculations and disbursement", "CP performance dashboard and analytics", "Lead assignment and tracking per CP", "Agreement and document management", "CP hierarchy and team management", "Incentive programs and bonus tracking"],
    screenImage: screenCpManagement
  },
  "cost-sheet-management": {
    id: "cost-sheet-management",
    title: "Cost Sheet Management",
    description: "Generate accurate and dynamic cost sheets with real-time pricing and customizable components.",
    features: ["Dynamic cost sheet generation with live pricing", "Multiple payment plan options and schemes", "GST and tax calculations automated", "Discount and offer management", "Floor rise and view premium calculations", "Comparison across multiple units", "PDF export with company branding", "Version history and audit trail"],
    screenImage: screenCostSheet
  },
  "booking-approval": {
    id: "booking-approval",
    title: "Booking Approval",
    description: "Streamline your booking approval workflow with multi-level authorization and real-time tracking.",
    features: ["Multi-level approval workflow configuration", "Real-time booking status notifications", "Document verification and checklist", "Digital signature integration", "Approval delegation and escalation", "Booking modification requests handling", "Audit trail for all approvals", "Mobile approval for on-the-go decisions"],
    screenImage: screenBookingApproval
  },
  "sales-executive-management": {
    id: "sales-executive-management",
    title: "Sales Executive Management",
    description: "Empower your sales team with tools to track performance, manage targets, and optimize productivity.",
    features: ["Sales executive onboarding and profiling", "Target setting and achievement tracking", "Lead assignment and workload balancing", "Performance analytics and leaderboards", "Commission and incentive calculations", "Activity logging and call tracking", "Training and certification management", "Attendance and location tracking"],
    screenImage: screenSalesExecutive
  },
  "opportunities": {
    id: "opportunities",
    title: "Opportunities",
    description: "Manage and convert potential deals efficiently with structured opportunity tracking and insights.",
    features: ["Track sales opportunities across different pipeline stages", "Assign opportunities to sales representatives", "Estimated deal value and expected closure tracking", "Activity tracking for calls, meetings, and follow-ups", "Opportunity performance analytics and forecasting", "Automated reminders for next actions", "Integration with leads and customer records", "Improved win-rate with data-driven insights"],
    screenImage: screenSalesExecutive
  },
  "inventory-tracking": {
    id: "inventory-tracking",
    title: "Inventory Tracking",
    description: "Streamline your inventory monitoring and control with real-time tracking and intelligent stock management.",
    features: ["Track inventory levels in real time across multiple locations", "Automatic stock updates for purchases, sales, and returns", "Low-stock alerts and reorder notifications", "Categorization and tagging of products for easy management", "Inventory usage analytics and reporting", "Integration with sales and procurement systems", "Barcode / SKU-based inventory tracking", "Reduce stock wastage with expiry and movement tracking"],
    screenImage: screenSalesExecutive
  }
};

// Post-sales module data
const postSalesModuleData: Record<string, ModuleInfo> = {
  "engineering": {
    id: "engineering",
    title: "Engineering",
    description: "Track engineering tasks and technical work orders with comprehensive team management.",
    features: ["Track engineering tasks and work orders", "Assign jobs to technical teams", "Monitor task status and completion", "Maintenance scheduling and alerts"],
    screenImage: screenSalesExecutive
  },
  "contract": {
    id: "contract",
    title: "Contract",
    description: "Centralized contract management with validity tracking and secure document handling.",
    features: ["Centralized contract storage", "Contract validity and renewal tracking", "Approval and version control", "Secure document access"],
    screenImage: screenSalesExecutive
  },
  "financial": {
    id: "financial",
    title: "Financial",
    description: "Complete financial tracking with payments, invoicing, and integration with accounting systems.",
    features: ["Track payments, dues, and receipts", "Invoice and receipt generation", "Financial reporting and summaries", "Integration with accounting systems"],
    screenImage: screenSalesExecutive
  },
  "dms": {
    id: "dms",
    title: "DMS (Document Management System)",
    description: "Centralized document repository with role-based access and comprehensive audit trails.",
    features: ["Centralized document repository", "Role-based access control", "Version history and audit logs", "Quick search and retrieval"],
    screenImage: screenSalesExecutive
  },
  "rent-module": {
    id: "rent-module",
    title: "Rent Module",
    description: "Complete rental agreement management with automated scheduling and payment reminders.",
    features: ["Rental agreement management", "Rent schedule and invoicing", "Automated payment reminders", "Lease renewal tracking"],
    screenImage: screenSalesExecutive
  },
  "facilities": {
    id: "facilities",
    title: "Facilities",
    description: "Comprehensive facility asset management with maintenance tracking and vendor monitoring.",
    features: ["Facility asset management", "Maintenance request tracking", "Vendor and service monitoring", "Inspection and service schedules"],
    screenImage: screenSalesExecutive
  },
  "communication": {
    id: "communication",
    title: "Communication",
    description: "Centralized communication hub with email, SMS, and internal team messaging.",
    features: ["Email and SMS notifications", "Centralized communication logs", "Automated customer updates", "Internal team messaging"],
    screenImage: screenSalesExecutive
  },
  "appointment-slot": {
    id: "appointment-slot",
    title: "Appointment Slot",
    description: "Slot-based appointment booking with calendar integration and automated reminders.",
    features: ["Slot-based appointment booking", "Auto-confirmation and reminders", "Calendar integration", "Reschedule and cancellation management"],
    screenImage: screenSalesExecutive
  },
  "utilities": {
    id: "utilities",
    title: "Utilities",
    description: "Track utility consumption with meter reading management and detailed billing reports.",
    features: ["Utility consumption tracking", "Meter reading management", "Utility billing and reports", "Cost analysis and monitoring"],
    screenImage: screenSalesExecutive
  },
  "help-desk": {
    id: "help-desk",
    title: "Help-Desk",
    description: "Complete ticket management system with SLA-based issue handling and support history.",
    features: ["Ticket creation and tracking", "SLA-based issue management", "Priority and status updates", "Customer support history"],
    screenImage: screenSalesExecutive
  },
  "explore-properties": {
    id: "explore-properties",
    title: "Explore Properties",
    description: "Property details and availability with floor plans, media access, and real-time status updates.",
    features: ["Property details and availability view", "Floor plans and media access", "Status updates in real time", "Easy property search and filters"],
    screenImage: screenSalesExecutive
  },
  "construction-update": {
    id: "construction-update",
    title: "Construction Update",
    description: "Real-time construction progress tracking with milestone management and customer notifications.",
    features: ["Real-time construction progress updates", "Milestone and phase tracking", "Photo and document sharing", "Customer notifications"],
    screenImage: screenSalesExecutive
  },
  "hr": {
    id: "hr",
    title: "HR",
    description: "Employee record management with attendance tracking, performance monitoring, and access control.",
    features: ["Employee record management", "Attendance and role tracking", "Task and performance monitoring", "Access control and permissions"],
    screenImage: screenSalesExecutive
  },
  "sales": {
    id: "sales",
    title: "Sales",
    description: "Track post-sale sales activities with upsell management and performance analytics.",
    features: ["Track post-sale sales activities", "Upsell and add-on management", "Customer interaction history", "Sales performance analytics"],
    screenImage: screenSalesExecutive
  }
};

// Possession module data
const possessionModuleData: Record<string, ModuleInfo> = {
  "fm-modules": {
    id: "fm-modules",
    title: "FM Modules",
    description: "Comprehensive facility management modules for seamless property operations and maintenance.",
    features: ["Integrated facility management dashboard", "Asset lifecycle management", "Service request automation", "Vendor coordination and tracking"],
    screenImage: screenSalesExecutive
  },
  "safety": {
    id: "safety",
    title: "Safety",
    description: "Ensure safety compliance and incident management across all properties.",
    features: ["Safety audit scheduling and tracking", "Incident reporting and investigation", "Safety compliance monitoring", "Emergency response protocols"],
    screenImage: screenSalesExecutive
  },
  "security": {
    id: "security",
    title: "Security",
    description: "Manage security operations, access control, and surveillance across properties.",
    features: ["Access control management", "Visitor management system", "Security personnel scheduling", "Surveillance and monitoring"],
    screenImage: screenSalesExecutive
  },
  "booking-management": {
    id: "booking-management",
    title: "Booking Management",
    description: "Streamline amenity bookings, common area reservations, and facility scheduling.",
    features: ["Amenity and facility booking", "Calendar-based slot management", "Automated booking confirmations", "Conflict resolution and waitlists"],
    screenImage: screenSalesExecutive
  },
  "finance": {
    id: "finance",
    title: "Finance",
    description: "Manage financial operations including maintenance charges, billing, and collections.",
    features: ["Maintenance charge management", "Invoice generation and tracking", "Payment collection and receipts", "Financial reporting and analytics"],
    screenImage: screenSalesExecutive
  },
  "crm": {
    id: "crm",
    title: "CRM",
    description: "Customer relationship management for resident communication and service requests.",
    features: ["Resident profile management", "Communication history tracking", "Service request handling", "Feedback and satisfaction surveys"],
    screenImage: screenSalesExecutive
  },
  "transitioning": {
    id: "transitioning",
    title: "Transitioning",
    description: "Seamless property handover and transition management for new residents.",
    features: ["Move-in and move-out workflows", "Property inspection checklists", "Documentation and handover tracking", "Transition status monitoring"],
    screenImage: screenSalesExecutive
  },
  "employee-management": {
    id: "employee-management",
    title: "Employee Management",
    description: "Manage facility staff, contractors, and their assignments across properties.",
    features: ["Staff roster and scheduling", "Attendance and leave management", "Task assignment and tracking", "Performance monitoring"],
    screenImage: screenSalesExecutive
  }
};

// Konstruct module data
const konstructModuleData: Record<string, ModuleInfo> = {
  "qc": {
    id: "qc",
    title: "QC (Quality Control)",
    description: "Ensure construction quality standards with comprehensive quality control checks and inspections.",
    features: ["Quality inspection checklists", "Defect identification and tracking", "Quality metrics and reporting", "Compliance verification"],
    screenImage: screenSalesExecutive
  },
  "qa": {
    id: "qa",
    title: "QA (Quality Assurance)",
    description: "Maintain quality assurance protocols across all construction phases and processes.",
    features: ["Quality assurance protocols", "Process compliance monitoring", "Quality audit scheduling", "Corrective action tracking"],
    screenImage: screenSalesExecutive
  },
  "qhc": {
    id: "qhc",
    title: "QHC (Quality Health Check)",
    description: "Conduct regular quality health checks to ensure project standards are maintained.",
    features: ["Periodic quality health assessments", "Health check scheduling", "Issue identification and resolution", "Quality score tracking"],
    screenImage: screenSalesExecutive
  },
  "snagging": {
    id: "snagging",
    title: "Snagging",
    description: "Track and resolve snagging issues before handover with comprehensive punch list management.",
    features: ["Punch list creation and tracking", "Photo documentation of defects", "Contractor assignment for fixes", "Resolution status monitoring"],
    screenImage: screenSalesExecutive
  },
  "flat-handover-app": {
    id: "flat-handover-app",
    title: "Flat Handover App",
    description: "Streamline the flat handover process with mobile app for inspections and documentation.",
    features: ["Mobile inspection checklists", "Digital signature capture", "Photo and video documentation", "Real-time handover status"],
    screenImage: screenSalesExecutive
  },
  "safety": {
    id: "safety",
    title: "Safety",
    description: "Ensure workplace safety compliance with incident tracking and safety protocols.",
    features: ["Safety incident reporting", "PPE compliance tracking", "Safety audit management", "Hazard identification"],
    screenImage: screenSalesExecutive
  },
  "toolbox-training": {
    id: "toolbox-training",
    title: "Tool Box Training",
    description: "Manage daily toolbox talks and training sessions for construction workforce.",
    features: ["Daily toolbox talk scheduling", "Training attendance tracking", "Topic management and library", "Training completion reports"],
    screenImage: screenSalesExecutive
  },
  "construction-monitoring": {
    id: "construction-monitoring",
    title: "Construction Monitoring",
    description: "Real-time construction progress monitoring with milestone tracking and site updates.",
    features: ["Real-time progress tracking", "Milestone completion monitoring", "Site photo updates", "Delay alerts and notifications"],
    screenImage: screenSalesExecutive
  },
  "reports": {
    id: "reports",
    title: "Reports",
    description: "Comprehensive reporting and analytics for all construction activities and metrics.",
    features: ["Daily progress reports", "Quality metrics dashboard", "Safety compliance reports", "Custom report generation"],
    screenImage: screenSalesExecutive
  }
};

// Customer Portal module data
const customerPortalModuleData: Record<string, ModuleInfo> = {
  "my-dashboard": {
    id: "my-dashboard",
    title: "My Dashboard",
    description: "Personalized dashboard for customers to view their property details, payments, and updates at a glance.",
    features: ["Property overview and status", "Payment summary and dues", "Recent activity and notifications", "Quick access to key features"],
    screenImage: screenSalesExecutive
  },
  "payment-history": {
    id: "payment-history",
    title: "Payment History",
    description: "Complete payment records with transaction history, receipts, and payment schedules.",
    features: ["Transaction history and records", "Download receipts and invoices", "Payment schedule tracking", "Outstanding dues summary"],
    screenImage: screenSalesExecutive
  },
  "document-access": {
    id: "document-access",
    title: "Document Access",
    description: "Access and download all property-related documents including agreements, approvals, and certificates.",
    features: ["Agreement and contract access", "Approval letters and NOCs", "Property registration documents", "Tax and compliance certificates"],
    screenImage: screenSalesExecutive
  },
  "service-requests": {
    id: "service-requests",
    title: "Service Requests",
    description: "Raise and track service requests for maintenance, repairs, and other property-related issues.",
    features: ["Submit new service requests", "Track request status", "Priority and escalation management", "Service history and feedback"],
    screenImage: screenSalesExecutive
  },
  "construction-updates": {
    id: "construction-updates",
    title: "Construction Updates",
    description: "Stay updated with real-time construction progress, milestones, and project timeline.",
    features: ["Real-time progress tracking", "Milestone completion updates", "Photo and video galleries", "Expected completion timelines"],
    screenImage: screenSalesExecutive
  },
  "contact-support": {
    id: "contact-support",
    title: "Contact Support",
    description: "Connect with customer support through multiple channels for queries and assistance.",
    features: ["Live chat support", "Email and ticket support", "Phone support scheduling", "FAQ and knowledge base"],
    screenImage: screenSalesExecutive
  },
  "referral-program": {
    id: "referral-program",
    title: "Referral Program",
    description: "Refer friends and family to earn rewards and track your referral status and earnings.",
    features: ["Generate referral links", "Track referral status", "View earned rewards", "Referral leaderboard"],
    screenImage: screenSalesExecutive
  },
  "announcements": {
    id: "announcements",
    title: "Announcements",
    description: "Stay informed with important announcements, updates, and news about your property and community.",
    features: ["Project announcements", "Community updates", "Event notifications", "Important notices"],
    screenImage: screenSalesExecutive
  }
};
interface WorkflowGraphProps {
  color: string;
  showLabels?: boolean;
  moduleType?: 'pre-sales' | 'post-sales' | 'possession' | 'konstruct' | 'customer-portal' | 'default';
}
const WorkflowGraph = ({
  color,
  showLabels = false,
  moduleType = 'default'
}: WorkflowGraphProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Get the appropriate module data based on type
  const moduleData = moduleType === 'post-sales' ? postSalesModuleData : moduleType === 'possession' ? possessionModuleData : moduleType === 'konstruct' ? konstructModuleData : moduleType === 'customer-portal' ? customerPortalModuleData : preSalesModuleData;
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Set default selected module based on type
  useEffect(() => {
    if (showLabels || moduleType === 'post-sales' || moduleType === 'possession' || moduleType === 'konstruct' || moduleType === 'customer-portal') {
      if (moduleType === 'post-sales') {
        setSelectedModule("engineering");
      } else if (moduleType === 'pre-sales') {
        setSelectedModule("lead-management");
      } else if (moduleType === 'possession') {
        setSelectedModule("fm-modules");
      } else if (moduleType === 'konstruct') {
        setSelectedModule("qc");
      } else if (moduleType === 'customer-portal') {
        setSelectedModule("my-dashboard");
      }
    }
  }, [showLabels, moduleType]);

  // Pre-sales specific icons with labels and module IDs
  const preSalesLeftIcons = [{
    Icon: UserCheck,
    delay: 0,
    label: "Lead Management",
    moduleId: "lead-management"
  }, {
    Icon: Handshake,
    delay: 0.15,
    label: "CP Management",
    moduleId: "cp-management"
  }, {
    Icon: Calculator,
    delay: 0.3,
    label: "Cost Sheet Management",
    moduleId: "cost-sheet-management"
  }, {
    Icon: Target,
    delay: 0.45,
    label: "Opportunities",
    moduleId: "opportunities"
  }];
  const preSalesRightIcons = [{
    Icon: ClipboardCheck,
    delay: 0.1,
    label: "Booking Approval",
    moduleId: "booking-approval"
  }, {
    Icon: UserCog,
    delay: 0.25,
    label: "Sales Executive Management",
    moduleId: "sales-executive-management"
  }, {
    Icon: Package,
    delay: 0.4,
    label: "Inventory Tracking",
    moduleId: "inventory-tracking"
  }];

  // Post-sales specific icons with labels and module IDs
  const postSalesLeftIcons = [{
    Icon: Wrench,
    delay: 0,
    label: "Engineering",
    moduleId: "engineering"
  }, {
    Icon: FileSignature,
    delay: 0.1,
    label: "Contract",
    moduleId: "contract"
  }, {
    Icon: DollarSign,
    delay: 0.2,
    label: "Financial",
    moduleId: "financial"
  }, {
    Icon: FolderOpen,
    delay: 0.3,
    label: "DMS",
    moduleId: "dms"
  }, {
    Icon: Home,
    delay: 0.4,
    label: "Rent Module",
    moduleId: "rent-module"
  }, {
    Icon: Building2,
    delay: 0.5,
    label: "Facilities",
    moduleId: "facilities"
  }, {
    Icon: Mail,
    delay: 0.6,
    label: "Communication",
    moduleId: "communication"
  }];
  const postSalesRightIcons = [{
    Icon: CalendarClock,
    delay: 0.1,
    label: "Appointment Slot",
    moduleId: "appointment-slot"
  }, {
    Icon: Zap,
    delay: 0.2,
    label: "Utilities",
    moduleId: "utilities"
  }, {
    Icon: HelpCircle,
    delay: 0.3,
    label: "Help-Desk",
    moduleId: "help-desk"
  }, {
    Icon: Search,
    delay: 0.4,
    label: "Explore Properties",
    moduleId: "explore-properties"
  }, {
    Icon: Construction,
    delay: 0.5,
    label: "Construction Update",
    moduleId: "construction-update"
  }, {
    Icon: UserCog2,
    delay: 0.6,
    label: "HR",
    moduleId: "hr"
  }, {
    Icon: TrendingUp,
    delay: 0.7,
    label: "Sales",
    moduleId: "sales"
  }];

  // Possession specific icons with labels and module IDs
  const possessionLeftIcons = [{
    Icon: Cog,
    delay: 0,
    label: "FM Modules",
    moduleId: "fm-modules"
  }, {
    Icon: ShieldCheck,
    delay: 0.15,
    label: "Safety",
    moduleId: "safety"
  }, {
    Icon: Lock,
    delay: 0.3,
    label: "Security",
    moduleId: "security"
  }, {
    Icon: CalendarCheck,
    delay: 0.45,
    label: "Booking Management",
    moduleId: "booking-management"
  }];
  const possessionRightIcons = [{
    Icon: Wallet,
    delay: 0.1,
    label: "Finance",
    moduleId: "finance"
  }, {
    Icon: HeartHandshake,
    delay: 0.25,
    label: "CRM",
    moduleId: "crm"
  }, {
    Icon: ArrowRightLeft,
    delay: 0.4,
    label: "Transitioning",
    moduleId: "transitioning"
  }, {
    Icon: UserCircle,
    delay: 0.55,
    label: "Employee Management",
    moduleId: "employee-management"
  }];

  // Customer Portal specific icons with labels and module IDs
  const customerPortalLeftIcons = [{
    Icon: LayoutDashboard,
    delay: 0,
    label: "My Dashboard",
    moduleId: "my-dashboard"
  }, {
    Icon: CreditCard,
    delay: 0.15,
    label: "Payment History",
    moduleId: "payment-history"
  }, {
    Icon: FileCheck,
    delay: 0.3,
    label: "Document Access",
    moduleId: "document-access"
  }, {
    Icon: Ticket,
    delay: 0.45,
    label: "Service Requests",
    moduleId: "service-requests"
  }];
  const customerPortalRightIcons = [{
    Icon: Construction,
    delay: 0.1,
    label: "Construction Updates",
    moduleId: "construction-updates"
  }, {
    Icon: Phone,
    delay: 0.25,
    label: "Contact Support",
    moduleId: "contact-support"
  }, {
    Icon: Users,
    delay: 0.4,
    label: "Referral Program",
    moduleId: "referral-program"
  }, {
    Icon: Megaphone,
    delay: 0.55,
    label: "Announcements",
    moduleId: "announcements"
  }];

  // Konstruct specific icons with labels and module IDs
  const konstructLeftIcons = [{
    Icon: CheckSquare,
    delay: 0,
    label: "QC",
    moduleId: "qc"
  }, {
    Icon: ClipboardCheck,
    delay: 0.1,
    label: "QA",
    moduleId: "qa"
  }, {
    Icon: ShieldCheck,
    delay: 0.2,
    label: "QHC",
    moduleId: "qhc"
  }, {
    Icon: ClipboardX,
    delay: 0.3,
    label: "Snagging",
    moduleId: "snagging"
  }, {
    Icon: Smartphone,
    delay: 0.4,
    label: "Flat Handover App",
    moduleId: "flat-handover-app"
  }];
  const konstructRightIcons = [{
    Icon: HardHat,
    delay: 0.1,
    label: "Safety",
    moduleId: "safety"
  }, {
    Icon: GraduationCap,
    delay: 0.2,
    label: "Tool Box Training",
    moduleId: "toolbox-training"
  }, {
    Icon: Eye,
    delay: 0.3,
    label: "Construction Monitoring",
    moduleId: "construction-monitoring"
  }, {
    Icon: FileBarChart,
    delay: 0.4,
    label: "Reports",
    moduleId: "reports"
  }];

  // Default icons without labels
  const defaultLeftIcons = [{
    Icon: Users,
    delay: 0,
    label: undefined,
    moduleId: undefined
  }, {
    Icon: FileText,
    delay: 0.2,
    label: undefined,
    moduleId: undefined
  }, {
    Icon: BarChart3,
    delay: 0.4,
    label: undefined,
    moduleId: undefined
  }];
  const defaultRightIcons = [{
    Icon: BarChart3,
    delay: 0.1,
    label: undefined,
    moduleId: undefined
  }, {
    Icon: MessageSquare,
    delay: 0.3,
    label: undefined,
    moduleId: undefined
  }, {
    Icon: Bell,
    delay: 0.5,
    label: undefined,
    moduleId: undefined
  }];

  // Select icons based on module type
  const getIcons = () => {
    if (moduleType === 'post-sales') {
      return {
        leftIcons: postSalesLeftIcons,
        rightIcons: postSalesRightIcons
      };
    } else if (moduleType === 'possession') {
      return {
        leftIcons: possessionLeftIcons,
        rightIcons: possessionRightIcons
      };
    } else if (moduleType === 'konstruct') {
      return {
        leftIcons: konstructLeftIcons,
        rightIcons: konstructRightIcons
      };
    } else if (moduleType === 'customer-portal') {
      return {
        leftIcons: customerPortalLeftIcons,
        rightIcons: customerPortalRightIcons
      };
    } else if (moduleType === 'pre-sales' || showLabels) {
      return {
        leftIcons: preSalesLeftIcons,
        rightIcons: preSalesRightIcons
      };
    }
    return {
      leftIcons: defaultLeftIcons,
      rightIcons: defaultRightIcons
    };
  };
  const {
    leftIcons,
    rightIcons
  } = getIcons();
  const features = [{
    Icon: RefreshCw,
    label: "Seamless Automation"
  }, {
    Icon: CheckCircle,
    label: "Real-Time Data Sync"
  }, {
    Icon: Settings,
    label: "Customizable Solutions"
  }];
  const detailsRef = useRef<HTMLDivElement>(null);
  const handleModuleClick = (moduleId: string | undefined) => {
    if ((showLabels || moduleType === 'post-sales' || moduleType === 'pre-sales' || moduleType === 'possession' || moduleType === 'konstruct' || moduleType === 'customer-portal') && moduleId) {
      setSelectedModule(moduleId);
      // Smooth scroll to details section
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };
  const currentModule = selectedModule ? moduleData[selectedModule] : null;

  // Konstruct modules for hexagon layout (9 modules) with unique colors - defined early for color lookup
  const konstructHexData = [{
    Icon: SearchCheck,
    label: "QC",
    moduleId: "qc",
    color: "#10B981"
  },
  // Emerald green
  {
    Icon: BadgeCheck,
    label: "QA",
    moduleId: "qa",
    color: "#3B82F6"
  },
  // Blue
  {
    Icon: HeartPulse,
    label: "QHC",
    moduleId: "qhc",
    color: "#EC4899"
  },
  // Pink
  {
    Icon: StickyNote,
    label: "Snagging",
    moduleId: "snagging",
    color: "#F59E0B"
  },
  // Amber
  {
    Icon: KeyRound,
    label: "Flat Handover\nApp",
    moduleId: "flat-handover-app",
    color: "#8B5CF6"
  },
  // Purple
  {
    Icon: ShieldAlert,
    label: "Safety",
    moduleId: "safety",
    color: "#EF4444"
  },
  // Red
  {
    Icon: BookOpen,
    label: "Tool Box\nTraining",
    moduleId: "toolbox-training",
    color: "#06B6D4"
  },
  // Cyan
  {
    Icon: Activity,
    label: "Construction\nMonitoring",
    moduleId: "construction-monitoring",
    color: "#F97316"
  },
  // Orange
  {
    Icon: PieChart,
    label: "Reports",
    moduleId: "reports",
    color: "#6366F1"
  } // Indigo
  ];

  // Get color for current selected module (for Konstruct with unique colors)
  const getCurrentModuleColor = () => {
    if (moduleType === 'konstruct' && selectedModule) {
      const konstructItem = konstructHexData.find(item => item.moduleId === selectedModule);
      return konstructItem?.color || color;
    }
    return color;
  };
  const currentModuleColor = getCurrentModuleColor();

  // Hexagon positions for post-sales honeycomb layout (14 modules around center)
  const hexagonPositions = [
  // Top row
  {
    x: 50,
    y: 5,
    delay: 0
  }, {
    x: 50,
    y: 5,
    delay: 0.1
  },
  // Upper middle row
  {
    x: 15,
    y: 20,
    delay: 0.15
  }, {
    x: 50,
    y: 20,
    delay: 0.2
  }, {
    x: 85,
    y: 20,
    delay: 0.25
  },
  // Middle row (around center)
  {
    x: 8,
    y: 42,
    delay: 0.3
  }, {
    x: 92,
    y: 42,
    delay: 0.35
  },
  // Lower middle row
  {
    x: 15,
    y: 64,
    delay: 0.4
  }, {
    x: 50,
    y: 64,
    delay: 0.45
  }, {
    x: 85,
    y: 64,
    delay: 0.5
  },
  // Bottom row
  {
    x: 25,
    y: 82,
    delay: 0.55
  }, {
    x: 50,
    y: 82,
    delay: 0.6
  }, {
    x: 75,
    y: 82,
    delay: 0.65
  }, {
    x: 50,
    y: 95,
    delay: 0.7
  }];

  // All post-sales modules for hexagon layout
  const postSalesHexModules = [{
    Icon: Wrench,
    label: "Engineering",
    moduleId: "engineering"
  }, {
    Icon: ClipboardCheck,
    label: "Booking\nApproval",
    moduleId: "contract"
  }, {
    Icon: UserCheck,
    label: "Lead",
    moduleId: "financial"
  }, {
    Icon: Package,
    label: "Inventory\nTracking",
    moduleId: "dms"
  }, {
    Icon: Calculator,
    label: "Cost Sheet\nManagement",
    moduleId: "rent-module"
  }, {
    Icon: Handshake,
    label: "CP\nManagement",
    moduleId: "facilities"
  }, {
    Icon: Calculator,
    label: "Cost Sheet\nManagement",
    moduleId: "communication"
  }, {
    Icon: ClipboardCheck,
    label: "Booking\nApproval",
    moduleId: "appointment-slot"
  }, {
    Icon: UserCog,
    label: "Sales Executive\nManagement",
    moduleId: "utilities"
  }, {
    Icon: Search,
    label: "Explore\nProperties",
    moduleId: "help-desk"
  }, {
    Icon: Home,
    label: "Rent\nModule",
    moduleId: "explore-properties"
  }, {
    Icon: Construction,
    label: "Construction\nUpdate",
    moduleId: "construction-update"
  }, {
    Icon: UserCog2,
    label: "HR",
    moduleId: "hr"
  }, {
    Icon: TrendingUp,
    label: "Sales",
    moduleId: "sales"
  }];

  // Actual Post-Sales modules with correct mapping
  const postSalesHexData = [{
    Icon: Wrench,
    label: "Engineering",
    moduleId: "engineering"
  }, {
    Icon: FileSignature,
    label: "Contract",
    moduleId: "contract"
  }, {
    Icon: DollarSign,
    label: "Financial",
    moduleId: "financial"
  }, {
    Icon: FolderOpen,
    label: "DMS",
    moduleId: "dms"
  }, {
    Icon: Home,
    label: "Rent Module",
    moduleId: "rent-module"
  }, {
    Icon: Building2,
    label: "Facilities",
    moduleId: "facilities"
  }, {
    Icon: Mail,
    label: "Communication",
    moduleId: "communication"
  }, {
    Icon: CalendarClock,
    label: "Appointment\nSlot",
    moduleId: "appointment-slot"
  }, {
    Icon: Zap,
    label: "Utilities",
    moduleId: "utilities"
  }, {
    Icon: HelpCircle,
    label: "Help-Desk",
    moduleId: "help-desk"
  }, {
    Icon: Search,
    label: "Explore\nProperties",
    moduleId: "explore-properties"
  }, {
    Icon: Construction,
    label: "Construction\nUpdate",
    moduleId: "construction-update"
  }, {
    Icon: UserCog2,
    label: "HR",
    moduleId: "hr"
  }, {
    Icon: TrendingUp,
    label: "Sales",
    moduleId: "sales"
  }];

  // Possession modules for hexagon layout (8 modules)
  const possessionHexData = [{
    Icon: Cog,
    label: "FM Modules",
    moduleId: "fm-modules"
  }, {
    Icon: ShieldCheck,
    label: "Safety",
    moduleId: "safety"
  }, {
    Icon: Lock,
    label: "Security",
    moduleId: "security"
  }, {
    Icon: CalendarCheck,
    label: "Booking\nManagement",
    moduleId: "booking-management"
  }, {
    Icon: Wallet,
    label: "Finance",
    moduleId: "finance"
  }, {
    Icon: HeartHandshake,
    label: "CRM",
    moduleId: "crm"
  }, {
    Icon: ArrowRightLeft,
    label: "Transitioning",
    moduleId: "transitioning"
  }, {
    Icon: UserCircle,
    label: "Employee\nManagement",
    moduleId: "employee-management"
  }];

  // konstructHexData is defined earlier in the component for color lookup

  // Get hex data based on module type
  const getHexData = () => {
    if (moduleType === 'post-sales') return postSalesHexData;
    if (moduleType === 'possession') return possessionHexData;
    if (moduleType === 'konstruct') return konstructHexData;
    return postSalesHexData;
  };
  const hexData = getHexData();

  // Hexagon SVG path
  const hexPath = "M50 0L93.3 25V75L50 100L6.7 75V25Z";
  return <div className="w-full py-8">
      {/* CSS Animations */}
      <style>{`
        @keyframes flowLeft {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes flowRight {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 24; }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatDown {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        @keyframes hexFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-6px) scale(1.02); }
        }
        @keyframes hexPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes tooltipSlideIn {
          0% { 
            opacity: 0; 
            transform: translateX(-10px) scale(0.9); 
          }
          100% { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }
        @keyframes tooltipBounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .flow-line-left {
          animation: flowLeft 1.5s linear infinite;
        }
        .flow-line-right {
          animation: flowRight 1.5s linear infinite;
        }
        .float-1 {
          animation: floatUp 3s ease-in-out infinite;
        }
        .float-2 {
          animation: floatDown 3.5s ease-in-out infinite;
        }
        .float-3 {
          animation: floatUp 4s ease-in-out infinite;
        }
        .hex-float {
          animation: hexFloat 3s ease-in-out infinite;
        }
        .hex-float-delayed {
          animation: hexFloat 3.5s ease-in-out infinite 0.5s;
        }
        .center-pulse {
          animation: pulse 2s ease-in-out infinite, glow 2s ease-in-out infinite;
        }
        .inner-rotate {
          animation: rotate 8s linear infinite;
        }
        .tooltip-animate {
          animation: tooltipSlideIn 0.3s ease-out forwards, tooltipBounce 2s ease-in-out 0.3s infinite;
        }
        .hexagon-shape {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>

      {/* Workflow Diagram - Conditional layout */}
      {moduleType === 'post-sales' || moduleType === 'possession' || moduleType === 'konstruct' ? (/* Hexagonal Honeycomb Layout for Post-Sales, Possession, and Konstruct */
    <div className="relative max-w-4xl mx-auto h-[600px] md:h-[650px]">
          {/* SVG Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 650" preserveAspectRatio="xMidYMid meet">
            {hexData.map((hexItem, idx) => {
          // Get individual color for Konstruct modules
          const lineColor = 'color' in hexItem ? (hexItem as any).color : color;
          // Calculate hex positions (same logic as rendering)
          const centerX = 400;
          const centerY = 325;
          const radius = 32 * 4; // Scale for viewBox
          const totalItems = hexData.length;
          let x, y;
          // Handle 9-module layout (Konstruct)
          if (totalItems === 9) {
            const positions = [{
              x: 50,
              y: 8
            },
            // top center
            {
              x: 18,
              y: 25
            },
            // top left
            {
              x: 82,
              y: 25
            },
            // top right
            {
              x: 8,
              y: 50
            },
            // middle left
            {
              x: 92,
              y: 50
            },
            // middle right
            {
              x: 18,
              y: 75
            },
            // bottom left
            {
              x: 82,
              y: 75
            },
            // bottom right
            {
              x: 35,
              y: 92
            },
            // bottom center left
            {
              x: 65,
              y: 92
            } // bottom center right
            ];
            x = (positions[idx]?.x ?? 50) * 8;
            y = (positions[idx]?.y ?? 50) * 6.5;
          } else if (idx < 6) {
            const angle = (idx * 60 - 90) * (Math.PI / 180);
            x = centerX + radius * Math.cos(angle);
            y = centerY + radius * Math.sin(angle) * 0.9;
          } else {
            const outerIdx = idx - 6;
            const positions = [{
              x: 12,
              y: 25
            }, {
              x: 88,
              y: 25
            }, {
              x: 5,
              y: 50
            }, {
              x: 95,
              y: 50
            }, {
              x: 12,
              y: 75
            }, {
              x: 88,
              y: 75
            }, {
              x: 30,
              y: 90
            }, {
              x: 70,
              y: 90
            }];
            x = (positions[outerIdx]?.x ?? 50) * 8;
            y = (positions[outerIdx]?.y ?? 50) * 6.5;
          }

          // Create curved path from hex to center
          const midX = (x + centerX) / 2;
          const midY = (y + centerY) / 2;
          const controlOffset = 30;
          return <path key={`line-${idx}`} d={`M ${x} ${y} Q ${midX + (idx % 2 === 0 ? controlOffset : -controlOffset)} ${midY} ${centerX} ${centerY}`} fill="none" stroke={lineColor} strokeWidth="2" strokeDasharray="8 4" className={`flow-line-right ${isVisible ? 'opacity-50' : 'opacity-0'}`} style={{
            transition: 'opacity 0.5s ease-out',
            transitionDelay: `${idx * 0.08}s`
          }} />;
        })}
          </svg>

          {/* Center Hexagon */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10" style={{
        transform: isVisible ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.7s ease-out',
        transitionDelay: '0.3s'
      }}>
            <div className={`w-24 h-28 md:w-28 md:h-32 hexagon-shape shadow-xl flex items-center justify-center ${isVisible ? 'center-pulse' : ''}`} style={{
          backgroundColor: color
        }}>
              <div className={`w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center ${isVisible ? 'inner-rotate' : ''}`}>
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded rotate-45" />
              </div>
            </div>
          </div>

          {/* Surrounding Hexagons in honeycomb pattern */}
          {hexData.map((hexItem, idx) => {
        const {
          Icon,
          label,
          moduleId
        } = hexItem;
        const itemColor = 'color' in hexItem ? (hexItem as any).color : color;
        // Calculate positions in a honeycomb pattern
        const centerX = 50;
        const centerY = 50;
        const radius = 32; // Distance from center
        const totalItems = hexData.length;

        // Position calculations for honeycomb
        let x, y;
        // Handle 9-module layout (Konstruct)
        if (totalItems === 9) {
          const positions = [{
            x: 50,
            y: 8
          },
          // top center
          {
            x: 18,
            y: 25
          },
          // top left
          {
            x: 82,
            y: 25
          },
          // top right
          {
            x: 8,
            y: 50
          },
          // middle left
          {
            x: 92,
            y: 50
          },
          // middle right
          {
            x: 18,
            y: 75
          },
          // bottom left
          {
            x: 82,
            y: 75
          },
          // bottom right
          {
            x: 35,
            y: 92
          },
          // bottom center left
          {
            x: 65,
            y: 92
          } // bottom center right
          ];
          x = positions[idx]?.x ?? centerX;
          y = positions[idx]?.y ?? centerY;
        } else if (idx < 6) {
          // Inner ring - 6 hexagons around center
          const angle = (idx * 60 - 90) * (Math.PI / 180);
          x = centerX + radius * Math.cos(angle);
          y = centerY + radius * Math.sin(angle) * 0.9;
        } else {
          // Outer ring - remaining hexagons
          const outerIdx = idx - 6;
          const positions = [{
            x: 12,
            y: 25
          },
          // far left top
          {
            x: 88,
            y: 25
          },
          // far right top
          {
            x: 5,
            y: 50
          },
          // far left middle
          {
            x: 95,
            y: 50
          },
          // far right middle
          {
            x: 12,
            y: 75
          },
          // far left bottom
          {
            x: 88,
            y: 75
          },
          // far right bottom
          {
            x: 30,
            y: 90
          },
          // bottom left
          {
            x: 70,
            y: 90
          } // bottom right
          ];
          x = positions[outerIdx]?.x ?? centerX;
          y = positions[outerIdx]?.y ?? centerY;
        }
        const isSelected = selectedModule === moduleId;
        const floatClass = idx % 2 === 0 ? 'hex-float' : 'hex-float-delayed';
        return <div key={moduleId} className="absolute" style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: isVisible ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.7s ease-out',
          transitionDelay: `${idx * 0.08}s`,
          zIndex: isSelected ? 5 : 1
        }}>
                <div onClick={() => handleModuleClick(moduleId)} className={`group cursor-pointer ${isVisible ? floatClass : ''}`}>
                  <div className={`w-20 h-24 md:w-24 md:h-28 hexagon-shape flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 ${isSelected ? 'shadow-xl' : 'bg-white/90 backdrop-blur-sm shadow-lg border-2 hover:shadow-xl'}`} style={{
              backgroundColor: isSelected ? itemColor : 'white',
              borderColor: isSelected ? itemColor : `${itemColor}40`
            }}>
                    <Icon size={22} className={`mb-1 ${isSelected ? 'text-white' : 'text-gray-700'}`} style={{
                color: isSelected ? 'white' : itemColor
              }} />
                    <span className={`text-[10px] md:text-xs font-medium text-center leading-tight px-1 whitespace-pre-line ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                      {label}
                    </span>
                  </div>
                </div>
              </div>;
      })}
        </div>) : (/* Original Left-Right Layout for Pre-Sales and Default */
    <div className={`relative max-w-4xl mx-auto h-[450px]`}>
          {/* SVG Lines - dynamically generated based on icon count */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet">
            {/* Left side lines - dynamically generated */}
            {leftIcons.map((_, idx) => {
          const totalIcons = leftIcons.length;
          const centerY = 225;
          const spacing = 110;
          const startOffset = (totalIcons - 1) * spacing / 2;
          const yPos = centerY - startOffset + idx * spacing;
          return <path key={`left-${idx}`} d={`M 120 ${yPos} Q 250 ${yPos} 350 ${centerY}`} fill="none" stroke={color} strokeWidth="2" strokeDasharray="8 4" className={`flow-line-right ${isVisible ? 'opacity-60' : 'opacity-0'}`} style={{
            transition: 'opacity 0.5s ease-out',
            transitionDelay: `${idx * 0.1}s`
          }} />;
        })}
            
            {/* Right side lines - dynamically generated */}
            {rightIcons.map((_, idx) => {
          const totalIcons = rightIcons.length;
          const centerY = 225;
          const spacing = 110;
          const startOffset = (totalIcons - 1) * spacing / 2;
          const yPos = centerY - startOffset + idx * spacing;
          return <path key={`right-${idx}`} d={`M 450 ${centerY} Q 550 ${yPos} 680 ${yPos}`} fill="none" stroke={color} strokeWidth="2" strokeDasharray="8 4" className={`flow-line-right ${isVisible ? 'opacity-60' : 'opacity-0'}`} style={{
            transition: 'opacity 0.5s ease-out',
            transitionDelay: `${idx * 0.1}s`
          }} />;
        })}
          </svg>

          {/* Left Icons */}
          <div className="absolute left-4 md:left-8 top-0 h-full flex flex-col justify-around py-8">
            {leftIcons.map(({
          Icon,
          delay,
          label,
          moduleId
        }, idx) => <div key={idx} className="flex flex-col items-center gap-1" style={{
          transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(-50px) scale(0.5)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.7s ease-out',
          transitionDelay: `${delay}s`
        }}>
                <div onClick={() => handleModuleClick(moduleId)} className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-xl ${isVisible ? `float-${idx % 3 + 1}` : ''} ${showLabels ? 'hover:ring-2 hover:ring-offset-2' : ''} ${selectedModule === moduleId ? 'ring-2 ring-offset-2' : 'bg-white'}`} style={{
            '--tw-ring-color': color,
            backgroundColor: selectedModule === moduleId ? color : 'white'
          } as React.CSSProperties}>
                  <Icon size={24} className={selectedModule === moduleId ? 'text-white' : 'text-gray-700'} />
                </div>
                {showLabels && label && <span onClick={() => handleModuleClick(moduleId)} className="text-xs md:text-sm font-medium text-gray-600 text-center max-w-[90px] leading-tight cursor-pointer hover:underline">
                    {label}
                  </span>}
              </div>)}
          </div>

          {/* Center Icon */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-700 hover:scale-110 ${isVisible ? 'center-pulse' : ''}`} style={{
          backgroundColor: color,
          transform: isVisible ? 'scale(1)' : 'scale(0)',
          opacity: isVisible ? 1 : 0,
          transitionDelay: '0.3s'
        }}>
              <div className={`w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center ${isVisible ? 'inner-rotate' : ''}`}>
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded rotate-45" />
              </div>
            </div>
            
            {/* Animated rings */}
            <div className="absolute inset-0 rounded-2xl animate-ping opacity-20" style={{
          backgroundColor: color,
          animationDuration: '2s'
        }} />
            <div className="absolute inset-[-8px] rounded-3xl animate-ping opacity-10" style={{
          backgroundColor: color,
          animationDuration: '2.5s',
          animationDelay: '0.5s'
        }} />
          </div>

          {/* Right Icons */}
          <div className="absolute right-4 md:right-8 top-0 h-full flex flex-col justify-around py-8">
            {rightIcons.map(({
          Icon,
          delay,
          label,
          moduleId
        }, idx) => <div key={idx} className="flex flex-col items-center gap-1" style={{
          transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.5)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.7s ease-out',
          transitionDelay: `${delay}s`
        }}>
                <div onClick={() => handleModuleClick(moduleId)} className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-xl ${isVisible ? `float-${(idx + 1) % 3 + 1}` : ''} ${showLabels ? 'hover:ring-2 hover:ring-offset-2' : ''} ${selectedModule === moduleId ? 'ring-2 ring-offset-2' : 'bg-white'}`} style={{
            '--tw-ring-color': color,
            backgroundColor: selectedModule === moduleId ? color : 'white'
          } as React.CSSProperties}>
                  <Icon size={24} className={selectedModule === moduleId ? 'text-white' : 'text-gray-700'} />
                </div>
                {showLabels && label && <span onClick={() => handleModuleClick(moduleId)} className="text-xs md:text-sm font-medium text-gray-600 text-center max-w-[100px] leading-tight cursor-pointer hover:underline">
                    {label}
                  </span>}
              </div>)}
          </div>
        </div>)}

      {/* Features Bar - Between Workflow and Details */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-8 px-4">
        {features.map(({
        Icon,
        label
      }, idx) => <div key={idx} className={`flex items-center gap-2 text-gray-600 transition-all duration-700`} style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${0.6 + idx * 0.1}s`
      }}>
            <div className="relative">
              <div className="absolute -left-8 top-1/2 w-6 border-t-2 border-dashed" style={{
            borderColor: color,
            opacity: 0.4
          }} />
              <Icon size={18} style={{
            color
          }} className={idx === 0 ? 'animate-spin' : ''} />
            </div>
            <span className="text-sm md:text-base font-medium">{label}</span>
            {idx < features.length - 1 && <div className="hidden md:block w-16 border-t-2 border-dashed ml-4" style={{
          borderColor: color,
          opacity: 0.4
        }} />}
          </div>)}
      </div>

      {/* Inline Module Details Section */}
      {(showLabels || moduleType === 'post-sales' || moduleType === 'pre-sales' || moduleType === 'possession' || moduleType === 'konstruct') && currentModule && <div ref={detailsRef} key={currentModule.id} className="mt-12 max-w-4xl mx-auto px-4 animate-fade-in scroll-mt-8">
          <div>
            {/* Features List */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center lg:text-3xl" style={{
            color: currentModuleColor
          }}>
                {currentModule.title}
              </h3>
              <p className="text-gray-600 mb-8 text-base md:text-lg text-center">{currentModule.description}</p>
              
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6 text-center">Key Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {/* Left column - first half of features */}
                <ul className="space-y-4">
                  {currentModule.features.slice(0, Math.ceil(currentModule.features.length / 2)).map((feature, idx) => <li key={idx} className="flex items-start gap-3 animate-fade-in" style={{
                animationDelay: `${idx * 0.05}s`
              }}>
                      <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{
                  backgroundColor: currentModuleColor
                }}>
                        <Check size={12} className="text-white" />
                      </div>
                      <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                        {feature}
                      </span>
                    </li>)}
                </ul>
                {/* Right column - second half of features */}
                <ul className="space-y-4">
                  {currentModule.features.slice(Math.ceil(currentModule.features.length / 2)).map((feature, idx) => <li key={idx + Math.ceil(currentModule.features.length / 2)} className="flex items-start gap-3 animate-fade-in" style={{
                animationDelay: `${(idx + Math.ceil(currentModule.features.length / 2)) * 0.05}s`
              }}>
                      <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{
                  backgroundColor: currentModuleColor
                }}>
                        <Check size={12} className="text-white" />
                      </div>
                      <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                        {feature}
                      </span>
                    </li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>}

    </div>;
};
export default WorkflowGraph;