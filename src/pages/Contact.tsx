import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/integrations/supabase/client";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
    setIsSubmitting(true);

    try {
      await axiosInstance.post('/abouts/contact_us.json', {
        contact_us: {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          customer_type: formData.customerType,
        }
      });

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({ name: "", email: "", message: "", customerType: "" });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
      }}
    >
      <Navbar />

      {/* Contact Hero */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-6 md:pb-8 px-3 sm:px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-white/60 backdrop-blur-sm rounded-full text-xs font-medium text-foreground mb-4 sm:mb-6 animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}>
            CONTACT US
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-3 sm:mb-4 animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
            Let's connect
          </h1>
          <p className="text-foreground/70 text-base md:text-lg max-w-md mx-auto px-4 animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
            Have questions about My Citi? Contact us and we'll be happy to help.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-12 md:pb-16 px-3 sm:px-4">
        <div className="max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "backwards" }}>
          <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
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

            <div className="mb-4 sm:mb-6">
              <label className="block text-sm font-medium text-foreground mb-1.5 sm:mb-2">
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

            <div className="mb-6 sm:mb-8">
              <label className="block text-sm font-medium text-foreground mb-1.5 sm:mb-2">
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
                  <SelectItem value="Yes, I'm an existing customer">Yes, I'm an existing customer</SelectItem>
                  <SelectItem value="No, I'm a new customer">No, I'm a new customer</SelectItem>
                  <SelectItem value="I'm currently on a trial">I'm currently on a trial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-full py-6 text-base"
            >
              {isSubmitting ? "Sending..." : "Send a message"}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
