import clientLogos from "@/assets/client-logos.png";

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
        
        {/* Logos container */}
        <div className="flex justify-center">
          <img 
            src={clientLogos} 
            alt="Our trusted clients" 
            className="h-24 md:h-32 w-auto object-contain opacity-80"
          />
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
