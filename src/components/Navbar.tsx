import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import mycitiLogo from "@/assets/myciti-logo.png";

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
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src={mycitiLogo} alt="My Citi Logo" className="h-10 w-auto" />
          <span className="font-semibold text-xl tracking-tight text-foreground">
            MY CITI
          </span>
        </Link>

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
          Try My Citi free
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;