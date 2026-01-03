import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Award, Medal, Star, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    icon: Star,
    title: "Technopreneur Development Program Founder",
    description: "Officially founded the Technopreneur Development Program for the Department of Computer Applications, National Institute of Technology, Tiruchirappalli (Nov. 2024) to foster entrepreneurial skills among students."
  },
  {
    icon: Award,
    title: "Bitrex 2017 Chairman",
    description: "Bitrex was Annual Technical Fest of Institute of Science BHU which was initiated by me with a group of students of Department of Computer Science, Institute of Science, Banaras Hindu University."
  },
  {
    icon: Trophy,
    title: "Pragyan Hackathon Finalist",
    description: "Finalist at Sangam Hackathon in Pragyan'20 and Pragyan'21 (ISO-certified Annual International Techno-Managerial Festival of NIT Trichy) under the Healthcare using AI sub-theme."
  },
  {
    icon: Trophy,
    title: "Defenders of Time Winner - ACUMEN 2019",
    description: "'Defenders of Time' is a Competitive Programming Event organized by ACM, NIT Trichy."
  },
  {
    icon: Award,
    title: "1st Position - Binate Faracas",
    description: "Secured 1st position in Binate Faracas at Infotrek'20, an Inter-Department Technical Symposium organized by ACM, NIT Trichy."
  },
  {
    icon: Medal,
    title: "2nd Position - Agamya Hackathon",
    description: "Achieved 2nd position in Agamya at Technofania'20, an Inter-Department Software Hackathon organized by the Open Source Open Community, NIT Trichy."
  },
  {
    icon: Target,
    title: "All India Rank 76 - NIMCET 2019",
    description: "Secured All India Rank 76 in NIMCET 2019 (NIT MCA Common Entrance Test)."
  },
  {
    icon: Medal,
    title: "National Level Skating",
    description: "Played at National level twice in skating and won two Gold Medals at the Regional level."
  }
];

const AchievementsSection = () => {
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
      { opacity: 0, y: 60, scale: 0.95, filter: 'blur(8px)' },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.15,
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
      id="achievements"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="glow-orb absolute top-40 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
      <div className="glow-orb absolute bottom-40 left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16">
          <span className="text-gradient">Achievements</span>
        </h2>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div
                key={index}
                className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
