import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.2 });

    // Headline animation
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
    );

    // Subtitle animation
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 40, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );

    // CTA animation
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.3'
    );

    // Spline fade in
    tl.fromTo(
      splineRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=1'
    );

    // Floating orbs animation
    gsap.to('.hero-orb', {
      y: -30,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5,
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleHireClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Spline 3D Background */}
      <div
        ref={splineRef}
        className="absolute inset-0 z-0"
      >
        <iframe
          src="https://my.spline.design/orb-k7MHQ0Kfkf7pFyU4XnVnBXHF/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full"
          title="3D Orb"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Floating Orbs */}
      <div className="hero-orb glow-orb w-80 h-80 -top-40 -left-40" />
      <div className="hero-orb glow-orb w-60 h-60 top-1/4 -right-20" style={{ background: 'radial-gradient(circle, hsl(217 91% 60%) 0%, transparent 70%)' }} />
      <div className="hero-orb glow-orb w-40 h-40 bottom-1/4 left-1/4" style={{ background: 'radial-gradient(circle, hsl(262 83% 58%) 0%, transparent 70%)' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6"
        >
          Hi, I'm{' '}
          <span className="gradient-text text-glow-strong">Divyansh Maurya</span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Student at <span className="text-primary">New York University</span> • 
          AI/ML Enthusiast • Problem Solver
        </p>
        <a
          ref={ctaRef}
          href="#contact"
          onClick={handleHireClick}
          className="btn-neon inline-block animate-pulse-glow"
        >
          Hire Me
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
