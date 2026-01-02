import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, MapPin, Calendar } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: 'Software Development Engineer',
    company: 'Fastenal',
    location: 'Bangalore, India',
    period: 'July 2022 – March 2024',
    points: [
      'Developed and deployed RESTful APIs with 99.9% uptime, enabling real-time data interaction and third-party integrations, boosting customer engagement by 30%.',
      'Built scalable APIs consumed by multiple frontend clients and third-party systems, improving customer-facing workflows and increasing engagement by 30%.',
      'Developed and maintained CI/CD pipelines using Jenkins, Docker, and TeamCity, reducing deployment failures by 35% and improving release velocity.',
      'Implemented TeamCity configuration-as-code using Kotlin DSL, enabling reproducible builds and operational consistency across environments.',
    ],
  },
  {
    title: 'Software Development Engineer Intern',
    company: 'Fastenal',
    location: 'Bangalore, India',
    period: 'Jan. 2022 – May 2022',
    points: [
      'Implemented backend business logic in Node.js for a distributed supply chain application, leveraging asynchronous processing to reduce latency by 40%.',
      'Contributed to microservices-based architecture deployed via automated pipelines (TeamCity, Octopus), increasing deployment frequency and system reliability.',
    ],
  },
  {
    title: 'Research Internship: Churn Prediction',
    company: 'National Institute of Technology, Tiruchirappalli',
    location: 'India',
    period: 'May 2019 – July 2019',
    points: [
      'Developed a predictive model using Artificial Neural Networks on customer historical data to identify churn risk, segmenting customers based on their likelihood to churn.',
    ],
  },
];

const WorkExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const timeline = timelineRef.current;

    if (!section || !title || !timeline) return;

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

    // Experience cards animation
    gsap.fromTo(
      '.experience-card',
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timeline,
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
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="glow-orb w-80 h-80 -top-32 -left-32 opacity-15" />
      <div className="glow-orb w-64 h-64 bottom-20 -right-20 opacity-20" style={{ background: 'radial-gradient(circle, hsl(280 70% 50%) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6">
        <h2 ref={titleRef} className="section-title text-center mb-16">
          Work <span className="gradient-text">Experience</span>
        </h2>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <div
              key={`${exp.title}-${exp.period}`}
              className={`experience-card relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary shadow-glow transform -translate-x-1/2 mt-2 z-10" />

              {/* Content */}
              <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <div className="glass-card p-6 rounded-2xl hover:shadow-glow transition-all duration-500 group">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-primary/20 backdrop-blur-sm">
                      <Briefcase size={24} className="text-primary" weight="light" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} weight="light" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} weight="light" />
                      {exp.period}
                    </span>
                  </div>

                  {/* Points */}
                  <ul className="space-y-2">
                    {exp.points.map((point, pointIndex) => (
                      <li
                        key={pointIndex}
                        className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                      >
                        <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperienceSection;
