import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ValuesHexagonNetwork from "@/components/ValuesHexagonNetwork";
import heroBg from "@/assets/hero-clouds-bg.jpg";

const About = () => {
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

      {/* ── Section 1: Our Story ── */}
      <section className="pt-32 sm:pt-40 pb-20 px-8 sm:px-12 lg:px-20">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="text-5xl lg:text-3xl xl:text-3xl font-Semibold mb-12 text-center mx-auto"
            style={{
              color: "hsl(215 25% 27%)",
              fontFamily: "var(--font-heading)",
              maxWidth: "100%"
            }}
          >
            ABOUT US
          </h1>


          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Text */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-semi bold mb-6 leading-tight">
                  Our Story
                </h2>
                <p className="text-xl lg:text-1xl leading-relaxed text-gray-700 text-justify hyphens-auto">
                  MyCiti.Life was founded by a visionary leader with deep expertise in the real estate ecosystem,
                  from pre-sales to possession. This hands-on experience gives us a strong understanding of real
                  challenges faced by developers, managers, and residents, enabling us to build PropTech solutions
                  that truly address industry needs.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-semi bold mb-6 leading-tight">
                  Our Vision
                </h2>
                <p className="text-xl lg:text-1xl leading-relaxed text-gray-700 text-justify hyphens-auto">
                  We believe technology should simplify urban living while empowering developers and property
                  managers to deliver premium, reliable, and transparent experiences. By combining deep real
                  estate expertise with innovative technology, MyCiti.Life is redefining how modern communities
                  are planned, managed, and experienced.
                </p>
              </div>
            </div>

            {/* Right Image Placeholder */}
            <motion.div
              className="relative h-96 lg:h-[600px] bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-3xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                backgroundImage: "url('/team-office-placeholder.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <div className="absolute inset-0 bg-black/10 rounded-3xl" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Section 2: Our Values (NO WHITE BACKGROUND) ── */}
      <section className="py-24 px-8 sm:px-12 lg:px-20">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-20">
            <h2
              className="text-4xl lg:text-4xl font-Semi bold mb-6 leading-tight"
              style={{ color: "hsl(215 25% 27%)", fontFamily: "var(--font-heading)" }}
            >
              Our Values
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we build.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Value 1 */}
            <motion.div
              className="group p-6 lg:p-8 rounded-2xl hover:bg-white/50 backdrop-blur-sm border border-white/30 hover:border-blue-200/50 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-xl lg:text-3xl font-Semibold mb-4 group-hover:text-black-600 transition-colors">
                Experience-backed innovation
              </h3>
              <p className="text-gray-600 leading-relaxed text-justify hyphens-auto">
                We combine real-world real estate knowledge with modern PropTech
                solutions to deliver meaningful results.
              </p>
            </motion.div>

            {/* Value 2 */}
            <motion.div
              className="group p-6 lg:p-8 rounded-2xl hover:bg-white/50 backdrop-blur-sm border border-white/30 hover:border-blue-200/50 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3 className="text-xl lg:text-3xl font-Semibold mb-4 group-hover:text-black-600 transition-colors">
                Transparency & trust
              </h3>
              <p className="text-gray-600 leading-relaxed text-justify hyphens-auto">
                We ensure clarity, accountability, and confidence at every stage
                of the property lifecycle.
              </p>
            </motion.div>

            {/* Value 3 */}
            <motion.div
              className="group p-6 lg:p-8 rounded-2xl hover:bg-white/50 backdrop-blur-sm border border-white/30 hover:border-blue-200/50 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3 className="text-xl lg:text-3xl font-Semibold mb-4 group-hover:text-black-600 transition-colors">
                Customer-first design
              </h3>
              <p className="text-gray-600 leading-relaxed text-justify hyphens-auto">
                We prioritize simplicity, privacy, and user satisfaction in
                everything we build.
              </p>
            </motion.div>

            {/* Value 4 */}
            <motion.div
              className="group p-6 lg:p-8 rounded-2xl hover:bg-white/50 backdrop-blur-sm border border-white/30 hover:border-blue-200/50 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h3 className="text-xl lg:text-3xl font-Semibold mb-4 group-hover:text-black-600 transition-colors">
                Future-focused growth
              </h3>
              <p className="text-gray-600 leading-relaxed text-justify hyphens-auto">
                We enable smarter, more sustainable communities through
                forward-thinking technology.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-24 px-8 sm:px-12 lg:px-20">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl lg:text-4xl font-Medium mb-6"
            style={{ color: "hsl(215 25% 27%)", fontFamily: "var(--font-heading)" }}
          >
            Ready to transform your communities?
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 mb-12 max-w-lg mx-auto leading-relaxed ">
            Discover how MyCiti.Life can elevate your real estate projects with cutting-edge PropTech solutions.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-12 py-5 rounded-xl text-white font-medium text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 bg-black hover:bg-gray-900 border border-gray-800 hover:border-gray-700"
          >
            Book Demo
            <ArrowRight className="w-5 h-5" />
          </Link>

        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
