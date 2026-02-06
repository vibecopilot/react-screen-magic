import { useState, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { blogPosts } from "@/data/blogPosts";
import BlogCard from "./BlogCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BlogSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const {
    ref: headerRef,
    isVisible: headerVisible
  } = useScrollAnimation({
    threshold: 0.3
  });

  const filteredPosts = blogPosts;

  const handleNext = useCallback(() => {
    if (filteredPosts.length === 0) return;
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % filteredPosts.length);
  }, [filteredPosts.length]);

  const handlePrev = useCallback(() => {
    if (filteredPosts.length === 0) return;
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + filteredPosts.length) % filteredPosts.length);
  }, [filteredPosts.length]);

  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      handlePrev();
    } else if (info.offset.x < -threshold) {
      handleNext();
    }
  }, [handleNext, handlePrev]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  }, [handleNext, handlePrev]);

  const getVisibleCards = () => {
    if (filteredPosts.length === 0) return [];
    if (filteredPosts.length === 1) return [{ post: filteredPosts[0], position: 0 }];
    if (filteredPosts.length === 2) {
      return [
        { post: filteredPosts[(activeIndex - 1 + filteredPosts.length) % filteredPosts.length], position: -1 },
        { post: filteredPosts[activeIndex], position: 0 },
      ];
    }
    
    return [
      { post: filteredPosts[(activeIndex - 1 + filteredPosts.length) % filteredPosts.length], position: -1 },
      { post: filteredPosts[activeIndex], position: 0 },
      { post: filteredPosts[(activeIndex + 1) % filteredPosts.length], position: 1 },
    ];
  };

  const visibleCards = getVisibleCards();

  return (
    <section id="blog" className="py-10 sm:py-16 md:py-24 px-3 sm:px-4 overflow-hidden bg-transparent">
      <div className="container mx-auto max-w-7xl relative">
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(
            "text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="text-[10px] sm:text-xs font-medium tracking-widest text-primary/80 uppercase">
            BLOG
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mt-2 font-medium">
            Ideas to level-up your real estate journey
          </h2>
          <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-2">
            Insights, guides, and thought leadership on transforming the real estate experience through technology
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Blog posts carousel"
        >
          {/* Navigation Arrows */}
          {filteredPosts.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className={cn(
                  "absolute -left-1 sm:-left-4 md:-left-8 top-1/2 -translate-y-1/2 z-20",
                  "w-9 h-9 sm:w-12 sm:h-12 rounded-full",
                  "bg-white/90 backdrop-blur-sm shadow-lg",
                  "border border-border",
                  "text-foreground",
                  "flex items-center justify-center",
                  "transition-all duration-300",
                  "hover:bg-primary hover:text-primary-foreground hover:border-primary",
                  "hover:shadow-xl",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50",
                  "touch-manipulation"
                )}
                aria-label="Previous post"
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={handleNext}
                className={cn(
                  "absolute -right-1 sm:-right-4 md:-right-8 top-1/2 -translate-y-1/2 z-20",
                  "w-9 h-9 sm:w-12 sm:h-12 rounded-full",
                  "bg-white/90 backdrop-blur-sm shadow-lg",
                  "border border-border",
                  "text-foreground",
                  "flex items-center justify-center",
                  "transition-all duration-300",
                  "hover:bg-primary hover:text-primary-foreground hover:border-primary",
                  "hover:shadow-xl",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50",
                  "touch-manipulation"
                )}
                aria-label="Next post"
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          {/* Cards Carousel */}
          <motion.div
            className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 px-10 sm:px-16 md:px-20 min-h-[380px] sm:min-h-[420px] md:min-h-[460px]"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ cursor: filteredPosts.length > 1 ? 'grab' : 'default' }}
            whileDrag={{ cursor: 'grabbing' }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleCards.map(({ post, position }) => (
                <motion.div
                  key={`${post.id}-${position}`}
                  initial={{
                    opacity: 0,
                    x: direction * 100,
                    scale: 0.8
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    zIndex: position === 0 ? 10 : 5
                  }}
                  exit={{
                    opacity: 0,
                    x: -direction * 100,
                    scale: 0.8
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className={cn(
                    "flex-shrink-0 transition-all duration-300",
                    position === 0
                      ? "w-[88%] sm:w-[70%] md:w-[50%] lg:w-[40%]"
                      : "w-[60%] sm:w-[50%] md:w-[35%] lg:w-[28%] hidden sm:block"
                  )}
                >
                  <BlogCard post={post} isActive={position === 0} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination Dots */}
          {filteredPosts.length > 1 && (
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
              {filteredPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 touch-manipulation min-h-[20px] min-w-[20px] flex items-center justify-center",
                    index === activeIndex
                      ? "w-8 bg-primary shadow-lg shadow-primary/30"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <span className={cn(
                    "block rounded-full",
                    index === activeIndex ? "w-8 h-1.5 bg-primary" : "w-2 h-2 bg-muted-foreground/30"
                  )} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
