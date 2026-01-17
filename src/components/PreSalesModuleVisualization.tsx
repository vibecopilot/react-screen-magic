import { useState } from "react";
import { Users, Handshake, FileSpreadsheet, ClipboardCheck, UserCog, Layers } from "lucide-react";

interface Module {
  id: string;
  name: string;
  icon: React.ReactNode;
  tooltip: string;
  position: { x: number; y: number };
}

const modules: Module[] = [
  {
    id: "lead",
    name: "Lead Management",
    icon: <Users className="w-6 h-6" />,
    tooltip: "Capture and manage sales leads efficiently.",
    position: { x: 50, y: 8 },
  },
  {
    id: "cp",
    name: "CP Management",
    icon: <Handshake className="w-6 h-6" />,
    tooltip: "Organize and track channel partner activities.",
    position: { x: 15, y: 30 },
  },
  {
    id: "costsheet",
    name: "Cost Sheet Management",
    icon: <FileSpreadsheet className="w-6 h-6" />,
    tooltip: "Create and control pricing and cost sheets.",
    position: { x: 85, y: 30 },
  },
  {
    id: "booking",
    name: "Booking Approval",
    icon: <ClipboardCheck className="w-6 h-6" />,
    tooltip: "Review and approve bookings with ease.",
    position: { x: 20, y: 70 },
  },
  {
    id: "sales",
    name: "Sales Executive Management",
    icon: <UserCog className="w-6 h-6" />,
    tooltip: "Manage sales teams and assignments.",
    position: { x: 80, y: 70 },
  },
];

const PreSalesModuleVisualization = () => {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  return (
    <div className="relative w-full min-h-[600px] bg-gradient-to-br from-sky-50 via-white to-blue-50 rounded-3xl overflow-hidden">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Connection lines SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(147, 197, 253, 0.3)" />
          </linearGradient>
        </defs>
        
        {/* Animated connection paths */}
        {modules.map((module, index) => (
          <g key={module.id}>
            <path
              d={`M 50% 50% Q ${module.position.x}% 50% ${module.position.x}% ${module.position.y}%`}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="8 4"
              className="animate-pulse"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: '3s',
              }}
            />
            {/* Animated dot */}
            <circle r="4" fill="rgba(59, 130, 246, 0.6)">
              <animateMotion
                dur={`${3 + index * 0.5}s`}
                repeatCount="indefinite"
                path={`M ${50 * 6} ${50 * 6} Q ${module.position.x * 6} ${50 * 6} ${module.position.x * 6} ${module.position.y * 6}`}
              />
            </circle>
          </g>
        ))}
      </svg>

      {/* Central Core Platform Node */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        style={{ animation: 'float 4s ease-in-out infinite' }}
      >
        <div className="relative">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-xl shadow-blue-200/50 flex flex-col items-center justify-center text-white">
            <Layers className="w-10 h-10 mb-2" />
            <span className="text-sm font-semibold text-center px-2">Core Platform</span>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-blue-400/20 blur-xl -z-10 scale-110" />
        </div>
      </div>

      {/* Module Cards */}
      {modules.map((module, index) => (
        <div
          key={module.id}
          className="absolute z-10"
          style={{
            left: `${module.position.x}%`,
            top: `${module.position.y}%`,
            transform: 'translate(-50%, -50%)',
            animation: `float ${3 + index * 0.3}s ease-in-out infinite`,
            animationDelay: `${index * 0.2}s`,
          }}
          onMouseEnter={() => setHoveredModule(module.id)}
          onMouseLeave={() => setHoveredModule(null)}
        >
          <div
            className={`
              relative p-6 rounded-xl bg-white border border-slate-100
              transition-all duration-300 ease-out cursor-pointer
              ${hoveredModule === module.id 
                ? 'shadow-xl shadow-blue-100/50 border-blue-300 -translate-y-2 scale-105' 
                : 'shadow-lg shadow-slate-100/50 hover:shadow-xl'
              }
            `}
          >
            {/* Icon */}
            <div 
              className={`
                w-12 h-12 rounded-lg flex items-center justify-center mb-3 mx-auto
                transition-colors duration-300
                ${hoveredModule === module.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-slate-100 text-slate-600'
                }
              `}
            >
              {module.icon}
            </div>
            
            {/* Name */}
            <p className="text-sm font-medium text-slate-700 text-center whitespace-nowrap">
              {module.name}
            </p>

            {/* Tooltip */}
            <div 
              className={`
                absolute left-1/2 -translate-x-1/2 -bottom-16 w-52 p-3 rounded-lg
                bg-slate-800 text-white text-xs text-center
                transition-all duration-200 pointer-events-none
                ${hoveredModule === module.id 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-2'
                }
              `}
            >
              {module.tooltip}
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-slate-800" />
            </div>
          </div>
        </div>
      ))}

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default PreSalesModuleVisualization;
