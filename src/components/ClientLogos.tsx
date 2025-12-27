import logoRaghav from "@/assets/logo-raghav.png";
import logoArrow from "@/assets/logo-arrow.png";
import logoIxora from "@/assets/logo-ixora.png";
import logoGoyal from "@/assets/logo-goyal.png";
import logoChandak from "@/assets/logo-chandak.png";
import logoJpinfra from "@/assets/logo-jpinfra.png";

const logos = [
  { src: logoRaghav, alt: "Raghav Realty" },
  { src: logoArrow, alt: "Arrow" },
  { src: logoIxora, alt: "Ixora" },
  { src: logoGoyal, alt: "Goyal & Co" },
  { src: logoChandak, alt: "Chandak" },
  { src: logoJpinfra, alt: "JP Infra" },
];

const ClientLogos = () => {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="text-center mb-12">
        <p className="text-muted-foreground text-lg">
          Trusted by 100+ top real estate developers and enterprises
        </p>
      </div>
      
      {/* Auto-scrolling logos */}
      <div className="relative">
        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        {/* Scrolling container */}
        <div className="flex animate-scroll">
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div key={index} className="flex-shrink-0 mx-8">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {logos.map((logo, index) => (
            <div key={`dup-${index}`} className="flex-shrink-0 mx-8">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
