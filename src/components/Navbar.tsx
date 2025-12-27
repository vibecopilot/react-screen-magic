import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Features", href: "#features", isRoute: false },
  { label: "Benefits", href: "#benefits", isRoute: false },
  { label: "Pricing", href: "#pricing", isRoute: false },
  { label: "Blog", href: "#blog", isRoute: false },
  { label: "Contact Us", href: "/contact", isRoute: true },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-5 transition-all duration-300">
      <nav
        className={cn(
          "w-full flex items-center justify-between transition-all duration-300 px-8 py-4",
          isScrolled
            ? "max-w-5xl mx-auto bg-white/50 backdrop-blur-2xl rounded-pill border border-white/40 shadow-lg"
            : "max-w-7xl mx-auto bg-transparent"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                fill="currentColor"
                className="text-accent-foreground"
              />
            </svg>
          </div>
          <span className="font-semibold text-xl tracking-tight text-foreground">
            MY CITI
          </span>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm text-foreground/80 hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-foreground/80 hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            )
          ))}
        </div>

        {/* CTA Button */}
        <Button variant="hero" size={isScrolled ? "default" : "default"}>
          Try Dreelio free
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;