import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import screenPresalesOverview from "@/assets/screen-presales-overview.png";
import screenPostSales from "@/assets/screen-post-sales.png";
import screenKonstruct from "@/assets/screen-konstruct-new.png";
import screenPossession from "@/assets/screen-possession.png";
import screenCustomerPortal from "@/assets/screen-customer-portal.png";

const cards = [{
  name: "Pre Sales",
  slug: "pre-sales",
  description: "Streamline your lead management and inquiry handling with powerful CRM tools. Track prospects, manage follow-ups, and convert leads faster than ever.",
  barColor: "bg-[#3B82F6]",
  icon: "📊",
  screenImage: screenPresalesOverview
}, {
  name: "Post Sales",
  slug: "post-sales",
  description: "Manage customer relationships after the deal closes. Handle documentation, payment tracking, and customer support seamlessly.",
  barColor: "bg-[#3B82F6]",
  icon: "🤝",
  screenImage: screenPostSales
}, {
  name: "Possession",
  slug: "possession",
  description: "Seamless handover and possession tracking. Manage property handovers, documentation, and customer satisfaction efficiently.",
  barColor: "bg-[#3B82F6]",
  icon: "🔑",
  screenImage: screenPossession
}, {
  name: "Konstruct",
  slug: "konstruct",
  description: "Track construction progress and project milestones in real-time. Monitor budgets, timelines, and resource allocation efficiently.",
  barColor: "bg-[#3B82F6]",
  icon: "🏗️",
  screenImage: screenKonstruct
}, {
  name: "Customer Portal",
  slug: "customer-portal",
  description: "Empower your customers with a self-service portal. Access documents, track payments, raise requests, and stay updated on their property journey.",
  barColor: "bg-[#3B82F6]",
  icon: "🌐",
  screenImage: screenCustomerPortal
}];

const LaptopFrame = ({
  icon,
  screenImage
}: {
  icon: string;
  screenImage?: string | null;
}) => (
  <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[480px] mx-auto">
    {/* Laptop Screen */}
    <div className="relative">
      {/* Screen bezel */}
      <div className="bg-[#1f1f1f] rounded-t-lg sm:rounded-t-xl p-[4px] sm:p-[6px] md:p-[8px] border-t border-l border-r border-[#3a3a3a]">
        {/* Camera */}
        <div className="absolute top-[2px] sm:top-[3px] md:top-[4px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] sm:w-[6px] sm:h-[6px] md:w-[8px] md:h-[8px] rounded-full bg-[#2a2a2a] border border-[#444]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.5px] h-[1.5px] sm:w-[2px] sm:h-[2px] md:w-[3px] md:h-[3px] rounded-full bg-[#1a3a5c]" />
        </div>
        {/* Screen content */}
        <div className="bg-white rounded-[3px] sm:rounded-[4px] aspect-[16/10] overflow-hidden">
          {screenImage ? (
            <img
              src={screenImage}
              alt="Screen preview"
              className="w-full h-full object-cover object-top bg-white"
              style={{ imageRendering: 'crisp-edges' }}
            />
          ) : (
            <div className="flex items-center justify-center h-full p-3 sm:p-6 md:p-8 bg-gradient-to-b from-[#e8f4fc] to-[#d4e8f5]">
              <p className="font-serif text-[9px] sm:text-sm md:text-lg lg:text-xl text-[#1a3a5c] text-center leading-snug italic" />
            </div>
          )}
        </div>
      </div>

      {/* Laptop bottom hinge */}
      <div className="relative h-[5px] sm:h-[8px] md:h-[10px] bg-gradient-to-b from-[#2a2a2a] to-[#1f1f1f] rounded-b-sm">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[35px] sm:w-[50px] md:w-[70px] h-[2px] sm:h-[3px] md:h-[4px] bg-[#444] rounded-t-sm" />
      </div>

      {/* Laptop base/keyboard */}
      <div className="relative mx-[-5px] sm:mx-[-8px] md:mx-[-12px]">
        <div className="h-[4px] sm:h-[6px] md:h-[8px] bg-gradient-to-b from-[#3a3a3a] to-[#2a2a2a] rounded-b-lg sm:rounded-b-xl border-b border-l border-r border-[#444]" />
      </div>
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
        const progress = scrolledIntoContainer / scrollableHeight * cards.length;
        setScrollProgress(Math.min(cards.length, Math.max(0, progress)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="features" ref={containerRef} className="relative min-h-[500vh] sm:min-h-[600vh] pt-6 sm:pt-8 pb-16 sm:pb-20">
      <div className="sticky top-16 flex flex-col items-center px-3 sm:px-4 md:px-6 overflow-hidden">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 animate-fade-in">
          <span className="text-[10px] sm:text-xs font-medium tracking-wider text-foreground/60 uppercase">
            PRODUCT & FEATURES
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-2 sm:mb-3 md:mb-4 mt-1.5 sm:mt-2">
            Our Powerful Modules
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2 sm:px-4">
            Everything you need to manage your operations, all in one place
          </p>
        </div>

        {/* Stacked Cards Container */}
        <div className="relative w-full max-w-5xl h-[380px] sm:h-[360px] md:h-[420px] overflow-hidden">
          {cards.map((card, index) => {
            const cardProgress = scrollProgress - index;
            const isStacked = cardProgress >= 1;
            const isUpcoming = cardProgress < 0;

            let translateY = 0;
            let scale = 1;
            let opacity = 1;

            if (index === 0) {
              if (isStacked) {
                const fadeProgress = Math.min(cardProgress - 1, 0.5) * 2;
                translateY = -fadeProgress * 80;
                scale = 1 - fadeProgress * 0.15;
                opacity = 1 - fadeProgress;
              }
            } else if (isUpcoming) {
              translateY = cardHeight + 100;
              opacity = 0;
              scale = 0.7;
            } else if (cardProgress >= 0 && cardProgress < 1) {
              const easeProgress = 1 - Math.pow(1 - cardProgress, 3);
              translateY = (1 - easeProgress) * (cardHeight + 100);
              scale = 0.7 + easeProgress * 0.3;
              opacity = easeProgress;
            } else if (isStacked) {
              const fadeProgress = Math.min(cardProgress - 1, 0.5) * 2;
              translateY = -fadeProgress * 80;
              scale = 1 - fadeProgress * 0.15;
              opacity = 1 - fadeProgress;
            }

            if (opacity <= 0) return null;

            return (
              <div
                key={card.name}
                className="absolute inset-0 w-full will-change-transform transition-all duration-100 ease-out"
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  zIndex: cards.length - index + (cardProgress >= 0 ? 10 : 0),
                  opacity
                }}
              >
                {/* Main Card */}
                <div className="bg-[rgba(248,250,252,0.95)] backdrop-blur-[20px] rounded-xl sm:rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white h-full">
                  <div className="relative h-[380px] sm:h-[360px] md:h-[420px] flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 md:p-10 overflow-hidden">
                    {/* Decorative gradient circles */}
                    <div className={cn("absolute -top-20 -right-20 w-40 sm:w-72 h-40 sm:h-72 rounded-full opacity-30 blur-3xl", card.barColor)} />
                    <div className={cn("absolute -bottom-20 -left-20 w-32 sm:w-56 h-32 sm:h-56 rounded-full opacity-20 blur-2xl", card.barColor)} />

                    {/* Left Side - Text */}
                    <div className="flex-1 text-center sm:text-left mb-3 sm:mb-0 max-w-md relative z-10">
                      <h3 className="text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 text-gray-800 font-normal">
                        {card.name}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed line-clamp-4 sm:line-clamp-3 md:line-clamp-none">
                        {card.description}
                      </p>
                      <div className="flex mt-3 sm:mt-4 md:mt-6 justify-center sm:justify-start">
                        <Link
                          to={`/module/${card.slug}`}
                          className="px-5 sm:px-6 py-2.5 rounded-full font-medium transition-all duration-300 text-white text-sm sm:text-base bg-[#3B82F6] hover:bg-[#2563EB] hover:scale-105 hover:shadow-lg shadow-md inline-block touch-manipulation min-h-[44px] flex items-center"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>

                    {/* Right Side - Laptop Frame - visible on all screens */}
                    <div className="flex-shrink-0 relative z-10 w-full sm:w-auto mt-2 sm:mt-0">
                      <LaptopFrame icon={card.icon} screenImage={card.screenImage} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-1.5 sm:gap-2 mt-10 sm:mt-16">
          {cards.map((card, index) => {
            const isCurrent = scrollProgress >= index && scrollProgress < index + 1;
            const isPast = scrollProgress >= index + 1;
            return (
              <div
                key={card.name}
                className={cn(
                  "h-1.5 sm:h-2 rounded-full transition-all duration-300",
                  isCurrent ? "w-8 sm:w-10 bg-primary" : isPast ? "w-1.5 sm:w-2 bg-primary/60" : "w-1.5 sm:w-2 bg-muted-foreground/30"
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
