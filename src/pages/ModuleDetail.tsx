import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-clouds-bg.jpg";
import { ArrowLeft } from "lucide-react";

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
  "konstruct": {
    name: "Konstruct",
    description: "Track construction progress and project milestones in real-time. Monitor budgets, timelines, and resource allocation efficiently.",
    icon: "🏗️",
    color: "#F59E0B",
  },
  "vibecopilot": {
    name: "VibeCopilot",
    description: "AI-powered assistant for your daily operations. Get intelligent insights, automate repetitive tasks, and boost productivity.",
    icon: "🤖",
    color: "#8B5CF6",
  },
  "hrms": {
    name: "HRMS",
    description: "Complete human resource management solution. Manage employees, payroll, attendance, and performance all in one place.",
    icon: "👥",
    color: "#EF4444",
  },
  "possession": {
    name: "Possession",
    description: "Seamless handover and possession tracking. Manage property handovers, documentation, and customer satisfaction efficiently.",
    icon: "🔑",
    color: "#6366F1",
  },
};

const ModuleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const module = slug ? moduleData[slug] : null;

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
            <Link to="/" className="text-primary hover:underline">Go back home</Link>
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
          {/* Back Button */}
          <Link 
            to="/#features" 
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Features
          </Link>

          {/* Hero Card */}
          <div 
            className="bg-[rgba(248,250,252,0.95)] backdrop-blur-[20px] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white p-8 md:p-12 relative overflow-hidden"
          >
            {/* Decorative gradient circles */}
            <div 
              className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-30 blur-3xl"
              style={{ backgroundColor: module.color }}
            />
            <div 
              className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full opacity-20 blur-2xl"
              style={{ backgroundColor: module.color }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">{module.icon}</span>
                <h1 className="text-4xl md:text-5xl font-serif text-gray-800">{module.name}</h1>
              </div>
              
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl mb-8">
                {module.description}
              </p>

              <div 
                className="inline-block px-6 py-3 rounded-full text-white font-medium"
                style={{ backgroundColor: module.color }}
              >
                Coming Soon
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {["Feature 1", "Feature 2", "Feature 3"].map((feature, idx) => (
              <div 
                key={idx}
                className="bg-[rgba(248,250,252,0.95)] backdrop-blur-[20px] rounded-xl shadow-lg border border-white p-6"
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mb-4"
                  style={{ backgroundColor: module.color }}
                >
                  {idx + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature}</h3>
                <p className="text-gray-600">
                  Detailed description of this amazing feature that helps streamline your workflow.
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ModuleDetail;
