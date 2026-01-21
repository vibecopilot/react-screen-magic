import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkflowGraph from "@/components/WorkflowGraph";
import heroBg from "@/assets/hero-clouds-bg.jpg";
import { CheckCircle } from "lucide-react";

const moduleData: Record<string, { name: string; description: string; icon: string; color: string }> = {
  "pre-sales": {
    name: "Pre Sales",
    description: "Streamline your lead management and inquiry handling with powerful CRM tools. Track prospects, manage follow-ups, and convert leads faster than ever.",
    icon: "📊",
    color: "#4A9FE8",
  },
  "post-sales": {
    name: "Post Sales",
    description: "Manage customer relationships after the deal closes. Handle documentation, payment tracking, and customer support seamlessly.",
    icon: "🤝",
    color: "#10B981",
  },
  "possession": {
    name: "Possession",
    description: "Seamless handover and possession tracking. Manage property handovers, documentation, and customer satisfaction efficiently.",
    icon: "🔑",
    color: "#6366F1",
  },
  "konstruct": {
    name: "Konstruct",
    description: "Track construction progress and project milestones in real-time. Monitor budgets, timelines, and resource allocation efficiently.",
    icon: "🏗️",
    color: "#F59E0B",
  },
  "customer-portal": {
    name: "Customer Portal",
    description: "Empower your customers with a self-service portal. Access documents, track payments, raise requests, and stay updated on their property journey.",
    icon: "🌐",
    color: "#8B5CF6",
  },
};

const preSalesModules = [
  {
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
      "Duplicate lead detection and merging",
    ],
  },
  {
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
      "Incentive programs and bonus tracking",
    ],
  },
  {
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
      "Version history and audit trail",
    ],
  },
  {
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
      "Mobile approval for on-the-go decisions",
    ],
  },
  {
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
      "Attendance and location tracking",
    ],
  },
  {
    title: "Site Visit Management",
    description: "Coordinate and track customer site visits with seamless scheduling and follow-up management.",
    features: [
      "Online site visit booking and scheduling",
      "Automated reminders and confirmations",
      "Transport arrangement and tracking",
      "Site visit feedback collection",
      "Follow-up task automation",
      "Visit analytics and conversion tracking",
      "Sales executive assignment",
      "Customer preferences documentation",
    ],
  },
  {
    title: "Inventory Management",
    description: "Real-time inventory tracking with complete visibility into unit availability and pricing.",
    features: [
      "Real-time unit availability dashboard",
      "Tower and floor-wise inventory view",
      "Unit blocking and release management",
      "Price versioning and history",
      "Inventory hold and reservation system",
      "Multi-project inventory consolidation",
      "Visual floor plan integration",
      "Inventory reports and analytics",
    ],
  },
  {
    title: "Quotation & Proposal",
    description: "Generate professional quotations and proposals with dynamic pricing and beautiful templates.",
    features: [
      "Branded quotation templates",
      "Dynamic pricing integration",
      "Multiple unit comparison quotes",
      "Payment schedule generation",
      "Digital delivery and tracking",
      "Quote validity management",
      "Customer approval workflow",
      "Quote to booking conversion",
    ],
  },
];

// Hook for scroll animation
const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

interface FeatureCardProps {
  module: typeof preSalesModules[0];
  index: number;
  side: "left" | "right";
}

const FeatureCard = ({ module, index, side }: FeatureCardProps) => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-x-0"
          : side === "left"
          ? "opacity-0 -translate-x-12"
          : "opacity-0 translate-x-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mb-12">
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-3 underline underline-offset-4">
          {module.title}
        </h3>
        <p className="text-foreground/80 mb-6">{module.description}</p>
        
        <p className="text-sm font-semibold tracking-wider text-foreground/60 mb-4">KEY FEATURES</p>
        
        <ul className="space-y-3">
          {module.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground/90">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ModuleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const module = slug ? moduleData[slug] : null;

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!module) {
    return (
      <div 
        className="min-h-screen"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h1 className="text-4xl font-serif text-foreground mb-4">Module Not Found</h1>
            <button onClick={() => navigate("/")} className="text-primary hover:underline">Go back home</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const leftModules = preSalesModules.filter((_, i) => i % 2 === 0);
  const rightModules = preSalesModules.filter((_, i) => i % 2 === 1);

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />
      
      <main className="pt-24 pb-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Module Title */}
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-center mb-8 mt-8 text-foreground">
            {module.name}
          </h1>

          {/* Workflow Graph Section */}
          <div className="mt-12">
            <WorkflowGraph color={module.color} showLabels={slug === "pre-sales"} />
          </div>

          {/* Feature Sections - Two Column Layout */}
          {slug === "pre-sales" && (
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              {/* Left Column */}
              <div>
                {leftModules.map((mod, index) => (
                  <FeatureCard key={mod.title} module={mod} index={index} side="left" />
                ))}
              </div>
              
              {/* Right Column */}
              <div>
                {rightModules.map((mod, index) => (
                  <FeatureCard key={mod.title} module={mod} index={index} side="right" />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ModuleDetail;
