import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StackedCards from "@/components/StackedCards";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StackedCards />
    </div>
  );
};

export default Index;