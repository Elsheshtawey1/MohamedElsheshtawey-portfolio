import { memo, useState, useCallback } from "react";
import { m } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Send, Rocket, User, MessageSquare } from "lucide-react";
import { ContactForm as ContactFormType } from "@/types/portfolio";
import { useToast } from "@/hooks/use-toast";

interface ContactFormProps {
  labels: {
    name: string;
    email: string;
    message: string;
    send: string;
  };
}

const ContactForm = ({ labels }: ContactFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormType>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsSubmitted(true);

        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
          className: "bg-green-500/20 border-green-500/30 text-green-400",
        });

        setFormData({ name: "", email: "", message: "" });

        // Reset submitted state after animation
        setTimeout(() => setIsSubmitted(false), 2000);
      } catch (error) {
        toast({
          title: "Failed to send message",
          description: "Please try again or contact me directly via email.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [toast]
  );

  return (
    <Card className="bg-surface-elevated border-primary/20 hover:border-primary/40 transition-smooth">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Send a Message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-secondary mb-2 block">
              {labels.name}
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-secondary" />
              </div>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="pl-11 bg-surface border-primary/20 focus:border-primary text-primary"
                placeholder="Your full name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-secondary mb-2 block">
              {labels.email}
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-secondary" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="pl-11 bg-surface border-primary/20 focus:border-primary text-primary"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message" className="text-secondary mb-2 block">
              {labels.message}
            </Label>
            <div className="relative">
              <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                <MessageSquare className="h-5 w-5 text-secondary" />
              </div>
              <Textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleInputChange}
                className="pl-11 bg-surface border-primary/20 focus:border-primary text-primary min-h-32 resize-none"
                placeholder="Tell me about your project or just say hello..."
              />
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-gradient-primary hover:shadow-glow transition-smooth">
            {isSubmitting ? (
              "Sending..."
            ) : isSubmitted ? (
              <div className="flex items-center">
                <m.div initial={{ x: 0, y: 0, rotate: 0 }} animate={{ x: 20, y: -20, rotate: 45 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                  <Rocket className="w-5 h-5" />
                </m.div>
                <span className="ml-2">Launched!</span>
              </div>
            ) : (
              <>
                {labels.send}
                <Send className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(ContactForm);
