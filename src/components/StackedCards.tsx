import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import screenPresales from "@/assets/screen-presales.png";
import screenPresalesMobile from "@/assets/screen-presales-mobile.png";

const cards = [
  {
    name: "Pre Sales",
    description: "Streamline your lead management and inquiry handling with powerful CRM tools. Track prospects, manage follow-ups, and convert leads faster than ever.",
    barColor: "bg-[#4A9FE8]",
    icon: "📊",
    screenImage: screenPresales,
    mobileImage: screenPresalesMobile,
  },
  {
    name: "Post Sales",
    description: "Manage customer relationships after the deal closes. Handle documentation, payment tracking, and customer support seamlessly.",
    barColor: "bg-[#10B981]",
    icon: "🤝",
    screenImage: null,
    mobileImage: null as string | null,
  },
  {
    name: "Konstruct",
    description: "Track construction progress and project milestones in real-time. Monitor budgets, timelines, and resource allocation efficiently.",
    barColor: "bg-[#F59E0B]",
    icon: "🏗️",
    screenImage: null,
    mobileImage: null as string | null,
  },
  {
    name: "VibeCopilot",
    description: "AI-powered assistant for your daily operations. Get intelligent insights, automate repetitive tasks, and boost productivity.",
    barColor: "bg-[#8B5CF6]",
    icon: "🤖",
    screenImage: null,
    mobileImage: null as string | null,
  },
  {
    name: "HRMS",
    description: "Complete human resource management solution. Manage employees, payroll, attendance, and performance all in one place.",
    barColor: "bg-[#EF4444]",
    icon: "👥",
    screenImage: null,
    mobileImage: null as string | null,
  },
  {
    name: "Possession",
    description: "Seamless handover and possession tracking. Manage property handovers, documentation, and customer satisfaction efficiently.",
    barColor: "bg-[#6366F1]",
    icon: "🔑",
    screenImage: null,
    mobileImage: null as string | null,
  },
];

const PhoneFrame = ({ icon, mobileImage }: { icon: string; mobileImage?: string | null }) => (
  <div className="relative w-[70px] md:w-[90px]">
    {/* Phone outer frame */}
    <div className="bg-[#1f1f1f] rounded-[16px] md:rounded-[20px] p-[3px] shadow-xl border border-[#3a3a3a]">
      {/* Dynamic Island / Notch */}
      <div className="absolute top-[6px] md:top-[8px] left-1/2 -translate-x-1/2 w-[28px] md:w-[35px] h-[8px] md:h-[10px] bg-[#1f1f1f] rounded-full z-20" />
      {/* Screen */}
      <div className="bg-white rounded-[13px] md:rounded-[17px] aspect-[9/19] overflow-hidden relative">
        {mobileImage ? (
          <img 
            src={mobileImage} 
            alt="Mobile preview" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-1 p-2 bg-gradient-to-b from-slate-50 to-white">
            <span className="text-lg md:text-xl">{icon}</span>
            <div className="space-y-1 w-full px-2">
              <div className="w-full h-1 bg-slate-200 rounded" />
              <div className="w-3/4 h-1 bg-slate-200 rounded" />
              <div className="w-1/2 h-1 bg-slate-200 rounded" />
            </div>
          </div>
        )}
      </div>
      {/* Home indicator */}
      <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[28px] md:w-[35px] h-[3px] md:h-[4px] bg-[#555] rounded-full" />
    </div>
  </div>
);

const LaptopFrame = ({ icon, screenImage, mobileImage }: { icon: string; screenImage?: string | null; mobileImage?: string | null }) => (
  <div className="relative w-[280px] md:w-[380px]">
    
    {/* Laptop Screen */}
    <div className="relative">
      {/* Screen bezel */}
      <div className="bg-[#1f1f1f] rounded-t-xl p-[6px] md:p-[8px] border-t border-l border-r border-[#3a3a3a]">
        {/* Camera */}
        <div className="absolute top-[3px] md:top-[4px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] md:w-[8px] md:h-[8px] rounded-full bg-[#2a2a2a] border border-[#444]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[2px] md:w-[3px] md:h-[3px] rounded-full bg-[#1a3a5c]" />
        </div>
        {/* Screen content */}
        <div className="bg-white rounded-[4px] aspect-[16/10] overflow-hidden">
          {screenImage ? (
            <img 
              src={screenImage} 
              alt="Screen preview" 
              className="w-full h-full object-contain bg-white"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-2 p-3 bg-gradient-to-b from-slate-50 to-white">
              <span className="text-4xl md:text-5xl">{icon}</span>
              <div className="flex gap-1">
                <div className="w-12 h-2 bg-slate-200 rounded" />
                <div className="w-8 h-2 bg-slate-200 rounded" />
              </div>
              <div className="flex gap-1">
                <div className="w-8 h-8 bg-blue-100 rounded" />
                <div className="w-8 h-8 bg-green-100 rounded" />
                <div className="w-8 h-8 bg-purple-100 rounded" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Laptop bottom hinge */}
      <div className="relative h-[8px] md:h-[10px] bg-gradient-to-b from-[#2a2a2a] to-[#1f1f1f] rounded-b-sm">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50px] md:w-[70px] h-[3px] md:h-[4px] bg-[#444] rounded-t-sm" />
      </div>
      
      {/* Laptop base/keyboard */}
      <div className="relative mx-[-8px] md:mx-[-12px]">
        <div className="h-[6px] md:h-[8px] bg-gradient-to-b from-[#3a3a3a] to-[#2a2a2a] rounded-b-xl border-b border-l border-r border-[#444]" />
      </div>
    </div>

    {/* iPhone Frame - Bottom Right */}
    <div className="absolute -bottom-2 -right-4 md:-right-6 z-20 animate-float" style={{ animationDelay: "0.5s" }}>
      <PhoneFrame icon={icon} mobileImage={mobileImage} />
    </div>
  </div>
);

const StackedCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cardHeight = 420;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = containerRef.current.offsetHeight;
      const scrollableHeight = containerHeight - windowHeight;

      const scrolledIntoContainer = -rect.top;
      
      if (scrolledIntoContainer < 0) {
        setScrollProgress(0);
      } else {
        const progress = (scrolledIntoContainer / scrollableHeight) * cards.length;
        setScrollProgress(Math.min(cards.length, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative min-h-[600vh] pt-8 pb-20"
    >
      <div className="sticky top-16 flex flex-col items-center px-4 md:px-6 overflow-hidden">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="text-xs font-medium tracking-wider text-foreground/60 uppercase">
            PRODUCT & FEATURES
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4 mt-2">
            Our Powerful Modules
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to manage your operations, all in one place
          </p>
        </div>

        {/* Stacked Cards Container */}
        <div className="relative w-full max-w-5xl h-[420px] overflow-hidden">
          {cards.map((card, index) => {
            // Calculate individual card progress
            const cardProgress = scrollProgress - index;
            
            // Card states based on scroll
            const isStacked = cardProgress >= 1;
            const isUpcoming = cardProgress < 0;
            
            // Smooth translateY - cards pop up from bottom with scale
            let translateY = 0;
            let scale = 1;
            let opacity = 1;
            
            if (index === 0) {
              // First card is always visible by default
              if (isStacked) {
                const fadeProgress = Math.min(cardProgress - 1, 0.5) * 2;
                translateY = -fadeProgress * 80;
                scale = 1 - (fadeProgress * 0.15);
                opacity = 1 - fadeProgress;
              }
            } else if (isUpcoming) {
              // Card is below viewport, waiting to pop up - start smaller
              translateY = cardHeight + 100;
              opacity = 0;
              scale = 0.7;
            } else if (cardProgress >= 0 && cardProgress < 1) {
              // Card is popping up into view - dramatic scale effect
              const easeProgress = 1 - Math.pow(1 - cardProgress, 3); // Ease out cubic
              translateY = (1 - easeProgress) * (cardHeight + 100);
              scale = 0.7 + (easeProgress * 0.3); // Scale from 0.7 to 1
              opacity = easeProgress;
            } else if (isStacked) {
              // Card is being covered - fade out and slide up
              const fadeProgress = Math.min(cardProgress - 1, 0.5) * 2;
              translateY = -fadeProgress * 80;
              scale = 1 - (fadeProgress * 0.15);
              opacity = 1 - fadeProgress;
            }

            // Don't render cards that are completely faded out
            if (opacity <= 0) return null;

            return (
              <div
                key={card.name}
                className="absolute inset-0 w-full will-change-transform transition-all duration-100 ease-out"
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  zIndex: cards.length - index + (cardProgress >= 0 ? 10 : 0),
                  opacity,
                }}
              >
                {/* Main Card - Glassmorphism with opaque background */}
                <div className="bg-[rgba(248,250,252,0.95)] backdrop-blur-[20px] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white h-full">
                  {/* Card Content */}
                  <div className="relative h-[420px] flex flex-col md:flex-row items-center justify-between p-6 md:p-10 overflow-hidden">
                    {/* Decorative gradient circles */}
                    <div className={cn("absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-30 blur-3xl", card.barColor)} />
                    <div className={cn("absolute -bottom-20 -left-20 w-56 h-56 rounded-full opacity-20 blur-2xl", card.barColor)} />

                    {/* Left Side - Text */}
                    <div className="flex-1 text-center md:text-left mb-4 md:mb-0 max-w-md relative z-10">
                      <h3 className="text-3xl md:text-4xl font-semibold mb-3 text-gray-800">
                        {card.name}
                      </h3>
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        {card.description}
                      </p>
                      <div className="flex mt-6 justify-center md:justify-start">
                        <button className="px-6 py-2.5 rounded-full font-medium transition-all duration-300 text-white text-base bg-[#3B82F6] hover:bg-[#2563EB] hover:scale-105 hover:shadow-lg shadow-md">
                          View Details
                        </button>
                      </div>
                    </div>

                    {/* Right Side - Laptop Frame */}
                    <div className="flex-shrink-0 hidden md:block relative z-10">
                      <LaptopFrame icon={card.icon} screenImage={card.screenImage} mobileImage={card.mobileImage} />
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
            const isCurrent = scrollProgress >= index && scrollProgress < index + 1;
            const isPast = scrollProgress >= index + 1;
            return (
              <div
                key={card.name}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  isCurrent ? "w-10 bg-primary" : isPast ? "w-2 bg-primary/60" : "w-2 bg-muted-foreground/30"
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
