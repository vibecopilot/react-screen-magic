import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroBg from "@/assets/hero-clouds-bg.jpg";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    return (
      <div
        className="min-h-screen"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Blog post not found</h1>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const IconComponent = post.categoryIcon;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.cardPrompt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Convert markdown-like content to JSX
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let listItems: string[] = [];
    let inList = false;
    let tableRows: string[][] = [];
    let inTable = false;

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 mb-6 text-foreground/80">
            {listItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
        listItems = [];
      }
      inList = false;
    };

    const flushTable = () => {
      if (tableRows.length > 0) {
        const headerRow = tableRows[0];
        const bodyRows = tableRows.slice(1);
        
        elements.push(
          <div key={`table-${elements.length}`} className="overflow-x-auto my-8">
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-primary/10">
                  {headerRow.map((cell, i) => (
                    <th key={i} className="px-4 py-3 text-left font-semibold text-foreground border border-border/50">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, rowIndex) => (
                  <tr 
                    key={rowIndex} 
                    className={cn(
                      "transition-colors hover:bg-muted/50",
                      rowIndex % 2 === 0 ? "bg-background/50" : "bg-muted/30"
                    )}
                  >
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-3 text-foreground/80 border border-border/50">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
      }
      inTable = false;
    };

    const parseInlineFormatting = (text: string) => {
      // Parse bold text with **text**
      const parts = text.split(/(\*\*[^*]+\*\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Check for table rows (lines starting and containing |)
      if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
        flushList();
        
        // Skip separator rows (|---|---|)
        if (trimmed.match(/^\|[-:\s|]+\|$/)) {
          return;
        }
        
        // Parse table cells
        const cells = trimmed
          .split("|")
          .slice(1, -1) // Remove empty first and last elements
          .map(cell => cell.trim());
        
        tableRows.push(cells);
        inTable = true;
        return;
      } else if (inTable) {
        flushTable();
      }

      if (trimmed.startsWith("## ")) {
        flushList();
        elements.push(
          <h2 key={index} className="font-serif text-2xl sm:text-3xl font-medium text-foreground mt-10 mb-4">
            {trimmed.replace("## ", "")}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={index} className="font-serif text-xl sm:text-2xl font-medium text-foreground mt-8 mb-3">
            {trimmed.replace("### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("**") && trimmed.endsWith("**") && !trimmed.slice(2, -2).includes("**")) {
        flushList();
        elements.push(
          <p key={index} className="font-semibold text-foreground mb-2">
            {trimmed.replace(/\*\*/g, "")}
          </p>
        );
      } else if (trimmed.startsWith("**") && trimmed.includes(":**")) {
        // Handle bold labels with descriptions like "**Label:** Description"
        flushList();
        elements.push(
          <p key={index} className="text-foreground/80 leading-relaxed mb-4">
            {parseInlineFormatting(trimmed)}
          </p>
        );
      } else if (trimmed.startsWith("- [ ] ") || trimmed.startsWith("- [x] ")) {
        if (!inList) {
          flushList();
          inList = true;
        }
        listItems.push(trimmed.replace(/- \[[ x]\] /, ""));
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        if (!inList) {
          flushList();
          inList = true;
        }
        listItems.push(trimmed.replace(/^[-*] /, ""));
      } else if (trimmed.match(/^\d+\.\s/)) {
        flushList();
        elements.push(
          <p key={index} className="text-foreground/80 mb-2 pl-4">
            {trimmed}
          </p>
        );
      } else if (trimmed.startsWith("*") && trimmed.endsWith("*") && trimmed.includes("—")) {
        flushList();
        elements.push(
          <blockquote key={index} className="border-l-4 border-primary/50 pl-4 py-2 my-6 italic text-foreground/70">
            {trimmed.replace(/^\*|\*$/g, "")}
          </blockquote>
        );
      } else if (trimmed.length > 0) {
        flushList();
        elements.push(
          <p key={index} className="text-foreground/80 leading-relaxed mb-4">
            {parseInlineFormatting(trimmed)}
          </p>
        );
      }
    });

    flushList();
    flushTable();
    return elements;
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />

      <article className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        {/* Back button */}
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="mb-8 hover:bg-background/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        {/* Hero section */}
        <header className="mb-10">
          {/* Category */}
          <div className="flex items-center gap-2 mb-4">
            <div className={cn(
              "p-2.5 rounded-xl",
              "bg-primary/10 text-primary"
            )}>
              <IconComponent className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium tracking-wider uppercase text-muted-foreground">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6">
            {post.blogFocus}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>January 24, 2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>5 min read</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="ml-auto"
            >
              <Share2 className="w-4 h-4 mr-1.5" />
              Share
            </Button>
          </div>
        </header>

        {/* Gradient divider */}
        <div className={cn(
          "h-1 rounded-full mb-10",
          "bg-gradient-to-r",
          post.gradient.replace("/20", "/40")
        )} />

        {/* Content */}
        <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 sm:p-10 border border-border/50">
          <div className="prose prose-lg max-w-none">
            {renderContent(post.fullContent)}
          </div>
        </div>

        {/* Related posts suggestion */}
        <div className="mt-12 text-center">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            size="lg"
            className="group"
          >
            Explore More Articles
            <svg
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogDetail;
