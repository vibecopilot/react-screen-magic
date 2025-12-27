import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Benefits", href: "#benefits" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
  { label: "Contact Us", href: "#contact" },
];

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 md:px-12 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-accent rounded-full flex items-center justify-center">
          <svg
            width="16"
            height="16"
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
        <span className="font-semibold text-lg tracking-tight text-foreground">
          MY CITI
        </span>
      </div>

      {/* Navigation Links - Desktop */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm text-foreground/80 hover:text-foreground transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA Button */}
      <Button variant="hero" size="default">
        Try Dreelio free
      </Button>
    </nav>
  );
};

export default Navbar;