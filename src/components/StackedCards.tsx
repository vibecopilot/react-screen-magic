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

// Floating icon positions around the laptop with 3D depth
const floatingPositions = [
  { top: "-15%", right: "-18%", delay: "0s", z: 30 },
  { top: "15%", right: "-25%", delay: "0.3s", z: 50 },
  { bottom: "5%", right: "-20%", delay: "0.6s", z: 20 },
  { top: "-8%", left: "-15%", delay: "0.9s", z: 40 },
  { bottom: "15%", left: "-20%", delay: "1.2s", z: 25 },
];

const FloatingIcon = ({ 
  Icon, 
  position, 
  color,
  parallaxOffset 
}: { 
  Icon: LucideIcon; 
  position: { top?: string; bottom?: string; left?: string; right?: string; delay: string; z: number };
  color: string;
  parallaxOffset: number;
}) => (
  <div 
    className="absolute transition-transform duration-700 ease-out"
    style={{ 
      top: position.top, 
      bottom: position.bottom, 
      left: position.left, 
      right: position.right,
      transform: `translateZ(${position.z}px) translateY(${parallaxOffset * (position.z / 30)}px)`,
      animationDelay: position.delay,
    }}
  >
    <div 
      className={cn(
        "p-3 md:p-4 rounded-2xl backdrop-blur-md shadow-2xl border border-white/50",
        "bg-white/80 animate-float-3d"
      )}
      style={{ animationDelay: position.delay }}
    >
      <Icon className={cn("w-5 h-5 md:w-6 md:h-6", color.replace("bg-", "text-"))} />
    </div>
  </div>
);

const PhoneFrame = ({ icon, mobileImage, parallaxOffset }: { icon: string; mobileImage?: string | null; parallaxOffset: number }) => (
  <div 
    className="w-[100px] md:w-[130px] bg-[#1a1a2e] rounded-[24px] p-1.5 border-4 border-[#2d2d44] shadow-2xl transition-transform duration-500"
    style={{
      transform: `perspective(1000px) rotateY(-8deg) rotateX(2deg) translateY(${parallaxOffset * 0.3}px)`,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.1)',
    }}
  >
    {/* Notch */}
    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#1a1a2e] rounded-b-xl z-10" />
    {/* Screen */}
    <div className="bg-white rounded-[18px] aspect-[9/19] flex items-center justify-center overflow-hidden">
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

const LaptopFrame = ({ 
  icon, 
  floatingIcons, 
  barColor, 
  screenImage, 
  mobileImage,
  parallaxOffset,
  cardProgress 
}: { 
  icon: string; 
  floatingIcons: LucideIcon[]; 
  barColor: string; 
  screenImage?: string | null; 
  mobileImage?: string | null;
  parallaxOffset: number;
  cardProgress: number;
}) => {
  // 3D rotation based on scroll progress
  const rotateY = -5 + (cardProgress * 3);
  const rotateX = 3 - (cardProgress * 2);
  const scale = 0.95 + (cardProgress * 0.05);

  return (
    <div 
      className="relative w-[340px] md:w-[480px] transition-transform duration-700 ease-out"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Floating Icons with parallax */}
      {floatingIcons.map((IconComponent, index) => (
        <FloatingIcon 
          key={index} 
          Icon={IconComponent} 
          position={floatingPositions[index]} 
          color={barColor}
          parallaxOffset={parallaxOffset}
        />
      ))}
      
      {/* Laptop with 3D perspective */}
      <div
        className="transition-transform duration-700 ease-out"
        style={{
          transform: `perspective(1200px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale}) translateY(${parallaxOffset * 0.15}px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Laptop Screen */}
        <div 
          className="relative bg-[#1a1a2e] rounded-t-2xl p-2 border-4 border-[#2d2d44]"
          style={{
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
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
        
        {/* Laptop Base with 3D effect */}
        <div 
          className="relative h-5 bg-gradient-to-b from-[#2d2d44] to-[#1a1a2e] rounded-b-xl"
          style={{ transform: 'translateZ(-5px)' }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-2 bg-[#3d3d54] rounded-t-full" />
        </div>
        
        {/* Laptop Stand */}
        <div className="h-1.5 bg-[#1a1a2e] mx-8 rounded-b-lg shadow-lg" />
      </div>

      {/* iPhone Frame - Bottom Right with 3D */}
      <div 
        className="absolute -bottom-6 -right-6 md:-right-10 z-20"
        style={{ 
          transform: `translateZ(60px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <PhoneFrame icon={icon} mobileImage={mobileImage} parallaxOffset={parallaxOffset} />
      </div>
    </div>
  );
};

const StackedCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardHeight = 600;

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

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative min-h-[650vh] pt-8 pb-20"
      style={{ perspective: '1500px' }}
    >
      <div className="sticky top-16 flex flex-col items-center px-4 md:px-6 overflow-hidden">
        {/* Section Header with parallax */}
        <div 
          className="text-center mb-12 transition-transform duration-500"
          style={{
            transform: `translateY(${scrollProgress * -5}px)`,
          }}
        >
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

        {/* 3D Stacked Cards Container */}
        <div 
          className="relative w-full max-w-6xl h-[600px]"
          style={{ 
            perspective: '1500px',
            transformStyle: 'preserve-3d',
          }}
        >
          {cards.map((card, index) => {
            const cardStartProgress = index;
            
            // Progress for this specific card
            const thisCardProgress = index === 0 
              ? 1 
              : Math.min(1, Math.max(0, scrollProgress - cardStartProgress + 1));
            
            // 3D transform calculations
            const translateY = index === 0 ? 0 : (1 - thisCardProgress) * cardHeight;
            const translateZ = thisCardProgress * 20 - 10;
            const rotateX = (1 - thisCardProgress) * 5;
            const scale = 0.95 + (thisCardProgress * 0.05);
            
            // Parallax offset for internal elements
            const parallaxOffset = (scrollProgress - index) * 30;
            
            // Mouse-based subtle 3D tilt
            const mouseRotateX = mousePos.y * 2;
            const mouseRotateY = mousePos.x * 2;
            
            const isInView = index === 0 || scrollProgress >= index - 1;
            const zIndex = index + 1;
            
            // Opacity with smooth fade
            const opacity = isInView ? Math.min(1, thisCardProgress * 1.5) : 0;

            return (
              <div
                key={card.name}
                className="absolute inset-0 w-full will-change-transform transition-all duration-700 ease-out"
                style={{
                  transform: `
                    translateY(${isInView ? translateY : cardHeight * 1.2}px) 
                    translateZ(${translateZ}px) 
                    rotateX(${rotateX + mouseRotateX}deg) 
                    rotateY(${mouseRotateY}deg)
                    scale(${scale})
                  `,
                  zIndex,
                  opacity,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Main Card - Enhanced glass effect */}
                <div 
                  className="bg-white/50 backdrop-blur-2xl rounded-3xl border border-white/60 h-full overflow-hidden"
                  style={{
                    boxShadow: `
                      0 25px 80px -20px rgba(0, 0, 0, 0.15),
                      0 10px 30px -10px rgba(0, 0, 0, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.6)
                    `,
                  }}
                >
                  {/* Card Content */}
                  <div className="relative h-[600px] flex flex-col md:flex-row items-center justify-between p-10 md:p-16 overflow-hidden">
                    {/* Animated gradient orbs */}
                    <div 
                      className={cn("absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-40 blur-3xl transition-transform duration-1000", card.barColor)}
                      style={{ transform: `translate(${parallaxOffset * 0.5}px, ${parallaxOffset * -0.3}px)` }}
                    />
                    <div 
                      className={cn("absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-25 blur-3xl transition-transform duration-1000", card.barColor)}
                      style={{ transform: `translate(${parallaxOffset * -0.3}px, ${parallaxOffset * 0.4}px)` }}
                    />

                    {/* Left Side - Text with parallax */}
                    <div 
                      className="flex-1 text-center md:text-left mb-6 md:mb-0 max-w-lg relative z-10 transition-transform duration-500"
                      style={{ transform: `translateX(${parallaxOffset * -0.1}px)` }}
                    >
                      <div 
                        className={cn("inline-flex items-center gap-3 rounded-2xl px-6 py-4 mb-6 backdrop-blur-md shadow-lg", card.barColor + '/15')}
                        style={{ 
                          border: '1px solid rgba(255,255,255,0.5)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                        }}
                      >
                        <span className="text-4xl md:text-5xl">{card.icon}</span>
                      </div>
                      <h3 className="text-4xl md:text-6xl font-serif font-bold mb-5 text-gray-800">
                        {card.name}
                      </h3>
                      <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                        {card.description}
                      </p>
                      <div className="flex gap-4 mt-8 justify-center md:justify-start">
                        <button 
                          className={cn(
                            "px-8 py-4 rounded-full font-semibold transition-all duration-300 text-white text-lg",
                            card.barColor,
                            "hover:scale-105 hover:shadow-xl"
                          )}
                          style={{
                            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.3)',
                          }}
                        >
                          Get Started
                        </button>
                        <button 
                          className="px-8 py-4 rounded-full font-semibold transition-all duration-300 text-gray-700 text-lg bg-white/70 backdrop-blur-md border border-white/80 hover:bg-white hover:scale-105"
                          style={{
                            boxShadow: '0 8px 30px -10px rgba(0,0,0,0.1)',
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>

                    {/* Right Side - 3D Laptop Frame */}
                    <div 
                      className="flex-shrink-0 hidden md:block relative z-10"
                      style={{ 
                        transformStyle: 'preserve-3d',
                        transform: `translateX(${parallaxOffset * 0.15}px)`,
                      }}
                    >
                      <LaptopFrame 
                        icon={card.icon} 
                        floatingIcons={card.floatingIcons} 
                        barColor={card.barColor} 
                        screenImage={card.screenImage} 
                        mobileImage={card.mobileImage}
                        parallaxOffset={parallaxOffset}
                        cardProgress={thisCardProgress}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-3 mt-20">
          {cards.map((card, index) => {
            const isCurrent = scrollProgress >= index && scrollProgress < index + 1;
            const isPast = scrollProgress >= index + 1;
            return (
              <div
                key={card.name}
                className={cn(
                  "h-2 rounded-full transition-all duration-500 ease-out",
                  isCurrent 
                    ? "w-12 bg-primary shadow-lg" 
                    : isPast 
                      ? "w-2 bg-primary/50" 
                      : "w-2 bg-muted-foreground/20"
                )}
                style={{
                  boxShadow: isCurrent ? '0 0 15px rgba(0,0,0,0.2)' : 'none',
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StackedCards;
