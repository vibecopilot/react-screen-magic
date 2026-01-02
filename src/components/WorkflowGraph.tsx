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
  showTooltips?: boolean;
}

const WorkflowGraph = ({ color, showTooltips = false }: WorkflowGraphProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const leftIcons = [
    { Icon: Users, delay: 0, tooltip: "Lead Management" },
    { Icon: FileText, delay: 0.2, tooltip: "CP Management" },
    { Icon: Calendar, delay: 0.4, tooltip: null },
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
      {/* CSS Animations */}
      <style>{`
        @keyframes flowLeft {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes flowRight {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 24; }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatDown {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        @keyframes tooltipSlideIn {
          0% { 
            opacity: 0; 
            transform: translateX(-10px) scale(0.9); 
          }
          100% { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }
        @keyframes tooltipBounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .flow-line-left {
          animation: flowLeft 1.5s linear infinite;
        }
        .flow-line-right {
          animation: flowRight 1.5s linear infinite;
        }
        .float-1 {
          animation: floatUp 3s ease-in-out infinite;
        }
        .float-2 {
          animation: floatDown 3.5s ease-in-out infinite;
        }
        .float-3 {
          animation: floatUp 4s ease-in-out infinite;
        }
        .center-pulse {
          animation: pulse 2s ease-in-out infinite, glow 2s ease-in-out infinite;
        }
        .inner-rotate {
          animation: rotate 8s linear infinite;
        }
        .tooltip-animate {
          animation: tooltipSlideIn 0.3s ease-out forwards, tooltipBounce 2s ease-in-out 0.3s infinite;
        }
      `}</style>

      {/* Workflow Diagram */}
      <div className="relative h-[400px] max-w-4xl mx-auto">
        {/* SVG Lines */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Left side lines - flowing towards center */}
          <path
            d="M 120 80 Q 250 80 350 200"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8 4"
            className={`flow-line-right ${isVisible ? 'opacity-60' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.5s ease-out' }}
          />
          <path
            d="M 120 200 Q 250 200 350 200"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8 4"
            className={`flow-line-right ${isVisible ? 'opacity-60' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.5s ease-out', transitionDelay: '0.2s' }}
          />
          <path
            d="M 120 320 Q 250 320 350 200"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8 4"
            className={`flow-line-right ${isVisible ? 'opacity-60' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.5s ease-out', transitionDelay: '0.4s' }}
          />
          
          {/* Right side lines - flowing away from center */}
          <path
            d="M 450 200 Q 550 80 680 80"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8 4"
            className={`flow-line-right ${isVisible ? 'opacity-60' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.5s ease-out', transitionDelay: '0.1s' }}
          />
          <path
            d="M 450 200 Q 550 200 680 200"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8 4"
            className={`flow-line-right ${isVisible ? 'opacity-60' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.5s ease-out', transitionDelay: '0.3s' }}
          />
          <path
            d="M 450 200 Q 550 320 680 320"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8 4"
            className={`flow-line-right ${isVisible ? 'opacity-60' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.5s ease-out', transitionDelay: '0.5s' }}
          />
        </svg>

        {/* Left Icons */}
        <div className="absolute left-4 md:left-8 top-0 h-full flex flex-col justify-around py-8">
          {leftIcons.map(({ Icon, delay, tooltip }, idx) => (
            <div
              key={idx}
              className={`group relative w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center transition-all duration-700 cursor-pointer hover:scale-110 hover:shadow-xl ${isVisible ? `float-${idx + 1}` : ''}`}
              style={{ 
                transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(-50px) scale(0.5)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${delay}s`
              }}
            >
              <Icon size={24} className="text-gray-700" />
              {showTooltips && tooltip && (
                <div 
                  className="absolute left-full ml-3 px-3 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg whitespace-nowrap z-50 pointer-events-none opacity-0 translate-x-[-10px] scale-95 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 transition-all duration-300 ease-out"
                >
                  <div 
                    className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-gray-800"
                  />
                  {tooltip}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Center Icon */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div 
            className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-700 hover:scale-110 ${isVisible ? 'center-pulse' : ''}`}
            style={{ 
              backgroundColor: color,
              transform: isVisible ? 'scale(1)' : 'scale(0)',
              opacity: isVisible ? 1 : 0,
              transitionDelay: '0.3s'
            }}
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center ${isVisible ? 'inner-rotate' : ''}`}>
              <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded rotate-45" />
            </div>
          </div>
          
          {/* Animated rings */}
          <div 
            className="absolute inset-0 rounded-2xl animate-ping opacity-20"
            style={{ backgroundColor: color, animationDuration: '2s' }}
          />
          <div 
            className="absolute inset-[-8px] rounded-3xl animate-ping opacity-10"
            style={{ backgroundColor: color, animationDuration: '2.5s', animationDelay: '0.5s' }}
          />
        </div>

        {/* Right Icons */}
        <div className="absolute right-4 md:right-8 top-0 h-full flex flex-col justify-around py-8">
          {rightIcons.map(({ Icon, delay }, idx) => (
            <div
              key={idx}
              className={`w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center transition-all duration-700 hover:scale-110 hover:shadow-xl ${isVisible ? `float-${((idx + 1) % 3) + 1}` : ''}`}
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
              <div 
                className="absolute -left-8 top-1/2 w-6 border-t-2 border-dashed" 
                style={{ borderColor: color, opacity: 0.4 }} 
              />
              <Icon 
                size={18} 
                style={{ color }} 
                className={idx === 0 ? 'animate-spin' : ''}
              />
            </div>
            <span className="text-sm md:text-base font-medium">{label}</span>
            {idx < features.length - 1 && (
              <div 
                className="hidden md:block w-16 border-t-2 border-dashed ml-4" 
                style={{ borderColor: color, opacity: 0.4 }} 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowGraph;
