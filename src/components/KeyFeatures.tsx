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

  // Split features into two columns
  const midPoint = Math.ceil(features.length / 2);
  const leftFeatures = features.slice(0, midPoint);
  const rightFeatures = features.slice(midPoint);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as Easing,
      },
    },
  };

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 underline underline-offset-8 decoration-2">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl">
            {subtitle}
          </p>
        </motion.div>

        {/* Key Features Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm font-semibold tracking-wider text-muted-foreground mb-8"
        >
          KEY FEATURES
        </motion.p>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5"
        >
          {/* Left Column */}
          <div className="space-y-5">
            {leftFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {rightFeatures.map((feature, index) => (
              <motion.div
                key={index + midPoint}
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KeyFeatures;
