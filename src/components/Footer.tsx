import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) return;

    // Footer animation
    gsap.fromTo(
      '.footer-content',
      { opacity: 0, y: 60, filter: 'blur(8px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Floating particles animation
    gsap.utils.toArray<HTMLDivElement>('.footer-particle').forEach((particle, i) => {
      gsap.to(particle, {
        y: `random(-30, 30)`,
        x: `random(-20, 20)`,
        duration: `random(3, 6)`,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: i * 0.2,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="relative py-16 border-t border-border/30 overflow-hidden">
      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="footer-particle particle"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Background glow */}
      <div className="glow-orb w-60 h-60 bottom-0 left-1/2 -translate-x-1/2 opacity-10" />

      <div className="footer-content container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="text-2xl font-bold gradient-text">
            DM
          </a>

          {/* Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, `#${link.toLowerCase() === 'home' ? 'hero' : link.toLowerCase()}`)}
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <Heart size={14} weight="fill" className="text-destructive" /> by Divyansh
          </p>
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground/50 text-xs">
            © {new Date().getFullYear()} Divyansh Maurya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
