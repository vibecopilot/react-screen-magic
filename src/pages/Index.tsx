import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StackedCards from "@/components/StackedCards";
import ClientLogos from "@/components/ClientLogos";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StackedCards />
      <ClientLogos />
    </div>
  );
};

export default Index;