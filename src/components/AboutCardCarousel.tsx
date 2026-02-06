import { useState, useCallback, useEffect, useRef } from "react";
import { motion, useAnimation, PanInfo, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Target, Eye, Heart, Rocket } from "lucide-react";

interface CardData {
  id: number;
  title: string;
  content: string | string[];
  icon: React.ReactNode;
  gradient: string;
  textColor: string;
  accentColor: string;
}

const cards: CardData[] = [
  {
    id: 0,
    title: "Our Story",
    content:
      "MyCiti.Life was founded by a visionary leader with deep expertise in real estate ecosystem spanning pre-sales, post-sales, construction, and possession. With years of hands-on experience, we understand the challenges developers face — and we build technology that solves them.",
    icon: <Sparkles className="w-6 h-6" />,
    gradient: "bg-white border border-border",
    textColor: "text-foreground",
    accentColor: "text-indigo-600",
  },
  {
    id: 1,
    title: "Our Expertise",
    content: [
      "Customer experience innovation",
      "Pre-sale & post-sale enablement",
      "Construction monitoring",
      "Smart community solutions",
    ],
    icon: <Target className="w-6 h-6" />,
    gradient:
      "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600",
    textColor: "text-white",
    accentColor: "text-emerald-100",
  },
  {
    id: 2,
    title: "Our Vision",
    content:
      "We believe technology should simplify urban living while empowering developers to deliver exceptional experiences. Our mission is to bridge the gap between real estate operations and modern digital expectations.",
    icon: <Eye className="w-6 h-6" />,
    gradient:
      "bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-500",
    textColor: "text-white",
    accentColor: "text-purple-100",
  },
  {
    id: 3,
    title: "Our Values",
    content: [
      "Experience-backed innovation",
      "Transparency & trust",
      "Customer-first design",
      "Future-focused growth",
    ],
    icon: <Heart className="w-6 h-6" />,
    gradient:
      "bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400",
    textColor: "text-white",
    accentColor: "text-blue-100",
  },
  {
    id: 4,
    title: "Let's Connect",
    content:
      "Ready to transform your real estate projects? Let's connect and explore how MyCiti.Life can elevate your business with cutting-edge PropTech solutions.",
    icon: <Rocket className="w-6 h-6" />,
    gradient:
      "bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500",
    textColor: "text-white",
    accentColor: "text-amber-100",
  },
];

const SWIPE_THRESHOLD = 50;

const AboutCardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalCards = cards.length;

  const getCardIndex = (offset: number) =>
    (currentIndex + offset + totalCards) % totalCards;

  const navigate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrentIndex((prev) => (prev + dir + totalCards) % totalCards);
    },
    [totalCards]
  );

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false);
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
      navigate(info.offset.x > 0 ? -1 : 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  // Stack positions for the visible cards (top, behind-1, behind-2)
  const getStackStyle = (stackPos: number) => {
    const configs = [
      { scale: 1, y: 0, rotateZ: 0, zIndex: 30, opacity: 1 },
      { scale: 0.92, y: 18, rotateZ: 3, zIndex: 20, opacity: 0.7 },
      { scale: 0.84, y: 36, rotateZ: -2, zIndex: 10, opacity: 0.4 },
    ];
    return configs[stackPos] || { scale: 0.76, y: 54, rotateZ: 0, zIndex: 0, opacity: 0 };
  };

  const renderCard = (card: CardData, stackPos: number) => {
    const style = getStackStyle(stackPos);
    const isTop = stackPos === 0;

    return (
      <motion.div
        key={card.id}
        className={`absolute w-full h-full rounded-3xl shadow-2xl overflow-hidden ${card.gradient} will-change-transform`}
        style={{
          zIndex: style.zIndex,
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: style.scale,
          y: style.y,
          rotate: style.rotateZ,
          opacity: style.opacity,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.6,
        }}
        drag={isTop ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={isTop ? handleDragEnd : undefined}
        whileHover={isTop ? { y: -4 } : undefined}
        role="group"
        aria-roledescription="slide"
        aria-label={`Card ${card.id + 1} of ${totalCards}: ${card.title}`}
      >
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />

        {/* Content */}
        <div className={`relative h-full flex flex-col justify-between p-6 sm:p-8 ${card.textColor}`}>
          {/* Header */}
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm mb-4 sm:mb-6 ${card.id === 0 ? "text-indigo-600 bg-indigo-50" : ""}`}>
              {card.icon}
              <span className="text-xs font-semibold tracking-wider uppercase">
                {card.title}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif leading-tight mb-4 sm:mb-6">
              {card.title}
            </h3>
          </div>

          {/* Body */}
          <div className="flex-1 flex items-center">
            {Array.isArray(card.content) ? (
              <ul className="space-y-3 sm:space-y-4 w-full">
                {card.content.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isTop ? { opacity: 1, x: 0 } : { opacity: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${card.id === 0 ? "bg-indigo-500" : "bg-white/60"}`} />
                    <span className="text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <motion.p
                className="text-sm sm:text-base md:text-lg font-medium leading-relaxed"
                initial={{ opacity: 0 }}
                animate={isTop ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {card.content}
              </motion.p>
            )}
          </div>

          {/* Footer dots */}
          <div className="flex items-center justify-center gap-2 pt-4 sm:pt-6">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isDragging) {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? `w-6 h-2 ${card.id === 0 ? "bg-indigo-500" : "bg-white"}`
                    : `w-2 h-2 ${card.id === 0 ? "bg-indigo-200" : "bg-white/40"}`
                }`}
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  // Show 3 cards in the stack
  const visibleCards = [0, 1, 2].map((offset) => {
    const idx = getCardIndex(offset);
    return { card: cards[idx], stackPos: offset };
  });

  return (
    <div
      className="w-full max-w-4xl mx-auto px-4"
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="About Us card carousel"
    >
      {/* Card Stack Container */}
      <div className="relative mx-auto" style={{ width: "min(400px, 90vw)", height: "min(550px, 75vh)" }}>
        {/* Render bottom cards first, top card last */}
        {[...visibleCards].reverse().map(({ card, stackPos }) =>
          renderCard(card, stackPos)
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-6 mt-8 sm:mt-10">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-border shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-5 h-5 text-foreground group-hover:scale-110 transition-transform" />
        </button>

        <span className="text-sm font-medium text-muted-foreground tabular-nums">
          {currentIndex + 1} / {totalCards}
        </span>

        <button
          onClick={() => navigate(1)}
          className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-border shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300"
          aria-label="Next card"
        >
          <ChevronRight className="w-5 h-5 text-foreground group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default AboutCardCarousel;
