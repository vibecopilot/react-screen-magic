import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
const BlogSection = () => {
  const {
    ref: headerRef,
    isVisible: headerVisible
  } = useScrollAnimation({
    threshold: 0.3
  });
  return <section id="blog" className="py-12 sm:py-14 md:py-16 px-3 sm:px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div ref={headerRef} className={cn("text-center mb-6 sm:mb-8 md:mb-10 transition-all duration-700", headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <span className="text-xs font-medium tracking-wider text-foreground/60 uppercase">
            BLOG
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mt-2 font-medium">
            Ideas to level-up your life style
          </h2>
        </div>

        {/* Coming Soon */}
        <div className="bg-background/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-10 md:p-16 text-center">
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4 font-normal">
            Coming Soon
          </h3>
          <p className="text-foreground/60 text-sm sm:text-base md:text-lg">
            Stay tuned for insightful articles and updates.
          </p>
        </div>
      </div>
    </section>;
};
export default BlogSection;