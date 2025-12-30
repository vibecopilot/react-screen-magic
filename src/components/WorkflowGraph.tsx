import { useEffect, useState } from "react";
import { 
  Users, 
  FileText, 
  Calendar, 
  BarChart3, 
  MessageSquare, 
  Bell,
  RefreshCw,
  CheckCircle,
  Settings
} from "lucide-react";

interface WorkflowGraphProps {
  color: string;
}

const WorkflowGraph = ({ color }: WorkflowGraphProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const leftIcons = [
    { Icon: Users, delay: 0 },
    { Icon: FileText, delay: 0.2 },
    { Icon: Calendar, delay: 0.4 },
  ];

  const rightIcons = [
    { Icon: BarChart3, delay: 0.1 },
    { Icon: MessageSquare, delay: 0.3 },
    { Icon: Bell, delay: 0.5 },
  ];

  const features = [
    { Icon: RefreshCw, label: "Seamless Automation" },
    { Icon: CheckCircle, label: "Real-Time Data Sync" },
    { Icon: Settings, label: "Customizable Solutions" },
  ];

  return (
    <div className="w-full py-8">
      {/* Workflow Diagram */}
      <div className="relative h-[400px] max-w-4xl mx-auto">
        {/* SVG Lines */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Left side lines */}
          <path
            d="M 120 80 Q 250 80 350 200"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8 4"
            className={`transition-all duration-1000 ${isVisible ? 'opacity-60' : 'opacity-0'}`}
            style={{ 
              strokeDashoffset: isVisible ? 0 : 100,
              transition: 'stroke-dashoffset 2s ease-out, opacity 0.5s ease-out'
            }}
          />
          <path
            d="M 120 200 Q 250 200 350 200"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8 4"
            className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-60' : 'opacity-0'}`}
          />
          <path
            d="M 120 320 Q 250 320 350 200"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8 4"
            className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-60' : 'opacity-0'}`}
          />
          
          {/* Right side lines */}
          <path
            d="M 450 200 Q 550 80 680 80"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8 4"
            className={`transition-all duration-1000 delay-100 ${isVisible ? 'opacity-60' : 'opacity-0'}`}
          />
          <path
            d="M 450 200 Q 550 200 680 200"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8 4"
            className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-60' : 'opacity-0'}`}
          />
          <path
            d="M 450 200 Q 550 320 680 320"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8 4"
            className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-60' : 'opacity-0'}`}
          />
        </svg>

        {/* Left Icons */}
        <div className="absolute left-4 md:left-8 top-0 h-full flex flex-col justify-around py-8">
          {leftIcons.map(({ Icon, delay }, idx) => (
            <div
              key={idx}
              className={`w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center transition-all duration-700 hover:scale-110 hover:shadow-xl`}
              style={{ 
                transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(-50px) scale(0.5)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${delay}s`
              }}
            >
              <Icon size={24} className="text-gray-700" />
            </div>
          ))}
        </div>

        {/* Center Icon */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div 
            className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-700 hover:scale-110`}
            style={{ 
              backgroundColor: color,
              transform: isVisible ? 'scale(1)' : 'scale(0)',
              opacity: isVisible ? 1 : 0,
              transitionDelay: '0.3s'
            }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded rotate-45" />
            </div>
          </div>
          
          {/* Pulse animation */}
          <div 
            className="absolute inset-0 rounded-2xl animate-ping opacity-20"
            style={{ backgroundColor: color }}
          />
        </div>

        {/* Right Icons */}
        <div className="absolute right-4 md:right-8 top-0 h-full flex flex-col justify-around py-8">
          {rightIcons.map(({ Icon, delay }, idx) => (
            <div
              key={idx}
              className={`w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center transition-all duration-700 hover:scale-110 hover:shadow-xl`}
              style={{ 
                transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.5)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${delay}s`
              }}
            >
              <Icon size={24} className="text-gray-700" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Features */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-8 px-4">
        {features.map(({ Icon, label }, idx) => (
          <div 
            key={idx}
            className={`flex items-center gap-2 text-gray-600 transition-all duration-700`}
            style={{ 
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${0.6 + idx * 0.1}s`
            }}
          >
            <div className="relative">
              <div className="absolute -left-8 top-1/2 w-6 border-t-2 border-dashed" style={{ borderColor: color, opacity: 0.4 }} />
              <Icon size={18} style={{ color }} />
            </div>
            <span className="text-sm md:text-base font-medium">{label}</span>
            {idx < features.length - 1 && (
              <div className="hidden md:block w-16 border-t-2 border-dashed ml-4" style={{ borderColor: color, opacity: 0.4 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowGraph;
