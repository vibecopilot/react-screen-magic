import { motion } from "framer-motion";
import { Lightbulb, Shield, Heart, TrendingUp } from "lucide-react";

const values = [
  {
    label: "Experience-backed\ninnovation",
    icon: Lightbulb,
    position: "top",
    description: "Blending real-world real estate expertise with modern PropTech solutions",
  },
  {
    label: "Transparency\n& trust",
    icon: Shield,
    position: "left",
    description: "Ensuring clarity and accountability at every stage of the lifecycle",
  },
  {
    label: "Customer-first\ndesign",
    icon: Heart,
    position: "right",
    description: "Prioritizing ease of use, privacy, and satisfaction",
  },
  {
    label: "Future-focused\ngrowth",
    icon: TrendingUp,
    position: "bottom",
    description: "Enabling smarter, more sustainable communities through technology",
  },
];

const positionClasses: Record<string, string> = {
  top: "left-1/2 -translate-x-1/2 top-0",
  bottom: "left-1/2 -translate-x-1/2 bottom-0",
  left: "left-0 top-1/2 -translate-y-1/2",
  right: "right-0 top-1/2 -translate-y-1/2",
};

const lineAngles: Record<string, { x1: string; y1: string; x2: string; y2: string }> = {
  top: { x1: "50%", y1: "38%", x2: "50%", y2: "18%" },
  bottom: { x1: "50%", y1: "62%", x2: "50%", y2: "82%" },
  left: { x1: "38%", y1: "50%", x2: "18%", y2: "50%" },
  right: { x1: "62%", y1: "50%", x2: "82%", y2: "50%" },
};

const ValuesDiamond = () => {
  return (
    <div className="w-full">
      {/* Desktop Diamond */}
      <div className="hidden md:block relative mx-auto" style={{ width: "520px", height: "520px" }}>
        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(174 84% 32%)" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {Object.entries(lineAngles).map(([pos, coords]) => (
            <motion.line
              key={pos}
              x1={coords.x1}
              y1={coords.y1}
              x2={coords.x2}
              y2={coords.y2}
              stroke="url(#line-gradient)"
              strokeWidth="0.4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          ))}
        </svg>

        {/* Center Circle */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
            w-[140px] h-[140px] rounded-full flex items-center justify-center
            text-white font-bold text-lg text-center shadow-xl cursor-default"
          style={{
            background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(174 84% 32%))",
            fontFamily: "var(--font-heading)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.08, boxShadow: "0 0 40px hsla(217, 91%, 60%, 0.4)" }}
        >
          Our<br />Values
        </motion.div>

        {/* Value Nodes */}
        {values.map((value, i) => {
          const Icon = value.icon;
          return (
            <motion.div
              key={value.position}
              className={`absolute ${positionClasses[value.position]} z-10 group cursor-default`}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.12, type: "spring", stiffness: 200 }}
            >
              <motion.div
                className="w-[130px] h-[130px] rounded-full bg-white border border-border
                  flex flex-col items-center justify-center gap-1.5 shadow-md
                  transition-all duration-300"
                whileHover={{
                  scale: 1.12,
                  boxShadow: "0 0 30px hsla(217, 91%, 60%, 0.25)",
                }}
              >
                <Icon className="w-6 h-6" style={{ color: "hsl(217 91% 60%)" }} />
                <span
                  className="text-[11px] font-semibold text-center leading-tight px-2"
                  style={{ color: "hsl(220 15% 25%)" }}
                >
                  {value.label.split("\n").map((line, li) => (
                    <span key={li}>
                      {line}
                      {li === 0 && <br />}
                    </span>
                  ))}
                </span>
              </motion.div>

              {/* Tooltip on hover */}
              <div
                className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200
                  pointer-events-none bg-white rounded-lg shadow-lg border border-border
                  px-4 py-3 text-xs max-w-[200px] z-20"
                style={{
                  color: "hsl(220 10% 40%)",
                  ...(value.position === "top" ? { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "8px" } :
                     value.position === "bottom" ? { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "8px" } :
                     value.position === "left" ? { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: "8px" } :
                     { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: "8px" })
                }}
              >
                {value.description}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Vertical Stack */}
      <div className="md:hidden space-y-4 max-w-sm mx-auto">
        {/* Center badge */}
        <motion.div
          className="mx-auto w-24 h-24 rounded-full flex items-center justify-center
            text-white font-bold text-sm text-center shadow-lg mb-6"
          style={{
            background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(174 84% 32%))",
            fontFamily: "var(--font-heading)",
          }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Our<br />Values
        </motion.div>

        {values.map((value, i) => {
          const Icon = value.icon;
          return (
            <motion.div
              key={value.position}
              className="flex items-start gap-4 bg-white rounded-xl border border-border p-5 shadow-sm"
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "hsl(217 91% 60% / 0.1)" }}
              >
                <Icon className="w-5 h-5" style={{ color: "hsl(217 91% 60%)" }} />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1" style={{ color: "hsl(220 15% 20%)" }}>
                  {value.label.replace("\n", " ")}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "hsl(220 10% 45%)" }}>
                  {value.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ValuesDiamond;
