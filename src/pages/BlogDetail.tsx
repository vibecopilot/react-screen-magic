import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroBg from "@/assets/hero-clouds-bg.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
          <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 mb-6 text-foreground/80 text-sm sm:text-base">
            {listItems.map((item, i) => (
              <li key={i} className="leading-relaxed">{item}</li>
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
          <div key={`table-${elements.length}`} className="overflow-x-auto my-6 sm:my-8">
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm text-sm sm:text-base">
              <thead>
                <tr className="bg-primary/10">
                  {headerRow.map((cell, i) => (
                    <th key={i} className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-foreground border border-border/50">
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
                      <td key={cellIndex} className="px-3 sm:px-4 py-2 sm:py-3 text-foreground/80 border border-border/50">
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
          <h2 key={index} className="font-serif text-xl sm:text-2xl md:text-3xl font-medium text-foreground mt-8 sm:mt-10 mb-3 sm:mb-4">
            {trimmed.replace("## ", "")}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={index} className="font-serif text-lg sm:text-xl md:text-2xl font-medium text-foreground mt-6 sm:mt-8 mb-2 sm:mb-3">
            {trimmed.replace("### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("**") && trimmed.endsWith("**") && !trimmed.slice(2, -2).includes("**")) {
        flushList();
        elements.push(
          <p key={index} className="font-semibold text-foreground mb-2 text-sm sm:text-base">
            {trimmed.replace(/\*\*/g, "")}
          </p>
        );
      } else if (trimmed.startsWith("**") && trimmed.includes(":**")) {
        // Handle bold labels with descriptions like "**Label:** Description"
        flushList();
        elements.push(
          <p key={index} className="text-foreground/80 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
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
          <p key={index} className="text-foreground/80 mb-2 pl-4 text-sm sm:text-base">
            {trimmed}
          </p>
        );
      } else if (trimmed.startsWith("*") && trimmed.endsWith("*") && trimmed.includes("—")) {
        flushList();
        elements.push(
          <blockquote key={index} className="border-l-4 border-primary/50 pl-4 py-2 my-4 sm:my-6 italic text-foreground/70 text-sm sm:text-base">
            {trimmed.replace(/^\*|\*$/g, "")}
          </blockquote>
        );
      } else if (trimmed.length > 0) {
        flushList();
        elements.push(
          <p key={index} className="text-foreground/80 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
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

      <article className="container mx-auto px-4 py-6 sm:py-8 md:py-12 max-w-4xl">
        {/* Back button */}
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="mb-6 sm:mb-8 hover:bg-background/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        {/* Hero section */}
        <header className="mb-8 sm:mb-10">
          {/* Title */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4 sm:mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-4 sm:mb-6">
            {post.blogFocus}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>January 24, 2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>5 min read</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="ml-auto"
            >
              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
              Share
            </Button>
          </div>
        </header>

        {/* Gradient divider */}
        <div className={cn(
          "h-1 rounded-full mb-8 sm:mb-10",
          "bg-gradient-to-r",
          post.gradient.replace("/20", "/40")
        )} />

        {/* Main Content */}
        <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-10 border border-border/50 mb-6 sm:mb-8">
          <div className="prose prose-sm sm:prose-lg max-w-none">
            {renderContent(post.mainContent)}
          </div>
        </div>

        {/* FAQ Section with Accordion */}
        {post.faqs && post.faqs.length > 0 && (
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-10 border border-border/50">
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-medium text-foreground mb-4 sm:mb-6">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {post.faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="border-border/50"
                >
                  <AccordionTrigger className="text-left text-sm sm:text-base font-medium text-foreground hover:text-primary hover:no-underline py-3 sm:py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80 text-sm sm:text-base leading-relaxed pb-3 sm:pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {/* Related posts suggestion */}
        <div className="mt-10 sm:mt-12 text-center">
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
