import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/data/blogPosts";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
  isActive?: boolean;
}

const BlogCard = ({ post, isActive = false }: BlogCardProps) => {
  const navigate = useNavigate();
  const IconComponent = post.categoryIcon;

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/blog/${post.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isActive ? 1 : 0.6, 
        scale: isActive ? 1 : 0.85,
      }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl h-full",
        "bg-slate-900/90 backdrop-blur-xl",
        "border border-cyan-500/30",
        "transition-all duration-500 ease-out",
        // Neon glow effect
        isActive && "shadow-[0_0_30px_rgba(6,182,212,0.3),0_0_60px_rgba(6,182,212,0.1)]",
        !isActive && "shadow-lg"
      )}
      style={{
        background: "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.9) 100%)",
      }}
    >
      {/* Animated border glow */}
      <div className={cn(
        "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500",
        isActive && "opacity-100"
      )}>
        <div className="absolute inset-[-2px] rounded-2xl bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-cyan-500/40 blur-sm animate-pulse" />
      </div>

      {/* Glassmorphism inner glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6 sm:p-8">
        {/* Category badge */}
        <div className="flex items-center gap-2 mb-5">
          <div className={cn(
            "p-2.5 rounded-xl",
            "bg-cyan-500/10 text-cyan-400",
            "border border-cyan-500/20",
            "transition-all duration-300",
            isActive && "bg-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          )}>
            <IconComponent className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium tracking-widest uppercase text-cyan-400/80">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mb-4 line-clamp-3 leading-tight">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 flex-1">
          {post.cardPrompt}
        </p>

        {/* Spacer */}
        <div className="flex-1 min-h-4" />

        {/* Read More Button */}
        <motion.button
          onClick={handleReadMore}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "group flex items-center justify-center gap-2 w-full",
            "px-6 py-3.5 rounded-xl",
            "bg-gradient-to-r from-cyan-500/20 to-blue-500/20",
            "border border-cyan-500/40",
            "text-cyan-300 font-medium text-sm",
            "transition-all duration-300",
            "hover:from-cyan-500/30 hover:to-blue-500/30",
            "hover:border-cyan-400/60",
            "hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]",
            "hover:text-cyan-200"
          )}
        >
          <span>Read More</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full pointer-events-none" />
      
      {/* Bottom accent line */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-[2px]",
        "bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent",
        "transition-opacity duration-500",
        isActive ? "opacity-100" : "opacity-0"
      )} />
    </motion.div>
  );
};

export default BlogCard;
