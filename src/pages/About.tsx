import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ValuesHexagonNetwork from "@/components/ValuesHexagonNetwork";

const About = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      {/* ── Section 1: Our Story ── */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1
            className="text-4xl sm:text-5xl font-bold mb-8 leading-tight"
            style={{ color: "hsl(215 25% 27%)", fontFamily: "var(--font-heading)" }}
          >
            Our Story
          </h1>

          <p
            className="text-xl sm:text-2xl leading-relaxed mb-12"
            style={{ color: "hsl(220 10% 35%)" }}
          >
            MyCiti.Life was founded by a real estate veteran who lived every
            challenge—from pre-sales chaos to construction delays to possession
            handover.
          </p>

          <p
            className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto"
            style={{ color: "hsl(220 10% 45%)" }}
          >
            This hands-on experience across the full property lifecycle gives us
            unmatched insight into what developers, managers, and residents truly
            need. We build practical PropTech that solves real problems.
          </p>
        </motion.div>
      </section>

      {/* ── Section 2: Our Vision ── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="text-4xl sm:text-5xl font-bold mb-8 leading-tight"
            style={{ color: "hsl(215 25% 27%)", fontFamily: "var(--font-heading)" }}
          >
            Our Vision
          </h2>

          {/* Blue accent divider */}
          <motion.div
            className="w-24 h-1 rounded-full mx-auto mb-12"
            style={{ background: "hsl(217 91% 60%)" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          <p
            className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "hsl(220 10% 40%)" }}
          >
            Simplify cities. Power communities. We blend deep real estate
            expertise with innovative technology to deliver transparent, premium
            urban living experiences for modern India.
          </p>
        </motion.div>
      </section>

      {/* ── Section 3: Our Values — Hexagon Network ── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-4xl sm:text-5xl font-bold mb-6 text-center leading-tight"
            style={{ color: "hsl(215 25% 27%)", fontFamily: "var(--font-heading)" }}
          >
            Our Values
          </h2>
          <p
            className="text-base sm:text-lg text-center mb-14 max-w-xl mx-auto"
            style={{ color: "hsl(220 10% 45%)" }}
          >
            The principles that guide everything we build.
          </p>

          <ValuesHexagonNetwork />
        </motion.div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "hsl(215 25% 27%)", fontFamily: "var(--font-heading)" }}
          >
            Ready to transform your communities?
          </h2>
          <p className="text-muted-foreground mb-8 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            Discover how MyCiti.Life can elevate your real estate projects with
            cutting-edge PropTech solutions.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-12 py-4 rounded-xl text-white font-semibold text-base
              shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 bg-primary"
          >
            Book Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
