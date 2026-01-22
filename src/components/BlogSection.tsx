import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
const BlogSection = () => {
  const {
    ref: headerRef,
    isVisible: headerVisible
  } = useScrollAnimation({
    threshold: 0.3
  });
  return <section id="blog" className="py-12 md:py-16 px-3 sm:px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div ref={headerRef} className={cn("text-center mb-8 md:mb-10 transition-all duration-700", headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <span className="text-xs font-medium tracking-wider text-foreground/60 uppercase">
            BLOG
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground mt-2 md:text-4xl font-medium">
            Ideas to level-up your life style
          </h2>
        </div>

        {/* Coming Soon */}
        <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-12 md:p-16 text-center">
          <h3 className="font-serif text-3xl text-foreground mb-4 md:text-2xl font-normal">
            Coming Soon
          </h3>
          <p className="text-foreground/60 text-lg">
            Stay tuned for insightful articles and updates.
          </p>
        </div>
      </div>
    </section>;
};
export default BlogSection;