import { motion } from "framer-motion";
import { Lightbulb, Shield, Heart, Rocket } from "lucide-react";
import { useState } from "react";

const values = [
  {
    label: "Experience-backed\ninnovation",
    icon: Lightbulb,
    description:
      "We combine real-world real estate knowledge with modern PropTech solutions to deliver meaningful results.",
    angle: 0, // top
  },
  {
    label: "Transparency\n& trust",
    icon: Shield,
    description:
      "We ensure clarity, accountability, and confidence at every stage of the property lifecycle.",
    angle: 90, // right
  },
  {
    label: "Customer-first\ndesign",
    icon: Heart,
    description:
      "We prioritize simplicity, privacy, and user satisfaction in everything we build.",
    angle: 180, // bottom
  },
  {
    label: "Future-focused\ngrowth",
    icon: Rocket,
    description:
      "We enable smarter, more sustainable communities through forward-thinking technology.",
    angle: 270, // left
  },
];

// Hexagon path generator (flat-top)
const hexPath = (cx: number, cy: number, r: number) => {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  });
  return `M${pts.join("L")}Z`;
};

// Get position on the circle for each value
const getNodePos = (angle: number, radius: number, cx: number, cy: number) => {
  const rad = (Math.PI / 180) * (angle - 90); // -90 so 0° = top
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
};

const ValuesHexagonNetwork = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const svgSize = 600;
  const center = svgSize / 2;
  const orbitRadius = 200;
  const centerHexR = 80;
  const nodeHexR = 55;

  return (
    <div className="w-full">
      {/* ── Desktop: Radial Hexagon Network ── */}
      <div className="hidden md:flex items-center justify-center">
        <motion.svg
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="w-full max-w-[600px] h-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <defs>
            <linearGradient id="hex-center-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(217 91% 60%)" />
              <stop offset="100%" stopColor="hsl(221 83% 53%)" />
            </linearGradient>
            <linearGradient id="hex-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(174 84% 32%)" stopOpacity="0.5" />
            </linearGradient>
            <filter id="hex-glow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="node-shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* Curved connecting lines */}
          {values.map((val, i) => {
            const pos = getNodePos(val.angle, orbitRadius, center, center);
            // Curve control point offset toward center
            const midX = (center + pos.x) / 2;
            const midY = (center + pos.y) / 2;
            const perpAngle = (Math.PI / 180) * (val.angle - 90) + Math.PI / 2;
            const curveOffset = 25;
            const cpX = midX + curveOffset * Math.cos(perpAngle);
            const cpY = midY + curveOffset * Math.sin(perpAngle);

            return (
              <motion.path
                key={`line-${i}`}
                d={`M${center},${center} Q${cpX},${cpY} ${pos.x},${pos.y}`}
                fill="none"
                stroke="url(#hex-line-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.12 }}
                style={{
                  strokeDasharray: hoveredIdx === i ? "8 4" : "none",
                }}
              />
            );
          })}

          {/* Center hexagon */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring", stiffness: 180 }}
            style={{ transformOrigin: `${center}px ${center}px` }}
          >
            <motion.path
              d={hexPath(center, center, centerHexR)}
              fill="url(#hex-center-grad)"
              filter="url(#hex-glow)"
              whileHover={{ scale: 1.06 }}
              style={{ transformOrigin: `${center}px ${center}px`, cursor: "default" }}
            />
            <text
              x={center}
              y={center - 8}
              textAnchor="middle"
              fill="white"
              fontSize="18"
              fontWeight="600"
              fontFamily="var(--font-primary)"
            >
              Our
            </text>
            <text
              x={center}
              y={center + 16}
              textAnchor="middle"
              fill="white"
              fontSize="18"
              fontWeight="600"
              fontFamily="var(--font-primary)"
            >
              Values
            </text>
          </motion.g>

          {/* Surrounding hexagon nodes */}
          {values.map((val, i) => {
            const pos = getNodePos(val.angle, orbitRadius, center, center);
            const Icon = val.icon;
            const isHovered = hoveredIdx === i;

            return (
              <motion.g
                key={`node-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + i * 0.15,
                  type: "spring",
                  stiffness: 180,
                }}
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-default"
              >
                <motion.path
                  d={hexPath(pos.x, pos.y, nodeHexR)}
                  fill="white"
                  stroke="hsl(217 91% 60%)"
                  strokeWidth="2.5"
                  filter="url(#node-shadow)"
                  animate={
                    isHovered
                      ? {
                          scale: 1.12,
                          filter: "drop-shadow(0 0 16px hsla(217, 91%, 60%, 0.35))",
                        }
                      : { scale: 1 }
                  }
                  style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                  transition={{ duration: 0.25 }}
                />

                {/* Icon placeholder circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y - 12}
                  r="14"
                  fill="hsl(217 91% 60% / 0.08)"
                />
                {/* We render the icon via foreignObject */}
                <foreignObject
                  x={pos.x - 10}
                  y={pos.y - 24}
                  width="20"
                  height="20"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <Icon
                      style={{ color: "hsl(217 91% 60%)", width: 16, height: 16 }}
                    />
                  </div>
                </foreignObject>

                {/* Label text */}
                {val.label.split("\n").map((line, li) => (
                  <text
                    key={li}
                    x={pos.x}
                    y={pos.y + 10 + li * 13}
                    textAnchor="middle"
                    fill="hsl(220 15% 25%)"
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="var(--font-primary)"
                  >
                    {line}
                  </text>
                ))}

                {/* Tooltip on hover */}
                {isHovered && (
                  <motion.g
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <rect
                      x={pos.x - 100}
                      y={pos.y + nodeHexR + 12}
                      width="200"
                      height="52"
                      rx="8"
                      fill="white"
                      stroke="hsl(220 15% 85%)"
                      strokeWidth="1"
                      filter="url(#node-shadow)"
                    />
                    <foreignObject
                      x={pos.x - 92}
                      y={pos.y + nodeHexR + 16}
                      width="184"
                      height="44"
                    >
                      <p
                        style={{
                          fontSize: "10px",
                          lineHeight: "1.4",
                          color: "hsl(220 10% 40%)",
                          fontFamily: "var(--font-primary)",
                          margin: 0,
                        }}
                      >
                        {val.description}
                      </p>
                    </foreignObject>
                  </motion.g>
                )}
              </motion.g>
            );
          })}
        </motion.svg>
      </div>

      {/* ── Mobile: Vertical Stack ── */}
      <div className="md:hidden space-y-4 max-w-sm mx-auto">
        {/* Center badge */}
        <motion.div
          className="mx-auto w-24 h-24 flex items-center justify-center text-white font-bold text-sm text-center shadow-lg mb-6"
          style={{
            background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(221 83% 53%))",
            clipPath:
              "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
            fontFamily: "var(--font-primary)",
          }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Our
          <br />
          Values
        </motion.div>

        {values.map((val, i) => {
          const Icon = val.icon;
          return (
            <motion.div
              key={i}
              className="flex items-start gap-4 bg-white rounded-xl border border-border p-5 shadow-sm"
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                style={{
                  background: "hsl(217 91% 60% / 0.1)",
                  clipPath:
                    "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                }}
              >
                <Icon
                  className="w-5 h-5"
                  style={{ color: "hsl(217 91% 60%)" }}
                />
              </div>
              <div>
                <h4
                  className="font-semibold text-sm mb-1"
                  style={{ color: "hsl(220 15% 20%)" }}
                >
                  {val.label.replace("\n", " ")}
                </h4>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "hsl(220 10% 45%)" }}
                >
                  {val.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ValuesHexagonNetwork;
