import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Logo entrance
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
    );

    // Progress bar animation
    tl.to(
      progressBarRef.current,
      {
        width: '100%',
        duration: 2.5,
        ease: 'power2.inOut',
        onUpdate: function() {
          const progress = Math.round(this.progress() * 100);
          setPercentage(progress);
        },
      },
      '-=0.3'
    );

    // Fade out preloader
    tl.to(
      [logoRef.current, progressBarRef.current?.parentElement, percentageRef.current],
      { opacity: 0, y: -30, duration: 0.5, stagger: 0.1, ease: 'power2.in' }
    );

    tl.to(preloaderRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
        onComplete();
      },
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      {/* Background orbs */}
      <div className="glow-orb w-96 h-96 -top-20 -left-20 animate-float" />
      <div className="glow-orb w-64 h-64 -bottom-10 -right-10 animate-float" style={{ animationDelay: '1s' }} />
      
      {/* Logo */}
      <div ref={logoRef} className="mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-2">DM</h1>
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase">Loading Experience</p>
      </div>

      {/* Progress bar */}
      <div className="progress-bar-container">
        <div ref={progressBarRef} className="progress-bar" />
      </div>

      {/* Percentage */}
      <span ref={percentageRef} className="mt-4 text-primary font-mono text-sm tracking-wider">
        {percentage}%
      </span>
    </div>
  );
};

export default Preloader;
