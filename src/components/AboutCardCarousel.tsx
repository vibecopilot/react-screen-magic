import { useState, useCallback, useEffect, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Sparkles, Target, Eye, Heart, Rocket } from "lucide-react";

interface CardData {
  id: number;
  title: string;
  content: string | string[];
  icon: React.ReactNode;
  iconAccent: string;
  hasCta?: boolean;
}

const cards: CardData[] = [
  {
    id: 0,
    title: "Our Story",
    content:
      "MyCiti.Life was founded by a visionary leader with deep expertise in the real estate ecosystem, spanning every stage of the journey—from pre-sales and post-sales to construction and final possession. This hands-on experience gives us a strong understanding of the real-world challenges faced by developers, property managers, and residents, enabling us to build solutions that truly address industry needs.",
    icon: <Sparkles className="w-5 h-5" />,
    iconAccent: "text-indigo-600 bg-indigo-50",
  },
  {
    id: 1,
    title: "Our Expertise",
    content: [
      "Customer experience innovation – delivering seamless, digital-first interactions for buyers and residents",
      "Pre-sale & post-sale enablement – streamlining lead management, customer communication, documentation, and handover processes",
      "Construction monitoring – driving transparency, accountability, and efficiency across project timelines",
      "Smart community solutions – integrating facility management, payments, and lifestyle services into a unified platform",
    ],
    icon: <Target className="w-5 h-5" />,
    iconAccent: "text-emerald-600 bg-emerald-50",
  },
  {
    id: 2,
    title: "Our Vision",
    content:
      "We believe technology should simplify urban living while empowering developers and property managers to deliver premium, reliable, and transparent experiences. By combining deep real estate knowledge with tech-driven innovation, MyCiti.Life is redefining how communities are planned, managed, and experienced.",
    icon: <Eye className="w-5 h-5" />,
    iconAccent: "text-purple-600 bg-purple-50",
  },
  {
    id: 3,
    title: "Our Values",
    content: [
      "Experience-backed innovation – blending real-world real estate expertise with modern PropTech solutions",
      "Transparency & trust – ensuring clarity and accountability at every stage of the lifecycle",
      "Customer-first design – prioritizing ease of use, privacy, and satisfaction",
      "Future-focused growth – enabling smarter, more sustainable communities through technology",
    ],
    icon: <Heart className="w-5 h-5" />,
    iconAccent: "text-blue-600 bg-blue-50",
  },
  {
    id: 4,
    title: "Let's Connect",
    content:
      "Ready to transform your real estate projects? Let's connect and explore how MyCiti.Life can elevate your business with cutting-edge PropTech solutions.",
    icon: <Rocket className="w-5 h-5" />,
    iconAccent: "text-orange-600 bg-orange-50",
    hasCta: true,
  },
];

const SWIPE_THRESHOLD = 50;

const AboutCardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const totalCards = cards.length;

  const getCardIndex = (offset: number) =>
    (currentIndex + offset + totalCards) % totalCards;

  const navCard = useCallback(
    (dir: number) => {
      setCurrentIndex((prev) => (prev + dir + totalCards) % totalCards);
    },
    [totalCards]
  );

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false);
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
      navCard(info.offset.x > 0 ? -1 : 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navCard(-1);
      if (e.key === "ArrowRight") navCard(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navCard]);

  const getStackStyle = (stackPos: number) => {
    const configs = [
      { scale: 1, y: 0, rotateZ: 0, zIndex: 30, opacity: 1 },
      { scale: 0.95, y: 16, rotateZ: 2.5, zIndex: 20, opacity: 0.65 },
      { scale: 0.90, y: 32, rotateZ: -1.5, zIndex: 10, opacity: 0.35 },
    ];
    return configs[stackPos] || { scale: 0.85, y: 48, rotateZ: 0, zIndex: 0, opacity: 0 };
  };

  const renderCard = (card: CardData, stackPos: number) => {
    const style = getStackStyle(stackPos);
    const isTop = stackPos === 0;

    return (
      <motion.div
        key={card.id}
        className="absolute w-full h-full rounded-2xl sm:rounded-3xl bg-white border border-border shadow-xl overflow-hidden will-change-transform"
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
        whileHover={isTop ? { y: -3 } : undefined}
        role="group"
        aria-roledescription="slide"
        aria-label={`Card ${card.id + 1} of ${totalCards}: ${card.title}`}
      >
        <div className="relative h-full flex flex-col sm:flex-row">
          {/* Left accent strip */}
          <div className="hidden sm:block w-1.5 flex-shrink-0 bg-foreground/5" />

          <div className="flex-1 flex flex-col justify-between p-5 sm:p-7 md:p-9 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${card.iconAccent}`}>
                {card.icon}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold font-serif text-foreground leading-tight">
                {card.title}
              </h3>
            </div>

            {/* Body */}
            <div className="flex-1 flex items-start">
              {Array.isArray(card.content) ? (
                <ul className="space-y-2 sm:space-y-3 w-full">
                  {card.content.map((item, i) => {
                    const dashIndex = item.indexOf(" – ");
                    const label = dashIndex > -1 ? item.substring(0, dashIndex) : item;
                    const desc = dashIndex > -1 ? item.substring(dashIndex + 3) : "";

                    return (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2.5"
                        initial={{ opacity: 0, x: -15 }}
                        animate={isTop ? { opacity: 1, x: 0 } : { opacity: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.35 }}
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground/30 flex-shrink-0" />
                        <span className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium leading-relaxed">
                          <span className="text-foreground font-semibold">{label}</span>
                          {desc && <> – {desc}</>}
                        </span>
                      </motion.li>
                    );
                  })}
                </ul>
              ) : (
                <div className="flex flex-col gap-4">
                  <motion.p
                    className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={isTop ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {card.content}
                  </motion.p>

                  {/* CTA button for Let's Connect card */}
                  {card.hasCta && isTop && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/contact");
                      }}
                      className="self-start px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      Contact Us
                    </motion.button>
                  )}
                </div>
              )}
            </div>

            {/* Footer dots */}
            <div className="flex items-center justify-center gap-2 pt-3 sm:pt-4">
              {cards.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isDragging) setCurrentIndex(i);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-5 h-1.5 bg-foreground"
                      : "w-1.5 h-1.5 bg-foreground/20"
                  }`}
                  aria-label={`Go to card ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const visibleCards = [0, 1, 2].map((offset) => {
    const idx = getCardIndex(offset);
    return { card: cards[idx], stackPos: offset };
  });

  return (
    <div
      className="w-full max-w-5xl mx-auto px-4"
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="About Us card carousel"
    >
      {/* Landscape Card Stack — larger size */}
      <div
        className="relative mx-auto"
        style={{
          width: "min(820px, 94vw)",
          height: "min(440px, 65vh)",
        }}
      >
        {[...visibleCards].reverse().map(({ card, stackPos }) =>
          renderCard(card, stackPos)
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={() => navCard(-1)}
          className="group flex items-center justify-center w-10 h-10 rounded-full bg-white border border-border shadow-md hover:shadow-lg transition-all duration-300"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-4 h-4 text-foreground group-hover:scale-110 transition-transform" />
        </button>

        <span className="text-xs font-medium text-muted-foreground tabular-nums">
          {currentIndex + 1} / {totalCards}
        </span>

        <button
          onClick={() => navCard(1)}
          className="group flex items-center justify-center w-10 h-10 rounded-full bg-white border border-border shadow-md hover:shadow-lg transition-all duration-300"
          aria-label="Next card"
        >
          <ChevronRight className="w-4 h-4 text-foreground group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default AboutCardCarousel;
