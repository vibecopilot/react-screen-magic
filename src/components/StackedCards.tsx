import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const cards = [
  {
    name: "Pre Sales",
    description: "Streamline your lead management and inquiry handling",
    gradient: "from-blue-500 to-cyan-400",
    icon: "📊",
  },
  {
    name: "Post Sales",
    description: "Manage customer relationships after the deal closes",
    gradient: "from-emerald-500 to-teal-400",
    icon: "🤝",
  },
  {
    name: "Konstruct",
    description: "Track construction progress and project milestones",
    gradient: "from-orange-500 to-amber-400",
    icon: "🏗️",
  },
  {
    name: "VibeCopilot",
    description: "AI-powered assistant for your daily operations",
    gradient: "from-purple-500 to-pink-400",
    icon: "🤖",
  },
  {
    name: "HRMS",
    description: "Complete human resource management solution",
    gradient: "from-rose-500 to-red-400",
    icon: "👥",
  },
  {
    name: "Possession",
    description: "Seamless handover and possession tracking",
    gradient: "from-indigo-500 to-violet-400",
    icon: "🔑",
  },
];

const StackedCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = containerRef.current.offsetHeight;

      // Calculate scroll progress from 0 to 1 based on container position
      const startTrigger = windowHeight * 0.8;
      const endTrigger = -containerHeight + windowHeight * 0.2;

      if (rect.top > startTrigger) {
        setScrollProgress(0);
      } else if (rect.top < endTrigger) {
        setScrollProgress(1);
      } else {
        const progress = (startTrigger - rect.top) / (startTrigger - endTrigger);
        setScrollProgress(Math.min(1, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh] py-32 bg-gradient-to-b from-background via-muted/30 to-background"
    >
      <div className="sticky top-20 flex flex-col items-center px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Our Powerful Modules
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to manage your operations, all in one place
          </p>
        </div>

        {/* Stacked Cards Container */}
        <div className="relative w-full max-w-4xl h-[400px] perspective-1000">
          {cards.map((card, index) => {
            // Calculate individual card progress
            const cardProgress = scrollProgress * cards.length;
            const cardIndex = index;
            const isActive = cardProgress >= cardIndex;
            const cardOffset = Math.max(0, cardProgress - cardIndex);
            const isTop = cardProgress >= cardIndex && cardProgress < cardIndex + 1;

            // Transform values
            const translateY = isActive
              ? Math.min(cardOffset * 20, 20) + index * 8
              : 200 + index * 20;
            const scale = isActive ? 1 - cardOffset * 0.02 : 0.9;
            const opacity = isActive ? 1 - cardOffset * 0.15 : 0;
            const rotateX = isActive ? -cardOffset * 5 : 10;
            const zIndex = cards.length - index + (isTop ? 10 : 0);

            return (
              <div
                key={card.name}
                className={cn(
                  "absolute inset-0 w-full rounded-3xl overflow-hidden transition-all duration-500 ease-out",
                  "shadow-2xl border border-white/10"
                )}
                style={{
                  transform: `translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`,
                  opacity,
                  zIndex,
                  transformOrigin: "center bottom",
                }}
              >
                {/* Card Background */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br",
                    card.gradient
                  )}
                />

                {/* Card Content */}
                <div className="relative h-full flex flex-col md:flex-row items-center justify-between p-8 md:p-12 text-white">
                  {/* Left Side - Text */}
                  <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
                    <span className="text-6xl mb-4 block">{card.icon}</span>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold mb-3">
                      {card.name}
                    </h3>
                    <p className="text-white/80 text-lg max-w-md">
                      {card.description}
                    </p>
                  </div>

                  {/* Right Side - Decorative Elements */}
                  <div className="flex-shrink-0">
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl bg-white/20 flex items-center justify-center">
                        <span className="text-7xl md:text-8xl">{card.icon}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/10" />
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2 mt-8">
          {cards.map((card, index) => {
            const isActive = scrollProgress * cards.length >= index;
            return (
              <div
                key={card.name}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  isActive ? "bg-primary w-6" : "bg-muted-foreground/30"
                )}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StackedCards;
