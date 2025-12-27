import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import heroBg from "@/assets/hero-clouds-bg.jpg";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
  customerType: z.string().optional(),
});

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    customerType: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    
    setErrors({});
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    setFormData({ name: "", email: "", message: "", customerType: "" });
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
      
      {/* Contact Hero */}
      <section className="pt-32 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-white/60 backdrop-blur-sm rounded-full text-xs font-medium text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}>
            CONTACT US
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
            Let's connect
          </h1>
          <p className="text-foreground/70 text-lg max-w-md mx-auto animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
            Have questions about My Citi? Contact us and we'll be happy to help.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-16 px-4">
        <div className="max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "backwards" }}>
          <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <Input
                  placeholder="Eg. Jane Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`bg-white border-border/50 ${errors.name ? "border-destructive" : ""}`}
                />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="jane@framer.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`bg-white border-border/50 ${errors.email ? "border-destructive" : ""}`}
                />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <Textarea
                placeholder="Enter your message..."
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`bg-white border-border/50 resize-none ${errors.message ? "border-destructive" : ""}`}
              />
              {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-2">
                Are you an existing customer?
              </label>
              <Select
                value={formData.customerType}
                onValueChange={(value) => setFormData({ ...formData, customerType: value })}
              >
                <SelectTrigger className="bg-white border-border/50">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes, I'm an existing customer</SelectItem>
                  <SelectItem value="no">No, I'm a new customer</SelectItem>
                  <SelectItem value="trial">I'm currently on a trial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-full py-6 text-base">
              Send a message
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
