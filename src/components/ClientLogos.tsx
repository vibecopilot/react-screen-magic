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

const logos = [
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

const ClientLogos = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <p className="text-muted-foreground text-center text-sm mb-10">
          Trusted by 100+ top real estate developers and enterprises
        </p>
        
        {/* Logos row */}
        <div className="relative overflow-hidden">
          {/* Gradient fade on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-muted/30 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-muted/30 to-transparent z-10" />
          
          {/* Scrolling container */}
          <div className="flex animate-scroll">
            {logos.map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-12 flex items-center">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-16 md:h-20 w-auto object-contain"
                />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {logos.map((logo, index) => (
              <div key={`dup-${index}`} className="flex-shrink-0 mx-12 flex items-center">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-16 md:h-20 w-auto object-contain"
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
