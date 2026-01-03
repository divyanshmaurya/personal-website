import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Brain, Users } from '@phosphor-icons/react';
import project1 from '@/assets/project-1.png';
import project2 from '@/assets/project-2.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Brain-Controlled Wheelchair',
    description: 'Mind-controlled mobility using EEG signals, enabling hands-free wheelchair navigation through brain activity.',
    image: project1,
    tags: ['EEG', 'Deep Learning', 'Signal Processing', 'Python'],
    icon: Brain,
    link: null,
  },
  {
    title: 'AI Workforce Digital Twin',
    description: 'Simulating leadership pipelines and succession planning using AI-driven workforce modeling.',
    image: project2,
    tags: ['AI', 'Simulation', 'HR Analytics', 'Machine Learning'],
    icon: Users,
    link: 'https://attritionsimulation1.streamlit.app/',
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cardsContainer = cardsContainerRef.current;

    if (!section || !title || !cardsContainer) return;

    // Title animation
    gsap.fromTo(
      title,
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

    // Cards animation with stagger
    gsap.fromTo(
      '.project-card-wrapper',
      { opacity: 0, y: 80, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsContainer,
          start: 'top 75%',
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
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="glow-orb w-96 h-96 -top-40 -right-40 opacity-15" style={{ background: 'radial-gradient(circle, hsl(217 91% 60%) 0%, transparent 70%)' }} />
      <div className="glow-orb w-64 h-64 bottom-20 -left-20 opacity-20" />

      <div className="container mx-auto px-6">
        <h2 ref={titleRef} className="section-title text-center mb-16">
          Featured <span className="gradient-text">Projects</span>
        </h2>

        {/* Bento Grid */}
        <div ref={cardsContainerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => {
            const CardWrapper = project.link ? 'a' : 'div';
            const cardProps = project.link
              ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
              : {};
            
            return (
            <CardWrapper
              key={project.title}
              {...cardProps}
              className={`project-card-wrapper ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="project-card h-full flex flex-col group cursor-pointer">
                {/* Image */}
                <div className="relative h-48 md:h-56 overflow-hidden rounded-xl mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                  <div className="absolute top-4 left-4 p-3 rounded-xl bg-primary/20 backdrop-blur-sm">
                    <project.icon size={24} className="text-primary" weight="light" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight 
                      size={20} 
                      className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" 
                    />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
