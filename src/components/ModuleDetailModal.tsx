import { X, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

interface ModuleDetailModalProps {
  moduleId: string | null;
  isOpen: boolean;
  onClose: () => void;
  color: string;
}

const ModuleDetailModal = ({ moduleId, isOpen, onClose, color }: ModuleDetailModalProps) => {
  const module = moduleId ? moduleData[moduleId] : null;

  if (!module) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl md:text-3xl font-bold" style={{ color }}>
              {module.title}
            </DialogTitle>
          </div>
          <p className="text-gray-600 mt-2">{module.description}</p>
        </DialogHeader>

        <div className="p-6 grid md:grid-cols-2 gap-8">
          {/* Laptop Frame with Screen */}
          <div className="relative">
            <div className="relative mx-auto" style={{ maxWidth: "400px" }}>
              {/* Laptop Screen */}
              <div className="relative bg-gray-900 rounded-t-xl p-2 shadow-2xl">
                {/* Screen bezel */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full" />
                {/* Screen content */}
                <div className="mt-2 rounded-lg overflow-hidden bg-white aspect-[16/10]">
                  <img 
                    src={module.screenImage} 
                    alt={`${module.title} Screen`}
                    className="w-full h-full object-cover object-top"
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
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features</h3>
            <ul className="space-y-3">
              {module.features.map((feature, idx) => (
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

        {/* Footer */}
        <div 
          className="p-6 border-t border-gray-100 flex justify-end"
          style={{ backgroundColor: `${color}08` }}
        >
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-white font-medium transition-all hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: color }}
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModuleDetailModal;
