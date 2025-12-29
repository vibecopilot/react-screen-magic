import Navbar from "@/components/Navbar";
import heroClouds from "@/assets/hero-clouds-bg.jpg";

const NewCollection = () => {
  return (
    <div className="min-h-screen relative">
      {/* Cloud Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${heroClouds})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      <Navbar />
      
      {/* Coming Soon Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-serif text-foreground/80">
          coming soon..
        </h1>
      </div>
    </div>
  );
};

export default NewCollection;
