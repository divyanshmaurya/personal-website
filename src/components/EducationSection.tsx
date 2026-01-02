import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    institution: "New York University",
    degree: "Master of Science in Computer Science",
    period: "September 2025 – May 2027",
    location: "New York City, USA"
  },
  {
    institution: "National Institute of Technology, Tiruchirappalli",
    degree: "Master of Computer Applications",
    period: "August 2019 – May 2022",
    location: "India"
  },
  {
    institution: "Banaras Hindu University",
    degree: "Bachelor of Science (Hons.) in Computer Science",
    period: "August 2015 – May 2018",
    location: "India"
  }
];

const EducationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    gsap.fromTo(
      section.querySelector('h2'),
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      cards.children,
      { opacity: 0, y: 60, filter: 'blur(8px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: cards,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="glow-orb absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      <div className="glow-orb absolute bottom-20 right-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16">
          <span className="text-gradient">Education</span>
        </h2>

        <div ref={cardsRef} className="grid gap-6 md:gap-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="glass-card p-6 md:p-8 rounded-2xl hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                    {edu.institution}
                  </h3>
                  <p className="text-lg text-primary font-medium mb-3">
                    {edu.degree}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      {edu.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
