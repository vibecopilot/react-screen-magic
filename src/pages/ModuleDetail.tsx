import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkflowGraph from "@/components/WorkflowGraph";
import heroBg from "@/assets/hero-clouds-bg.jpg";


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
            <WorkflowGraph 
              color={module.color} 
              showLabels={slug === "pre-sales" || slug === "post-sales" || slug === "possession" || slug === "customer-portal"} 
              moduleType={slug === "pre-sales" ? "pre-sales" : slug === "post-sales" ? "post-sales" : slug === "possession" ? "possession" : slug === "customer-portal" ? "customer-portal" : "default"}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ModuleDetail;
