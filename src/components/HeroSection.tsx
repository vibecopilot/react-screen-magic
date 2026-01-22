import { Button } from "@/components/ui/button";
import { useScrollAnimation, useParallax } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
const HeroSection = () => {
  const {
    ref: titleRef,
    isVisible: titleVisible
  } = useScrollAnimation({
    threshold: 0.2
  });
  const {
    ref: descRef,
    isVisible: descVisible
  } = useScrollAnimation({
    threshold: 0.2
  });
  const {
    ref: btnRef,
    isVisible: btnVisible
  } = useScrollAnimation({
    threshold: 0.2
  });
  const {
    ref: parallaxRef,
    offset
  } = useParallax(0.3);
  return <section ref={parallaxRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24">
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div ref={titleRef} style={{
        transform: `translateY(${-offset}px)`
      }} className={cn("transition-all duration-1000 ease-out", titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight text-foreground mb-6 text-center">
            Manage your entire real estate journey on a single platform from Pre-sales to possession.
          </h1>
        </div>

        <div ref={descRef} style={{
        transform: `translateY(${-offset * 0.5}px)`
      }} className={cn("transition-all duration-1000 delay-200 ease-out", descVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Digitize sales pipelines, control finances, automate handovers, and deliver a seamless, connected resident experience — all from one unified dashboard.
          </p>
        </div>

        <div ref={btnRef} className={cn("flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-400 ease-out", btnVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95")}>
          <Button variant="heroOutline" size="lg">
            Book a Demo
          </Button>
        </div>
      </div>
    </section>;
};
export default HeroSection;