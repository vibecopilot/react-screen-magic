import { useEffect, useState, useRef } from "react";
import { 
  Users, 
  FileText, 
  BarChart3, 
  MessageSquare, 
  Bell,
  RefreshCw,
  CheckCircle,
  Settings,
  UserCheck,
  Handshake,
  Calculator,
  ClipboardCheck,
  UserCog,
  Check,
  X,
  Package,
  Target,
  Wrench,
  FileSignature,
  DollarSign,
  FolderOpen,
  Home,
  Building2,
  Mail,
  CalendarClock,
  Zap,
  HelpCircle,
  Search,
  Construction,
  UserCog2,
  TrendingUp
} from "lucide-react";
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
    features: [
      "Capture leads from multiple sources (website, social media, walk-ins)",
      "Automatic lead scoring based on engagement and behavior",
      "Smart lead distribution to sales executives",
      "Real-time lead status tracking and updates",
      "Automated follow-up reminders and notifications",
      "Lead conversion analytics and reporting",
      "Integration with marketing campaigns",
      "Duplicate lead detection and merging"
    ],
    screenImage: screenLeadManagement
  },
  "cp-management": {
    id: "cp-management",
    title: "CP Management",
    description: "Manage your Channel Partners efficiently with complete visibility into their performance and payouts.",
    features: [
      "Channel Partner onboarding and verification",
      "Commission structure management and tracking",
      "Real-time payout calculations and disbursement",
      "CP performance dashboard and analytics",
      "Lead assignment and tracking per CP",
      "Agreement and document management",
      "CP hierarchy and team management",
      "Incentive programs and bonus tracking"
    ],
    screenImage: screenCpManagement
  },
  "cost-sheet-management": {
    id: "cost-sheet-management",
    title: "Cost Sheet Management",
    description: "Generate accurate and dynamic cost sheets with real-time pricing and customizable components.",
    features: [
      "Dynamic cost sheet generation with live pricing",
      "Multiple payment plan options and schemes",
      "GST and tax calculations automated",
      "Discount and offer management",
      "Floor rise and view premium calculations",
      "Comparison across multiple units",
      "PDF export with company branding",
      "Version history and audit trail"
    ],
    screenImage: screenCostSheet
  },
  "booking-approval": {
    id: "booking-approval",
    title: "Booking Approval",
    description: "Streamline your booking approval workflow with multi-level authorization and real-time tracking.",
    features: [
      "Multi-level approval workflow configuration",
      "Real-time booking status notifications",
      "Document verification and checklist",
      "Digital signature integration",
      "Approval delegation and escalation",
      "Booking modification requests handling",
      "Audit trail for all approvals",
      "Mobile approval for on-the-go decisions"
    ],
    screenImage: screenBookingApproval
  },
  "sales-executive-management": {
    id: "sales-executive-management",
    title: "Sales Executive Management",
    description: "Empower your sales team with tools to track performance, manage targets, and optimize productivity.",
    features: [
      "Sales executive onboarding and profiling",
      "Target setting and achievement tracking",
      "Lead assignment and workload balancing",
      "Performance analytics and leaderboards",
      "Commission and incentive calculations",
      "Activity logging and call tracking",
      "Training and certification management",
      "Attendance and location tracking"
    ],
    screenImage: screenSalesExecutive
  },
  "opportunities": {
    id: "opportunities",
    title: "Opportunities",
    description: "Manage and convert potential deals efficiently with structured opportunity tracking and insights.",
    features: [
      "Track sales opportunities across different pipeline stages",
      "Assign opportunities to sales representatives",
      "Estimated deal value and expected closure tracking",
      "Activity tracking for calls, meetings, and follow-ups",
      "Opportunity performance analytics and forecasting",
      "Automated reminders for next actions",
      "Integration with leads and customer records",
      "Improved win-rate with data-driven insights"
    ],
    screenImage: screenSalesExecutive
  },
  "inventory-tracking": {
    id: "inventory-tracking",
    title: "Inventory Tracking",
    description: "Streamline your inventory monitoring and control with real-time tracking and intelligent stock management.",
    features: [
      "Track inventory levels in real time across multiple locations",
      "Automatic stock updates for purchases, sales, and returns",
      "Low-stock alerts and reorder notifications",
      "Categorization and tagging of products for easy management",
      "Inventory usage analytics and reporting",
      "Integration with sales and procurement systems",
      "Barcode / SKU-based inventory tracking",
      "Reduce stock wastage with expiry and movement tracking"
    ],
    screenImage: screenSalesExecutive
  }
};

// Post-sales module data
const postSalesModuleData: Record<string, ModuleInfo> = {
  "engineering": {
    id: "engineering",
    title: "Engineering",
    description: "Track engineering tasks and technical work orders with comprehensive team management.",
    features: [
      "Track engineering tasks and work orders",
      "Assign jobs to technical teams",
      "Monitor task status and completion",
      "Maintenance scheduling and alerts"
    ],
    screenImage: screenSalesExecutive
  },
  "contract": {
    id: "contract",
    title: "Contract",
    description: "Centralized contract management with validity tracking and secure document handling.",
    features: [
      "Centralized contract storage",
      "Contract validity and renewal tracking",
      "Approval and version control",
      "Secure document access"
    ],
    screenImage: screenSalesExecutive
  },
  "financial": {
    id: "financial",
    title: "Financial",
    description: "Complete financial tracking with payments, invoicing, and integration with accounting systems.",
    features: [
      "Track payments, dues, and receipts",
      "Invoice and receipt generation",
      "Financial reporting and summaries",
      "Integration with accounting systems"
    ],
    screenImage: screenSalesExecutive
  },
  "dms": {
    id: "dms",
    title: "DMS (Document Management System)",
    description: "Centralized document repository with role-based access and comprehensive audit trails.",
    features: [
      "Centralized document repository",
      "Role-based access control",
      "Version history and audit logs",
      "Quick search and retrieval"
    ],
    screenImage: screenSalesExecutive
  },
  "rent-module": {
    id: "rent-module",
    title: "Rent Module",
    description: "Complete rental agreement management with automated scheduling and payment reminders.",
    features: [
      "Rental agreement management",
      "Rent schedule and invoicing",
      "Automated payment reminders",
      "Lease renewal tracking"
    ],
    screenImage: screenSalesExecutive
  },
  "facilities": {
    id: "facilities",
    title: "Facilities",
    description: "Comprehensive facility asset management with maintenance tracking and vendor monitoring.",
    features: [
      "Facility asset management",
      "Maintenance request tracking",
      "Vendor and service monitoring",
      "Inspection and service schedules"
    ],
    screenImage: screenSalesExecutive
  },
  "communication": {
    id: "communication",
    title: "Communication",
    description: "Centralized communication hub with email, SMS, and internal team messaging.",
    features: [
      "Email and SMS notifications",
      "Centralized communication logs",
      "Automated customer updates",
      "Internal team messaging"
    ],
    screenImage: screenSalesExecutive
  },
  "appointment-slot": {
    id: "appointment-slot",
    title: "Appointment Slot",
    description: "Slot-based appointment booking with calendar integration and automated reminders.",
    features: [
      "Slot-based appointment booking",
      "Auto-confirmation and reminders",
      "Calendar integration",
      "Reschedule and cancellation management"
    ],
    screenImage: screenSalesExecutive
  },
  "utilities": {
    id: "utilities",
    title: "Utilities",
    description: "Track utility consumption with meter reading management and detailed billing reports.",
    features: [
      "Utility consumption tracking",
      "Meter reading management",
      "Utility billing and reports",
      "Cost analysis and monitoring"
    ],
    screenImage: screenSalesExecutive
  },
  "help-desk": {
    id: "help-desk",
    title: "Help-Desk",
    description: "Complete ticket management system with SLA-based issue handling and support history.",
    features: [
      "Ticket creation and tracking",
      "SLA-based issue management",
      "Priority and status updates",
      "Customer support history"
    ],
    screenImage: screenSalesExecutive
  },
  "explore-properties": {
    id: "explore-properties",
    title: "Explore Properties",
    description: "Property details and availability with floor plans, media access, and real-time status updates.",
    features: [
      "Property details and availability view",
      "Floor plans and media access",
      "Status updates in real time",
      "Easy property search and filters"
    ],
    screenImage: screenSalesExecutive
  },
  "construction-update": {
    id: "construction-update",
    title: "Construction Update",
    description: "Real-time construction progress tracking with milestone management and customer notifications.",
    features: [
      "Real-time construction progress updates",
      "Milestone and phase tracking",
      "Photo and document sharing",
      "Customer notifications"
    ],
    screenImage: screenSalesExecutive
  },
  "hr": {
    id: "hr",
    title: "HR",
    description: "Employee record management with attendance tracking, performance monitoring, and access control.",
    features: [
      "Employee record management",
      "Attendance and role tracking",
      "Task and performance monitoring",
      "Access control and permissions"
    ],
    screenImage: screenSalesExecutive
  },
  "sales": {
    id: "sales",
    title: "Sales",
    description: "Track post-sale sales activities with upsell management and performance analytics.",
    features: [
      "Track post-sale sales activities",
      "Upsell and add-on management",
      "Customer interaction history",
      "Sales performance analytics"
    ],
    screenImage: screenSalesExecutive
  }
};

interface WorkflowGraphProps {
  color: string;
  showLabels?: boolean;
  moduleType?: 'pre-sales' | 'post-sales' | 'default';
}

const WorkflowGraph = ({ color, showLabels = false, moduleType = 'default' }: WorkflowGraphProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Get the appropriate module data based on type
  const moduleData = moduleType === 'post-sales' ? postSalesModuleData : preSalesModuleData;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Set default selected module based on type
  useEffect(() => {
    if (showLabels) {
      if (moduleType === 'post-sales') {
        setSelectedModule("engineering");
      } else if (moduleType === 'pre-sales') {
        setSelectedModule("lead-management");
      }
    }
  }, [showLabels, moduleType]);

  // Pre-sales specific icons with labels and module IDs
  const preSalesLeftIcons = [
    { Icon: UserCheck, delay: 0, label: "Lead Management", moduleId: "lead-management" },
    { Icon: Handshake, delay: 0.15, label: "CP Management", moduleId: "cp-management" },
    { Icon: Calculator, delay: 0.3, label: "Cost Sheet Management", moduleId: "cost-sheet-management" },
    { Icon: Target, delay: 0.45, label: "Opportunities", moduleId: "opportunities" },
  ];

  const preSalesRightIcons = [
    { Icon: ClipboardCheck, delay: 0.1, label: "Booking Approval", moduleId: "booking-approval" },
    { Icon: UserCog, delay: 0.25, label: "Sales Executive Management", moduleId: "sales-executive-management" },
    { Icon: Package, delay: 0.4, label: "Inventory Tracking", moduleId: "inventory-tracking" },
  ];

  // Post-sales specific icons with labels and module IDs
  const postSalesLeftIcons = [
    { Icon: Wrench, delay: 0, label: "Engineering", moduleId: "engineering" },
    { Icon: FileSignature, delay: 0.1, label: "Contract", moduleId: "contract" },
    { Icon: DollarSign, delay: 0.2, label: "Financial", moduleId: "financial" },
    { Icon: FolderOpen, delay: 0.3, label: "DMS", moduleId: "dms" },
    { Icon: Home, delay: 0.4, label: "Rent Module", moduleId: "rent-module" },
    { Icon: Building2, delay: 0.5, label: "Facilities", moduleId: "facilities" },
    { Icon: Mail, delay: 0.6, label: "Communication", moduleId: "communication" },
  ];

  const postSalesRightIcons = [
    { Icon: CalendarClock, delay: 0.1, label: "Appointment Slot", moduleId: "appointment-slot" },
    { Icon: Zap, delay: 0.2, label: "Utilities", moduleId: "utilities" },
    { Icon: HelpCircle, delay: 0.3, label: "Help-Desk", moduleId: "help-desk" },
    { Icon: Search, delay: 0.4, label: "Explore Properties", moduleId: "explore-properties" },
    { Icon: Construction, delay: 0.5, label: "Construction Update", moduleId: "construction-update" },
    { Icon: UserCog2, delay: 0.6, label: "HR", moduleId: "hr" },
    { Icon: TrendingUp, delay: 0.7, label: "Sales", moduleId: "sales" },
  ];

  // Default icons without labels
  const defaultLeftIcons = [
    { Icon: Users, delay: 0, label: undefined, moduleId: undefined },
    { Icon: FileText, delay: 0.2, label: undefined, moduleId: undefined },
    { Icon: BarChart3, delay: 0.4, label: undefined, moduleId: undefined },
  ];

  const defaultRightIcons = [
    { Icon: BarChart3, delay: 0.1, label: undefined, moduleId: undefined },
    { Icon: MessageSquare, delay: 0.3, label: undefined, moduleId: undefined },
    { Icon: Bell, delay: 0.5, label: undefined, moduleId: undefined },
  ];

  // Select icons based on module type
  const getIcons = () => {
    if (moduleType === 'post-sales') {
      return { leftIcons: postSalesLeftIcons, rightIcons: postSalesRightIcons };
    } else if (moduleType === 'pre-sales' || showLabels) {
      return { leftIcons: preSalesLeftIcons, rightIcons: preSalesRightIcons };
    }
    return { leftIcons: defaultLeftIcons, rightIcons: defaultRightIcons };
  };

  const { leftIcons, rightIcons } = getIcons();

  const features = [
    { Icon: RefreshCw, label: "Seamless Automation" },
    { Icon: CheckCircle, label: "Real-Time Data Sync" },
    { Icon: Settings, label: "Customizable Solutions" },
  ];

  const detailsRef = useRef<HTMLDivElement>(null);

  const handleModuleClick = (moduleId: string | undefined) => {
    if ((showLabels || moduleType === 'post-sales' || moduleType === 'pre-sales') && moduleId) {
      setSelectedModule(moduleId);
      // Smooth scroll to details section
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const currentModule = selectedModule ? moduleData[selectedModule] : null;

  return (
    <div className="w-full py-8">
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
        .center-pulse {
          animation: pulse 2s ease-in-out infinite, glow 2s ease-in-out infinite;
        }
        .inner-rotate {
          animation: rotate 8s linear infinite;
        }
        .tooltip-animate {
          animation: tooltipSlideIn 0.3s ease-out forwards, tooltipBounce 2s ease-in-out 0.3s infinite;
        }
      `}</style>

      {/* Workflow Diagram */}
      <div className={`relative max-w-4xl mx-auto ${moduleType === 'post-sales' ? 'h-[650px]' : 'h-[450px]'}`}>
        {/* SVG Lines - dynamically generated based on icon count */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox={moduleType === 'post-sales' ? "0 0 800 650" : "0 0 800 450"}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Left side lines - dynamically generated */}
          {leftIcons.map((_, idx) => {
            const totalIcons = leftIcons.length;
            const centerY = moduleType === 'post-sales' ? 325 : 225;
            const spacing = moduleType === 'post-sales' ? 80 : 110;
            const startOffset = (totalIcons - 1) * spacing / 2;
            const yPos = centerY - startOffset + idx * spacing;
            return (
              <path
                key={`left-${idx}`}
                d={`M 120 ${yPos} Q 250 ${yPos} 350 ${centerY}`}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeDasharray="8 4"
                className={`flow-line-right ${isVisible ? 'opacity-60' : 'opacity-0'}`}
                style={{ transition: 'opacity 0.5s ease-out', transitionDelay: `${idx * 0.1}s` }}
              />
            );
          })}
          
          {/* Right side lines - dynamically generated */}
          {rightIcons.map((_, idx) => {
            const totalIcons = rightIcons.length;
            const centerY = moduleType === 'post-sales' ? 325 : 225;
            const spacing = moduleType === 'post-sales' ? 80 : 110;
            const startOffset = (totalIcons - 1) * spacing / 2;
            const yPos = centerY - startOffset + idx * spacing;
            return (
              <path
                key={`right-${idx}`}
                d={`M 450 ${centerY} Q 550 ${yPos} 680 ${yPos}`}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeDasharray="8 4"
                className={`flow-line-right ${isVisible ? 'opacity-60' : 'opacity-0'}`}
                style={{ transition: 'opacity 0.5s ease-out', transitionDelay: `${idx * 0.1}s` }}
              />
            );
          })}
        </svg>

        {/* Left Icons */}
        <div className="absolute left-4 md:left-8 top-0 h-full flex flex-col justify-around py-8">
          {leftIcons.map(({ Icon, delay, label, moduleId }, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-1"
              style={{ 
                transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(-50px) scale(0.5)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.7s ease-out',
                transitionDelay: `${delay}s`
              }}
            >
              <div
                onClick={() => handleModuleClick(moduleId)}
                className={`${moduleType === 'post-sales' ? 'w-12 h-12 md:w-14 md:h-14' : 'w-14 h-14 md:w-16 md:h-16'} rounded-2xl shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-xl ${isVisible ? `float-${(idx % 3) + 1}` : ''} ${(showLabels || moduleType === 'post-sales') ? 'hover:ring-2 hover:ring-offset-2' : ''} ${selectedModule === moduleId ? 'ring-2 ring-offset-2' : 'bg-white'}`}
                style={{ 
                  '--tw-ring-color': color,
                  backgroundColor: selectedModule === moduleId ? color : 'white'
                } as React.CSSProperties}
              >
                <Icon size={moduleType === 'post-sales' ? 20 : 24} className={selectedModule === moduleId ? 'text-white' : 'text-gray-700'} />
              </div>
              {(showLabels || moduleType === 'post-sales') && label && (
                <span 
                  onClick={() => handleModuleClick(moduleId)}
                  className={`text-xs font-medium text-gray-600 text-center max-w-[90px] leading-tight cursor-pointer hover:underline ${moduleType === 'post-sales' ? 'md:text-xs' : 'md:text-sm'}`}
                >
                  {label}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Center Icon */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div 
            className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-700 hover:scale-110 ${isVisible ? 'center-pulse' : ''}`}
            style={{ 
              backgroundColor: color,
              transform: isVisible ? 'scale(1)' : 'scale(0)',
              opacity: isVisible ? 1 : 0,
              transitionDelay: '0.3s'
            }}
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center ${isVisible ? 'inner-rotate' : ''}`}>
              <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded rotate-45" />
            </div>
          </div>
          
          {/* Animated rings */}
          <div 
            className="absolute inset-0 rounded-2xl animate-ping opacity-20"
            style={{ backgroundColor: color, animationDuration: '2s' }}
          />
          <div 
            className="absolute inset-[-8px] rounded-3xl animate-ping opacity-10"
            style={{ backgroundColor: color, animationDuration: '2.5s', animationDelay: '0.5s' }}
          />
        </div>

        {/* Right Icons */}
        <div className="absolute right-4 md:right-8 top-0 h-full flex flex-col justify-around py-8">
          {rightIcons.map(({ Icon, delay, label, moduleId }, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-1"
              style={{ 
                transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.5)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.7s ease-out',
                transitionDelay: `${delay}s`
              }}
            >
              <div
                onClick={() => handleModuleClick(moduleId)}
                className={`${moduleType === 'post-sales' ? 'w-12 h-12 md:w-14 md:h-14' : 'w-14 h-14 md:w-16 md:h-16'} rounded-2xl shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-xl ${isVisible ? `float-${((idx + 1) % 3) + 1}` : ''} ${(showLabels || moduleType === 'post-sales') ? 'hover:ring-2 hover:ring-offset-2' : ''} ${selectedModule === moduleId ? 'ring-2 ring-offset-2' : 'bg-white'}`}
                style={{ 
                  '--tw-ring-color': color,
                  backgroundColor: selectedModule === moduleId ? color : 'white'
                } as React.CSSProperties}
              >
                <Icon size={moduleType === 'post-sales' ? 20 : 24} className={selectedModule === moduleId ? 'text-white' : 'text-gray-700'} />
              </div>
              {(showLabels || moduleType === 'post-sales') && label && (
                <span 
                  onClick={() => handleModuleClick(moduleId)}
                  className={`text-xs font-medium text-gray-600 text-center max-w-[100px] leading-tight cursor-pointer hover:underline ${moduleType === 'post-sales' ? 'md:text-xs' : 'md:text-sm'}`}
                >
                  {label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Features Bar - Between Workflow and Details */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-8 px-4">
        {features.map(({ Icon, label }, idx) => (
          <div 
            key={idx}
            className={`flex items-center gap-2 text-gray-600 transition-all duration-700`}
            style={{ 
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${0.6 + idx * 0.1}s`
            }}
          >
            <div className="relative">
              <div 
                className="absolute -left-8 top-1/2 w-6 border-t-2 border-dashed" 
                style={{ borderColor: color, opacity: 0.4 }} 
              />
              <Icon 
                size={18} 
                style={{ color }} 
                className={idx === 0 ? 'animate-spin' : ''}
              />
            </div>
            <span className="text-sm md:text-base font-medium">{label}</span>
            {idx < features.length - 1 && (
              <div 
                className="hidden md:block w-16 border-t-2 border-dashed ml-4" 
                style={{ borderColor: color, opacity: 0.4 }} 
              />
            )}
          </div>
        ))}
      </div>

      {/* Inline Module Details Section */}
      {(showLabels || moduleType === 'post-sales' || moduleType === 'pre-sales') && currentModule && (
        <div 
          ref={detailsRef}
          key={currentModule.id}
          className="mt-12 max-w-4xl mx-auto px-4 animate-fade-in scroll-mt-8"
        >
          <div>
            {/* Features List */}
            <div>
              <h3 
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 underline decoration-2 underline-offset-8 text-center"
                style={{ color }}
              >
                {currentModule.title}
              </h3>
              <p className="text-gray-600 mb-8 text-base md:text-lg text-center">{currentModule.description}</p>
              
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6 text-center">Key Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {/* Left column - first half of features */}
                <ul className="space-y-4">
                  {currentModule.features.slice(0, Math.ceil(currentModule.features.length / 2)).map((feature, idx) => (
                    <li 
                      key={idx}
                      className="flex items-start gap-3 animate-fade-in"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <div 
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: color }}
                      >
                        <Check size={12} className="text-white" />
                      </div>
                      <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                {/* Right column - second half of features */}
                <ul className="space-y-4">
                  {currentModule.features.slice(Math.ceil(currentModule.features.length / 2)).map((feature, idx) => (
                    <li 
                      key={idx + Math.ceil(currentModule.features.length / 2)}
                      className="flex items-start gap-3 animate-fade-in"
                      style={{ animationDelay: `${(idx + Math.ceil(currentModule.features.length / 2)) * 0.05}s` }}
                    >
                      <div 
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: color }}
                      >
                        <Check size={12} className="text-white" />
                      </div>
                      <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default WorkflowGraph;
