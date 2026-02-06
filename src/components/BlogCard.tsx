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
    window.scrollTo(0, 0);
    navigate(`/blog/${post.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isActive ? 1 : 0.7, 
        scale: isActive ? 1 : 0.9,
      }}
      whileHover={!isActive ? { 
        scale: 0.93, 
        opacity: 0.85,
        y: -8 
      } : undefined}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl h-full cursor-pointer",
        "bg-white backdrop-blur-sm",
        "border border-border/50",
        "transition-all duration-300 ease-out",
        isActive && "shadow-2xl shadow-primary/10 border-primary/20",
        !isActive && "shadow-lg hover:shadow-xl hover:border-primary/30"
      )}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-4 sm:p-6 md:p-8">
        {/* Category badge */}
        <div className="flex items-center gap-2 mb-5">
          <div className={cn(
            "p-2.5 rounded-xl",
            "bg-primary/10 text-primary",
            "border border-primary/20",
            "transition-all duration-300",
            isActive && "bg-primary/15 shadow-sm"
          )}>
            <IconComponent className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-medium text-foreground mb-3 sm:mb-4 line-clamp-3 leading-tight">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 line-clamp-3 flex-1">
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
            "px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl",
            "bg-primary text-primary-foreground",
            "font-medium text-xs sm:text-sm",
            "transition-all duration-300",
            "hover:bg-primary/90",
            "hover:shadow-lg hover:shadow-primary/25"
          )}
        >
          <span>Read More</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full pointer-events-none" />
      
      {/* Bottom accent line */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-[3px]",
        "bg-gradient-to-r from-transparent via-primary/50 to-transparent",
        "transition-opacity duration-500",
        isActive ? "opacity-100" : "opacity-0"
      )} />
    </motion.div>
  );
};

export default BlogCard;
