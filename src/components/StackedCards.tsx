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
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = containerRef.current.offsetHeight;
      const scrollableHeight = containerHeight - windowHeight;

      // Calculate how far we've scrolled into the container
      const scrolledIntoContainer = -rect.top;
      
      if (scrolledIntoContainer < 0) {
        setActiveCardIndex(0);
      } else {
        // Each card gets equal scroll distance
        const scrollPerCard = scrollableHeight / cards.length;
        const newIndex = Math.floor(scrolledIntoContainer / scrollPerCard);
        setActiveCardIndex(Math.min(cards.length - 1, Math.max(0, newIndex)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[400vh] py-20 bg-gradient-to-b from-background via-muted/20 to-background"
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
        <div className="relative w-full max-w-5xl h-[420px] md:h-[480px]">
          {cards.map((card, index) => {
            const isVisible = index <= activeCardIndex;
            const isActive = index === activeCardIndex;
            const stackOffset = (activeCardIndex - index) * 8;

            return (
              <div
                key={card.name}
                className={cn(
                  "absolute inset-0 w-full overflow-hidden transition-all duration-700 ease-out"
                )}
                style={{
                  transform: isVisible 
                    ? `translateY(-${stackOffset}px)` 
                    : "translateY(100px)",
                  opacity: isVisible ? 1 : 0,
                  zIndex: isVisible ? cards.length - (activeCardIndex - index) : 0,
                }}
              >

                {/* Main Card - White with popup shadow and rounded corners */}
                <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]">
                  {/* Card Content */}
                  <div className="relative h-[380px] md:h-[440px] flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
                    {/* Decorative Circle */}
                    <div className={cn("absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10", card.barColor)} />

                    {/* Left Side - Text */}
                    <div className="flex-1 text-center md:text-left mb-6 md:mb-0 max-w-md">
                      <div className={cn("inline-flex items-center gap-3 rounded-xl px-4 py-2 mb-6 bg-opacity-20", card.barColor.replace('bg-', 'bg-') + '/20')}>
                        <span className="text-3xl">{card.icon}</span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-900">
                        {card.name}
                      </h3>
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        {card.description}
                      </p>
                      <button className={cn(
                        "mt-6 px-6 py-2 rounded-full font-medium transition-colors duration-300 text-white",
                        card.barColor,
                        "hover:opacity-90"
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
        <div className="flex gap-2 mt-12">
          {cards.map((card, index) => {
            const isActive = index <= activeCardIndex;
            const isCurrent = index === activeCardIndex;
            return (
              <div
                key={card.name}
                className={cn(
                  "h-2 rounded-full transition-all duration-500",
                  isCurrent ? "w-8 bg-primary" : isActive ? "w-2 bg-primary/60" : "w-2 bg-muted-foreground/30"
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
