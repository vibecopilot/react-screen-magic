import { useState, useCallback, useEffect, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Target, Eye, Heart, Rocket } from "lucide-react";

interface CardData {
  id: number;
  title: string;
  content: string | string[];
  icon: React.ReactNode;
  iconAccent: string;
}

const cards: CardData[] = [
  {
    id: 0,
    title: "Our Story",
    content:
      "MyCiti.Life was founded by a visionary leader with deep expertise in real estate ecosystem spanning pre-sales, post-sales, construction, and possession. With years of hands-on experience, we understand the challenges developers face — and we build technology that solves them.",
    icon: <Sparkles className="w-5 h-5" />,
    iconAccent: "text-indigo-600 bg-indigo-50",
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
    icon: <Target className="w-5 h-5" />,
    iconAccent: "text-emerald-600 bg-emerald-50",
  },
  {
    id: 2,
    title: "Our Vision",
    content:
      "We believe technology should simplify urban living while empowering developers to deliver exceptional experiences. Our mission is to bridge the gap between real estate operations and modern digital expectations.",
    icon: <Eye className="w-5 h-5" />,
    iconAccent: "text-purple-600 bg-purple-50",
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
  },
];

const SWIPE_THRESHOLD = 50;

const AboutCardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalCards = cards.length;

  const getCardIndex = (offset: number) =>
    (currentIndex + offset + totalCards) % totalCards;

  const navigate = useCallback(
    (dir: number) => {
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const getStackStyle = (stackPos: number) => {
    const configs = [
      { scale: 1, y: 0, rotateZ: 0, zIndex: 30, opacity: 1 },
      { scale: 0.95, y: 14, rotateZ: 2.5, zIndex: 20, opacity: 0.65 },
      { scale: 0.90, y: 28, rotateZ: -1.5, zIndex: 10, opacity: 0.35 },
    ];
    return configs[stackPos] || { scale: 0.85, y: 42, rotateZ: 0, zIndex: 0, opacity: 0 };
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
        {/* Content */}
        <div className="relative h-full flex flex-col sm:flex-row">
          {/* Left accent strip */}
          <div className="hidden sm:block w-1.5 flex-shrink-0 bg-foreground/5" />

          <div className="flex-1 flex flex-col justify-between p-5 sm:p-7 md:p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${card.iconAccent}`}>
                {card.icon}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold font-serif text-foreground leading-tight">
                {card.title}
              </h3>
            </div>

            {/* Body */}
            <div className="flex-1 flex items-center">
              {Array.isArray(card.content) ? (
                <ul className="space-y-2.5 sm:space-y-3 w-full">
                  {card.content.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2.5"
                      initial={{ opacity: 0, x: -15 }}
                      animate={isTop ? { opacity: 1, x: 0 } : { opacity: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.35 }}
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground/30 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-muted-foreground font-medium leading-relaxed">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <motion.p
                  className="text-sm sm:text-base text-muted-foreground font-medium leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={isTop ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {card.content}
                </motion.p>
              )}
            </div>

            {/* Footer dots */}
            <div className="flex items-center justify-center gap-2 pt-4">
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
      className="w-full max-w-4xl mx-auto px-4"
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="About Us card carousel"
    >
      {/* Landscape Card Stack */}
      <div
        className="relative mx-auto"
        style={{
          width: "min(680px, 92vw)",
          height: "min(340px, 55vh)",
        }}
      >
        {[...visibleCards].reverse().map(({ card, stackPos }) =>
          renderCard(card, stackPos)
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center justify-center w-10 h-10 rounded-full bg-white border border-border shadow-md hover:shadow-lg transition-all duration-300"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-4 h-4 text-foreground group-hover:scale-110 transition-transform" />
        </button>

        <span className="text-xs font-medium text-muted-foreground tabular-nums">
          {currentIndex + 1} / {totalCards}
        </span>

        <button
          onClick={() => navigate(1)}
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
