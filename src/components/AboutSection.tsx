import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AboutCardCarousel from "./AboutCardCarousel";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-16 sm:py-20 md:py-28 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            About Us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-foreground font-medium font-serif mt-2">
            Who We Are
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-3 max-w-xl mx-auto">
            Swipe or drag the cards to discover our story, expertise, and vision.
          </p>
        </motion.div>

        {/* 3D Card Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <AboutCardCarousel />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
