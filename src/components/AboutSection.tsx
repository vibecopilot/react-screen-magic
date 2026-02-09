import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import officeImage from "@/assets/office-interior.jpg";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-28 px-4 sm:px-6"
      style={{ background: "hsl(214 80% 92%)" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="rounded-xl border border-white/80 bg-white/40 backdrop-blur-sm overflow-hidden shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: Text Content */}
            <motion.div
              className="p-8 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-center"
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif leading-tight mb-5"
                style={{ color: "hsl(220 30% 20%)" }}
              >
                About Us
              </h2>

              <p
                className="text-sm sm:text-base leading-relaxed mb-6"
                style={{ color: "hsl(220 10% 35%)" }}
              >
                MyCiti.Life was founded by a visionary leader with extensive,
                hands-on experience across the entire real estate lifecycle—from
                pre-sales and post-sales to construction and final possession.
                This deep industry exposure gives us a clear understanding of the
                real challenges faced by developers, property managers, and
                residents alike.
              </p>

              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80 group"
                style={{ color: "hsl(217 70% 55%)" }}
              >
                <span className="underline underline-offset-4 decoration-1">
                  Learn more about us
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              className="relative min-h-[260px] md:min-h-full"
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <img
                src={officeImage}
                alt="MyCiti.Life modern office workspace"
                className="w-full h-full object-cover rounded-b-xl md:rounded-b-none md:rounded-r-xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
