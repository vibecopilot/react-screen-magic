import { useRef } from "react";
import { motion, useInView, Easing } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface KeyFeaturesProps {
  title: string;
  subtitle: string;
  features: string[];
}

const KeyFeatures = ({ title, subtitle, features }: KeyFeaturesProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as Easing,
      },
    },
  };

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-4 underline underline-offset-8 decoration-2">
            {title}
          </h2>
          <p className="text-foreground/70 text-base md:text-lg max-w-3xl">
            {subtitle}
          </p>
        </motion.div>

        {/* Key Features Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xs font-semibold tracking-widest text-foreground/50 mb-6"
        >
          KEY FEATURES
        </motion.p>

        {/* Single Column Features List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-start gap-3"
            >
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-foreground/80 text-sm md:text-base">{feature}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default KeyFeatures;
