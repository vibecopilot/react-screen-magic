import { motion, type Easing } from "framer-motion";
import { Lightbulb, Eye, Heart, Rocket, Building2, Users, Cpu, ShieldCheck } from "lucide-react";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const expertiseItems = [
  {
    icon: Users,
    title: "Customer Experience Innovation",
    desc: "Delivering seamless, digital-first interactions for buyers and residents.",
  },
  {
    icon: Building2,
    title: "Pre-Sale & Post-Sale Enablement",
    desc: "Streamlining lead management, communication, documentation, and handover processes.",
  },
  {
    icon: Cpu,
    title: "Construction Monitoring",
    desc: "Driving transparency, accountability, and efficiency across project timelines.",
  },
  {
    icon: ShieldCheck,
    title: "Smart Community Solutions",
    desc: "Integrating facility management, payments, and lifestyle services into a unified platform.",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Experience-Backed Innovation",
    desc: "Blending real-world real estate expertise with modern PropTech solutions.",
  },
  {
    icon: Eye,
    title: "Transparency & Trust",
    desc: "Ensuring clarity and accountability at every stage of the lifecycle.",
  },
  {
    icon: Heart,
    title: "Customer-First Design",
    desc: "Prioritizing ease of use, privacy, and satisfaction.",
  },
  {
    icon: Rocket,
    title: "Future-Focused Growth",
    desc: "Enabling smarter, more sustainable communities through technology.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs font-medium tracking-widest text-muted-foreground uppercase"
          >
            About Us
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl text-foreground font-serif font-medium mt-2 mb-4"
          >
            Our Story
          </motion.h2>
          <motion.div variants={fadeInUp} className="w-16 h-0.5 bg-primary/40 mx-auto" />
        </motion.div>

        {/* Our Story */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="bg-muted/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 border border-border/60 mb-10 sm:mb-14"
        >
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
            MyCiti.Life was founded by a visionary leader with deep expertise in the real estate
            ecosystem, spanning every stage of the journey—from pre-sales and post-sales to
            construction and final possession. This hands-on experience gives us a strong
            understanding of the real-world challenges faced by developers, property managers, and
            residents, enabling us to build solutions that truly address industry needs.
          </p>
        </motion.div>

        {/* Our Expertise */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-10 sm:mb-14"
        >
          <motion.h3
            variants={fadeInLeft}
            className="text-2xl sm:text-3xl text-foreground font-serif font-medium mb-3"
          >
            Our Expertise
          </motion.h3>
          <motion.p
            variants={fadeInLeft}
            className="text-sm sm:text-base text-muted-foreground mb-8 max-w-3xl font-medium"
          >
            For over a decade, our team has been at the forefront of Property Technology (PropTech),
            creating digital products that enhance how real estate is developed, managed, and
            experienced.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {expertiseItems.map((item, i) => (
              <motion.div
                key={item.title}
                variants={i % 2 === 0 ? fadeInLeft : fadeInRight}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group bg-muted/20 backdrop-blur-sm border border-border/50 rounded-xl p-5 sm:p-6 transition-colors duration-300 hover:bg-muted/40 hover:border-primary/20"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Vision */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative bg-primary/5 border border-primary/10 rounded-2xl p-6 sm:p-8 md:p-10 mb-10 sm:mb-14 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <h3 className="text-2xl sm:text-3xl text-foreground font-serif font-medium mb-4">
              Our Vision
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
              We believe technology should simplify urban living while empowering developers and
              property managers to deliver premium, reliable, and transparent experiences. By
              combining deep real estate knowledge with tech-driven innovation, MyCiti.Life is
              redefining how communities are planned, managed, and experienced.
            </p>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h3
            variants={fadeInUp}
            className="text-2xl sm:text-3xl text-foreground font-serif font-medium mb-8 text-center"
          >
            Our Values
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {values.map((val) => (
              <motion.div
                key={val.title}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
                className="group flex items-start gap-4 bg-muted/20 backdrop-blur-sm border border-border/50 rounded-xl p-5 sm:p-6 transition-colors duration-300 hover:bg-muted/40 hover:border-primary/20"
              >
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <val.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
