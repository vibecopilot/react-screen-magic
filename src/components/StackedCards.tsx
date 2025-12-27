import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const cards = [
  {
    name: "Pre Sales",
    description: "Streamline your lead management and inquiry handling with powerful CRM tools. Track prospects, manage follow-ups, and convert leads faster than ever.",
    barColor: "bg-[#4A9FE8]",
    icon: "📊",
  },
  {
    name: "Post Sales",
    description: "Manage customer relationships after the deal closes. Handle documentation, payment tracking, and customer support seamlessly.",
    barColor: "bg-[#10B981]",
    icon: "🤝",
  },
  {
    name: "Konstruct",
    description: "Track construction progress and project milestones in real-time. Monitor budgets, timelines, and resource allocation efficiently.",
    barColor: "bg-[#F59E0B]",
    icon: "🏗️",
  },
  {
    name: "VibeCopilot",
    description: "AI-powered assistant for your daily operations. Get intelligent insights, automate repetitive tasks, and boost productivity.",
    barColor: "bg-[#8B5CF6]",
    icon: "🤖",
  },
  {
    name: "HRMS",
    description: "Complete human resource management solution. Manage employees, payroll, attendance, and performance all in one place.",
    barColor: "bg-[#EF4444]",
    icon: "👥",
  },
  {
    name: "Possession",
    description: "Seamless handover and possession tracking. Manage property handovers, documentation, and customer satisfaction efficiently.",
    barColor: "bg-[#6366F1]",
    icon: "🔑",
  },
];

const LaptopFrame = ({ icon }: { icon: string }) => (
  <div className="relative w-[280px] md:w-[380px]">
    {/* Laptop Screen */}
    <div className="relative bg-[#1a1a2e] rounded-t-xl p-2 border-4 border-[#2d2d44]">
      {/* Screen bezel */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#2d2d44]" />
      {/* Screen content */}
      <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg aspect-[16/10] flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-3">
          <span className="text-6xl md:text-7xl">{icon}</span>
          <div className="flex gap-2">
            <div className="w-16 h-2 bg-slate-300 rounded" />
            <div className="w-10 h-2 bg-slate-300 rounded" />
          </div>
          <div className="flex gap-1">
            <div className="w-8 h-8 bg-blue-200 rounded" />
            <div className="w-8 h-8 bg-green-200 rounded" />
            <div className="w-8 h-8 bg-purple-200 rounded" />
          </div>
        </div>
      </div>
    </div>
    {/* Laptop Base */}
    <div className="relative h-3 bg-gradient-to-b from-[#2d2d44] to-[#1a1a2e] rounded-b-lg">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#3d3d54] rounded-t-full" />
    </div>
    {/* Laptop Stand */}
    <div className="h-1 bg-[#1a1a2e] mx-4 rounded-b-lg" />
  </div>
);

const StackedCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = containerRef.current.offsetHeight;
      const scrollableHeight = containerHeight - windowHeight;

      // Calculate how far we've scrolled into the container (0 to 1 per card)
      const scrolledIntoContainer = -rect.top;
      
      if (scrolledIntoContainer < 0) {
        setScrollProgress(0);
      } else {
        const progress = scrolledIntoContainer / scrollableHeight * cards.length;
        setScrollProgress(Math.min(cards.length, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeCardIndex = Math.floor(scrollProgress);
  const cardProgress = scrollProgress - activeCardIndex; // 0 to 1 progress within current card transition

  return (
    <section
      ref={containerRef}
      className="relative min-h-[500vh] py-20 bg-gradient-to-b from-background via-muted/20 to-background"
    >
      <div className="sticky top-16 flex flex-col items-center px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Our Powerful Modules
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to manage your operations, all in one place
          </p>
        </div>

        {/* Stacked Cards Container - Bigger size */}
        <div className="relative w-full max-w-6xl h-[480px] md:h-[550px]">
          {cards.map((card, index) => {
            const isCurrentCard = index === activeCardIndex;
            const isPreviousCard = index < activeCardIndex;
            const isNextCard = index === activeCardIndex + 1;
            
            // Calculate dynamic transforms based on scroll progress
            let translateY = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 0;

            if (isPreviousCard) {
              // Previous cards stack up with offset
              const stackPosition = activeCardIndex - index;
              translateY = -stackPosition * 10 - cardProgress * 10;
              scale = 1 - stackPosition * 0.02 - cardProgress * 0.02;
              opacity = 1 - stackPosition * 0.15;
              zIndex = cards.length - stackPosition;
            } else if (isCurrentCard) {
              // Current card moves up as we scroll
              translateY = -cardProgress * 60;
              scale = 1 - cardProgress * 0.02;
              opacity = 1;
              zIndex = cards.length;
            } else if (isNextCard) {
              // Next card slides in from bottom
              translateY = 400 - cardProgress * 400;
              scale = 0.95 + cardProgress * 0.05;
              opacity = cardProgress;
              zIndex = cards.length - 1;
            } else {
              // Future cards are hidden below
              translateY = 500;
              opacity = 0;
              zIndex = 0;
            }

            return (
              <div
                key={card.name}
                className="absolute inset-0 w-full will-change-transform"
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: 'transform 0.1s ease-out, opacity 0.15s ease-out',
                }}
              >
                {/* Main Card - White with popup shadow and rounded corners */}
                <div className="bg-white rounded-3xl shadow-[0_25px_80px_-20px_rgba(0,0,0,0.25)] h-full">
                  {/* Card Content */}
                  <div className="relative h-[480px] md:h-[550px] flex flex-col md:flex-row items-center justify-between p-10 md:p-16">
                    {/* Decorative Circle */}
                    <div className={cn("absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10", card.barColor)} />

                    {/* Left Side - Text */}
                    <div className="flex-1 text-center md:text-left mb-6 md:mb-0 max-w-lg">
                      <div className={cn("inline-flex items-center gap-3 rounded-xl px-5 py-3 mb-6", card.barColor + '/20')}>
                        <span className="text-4xl">{card.icon}</span>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-serif font-bold mb-5 text-gray-900">
                        {card.name}
                      </h3>
                      <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                        {card.description}
                      </p>
                      <button className={cn(
                        "mt-8 px-8 py-3 rounded-full font-medium transition-all duration-300 text-white text-lg",
                        card.barColor,
                        "hover:opacity-90 hover:scale-105"
                      )}>
                        Learn More →
                      </button>
                    </div>

                    {/* Right Side - Laptop Frame */}
                    <div className="flex-shrink-0 hidden md:block">
                      <LaptopFrame icon={card.icon} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2 mt-16">
          {cards.map((card, index) => {
            const isActive = index <= activeCardIndex;
            const isCurrent = index === activeCardIndex;
            return (
              <div
                key={card.name}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  isCurrent ? "w-10 bg-primary" : isActive ? "w-2 bg-primary/60" : "w-2 bg-muted-foreground/30"
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
