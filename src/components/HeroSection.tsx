import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-clouds-bg.jpg";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background/60" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto animate-fade-in">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight text-foreground mb-6">
          Turn every service
          <br />
          request into a smooth
          <br />
          experience
        </h1>

        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          MyCiti is your command centre for service operations – capture enquiries,
          assign work, track progress, and get paid, all from one clean, connected
          workspace.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero" size="lg">
            Try Dreelio free
          </Button>
          <Button variant="heroOutline" size="lg">
            See features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;