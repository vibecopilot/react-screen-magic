import { useState, useCallback, useEffect, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Sparkles, Target, Eye, Heart, Rocket } from "lucide-react";
import aboutBg from "@/assets/about.jpg"; // ADD YOUR SINGLE IMAGE HERE

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
    iconAccent: "text-indigo-600 bg-indigo-50/80 backdrop-blur-sm",
  },

  {
    id: 2,
    title: "Our Vision",
    content:
      "We believe technology should simplify urban living while empowering developers and property managers to deliver premium, reliable, and transparent experiences. By combining deep real estate knowledge with tech-driven innovation, MyCiti.Life is redefining how communities are planned, managed, and experienced.",
    icon: <Eye className="w-5 h-5" />,
    iconAccent: "text-purple-600 bg-purple-50/80 backdrop-blur-sm",
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
    iconAccent: "text-blue-600 bg-blue-50/80 backdrop-blur-sm",
  },


  {
    id: 4,
    title: "Let's Connect",
    content:
      "Ready to transform your real estate projects? Let's connect and explore how MyCiti.Life can elevate your business with cutting-edge PropTech solutions.",
    icon: <Rocket className="w-5 h-5" />,
    iconAccent: "text-orange-600 bg-orange-50/80 backdrop-blur-sm",
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
        className="absolute w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden will-change-transform relative"
        style={{
          zIndex: style.zIndex,
          perspective: "1200px",
          transformStyle: "preserve-3d",
          backgroundImage: `url(${aboutBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
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
        {/* Glass overlay for perfect text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/70 backdrop-blur-md" />

        {/* Left accent strip */}
        <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-white/60 to-transparent z-10" />

        <div className="relative h-full flex flex-col sm:flex-row z-20">
          <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 lg:p-10 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-4 sm:mb-6">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl shadow-lg backdrop-blur-sm border ${card.iconAccent}`}>
                {card.icon}
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif bg-gradient-to-r from-gray-900/90 to-gray-700/90 bg-clip-text text-transparent leading-tight drop-shadow-lg">
                {card.title}
              </h3>
            </div>

            {/* Body */}
            <div className="flex-1 flex items-start">
              {Array.isArray(card.content) ? (
                <ul className="space-y-3 sm:space-y-4 w-full">
                  {card.content.map((item, i) => {
                    const dashIndex = item.indexOf(" – ");
                    const label = dashIndex > -1 ? item.substring(0, dashIndex) : item;
                    const desc = dashIndex > -1 ? item.substring(dashIndex + 3) : "";

                    return (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isTop ? { opacity: 1, x: 0 } : { opacity: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                      >
                        <span className="mt-2.5 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 flex-shrink-0 shadow-md mt-1" />
                        <span className="text-base sm:text-lg lg:text-xl text-gray-800/95 font-semibold leading-relaxed drop-shadow-md max-w-prose">
                          <span className="font-bold text-gray-900 drop-shadow-sm">{label}</span>
                          {desc && <> – {desc}</>}
                        </span>
                      </motion.li>
                    );
                  })}
                </ul>
              ) : (
                <div className="flex flex-col gap-6">
                  <motion.p
                    className="text-base sm:text-lg lg:text-xl text-gray-800/95 font-semibold leading-relaxed drop-shadow-md max-w-prose text-justify"
                    initial={{ opacity: 0 }}
                    animate={isTop ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
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
                      className="self-start px-8 py-4 rounded-2xl bg-white/90 backdrop-blur-lg border border-gray-200/50 shadow-2xl hover:shadow-3xl hover:scale-[1.02] hover:bg-white transition-all duration-300 text-gray-900 font-bold text-lg px-10"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      Contact Us
                    </motion.button>
                  )}
                </div>
              )}
            </div>

            {/* Footer dots */}
            <div className="flex items-center justify-center gap-2 pt-6 sm:pt-8">
              {cards.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isDragging) setCurrentIndex(i);
                  }}
                  className={`rounded-full transition-all duration-400 backdrop-blur-sm shadow-lg ${i === currentIndex
                    ? "w-7 h-3 bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl"
                    : "w-3 h-3 bg-white/90 hover:bg-white shadow-md hover:shadow-lg hover:scale-110"
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
      className="w-full max-w-6xl mx-auto px-4 py-20"
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="About Us card carousel"
    >
      {/* Landscape Card Stack */}
      <div
        className="relative mx-auto"
        style={{
          width: "min(900px, 95vw)",
          height: "min(500px, 70vh)",
        }}
      >
        {[...visibleCards].reverse().map(({ card, stackPos }) =>
          renderCard(card, stackPos)
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-8 mt-12">
        <button
          onClick={() => navCard(-1)}
          className="group flex items-center justify-center w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800 group-hover:scale-110 transition-transform" />
        </button>

        <span className="text-lg font-semibold text-gray-700 drop-shadow-sm tabular-nums tracking-wide">
          {currentIndex + 1} / {totalCards}
        </span>

        <button
          onClick={() => navCard(1)}
          className="group flex items-center justify-center w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300"
          aria-label="Next card"
        >
          <ChevronRight className="w-5 h-5 text-gray-800 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default AboutCardCarousel;
