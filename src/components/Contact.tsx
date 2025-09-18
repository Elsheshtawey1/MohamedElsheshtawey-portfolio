import { memo, useMemo } from "react";
import { m } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageCircle, Phone, Github, Linkedin, Twitter, CheckCircle } from "lucide-react";
import ContactForm from "./ContactForm";

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
  const contactInfo = useMemo(
    () => [
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
    ],
    [data.personal]
  );

  const socialLinks = useMemo(
    () => [
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
    ],
    []
  );

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
  };

  return (
    <AnimatedSection id="contact" className="py-20 px-6 relative">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-primary rounded-full opacity-10 blur-3xl animate-float" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <m.div initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
          <m.h2 variants={itemVariants} transition={{ duration: 0.6, ease: "easeOut" }} className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {data.sections.contact.title}
          </m.h2>
          <m.p variants={itemVariants} transition={{ duration: 0.6, ease: "easeOut" }} className="text-lg text-secondary max-w-2xl mx-auto mb-8">
            {data.sections.contact.subtitle}
          </m.p>
          <m.div variants={itemVariants} transition={{ duration: 0.6, ease: "easeOut" }} className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </m.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedCard delay={0.3}>
            <ContactForm labels={data.sections.contact.form} />
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
                        <a href={info.href} className="text-primary hover:text-accent transition-smooth">
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
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Available for Work</Badge>
                </div>
                <p className="text-secondary">I'm currently open to new opportunities and interesting projects. Let's discuss how we can work together!</p>
              </CardContent>
            </Card>
          </m.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default memo(Contact);
