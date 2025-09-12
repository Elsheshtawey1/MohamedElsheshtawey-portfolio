import { useState } from "react";
import { m } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle, Rocket, User, MessageSquare, MessageCircle } from "lucide-react";
import { ContactForm } from "@/types/portfolio";
import { useToast } from "@/hooks/use-toast";

interface ContactProps {
  data: {
    personal: {
      email: string;
      location: string;
      phone: string;
    };
    sections: {
      contact: {
        title: string;
        subtitle: string;
        form: {
          name: string;
          email: string;
          message: string;
          send: string;
        };
      };
    };
  };
}

const Contact = ({ data }: ContactProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: data.personal.email,
      href: `mailto:${data.personal.email}`,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+20 120 158 5814",
      href: "https://wa.me/201201585814",
    },
    {
      icon: Phone,
      label: "Phone",
      value: data.personal.phone,
      href: `tel:${data.personal.phone}`,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Elsheshtawey1",
      color: "hover:text-white",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mohamed-elsheshtawey/",
      color: "hover:text-blue-400",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://x.com/mohamed63857594",
      color: "hover:text-blue-400",
    },
  ];

  const containerVariants = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <AnimatedSection id="contact" className="py-20 px-6 relative">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-primary rounded-full opacity-10 blur-3xl animate-float" />
      
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <m.div 
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <m.h2 
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold text-primary mb-6"
          >
            {data.sections.contact.title}
          </m.h2>
          <m.p 
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-lg text-secondary max-w-2xl mx-auto mb-8"
          >
            {data.sections.contact.subtitle}
          </m.p>
          <m.div 
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" 
          />
        </m.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedCard delay={0.3}>
            <Card className="bg-surface-elevated border-primary/20 hover:border-primary/40 transition-smooth">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-secondary mb-2 block">
                      {data.sections.contact.form.name}
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
                  
                  <div>
                    <Label htmlFor="email" className="text-secondary mb-2 block">
                      {data.sections.contact.form.email}
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
                  
                  <div>
                    <Label htmlFor="message" className="text-secondary mb-2 block">
                      {data.sections.contact.form.message}
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
                  
                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : isSubmitted ? (
                      <div className="flex items-center">
                        <m.div
                          initial={{ x: 0, y: 0, rotate: 0 }}
                          animate={{ x: 20, y: -20, rotate: 45 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                          <Rocket className="w-5 h-5" />
                        </m.div>
                        <span className="ml-2">Launched!</span>
                      </div>
                    ) : (
                      <>
                        {data.sections.contact.form.send}
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* Contact Information */}
          <m.div 
            variants={itemVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-6">Get In Touch</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-surface-elevated border border-primary/20 hover:border-primary/40 transition-smooth">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <info.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-secondary">{info.label}</p>
                      {info.href ? (
                        <a 
                          href={info.href} 
                          className="text-primary hover:text-accent transition-smooth"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-primary">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-6">Connect Online</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 rounded-lg bg-surface-elevated border border-primary/20 hover:border-primary/40 transition-smooth ${social.color} hover-glow group`}
                  >
                    <social.icon className="w-6 h-6 group-hover:scale-110 transition-smooth" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <Card className="bg-surface-elevated border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Available for Work
                  </Badge>
                </div>
                <p className="text-secondary">
                  I'm currently open to new opportunities and interesting projects. 
                  Let's discuss how we can work together!
                </p>
              </CardContent>
            </Card>
          </m.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Contact;