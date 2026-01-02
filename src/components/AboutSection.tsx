import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code,
  Brain,
  ChartLineUp,
  Tree,
  Cpu,
  Lightning,
} from '@phosphor-icons/react';
import profileImage from '@/assets/profile.png';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'C/C++', icon: Code },
  { name: 'Python', icon: Code },
  { name: 'Problem Solving', icon: Lightning },
  { name: 'DSA', icon: Tree },
  { name: 'Machine Learning', icon: Brain },
  { name: 'Deep Learning', icon: Cpu },
  { name: 'AI', icon: ChartLineUp },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

    // Section fade in
    gsap.fromTo(
      section,
      { opacity: 0, filter: 'blur(10px)' },
      {
        opacity: 1,
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

    // Image enters from left
    gsap.fromTo(
      image,
      { opacity: 0, x: -100, rotate: -5 },
      {
        opacity: 1,
        x: 0,
        rotate: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Content enters from right
    gsap.fromTo(
      content,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Skills stagger animation
    gsap.fromTo(
      '.skill-item',
      { opacity: 0, y: 30, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="glow-orb w-72 h-72 -top-20 right-0 opacity-20" />
      <div className="glow-orb w-48 h-48 bottom-0 left-10 opacity-15" style={{ background: 'radial-gradient(circle, hsl(262 83% 58%) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-start">
            <div className="profile-glow">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-background">
                <img
                  src={profileImage}
                  alt="Divyansh Maurya"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 hover:rotate-3"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <h2 className="section-title mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              I'm a passionate Computer Science student at New York University, 
              driven by a deep fascination for Artificial Intelligence and Machine Learning. 
              I thrive on solving complex problems and building innovative solutions 
              that push the boundaries of what's possible with technology.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              With a strong foundation in programming and algorithms, I'm constantly 
              exploring new frontiers in deep learning, neural networks, and intelligent systems.
            </p>

            {/* Skills Grid */}
            <div className="skills-grid grid grid-cols-3 sm:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="skill-item skill-icon flex-col gap-2 text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <skill.icon size={24} weight="light" className="text-primary" />
                  <span className="text-xs text-muted-foreground mt-1">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
