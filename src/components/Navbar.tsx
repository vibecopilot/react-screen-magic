import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import mycitiLogo from "@/assets/myciti-logo-new.png";

const navLinks = [
  { label: "Product & Features", href: "/#features", isRoute: false },
  { label: "Blogs", href: "/#blog", isRoute: false },
  { label: "FAQ", href: "/#faq", isRoute: false },
  { label: "New Collection", href: "/new-collection", isRoute: true },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-5 transition-all duration-500"
    >
      <nav
        className={cn(
          "w-full flex items-center justify-between transition-all duration-300 px-8 py-4",
          isScrolled
            ? "max-w-5xl mx-auto bg-white/50 backdrop-blur-2xl rounded-pill border border-white/40 shadow-lg"
            : "max-w-7xl mx-auto bg-transparent"
        )}
      >
        {/* Logo */}
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img src={mycitiLogo} alt="My Citi Logo" className="h-16 w-auto" />
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
        <div className="gap-2 mr-2">
          <div className="hidden md:flex items-center gap-2">
          <Link to="/contact">
            <Button variant="hero" size={isScrolled ? "default" : "default"}>
              Contact us
            </Button>
          </Link>
            <Link to="/app/login">
            <Button variant="heroOutline" size={isScrolled ? "default" : "default"}>
              Login
            </Button>
            </Link>
        </div>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;