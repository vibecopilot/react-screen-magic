import { useEffect, useState } from "react";
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
  Check
} from "lucide-react";
import screenPresales from "@/assets/screen-presales.png";

interface ModuleInfo {
  id: string;
  title: string;
  description: string;
  features: string[];
  screenImage: string;
}

const moduleData: Record<string, ModuleInfo> = {
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
    screenImage: screenPresales
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
    screenImage: screenPresales
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
    screenImage: screenPresales
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
    screenImage: screenPresales
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
    screenImage: screenPresales
  }
};

interface WorkflowGraphProps {
  color: string;
  showLabels?: boolean;
}

const WorkflowGraph = ({ color, showLabels = false }: WorkflowGraphProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(showLabels ? "lead-management" : null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Pre-sales specific icons with labels and module IDs
  const preSalesLeftIcons = [
    { Icon: UserCheck, delay: 0, label: "Lead Management", moduleId: "lead-management" },
    { Icon: Handshake, delay: 0.2, label: "CP Management", moduleId: "cp-management" },
    { Icon: Calculator, delay: 0.4, label: "Cost Sheet Management", moduleId: "cost-sheet-management" },
  ];

  const preSalesRightIcons = [
    { Icon: ClipboardCheck, delay: 0.1, label: "Booking Approval", moduleId: "booking-approval" },
    { Icon: UserCog, delay: 0.3, label: "Sales Executive Management", moduleId: "sales-executive-management" },
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

  const leftIcons = showLabels ? preSalesLeftIcons : defaultLeftIcons;
  const rightIcons = showLabels ? preSalesRightIcons : defaultRightIcons;

  const features = [
    { Icon: RefreshCw, label: "Seamless Automation" },
    { Icon: CheckCircle, label: "Real-Time Data Sync" },
    { Icon: Settings, label: "Customizable Solutions" },
  ];

  const handleModuleClick = (moduleId: string | undefined) => {
    if (showLabels && moduleId) {
      setSelectedModule(moduleId);
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
      <div className="relative h-[400px] max-w-4xl mx-auto">
        {/* SVG Lines */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Left side lines - flowing towards center */}
          <path
            d="M 120 80 Q 250 80 350 200"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8 4"
            className={`flow-line-right ${isVisible ? 'opacity-60' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.5s ease-out' }}
          />
          <path
            d="M 120 200 Q 250 200 350 200"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8 4"
            className={`flow-line-right ${isVisible ? 'opacity-60' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.5s ease-out', transitionDelay: '0.2s' }}
          />
          <path
            d="M 120 320 Q 250 320 350 200"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8 4"
            className={`flow-line-right ${isVisible ? 'opacity-60' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.5s ease-out', transitionDelay: '0.4s' }}
          />
          
          {/* Right side lines - flowing away from center */}
          <path
            d="M 450 200 Q 550 80 680 80"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8 4"
            className={`flow-line-right ${isVisible ? 'opacity-60' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.5s ease-out', transitionDelay: '0.1s' }}
          />
          <path
            d="M 450 200 Q 550 200 680 200"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8 4"
            className={`flow-line-right ${isVisible ? 'opacity-60' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.5s ease-out', transitionDelay: '0.3s' }}
          />
          <path
            d="M 450 200 Q 550 320 680 320"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8 4"
            className={`flow-line-right ${isVisible ? 'opacity-60' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.5s ease-out', transitionDelay: '0.5s' }}
          />
        </svg>

        {/* Left Icons */}
        <div className="absolute left-4 md:left-8 top-0 h-full flex flex-col justify-around py-8">
          {leftIcons.map(({ Icon, delay, label, moduleId }, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-2"
              style={{ 
                transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(-50px) scale(0.5)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.7s ease-out',
                transitionDelay: `${delay}s`
              }}
            >
              <div
                onClick={() => handleModuleClick(moduleId)}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-xl ${isVisible ? `float-${idx + 1}` : ''} ${showLabels ? 'hover:ring-2 hover:ring-offset-2' : ''} ${selectedModule === moduleId ? 'ring-2 ring-offset-2' : 'bg-white'}`}
                style={{ 
                  '--tw-ring-color': color,
                  backgroundColor: selectedModule === moduleId ? color : 'white'
                } as React.CSSProperties}
              >
                <Icon size={24} className={selectedModule === moduleId ? 'text-white' : 'text-gray-700'} />
              </div>
              {showLabels && label && (
                <span 
                  onClick={() => handleModuleClick(moduleId)}
                  className="text-xs md:text-sm font-medium text-gray-600 text-center max-w-[100px] leading-tight cursor-pointer hover:underline"
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
              className="flex flex-col items-center gap-2"
              style={{ 
                transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.5)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.7s ease-out',
                transitionDelay: `${delay}s`
              }}
            >
              <div
                onClick={() => handleModuleClick(moduleId)}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-xl ${isVisible ? `float-${((idx + 1) % 3) + 1}` : ''} ${showLabels ? 'hover:ring-2 hover:ring-offset-2' : ''} ${selectedModule === moduleId ? 'ring-2 ring-offset-2' : 'bg-white'}`}
                style={{ 
                  '--tw-ring-color': color,
                  backgroundColor: selectedModule === moduleId ? color : 'white'
                } as React.CSSProperties}
              >
                <Icon size={24} className={selectedModule === moduleId ? 'text-white' : 'text-gray-700'} />
              </div>
              {showLabels && label && (
                <span 
                  onClick={() => handleModuleClick(moduleId)}
                  className="text-xs md:text-sm font-medium text-gray-600 text-center max-w-[120px] leading-tight cursor-pointer hover:underline"
                >
                  {label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Inline Module Details Section */}
      {showLabels && currentModule && (
        <div 
          key={currentModule.id}
          className="mt-12 max-w-5xl mx-auto px-4 animate-fade-in"
        >
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Laptop Frame with Screen */}
              <div className="p-8 md:p-12 flex items-center justify-center" style={{ backgroundColor: `${color}08` }}>
                <div className="relative mx-auto" style={{ maxWidth: "380px" }}>
                  {/* Laptop Screen */}
                  <div className="relative bg-gray-900 rounded-t-xl p-2 shadow-2xl">
                    {/* Screen bezel - camera */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full" />
                    {/* Screen content */}
                    <div className="mt-2 rounded-lg overflow-hidden bg-white aspect-[16/10]">
                      <img 
                        src={currentModule.screenImage} 
                        alt={`${currentModule.title} Screen`}
                        className="w-full h-full object-cover object-top transition-all duration-500"
                      />
                    </div>
                  </div>
                  {/* Laptop Base */}
                  <div className="relative">
                    <div 
                      className="h-4 rounded-b-xl mx-auto"
                      style={{ 
                        background: "linear-gradient(to bottom, #374151, #1f2937)",
                        width: "100%"
                      }}
                    />
                    <div 
                      className="h-2 rounded-b-lg mx-auto -mt-0.5"
                      style={{ 
                        background: "linear-gradient(to bottom, #4b5563, #374151)",
                        width: "60%"
                      }}
                    />
                    {/* Laptop stand/hinge */}
                    <div 
                      className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-16 h-1 bg-gray-500 rounded-full"
                    />
                  </div>
                  {/* Reflection/Glow effect */}
                  <div 
                    className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl -z-10"
                    style={{ backgroundColor: color }}
                  />
                </div>
              </div>

              {/* Features List */}
              <div className="p-8 md:p-12">
                <h3 
                  className="text-2xl md:text-3xl font-bold mb-3"
                  style={{ color }}
                >
                  {currentModule.title}
                </h3>
                <p className="text-gray-600 mb-6">{currentModule.description}</p>
                
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Key Features</h4>
                <ul className="space-y-3">
                  {currentModule.features.map((feature, idx) => (
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
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Features */}
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
    </div>
  );
};

export default WorkflowGraph;
