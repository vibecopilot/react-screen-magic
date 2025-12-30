import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { BarChart3, Search, Users, FileText, TrendingUp, Settings, Bell, Calendar, Mail, PieChart, LucideIcon } from "lucide-react";
import screenPresales from "@/assets/screen-presales.png";
import screenPresalesMobile from "@/assets/screen-presales-mobile.png";

const cards = [
  {
    name: "Pre Sales",
    description: "Streamline your lead management and inquiry handling with powerful CRM tools.",
    barColor: "bg-[#4A9FE8]",
    icon: "📊",
    floatingIcons: [BarChart3, TrendingUp, Users, Search, PieChart] as LucideIcon[],
    screenImage: screenPresales,
    mobileImage: screenPresalesMobile,
  },
  {
    name: "Post Sales",
    description: "Manage customer relationships after the deal closes seamlessly.",
    barColor: "bg-[#10B981]",
    icon: "🤝",
    floatingIcons: [FileText, Users, Mail, Bell, Calendar] as LucideIcon[],
    screenImage: null,
    mobileImage: null as string | null,
  },
  {
    name: "Konstruct",
    description: "Track construction progress and project milestones in real-time.",
    barColor: "bg-[#F59E0B]",
    icon: "🏗️",
    floatingIcons: [Calendar, Settings, BarChart3, FileText, TrendingUp] as LucideIcon[],
    screenImage: null,
    mobileImage: null as string | null,
  },
  {
    name: "VibeCopilot",
    description: "AI-powered assistant for your daily operations and insights.",
    barColor: "bg-[#8B5CF6]",
    icon: "🤖",
    floatingIcons: [Search, TrendingUp, PieChart, Settings, Bell] as LucideIcon[],
    screenImage: null,
    mobileImage: null as string | null,
  },
  {
    name: "HRMS",
    description: "Complete human resource management solution all in one place.",
    barColor: "bg-[#EF4444]",
    icon: "👥",
    floatingIcons: [Users, Calendar, FileText, Mail, Settings] as LucideIcon[],
    screenImage: null,
    mobileImage: null as string | null,
  },
  {
    name: "Possession",
    description: "Seamless handover and possession tracking for properties.",
    barColor: "bg-[#6366F1]",
    icon: "🔑",
    floatingIcons: [FileText, Calendar, Bell, Users, TrendingUp] as LucideIcon[],
    screenImage: null,
    mobileImage: null as string | null,
  },
];

interface CardState {
  translateY: number;
  scale: number;
  opacity: number;
  blur: number;
  isAnimating: boolean;
  animationProgress: number;
}

// Back-out easing function with configurable overshoot
const backOut = (t: number, overshoot: number = 0.6): number => {
  const c1 = 1.70158 * overshoot;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

const AnimatedCardsGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cardStates, setCardStates] = useState<CardState[]>(
    cards.map(() => ({
      translateY: 120,
      scale: 0.82,
      opacity: 0,
      blur: 12,
      isAnimating: false,
      animationProgress: 0,
    }))
  );
  const animationFrameRef = useRef<number[]>([]);
  const hasTriggeredRef = useRef<boolean[]>(cards.map(() => false));

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Calculate how far into the section we've scrolled (0 to 1)
      const viewportTrigger = windowHeight * 0.8; // 20% in viewport
      const scrollStart = viewportTrigger - sectionTop;
      const progress = Math.max(0, Math.min(1, scrollStart / (sectionHeight * 0.5)));
      
      setScrollProgress(progress);

      // Parallax effect (0.25x speed, opposite direction)
      const parallaxOffset = -scrollStart * 0.25;

      // Trigger animations for each card based on stagger
      cards.forEach((_, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const staggerDelay = (row * 3 + col) * 150; // 150ms stagger left→right, top→bottom
        
        // Card should trigger when section is 20% in viewport
        const triggerThreshold = staggerDelay / 1500; // Normalize to 0-1 range
        const shouldTrigger = progress > triggerThreshold * 0.3 + 0.1;

        if (shouldTrigger && !hasTriggeredRef.current[index]) {
          hasTriggeredRef.current[index] = true;
          animateCard(index, parallaxOffset);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      animationFrameRef.current.forEach(id => cancelAnimationFrame(id));
    };
  }, []);

  const animateCard = (index: number, parallaxOffset: number) => {
    const duration = 800; // 800ms per card
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(1, elapsed / duration);
      const easedT = backOut(t, 0.6);

      // Animation values
      // translateY: 120 → -18 (with parallax)
      const translateY = 120 - (120 + 18) * easedT + parallaxOffset * 0.25;
      
      // scale: 0.82 → 1.04 (peak at 300ms) → 1.0
      let scale: number;
      if (elapsed < 300) {
        // Scale up to 1.04
        const scaleT = elapsed / 300;
        scale = 0.82 + (1.04 - 0.82) * scaleT;
      } else {
        // Scale down to 1.0
        const scaleT = Math.min(1, (elapsed - 300) / 500);
        scale = 1.04 - (1.04 - 1.0) * scaleT;
      }
      
      // opacity: 0 → 1
      const opacity = easedT;
      
      // blur: 12 → 0
      const blur = 12 * (1 - easedT);

      setCardStates(prev => {
        const newStates = [...prev];
        newStates[index] = {
          translateY,
          scale,
          opacity,
          blur,
          isAnimating: t < 1,
          animationProgress: t,
        };
        return newStates;
      });

      if (t < 1) {
        animationFrameRef.current[index] = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current[index] = requestAnimationFrame(animate);
  };

  // Reset animation when scrolling up (for demo purposes)
  useEffect(() => {
    if (scrollProgress < 0.05) {
      hasTriggeredRef.current = cards.map(() => false);
      setCardStates(cards.map(() => ({
        translateY: 120,
        scale: 0.82,
        opacity: 0,
        blur: 12,
        isAnimating: false,
        animationProgress: 0,
      })));
    }
  }, [scrollProgress]);

  return (
    <section
      id="animated-features"
      ref={containerRef}
      className="relative py-24 px-4"
      style={{
        background: "linear-gradient(180deg, hsl(210 25% 92%) 0%, hsl(215 30% 88%) 100%)",
      }}
    >
      {/* Section Header */}
      <div className="text-center mb-16 animate-fade-in">
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

      {/* 2x3 Grid Container */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) => {
            const state = cardStates[index];
            
            return (
              <div
                key={card.name}
                className="will-change-transform"
                style={{
                  transform: `translateY(${state.translateY}px) scale(${state.scale})`,
                  opacity: state.opacity,
                  filter: `blur(${state.blur}px)`,
                  transition: state.isAnimating ? 'none' : 'all 0.3s ease-out',
                }}
              >
                {/* Card */}
                <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/60 overflow-hidden h-full">
                  {/* Color bar */}
                  <div className={cn("h-1.5 w-full", card.barColor)} />
                  
                  {/* Card Content */}
                  <div className="p-6 md:p-8">
                    {/* Icon and Title */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center text-2xl",
                        card.barColor + '/20'
                      )}>
                        {card.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-800">
                        {card.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-base leading-relaxed mb-6">
                      {card.description}
                    </p>

                    {/* Preview Image or Placeholder */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl aspect-[16/10] flex items-center justify-center overflow-hidden border border-gray-100">
                      {card.screenImage ? (
                        <img 
                          src={card.screenImage} 
                          alt={`${card.name} preview`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-3 p-4">
                          <span className="text-5xl">{card.icon}</span>
                          <div className="flex gap-2">
                            <div className={cn("w-12 h-8 rounded-lg opacity-40", card.barColor)} />
                            <div className={cn("w-8 h-8 rounded-lg opacity-30", card.barColor)} />
                            <div className={cn("w-10 h-8 rounded-lg opacity-20", card.barColor)} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <button className={cn(
                      "w-full mt-6 px-6 py-3 rounded-xl font-medium transition-all duration-300 text-white",
                      card.barColor,
                      "hover:opacity-90 hover:scale-[1.02] shadow-lg"
                    )}>
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto mt-16">
        <div className="h-1.5 bg-white/40 rounded-full overflow-hidden backdrop-blur-sm">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <p className="text-center text-sm text-muted-foreground mt-3">
          Scroll to animate cards
        </p>
      </div>
    </section>
  );
};

export default AnimatedCardsGrid;
