import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { blogPosts } from "@/data/blogPosts";
import BlogCard from "./BlogCard";

const BlogSection = () => {
  const {
    ref: headerRef,
    isVisible: headerVisible
  } = useScrollAnimation({
    threshold: 0.3
  });

  return (
    <section id="blog" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(
            "text-center mb-10 sm:mb-12 md:mb-16 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="text-xs font-medium tracking-wider text-foreground/60 uppercase">
            BLOG
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mt-2 font-medium">
            Ideas to level-up your real estate journey
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Insights, guides, and thought leadership on transforming the real estate experience through technology
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
