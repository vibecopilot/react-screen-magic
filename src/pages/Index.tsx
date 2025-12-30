import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StackedCards from "@/components/StackedCards";
import ClientLogos from "@/components/ClientLogos";
import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
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
      <ClientLogos />
      <BlogSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;