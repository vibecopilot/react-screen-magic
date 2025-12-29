const blogPosts = [
  {
    id: 1,
    category: "MUST READ",
    categoryColor: "bg-orange-500",
    title: "How to start a 100k creative agency in 2025",
    description: "Learn how to kickstart your journey into agency ownership with our comprehensive guide.",
    author: "Dhyna Phils",
    role: "Head of Marketing",
    featured: true,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    category: "TOOLS",
    categoryColor: "bg-blue-600",
    title: "Top 10 digital agency software",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    category: "INSIGHT",
    categoryColor: "bg-green-500",
    title: "A complete guide to project success in 2026",
    image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    category: "MANAGEMENT",
    categoryColor: "bg-orange-500",
    title: "What Are Billable Hours",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=300&h=200&fit=crop",
  },
];

const BlogSection = () => {
  const featuredPost = blogPosts.find((post) => post.featured);
  const smallPosts = blogPosts.filter((post) => !post.featured);

  return (
    <section id="blog" className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-medium tracking-wider text-foreground/60 uppercase">
            BLOG
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">
            Ideas to level-up your life style
          </h2>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 mb-4">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span
                  className={`inline-block ${featuredPost.categoryColor} text-white text-xs font-medium px-3 py-1 rounded-full mb-4`}
                >
                  {featuredPost.category}
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-3">
                  {featuredPost.title}
                </h3>
                <p className="text-foreground/70 text-sm mb-4">
                  {featuredPost.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {featuredPost.author}
                      </p>
                      <p className="text-xs text-foreground/60">
                        {featuredPost.role}
                      </p>
                    </div>
                  </div>
                  <span className="bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                    FEATURED
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Small Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {smallPosts.map((post) => (
            <div
              key={post.id}
              className="bg-background/60 backdrop-blur-sm rounded-2xl p-3 group cursor-pointer hover:bg-background/80 transition-colors"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-foreground line-clamp-2 flex-1 mr-2">
                  {post.title}
                </h4>
                <span
                  className={`${post.categoryColor} text-white text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap`}
                >
                  {post.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
