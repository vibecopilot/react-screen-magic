import { useState, useMemo } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { blogPosts } from "@/data/blogPosts";
import BlogCard from "./BlogCard";

const categories = [
  { id: "all", label: "All" },
  { id: "Possession & Handover", label: "Possession" },
  { id: "Construction Transparency", label: "Construction" },
  { id: "Presales Automation", label: "Presales" },
  { id: "Post-Sales Experience", label: "Post-Sales" },
  { id: "Buyer Education", label: "Buyer Education" },
  { id: "Feature Deep Dives", label: "Features" },
  { id: "Thought Leadership", label: "Thought Leadership" },
];

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const {
    ref: headerRef,
    isVisible: headerVisible
  } = useScrollAnimation({
    threshold: 0.3
  });

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return blogPosts;
    return blogPosts.filter(post => post.category === activeCategory);
  }, [activeCategory]);

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

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                "border border-border/50 hover:border-primary/50",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
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
