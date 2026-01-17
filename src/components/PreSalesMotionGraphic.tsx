import { useEffect, useState } from "react";
import { 
  UserCheck, 
  Handshake, 
  Calculator, 
  ClipboardCheck, 
  UserCog,
  Zap,
  RefreshCw,
  Settings
} from "lucide-react";

interface PreSalesMotionGraphicProps {
  color: string;
  selectedModule: string | null;
  onModuleSelect: (moduleId: string) => void;
}

const PreSalesMotionGraphic = ({ color, selectedModule, onModuleSelect }: PreSalesMotionGraphicProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const modules = [
    { 
      id: "lead-management", 
      Icon: UserCheck, 
      label: "Lead Management",
      position: { top: "5%", left: "50%", transform: "translateX(-50%)" },
      connectionAngle: 270
    },
    { 
      id: "cp-management", 
      Icon: Handshake, 
      label: "CP Management",
      position: { top: "35%", right: "5%" },
      connectionAngle: 0
    },
    { 
      id: "sales-executive-management", 
      Icon: UserCog, 
      label: "Sales Executive\nManagement",
      position: { bottom: "10%", right: "15%" },
      connectionAngle: 45
    },
    { 
      id: "booking-approval", 
      Icon: ClipboardCheck, 
      label: "Booking Approval",
      position: { bottom: "10%", left: "15%" },
      connectionAngle: 135
    },
    { 
      id: "cost-sheet-management", 
      Icon: Calculator, 
      label: "Cost Sheet\nManagement",
      position: { top: "35%", left: "5%" },
      connectionAngle: 180
    },
  ];

  const footerItems = [
    { Icon: Zap, label: "Seamless Automation" },
    { Icon: RefreshCw, label: "Real-Time Data Sync" },
    { Icon: Settings, label: "Customizable Solutions" },
  ];

  return (
    <div className="relative w-full h-[600px] md:h-[700px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-[100px] opacity-30 animate-pulse"
          style={{ backgroundColor: color }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[120px] opacity-20 animate-pulse"
          style={{ backgroundColor: color, animationDelay: "1s" }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[150px] opacity-10"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* SVG Connection Lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.1" />
            <stop offset="50%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0">
              <animate attributeName="offset" values="-0.2;1" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="20%" stopColor={color} stopOpacity="1">
              <animate attributeName="offset" values="0;1.2" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="40%" stopColor={color} stopOpacity="0">
              <animate attributeName="offset" values="0.2;1.4" dur="2s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        
        {/* Curved connection paths */}
        {/* Top connection */}
        <path
          d="M 50% 18% Q 50% 35% 50% 42%"
          fill="none"
          stroke="url(#lineGradient1)"
          strokeWidth="2"
          className="opacity-60"
          style={{ 
            strokeDasharray: "8 4",
            animation: "dash 20s linear infinite"
          }}
        />
        
        {/* Right top connection */}
        <path
          d="M 85% 40% Q 70% 45% 58% 50%"
          fill="none"
          stroke="url(#lineGradient1)"
          strokeWidth="2"
          className="opacity-60"
          style={{ 
            strokeDasharray: "8 4",
            animation: "dash 20s linear infinite reverse"
          }}
        />
        
        {/* Right bottom connection */}
        <path
          d="M 75% 78% Q 65% 65% 55% 55%"
          fill="none"
          stroke="url(#lineGradient1)"
          strokeWidth="2"
          className="opacity-60"
          style={{ 
            strokeDasharray: "8 4",
            animation: "dash 20s linear infinite"
          }}
        />
        
        {/* Left bottom connection */}
        <path
          d="M 25% 78% Q 35% 65% 45% 55%"
          fill="none"
          stroke="url(#lineGradient1)"
          strokeWidth="2"
          className="opacity-60"
          style={{ 
            strokeDasharray: "8 4",
            animation: "dash 20s linear infinite reverse"
          }}
        />
        
        {/* Left top connection */}
        <path
          d="M 15% 40% Q 30% 45% 42% 50%"
          fill="none"
          stroke="url(#lineGradient1)"
          strokeWidth="2"
          className="opacity-60"
          style={{ 
            strokeDasharray: "8 4",
            animation: "dash 20s linear infinite"
          }}
        />
      </svg>

      {/* Central Core Node */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ 
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.5)",
          transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}
      >
        {/* Outer glow ring */}
        <div 
          className="absolute -inset-8 rounded-full opacity-20 animate-ping"
          style={{ 
            backgroundColor: color,
            animationDuration: "3s"
          }}
        />
        
        {/* Rotating ring */}
        <div 
          className="absolute -inset-6 rounded-full border-2 border-dashed opacity-30"
          style={{ 
            borderColor: color,
            animation: "spin 20s linear infinite"
          }}
        />
        
        {/* Core diamond shape */}
        <div 
          className="relative w-28 h-28 rounded-3xl flex items-center justify-center shadow-2xl"
          style={{ 
            background: `linear-gradient(135deg, ${color}20, ${color}40)`,
            backdropFilter: "blur(10px)",
            border: `2px solid ${color}60`,
            transform: "rotate(45deg)",
            animation: "breathe 4s ease-in-out infinite"
          }}
        >
          <div style={{ transform: "rotate(-45deg)" }} className="text-center">
            <span className="text-white text-xs font-semibold tracking-wide block">CORE</span>
            <span className="text-white/70 text-[10px] block">SALES PLATFORM</span>
          </div>
        </div>
      </div>

      {/* Module Nodes */}
      {modules.map((module, index) => {
        const isSelected = selectedModule === module.id;
        return (
          <div
            key={module.id}
            className="absolute z-20 cursor-pointer group"
            style={{
              ...module.position,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "scale(1)" : "scale(0)",
              transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.15}s`
            }}
            onClick={() => onModuleSelect(module.id)}
          >
            {/* Floating animation wrapper */}
            <div 
              className="flex flex-col items-center"
              style={{
                animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                animationDelay: `${index * 0.3}s`
              }}
            >
              {/* Node circle */}
              <div 
                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isSelected ? "scale-110" : "group-hover:scale-105"
                }`}
                style={{ 
                  background: isSelected 
                    ? `linear-gradient(135deg, ${color}, ${color}cc)` 
                    : `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
                  border: `2px solid ${isSelected ? color : "rgba(255,255,255,0.2)"}`,
                  boxShadow: isSelected 
                    ? `0 0 30px ${color}60, 0 0 60px ${color}30` 
                    : "0 10px 40px rgba(0,0,0,0.3)"
                }}
              >
                {/* Pulse ring on selected */}
                {isSelected && (
                  <div 
                    className="absolute inset-0 rounded-full animate-ping opacity-30"
                    style={{ backgroundColor: color }}
                  />
                )}
                
                <module.Icon 
                  size={28} 
                  className={`transition-colors duration-300 ${
                    isSelected ? "text-white" : "text-white/80 group-hover:text-white"
                  }`}
                />
              </div>
              
              {/* Label */}
              <div 
                className={`mt-3 text-center transition-all duration-300 ${
                  isSelected ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                }`}
              >
                <span 
                  className="text-xs md:text-sm font-medium whitespace-pre-line"
                  style={{ color: isSelected ? color : "white" }}
                >
                  {module.label}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Footer Highlights */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8 md:gap-16 z-20">
        {footerItems.map((item, index) => (
          <div 
            key={index}
            className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors duration-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.5s ease-out ${0.8 + index * 0.1}s`
            }}
          >
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${color}30, ${color}10)`,
                animation: `pulse 2s ease-in-out infinite`,
                animationDelay: `${index * 0.5}s`
              }}
            >
              <item.Icon size={16} style={{ color }} />
            </div>
            <span className="text-xs md:text-sm font-medium hidden md:block">{item.label}</span>
          </div>
        ))}
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes breathe {
          0%, 100% {
            transform: rotate(45deg) scale(1);
          }
          50% {
            transform: rotate(45deg) scale(1.05);
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default PreSalesMotionGraphic;
