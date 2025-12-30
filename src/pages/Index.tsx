import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StackedCards from "@/components/StackedCards";
import AnimatedCardsGrid from "@/components/AnimatedCardsGrid";
import ClientLogos from "@/components/ClientLogos";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-clouds-bg.jpg";

const Index = () => {
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
      <HeroSection />
      <StackedCards />
      <AnimatedCardsGrid />
      <ClientLogos />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Index;