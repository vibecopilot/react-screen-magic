import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkflowGraph from "@/components/WorkflowGraph";
import KeyFeatures from "@/components/KeyFeatures";
import heroBg from "@/assets/hero-clouds-bg.jpg";


const moduleData: Record<string, { 
  name: string; 
  description: string; 
  icon: string; 
  color: string;
  featureTitle: string;
  featureSubtitle: string;
  features: string[];
}> = {
  "pre-sales": {
    name: "Pre Sales",
    description: "Streamline your lead management and inquiry handling with powerful CRM tools. Track prospects, manage follow-ups, and convert leads faster than ever.",
    icon: "📊",
    color: "#4A9FE8",
    featureTitle: "Lead Management",
    featureSubtitle: "Streamline your lead capture and nurturing process with our comprehensive lead management system.",
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
  "post-sales": {
    name: "Post Sales",
    description: "Manage customer relationships after the deal closes. Handle documentation, payment tracking, and customer support seamlessly.",
    icon: "🤝",
    color: "#10B981",
    featureTitle: "Customer Management",
    featureSubtitle: "Manage all post-sales activities efficiently with our comprehensive customer management tools.",
    features: [
      "Complete customer documentation management",
      "Payment schedule tracking and reminders",
      "Agreement generation and e-signing",
      "Customer communication history",
      "Support ticket management",
      "Payment milestone tracking",
      "Document verification workflow",
      "Customer satisfaction surveys",
    ],
  },
  "possession": {
    name: "Possession",
    description: "Seamless handover and possession tracking. Manage property handovers, documentation, and customer satisfaction efficiently.",
    icon: "🔑",
    color: "#6366F1",
    featureTitle: "Possession Management",
    featureSubtitle: "Ensure smooth property handovers with our comprehensive possession management system.",
    features: [
      "Property inspection scheduling",
      "Snag list management and resolution",
      "Handover documentation preparation",
      "Key and access card tracking",
      "Final payment reconciliation",
      "Possession ceremony coordination",
      "Welcome kit management",
      "Post-possession support setup",
    ],
  },
  "konstruct": {
    name: "Konstruct",
    description: "Track construction progress and project milestones in real-time. Monitor budgets, timelines, and resource allocation efficiently.",
    icon: "🏗️",
    color: "#F59E0B",
    featureTitle: "Construction Tracking",
    featureSubtitle: "Monitor and manage construction progress with real-time tracking and reporting tools.",
    features: [
      "Real-time construction progress tracking",
      "Milestone-based project management",
      "Budget monitoring and cost control",
      "Resource allocation and scheduling",
      "Quality inspection checklists",
      "Contractor and vendor management",
      "Photo and video progress documentation",
      "Delay analysis and recovery planning",
    ],
  },
  "customer-portal": {
    name: "Customer Portal",
    description: "Empower your customers with a self-service portal. Access documents, track payments, raise requests, and stay updated on their property journey.",
    icon: "🌐",
    color: "#8B5CF6",
    featureTitle: "Self-Service Portal",
    featureSubtitle: "Give customers complete visibility and control over their property journey.",
    features: [
      "24/7 access to property documents",
      "Real-time payment tracking",
      "Construction progress updates",
      "Online service request submission",
      "Direct communication with support team",
      "Payment history and receipts download",
      "Property gallery and virtual tours",
      "Important announcements and updates",
    ],
  },
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
        </div>

        {/* Key Features Section */}
        <KeyFeatures 
          title={module.featureTitle}
          subtitle={module.featureSubtitle}
          features={module.features}
        />
      </main>

      <Footer />
    </div>
  );
};

export default ModuleDetail;
