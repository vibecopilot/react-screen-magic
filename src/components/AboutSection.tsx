import { useRef, useEffect, useState } from "react";
const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  return <section id="about" ref={sectionRef} className="py-20 px-4">
      <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="text-3xl md:text-4xl text-foreground mb-6 font-medium">
          About Us
        </h2>
        <div className="bg-muted/50 rounded-2xl p-12 border border-border">
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Coming Soon
          </p>
          <p className="text-muted-foreground mt-4">
            We're working on something exciting. Stay tuned!
          </p>
        </div>
      </div>
    </section>;
};
export default AboutSection;