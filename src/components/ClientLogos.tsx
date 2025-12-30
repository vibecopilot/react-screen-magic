import logoRaghav from "@/assets/logo-raghav.png";
import logoArrow from "@/assets/logo-arrow.png";
import logoIxora from "@/assets/logo-ixora.png";
import logoGoyal from "@/assets/logo-goyal.png";
import logoChandak from "@/assets/logo-chandak.png";
import logoJpinfra from "@/assets/logo-jpinfra.png";
import logoLotus from "@/assets/logo-lotus.png";
import logoArvind from "@/assets/logo-arvind.png";
import logoAai from "@/assets/logo-aai.png";
import logoAjmera from "@/assets/logo-ajmera.png";
import logoArkade from "@/assets/logo-arkade.png";
import logoBhoomi from "@/assets/logo-bhoomi.png";
import logoLogicon from "@/assets/logo-logicon.png";
import logoShreeramkrushna from "@/assets/logo-shreeramkrushna.png";
import logoCbre from "@/assets/logo-cbre.png";
import logoNyati from "@/assets/logo-nyati.png";
import logoAbil from "@/assets/logo-abil.png";
import logoMaharashtra from "@/assets/logo-maharashtra.png";
import logoPhoenix from "@/assets/logo-phoenix.png";
import logoSunpharma from "@/assets/logo-sunpharma.png";
import logoAdani from "@/assets/logo-adani.png";
import logoAmanora from "@/assets/logo-amanora.png";
import logoGrandhighstreet from "@/assets/logo-grandhighstreet.png";
import logoWestend from "@/assets/logo-westend.png";
import logoUsv from "@/assets/logo-usv.png";
import logoEastcourt from "@/assets/logo-eastcourt.png";

const logosRow1 = [
  { src: logoRaghav, alt: "Raghav Realty" },
  { src: logoArrow, alt: "Arrow" },
  { src: logoIxora, alt: "Ixora" },
  { src: logoGoyal, alt: "Goyal & Co" },
  { src: logoChandak, alt: "Chandak" },
  { src: logoJpinfra, alt: "JP Infra" },
  { src: logoLotus, alt: "Lotus Developers" },
  { src: logoArvind, alt: "Arvind Smartspaces" },
  { src: logoAai, alt: "Airports Authority of India" },
  { src: logoAjmera, alt: "Ajmera" },
  { src: logoArkade, alt: "Arkade" },
  { src: logoBhoomi, alt: "Bhoomi Group" },
  { src: logoLogicon, alt: "Logicon" },
  { src: logoShreeramkrushna, alt: "Shree Ram Krushna Developers" },
  { src: logoCbre, alt: "CBRE" },
  { src: logoNyati, alt: "Nyati Group" },
];

const logosRow2 = [
  { src: logoAbil, alt: "ABIL" },
  { src: logoMaharashtra, alt: "Maharashtra Bamboo Development Board" },
  { src: logoPhoenix, alt: "Phoenix Marketcity" },
  { src: logoSunpharma, alt: "Sun Pharma" },
  { src: logoAdani, alt: "Adani" },
  { src: logoAmanora, alt: "Amanora Mall" },
  { src: logoGrandhighstreet, alt: "Grand Highstreet Hinjewadi" },
  { src: logoWestend, alt: "Westend" },
  { src: logoUsv, alt: "USV" },
  { src: logoEastcourt, alt: "East Court" },
];

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const ClientLogos = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: row1Ref, isVisible: row1Visible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: row2Ref, isVisible: row2Visible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="pt-6 pb-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <p 
          ref={headerRef}
          className={cn(
            "text-muted-foreground text-center text-sm mb-10 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          Trusted by some of the biggest companies.
        </p>
        
        {/* First row - scrolling left */}
        <div 
          ref={row1Ref}
          className={cn(
            "relative overflow-hidden mb-8 transition-all duration-1000",
            row1Visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
          )}
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/30 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/30 to-transparent z-10" />
          
          <div className="flex animate-scroll-slow">
            {logosRow1.map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-6 flex items-center">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-12 md:h-14 w-auto object-contain"
                />
              </div>
            ))}
            {logosRow1.map((logo, index) => (
              <div key={`dup-${index}`} className="flex-shrink-0 mx-6 flex items-center">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-12 md:h-14 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Second row - scrolling right */}
        <div 
          ref={row2Ref}
          className={cn(
            "relative overflow-hidden transition-all duration-1000 delay-200",
            row2Visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
          )}
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/30 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/30 to-transparent z-10" />
          
          <div className="flex animate-scroll-reverse">
            {logosRow2.map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-6 flex items-center">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-12 md:h-14 w-auto object-contain"
                />
              </div>
            ))}
            {logosRow2.map((logo, index) => (
              <div key={`dup-${index}`} className="flex-shrink-0 mx-6 flex items-center">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-12 md:h-14 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
