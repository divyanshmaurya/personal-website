import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LinkedinLogo, EnvelopeSimple, PaperPlaneTilt, MapPin } from '@phosphor-icons/react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;

    if (!section || !form) return;

    // Title animation
    gsap.fromTo(
      '.contact-title',
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Form elements stagger
    gsap.fromTo(
      '.form-element',
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: form,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Contact info animation
    gsap.fromTo(
      '.contact-info-item',
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Message sent! ✨",
        description: "Thanks for reaching out. I'll get back to you soon!",
      });

      // Button animation
      const button = formRef.current?.querySelector('button[type="submit"]');
      if (button) {
        gsap.fromTo(
          button,
          { scale: 1 },
          { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.inOut' }
        );
      }

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="glow-orb w-80 h-80 -top-20 left-1/4 opacity-15" />
      <div className="glow-orb w-60 h-60 bottom-10 right-10 opacity-20" style={{ background: 'radial-gradient(circle, hsl(262 83% 58%) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="contact-title section-title mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="contact-title text-muted-foreground text-lg">
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="contact-info space-y-6">
              <h3 className="contact-info-item text-2xl font-bold text-foreground mb-8">
                Contact Information
              </h3>
              
              <a
                href="mailto:dm6602@nyu.edu"
                className="contact-info-item glass-card p-4 rounded-xl flex items-center gap-4 hover:scale-[1.02] transition-transform group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <EnvelopeSimple size={24} weight="light" className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground font-medium">dm6602@nyu.edu</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/divyansh-maurya/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-item glass-card p-4 rounded-xl flex items-center gap-4 hover:scale-[1.02] transition-transform group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <LinkedinLogo size={24} weight="light" className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <p className="text-foreground font-medium">divyansh-maurya</p>
                </div>
              </a>

              <div className="contact-info-item glass-card p-4 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <MapPin size={24} weight="light" className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground font-medium">New York City</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="form-element">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-6 py-4 rounded-xl bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 input-glow transition-all"
                />
              </div>
              <div className="form-element">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-6 py-4 rounded-xl bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 input-glow transition-all"
                />
              </div>
              <div className="form-element">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="w-full px-6 py-4 rounded-xl bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 input-glow transition-all resize-none"
                />
              </div>
              <div className="form-element">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-neon w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <PaperPlaneTilt size={20} weight="bold" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;