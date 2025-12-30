import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { BarChart3, Search, Users, FileText, TrendingUp, Settings, Bell, Calendar, Mail, PieChart, LucideIcon } from "lucide-react";
import screenPresales from "@/assets/screen-presales.png";
import screenPresalesMobile from "@/assets/screen-presales-mobile.png";

const cards = [
  {
    name: "Pre Sales",
    description: "Streamline your lead management and inquiry handling with powerful CRM tools. Track prospects, manage follow-ups, and convert leads faster than ever.",
    barColor: "bg-[#4A9FE8]",
    icon: "📊",
    floatingIcons: [BarChart3, TrendingUp, Users, Search, PieChart] as LucideIcon[],
    screenImage: screenPresales,
    mobileImage: screenPresalesMobile,
  },
  {
    name: "Post Sales",
    description: "Manage customer relationships after the deal closes. Handle documentation, payment tracking, and customer support seamlessly.",
    barColor: "bg-[#10B981]",
    icon: "🤝",
    floatingIcons: [FileText, Users, Mail, Bell, Calendar] as LucideIcon[],
    screenImage: null,
    mobileImage: null as string | null,
  },
  {
    name: "Konstruct",
    description: "Track construction progress and project milestones in real-time. Monitor budgets, timelines, and resource allocation efficiently.",
    barColor: "bg-[#F59E0B]",
    icon: "🏗️",
    floatingIcons: [Calendar, Settings, BarChart3, FileText, TrendingUp] as LucideIcon[],
    screenImage: null,
    mobileImage: null as string | null,
  },
  {
    name: "VibeCopilot",
    description: "AI-powered assistant for your daily operations. Get intelligent insights, automate repetitive tasks, and boost productivity.",
    barColor: "bg-[#8B5CF6]",
    icon: "🤖",
    floatingIcons: [Search, TrendingUp, PieChart, Settings, Bell] as LucideIcon[],
    screenImage: null,
    mobileImage: null as string | null,
  },
  {
    name: "HRMS",
    description: "Complete human resource management solution. Manage employees, payroll, attendance, and performance all in one place.",
    barColor: "bg-[#EF4444]",
    icon: "👥",
    floatingIcons: [Users, Calendar, FileText, Mail, Settings] as LucideIcon[],
    screenImage: null,
    mobileImage: null as string | null,
  },
  {
    name: "Possession",
    description: "Seamless handover and possession tracking. Manage property handovers, documentation, and customer satisfaction efficiently.",
    barColor: "bg-[#6366F1]",
    icon: "🔑",
    floatingIcons: [FileText, Calendar, Bell, Users, TrendingUp] as LucideIcon[],
    screenImage: null,
    mobileImage: null as string | null,
  },
];

// Floating icon positions around the laptop
const floatingPositions = [
  { top: "-10%", right: "-15%", delay: "0s" },
  { top: "20%", right: "-20%", delay: "0.5s" },
  { bottom: "10%", right: "-15%", delay: "1s" },
  { top: "-5%", left: "-10%", delay: "1.5s" },
  { bottom: "20%", left: "-15%", delay: "2s" },
];

const FloatingIcon = ({ 
  Icon, 
  position, 
  color 
}: { 
  Icon: LucideIcon; 
  position: { top?: string; bottom?: string; left?: string; right?: string; delay: string };
  color: string;
}) => (
  <div 
    className="absolute animate-float"
    style={{ 
      top: position.top, 
      bottom: position.bottom, 
      left: position.left, 
      right: position.right,
      animationDelay: position.delay,
    }}
  >
    <div className={cn(
      "p-3 rounded-xl backdrop-blur-md shadow-lg border border-white/40",
      "bg-white/70"
    )}>
      <Icon className={cn("w-6 h-6", color.replace("bg-", "text-"))} />
    </div>
  </div>
);

const PhoneFrame = ({ icon, mobileImage }: { icon: string; mobileImage?: string | null }) => (
  <div className="w-[90px] md:w-[120px] bg-[#1a1a2e] rounded-[20px] p-1.5 border-4 border-[#2d2d44] shadow-xl">
    {/* Notch */}
    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#1a1a2e] rounded-b-xl z-10" />
    {/* Screen */}
    <div className="bg-white rounded-[14px] aspect-[9/19] flex items-center justify-center overflow-hidden">
      {mobileImage ? (
        <img 
          src={mobileImage} 
          alt="Mobile preview" 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center gap-2 p-2">
          <span className="text-2xl md:text-3xl">{icon}</span>
          <div className="w-8 h-1 bg-slate-300 rounded" />
          <div className="w-6 h-1 bg-slate-300 rounded" />
        </div>
      )}
    </div>
    {/* Home indicator */}
    <div className="w-8 h-1 bg-[#3d3d54] rounded-full mx-auto mt-1" />
  </div>
);

const LaptopFrame = ({ icon, floatingIcons, barColor, screenImage, mobileImage }: { icon: string; floatingIcons: LucideIcon[]; barColor: string; screenImage?: string | null; mobileImage?: string | null }) => (
  <div className="relative w-[320px] md:w-[450px]">
    {/* Floating Icons */}
    {floatingIcons.map((IconComponent, index) => (
      <FloatingIcon 
        key={index} 
        Icon={IconComponent} 
        position={floatingPositions[index]} 
        color={barColor}
      />
    ))}
    
    {/* Laptop Screen */}
    <div className="relative bg-[#1a1a2e] rounded-t-2xl p-2 border-4 border-[#2d2d44]">
      {/* Screen bezel */}
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#2d2d44]" />
      {/* Screen content */}
      <div className="bg-white rounded-lg aspect-[16/10] flex items-center justify-center overflow-hidden">
        {screenImage ? (
          <img 
            src={screenImage} 
            alt="Screen preview" 
            className="w-full h-full object-contain bg-white"
          />
        ) : (
          <div className="flex flex-col items-center gap-4 p-4">
            <span className="text-7xl md:text-8xl">{icon}</span>
            <div className="flex gap-2">
              <div className="w-20 h-3 bg-slate-300 rounded" />
              <div className="w-14 h-3 bg-slate-300 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-blue-200 rounded-lg" />
              <div className="w-12 h-12 bg-green-200 rounded-lg" />
              <div className="w-12 h-12 bg-purple-200 rounded-lg" />
            </div>
          </div>
        )}
      </div>
    </div>
    {/* Laptop Base */}
    <div className="relative h-4 bg-gradient-to-b from-[#2d2d44] to-[#1a1a2e] rounded-b-xl">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-[#3d3d54] rounded-t-full" />
    </div>
    {/* Laptop Stand */}
    <div className="h-1 bg-[#1a1a2e] mx-6 rounded-b-lg" />

    {/* iPhone Frame - Bottom Right */}
    <div className="absolute -bottom-4 -right-8 md:-right-12 z-20 animate-float" style={{ animationDelay: "0.5s" }}>
      <PhoneFrame icon={icon} mobileImage={mobileImage} />
    </div>
  </div>
);

const StackedCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cardHeight = 550; // Height of each card

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
        // Progress from 0 to cards.length
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
        <div className="relative w-full max-w-6xl h-[550px]">
          {cards.map((card, index) => {
            // Calculate how much this card should move based on scroll
            // Each card starts at bottom and slides up to cover the previous card
            const cardStartProgress = index; // When this card starts moving
            const cardEndProgress = index + 1; // When this card is fully in position
            
            // Progress for this specific card (0 = at bottom, 1 = fully visible)
            // First card starts fully visible (translateY = 0)
            const thisCardProgress = index === 0 
              ? 1 
              : Math.min(1, Math.max(0, scrollProgress - cardStartProgress + 1));
            
            // How far up to translate (from bottom to top)
            const translateY = index === 0 ? 0 : (1 - thisCardProgress) * cardHeight;
            
            // Cards that haven't started should be below viewport (except first card)
            const isInView = index === 0 || scrollProgress >= index - 1;
            
            // Z-index: later cards stack on top
            const zIndex = index + 1;

            return (
              <div
                key={card.name}
                className="absolute inset-0 w-full will-change-transform"
                style={{
                  transform: `translateY(${isInView ? translateY : cardHeight}px)`,
                  zIndex,
                  opacity: isInView ? 1 : 0,
                }}
              >
                {/* Main Card - Glassmorphism with opaque background */}
                <div className="bg-[rgba(248,250,252,0.85)] backdrop-blur-[20px] rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white h-full">
                  {/* Card Content */}
                  <div className="relative h-[550px] flex flex-col md:flex-row items-center justify-between p-10 md:p-16 overflow-hidden">
                    {/* Decorative gradient circles */}
                    <div className={cn("absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-30 blur-3xl", card.barColor)} />
                    <div className={cn("absolute -bottom-20 -left-20 w-56 h-56 rounded-full opacity-20 blur-2xl", card.barColor)} />

                    {/* Left Side - Text */}
                    <div className="flex-1 text-center md:text-left mb-6 md:mb-0 max-w-lg relative z-10">
                      <div className={cn("inline-flex items-center gap-3 rounded-xl px-5 py-3 mb-6 backdrop-blur-sm", card.barColor + '/20')}>
                        <span className="text-4xl">{card.icon}</span>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-serif font-bold mb-5 text-gray-800">
                        {card.name}
                      </h3>
                      <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                        {card.description}
                      </p>
                      <div className="flex gap-4 mt-8 justify-center md:justify-start">
                        <button className={cn(
                          "px-8 py-3 rounded-full font-medium transition-all duration-300 text-white text-lg",
                          card.barColor,
                          "hover:opacity-90 hover:scale-105 shadow-lg"
                        )}>
                          Get Started
                        </button>
                        <button className="px-8 py-3 rounded-full font-medium transition-all duration-300 text-gray-700 text-lg bg-white/60 backdrop-blur-sm border border-white/80 hover:bg-white/80 hover:scale-105">
                          View Details
                        </button>
                      </div>
                    </div>

                    {/* Right Side - Laptop Frame */}
                    <div className="flex-shrink-0 hidden md:block relative z-10">
                      <LaptopFrame icon={card.icon} floatingIcons={card.floatingIcons} barColor={card.barColor} screenImage={card.screenImage} mobileImage={card.mobileImage} />
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
