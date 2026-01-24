import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/data/blogPosts";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  const navigate = useNavigate();
  const IconComponent = post.categoryIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => navigate(`/blog/${post.id}`)}
      className={cn(
        "group cursor-pointer relative overflow-hidden rounded-2xl",
        "bg-card/80 backdrop-blur-sm border border-border/50",
        "p-5 sm:p-6 h-full min-h-[280px]",
        "transition-shadow duration-500 ease-out",
        "hover:shadow-2xl hover:shadow-primary/10"
      )}
    >
      {/* Gradient background effect */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500",
          "group-hover:opacity-100",
          post.gradient
        )}
      />

      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Category badge */}
        <motion.div 
          className="flex items-center gap-2 mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
        >
          <div className={cn(
            "p-2 rounded-lg",
            "bg-primary/10 text-primary",
            "group-hover:bg-primary group-hover:text-primary-foreground",
            "transition-all duration-300"
          )}>
            <IconComponent className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground group-hover:text-foreground/80 transition-colors">
            {post.category}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h3 
          className="font-serif text-lg sm:text-xl font-medium text-foreground mb-3 line-clamp-3 group-hover:text-primary transition-colors duration-300"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
        >
          {post.title}
        </motion.h3>

        {/* Card prompt */}
        <motion.p 
          className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2 group-hover:text-foreground/70 transition-colors"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
        >
          {post.cardPrompt}
        </motion.p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Read more indicator */}
        <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span>Read article</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Floating particles effect on hover */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
        <div className="w-2 h-2 rounded-full bg-accent/50 animate-float" />
      </div>
      <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
        <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-float" style={{ animationDelay: "0.5s" }} />
      </div>
    </motion.div>
  );
};

export default BlogCard;
