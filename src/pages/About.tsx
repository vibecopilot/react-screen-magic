import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Target, Eye, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import officeImage from "@/assets/office-interior.jpg";

const sections = [
  {
    id: "story",
    title: "Our Story",
    icon: <Sparkles className="w-5 h-5" />,
    content:
      "MyCiti.Life was founded by a visionary leader with deep expertise in the real estate ecosystem, spanning every stage of the journey—from pre-sales and post-sales to construction and final possession. This hands-on experience gives us a strong understanding of the real-world challenges faced by developers, property managers, and residents, enabling us to build solutions that truly address industry needs.",
  },
  {
    id: "expertise",
    title: "Our Expertise",
    icon: <Target className="w-5 h-5" />,
    intro:
      "For over a decade, our team has been at the forefront of Property Technology (PropTech), creating digital products that enhance how real estate is developed, managed, and experienced. Our core areas of expertise include:",
    bullets: [
      "Customer experience innovation – delivering seamless, digital-first interactions for buyers and residents",
      "Pre-sale & post-sale enablement – streamlining lead management, customer communication, documentation, and handover processes",
      "Construction monitoring – driving transparency, accountability, and efficiency across project timelines",
      "Smart community solutions – integrating facility management, payments, and lifestyle services into a unified platform",
    ],
  },
  {
    id: "vision",
    title: "Our Vision",
    icon: <Eye className="w-5 h-5" />,
    content:
      "We believe technology should simplify urban living while empowering developers and property managers to deliver premium, reliable, and transparent experiences. By combining deep real estate knowledge with tech-driven innovation, MyCiti.Life is redefining how communities are planned, managed, and experienced.",
  },
  {
    id: "values",
    title: "Our Values",
    icon: <Heart className="w-5 h-5" />,
    bullets: [
      "Experience-backed innovation – blending real-world real estate expertise with modern PropTech solutions",
      "Transparency & trust – ensuring clarity and accountability at every stage of the lifecycle",
      "Customer-first design – prioritizing ease of use, privacy, and satisfaction",
      "Future-focused growth – enabling smarter, more sustainable communities through technology",
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12 },
  }),
};

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section
        className="pt-28 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6"
        style={{ background: "hsl(214 80% 92%)" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif leading-tight mb-5"
                style={{ color: "hsl(220 30% 20%)" }}
              >
                About MyCiti.Life
              </h1>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "hsl(220 10% 35%)" }}
              >
                Redefining how communities are planned, managed, and experienced
                through technology-driven innovation.
              </p>
            </motion.div>

            <motion.div
              className="rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              <img
                src={officeImage}
                alt="MyCiti.Life office"
                className="w-full h-64 sm:h-80 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-16 sm:space-y-20">
          {sections.map((section, i) => (
            <motion.div
              key={section.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground">
                  {section.icon}
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-foreground">
                  {section.title}
                </h2>
              </div>

              {section.intro && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  {section.intro}
                </p>
              )}

              {section.content && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              )}

              {section.bullets && (
                <ul className="space-y-3 mt-2">
                  {section.bullets.map((item, j) => {
                    const dashIdx = item.indexOf(" – ");
                    const label = dashIdx > -1 ? item.substring(0, dashIdx) : item;
                    const desc = dashIdx > -1 ? item.substring(dashIdx + 3) : "";

                    return (
                      <li key={j} className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground/30 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          <span className="text-foreground font-semibold">{label}</span>
                          {desc && <> – {desc}</>}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-muted/50">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-foreground mb-4">
            Let's Connect
          </h2>
          <p className="text-muted-foreground mb-8 text-sm sm:text-base leading-relaxed">
            Ready to transform your real estate projects? Let's connect and
            explore how MyCiti.Life can elevate your business with cutting-edge
            PropTech solutions.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-foreground text-background text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Contact Us
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
