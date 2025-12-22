import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './Hero.module.css';
import Heading from '@theme/Heading';

function IndustryCard({ isActive, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const industryLeaders = [
    {
      name: "Figure AI",
      project: "Next-gen humanoid assistants",
      description: "Developing human-like robots for various applications",
      achievements: ["Real-time conversation", "Advanced dexterity", "Commercial deployment"]
    },
    {
      name: "Agility Robotics",
      project: "Digit humanoid for logistics",
      description: "Creating robots for warehouse and logistics operations",
      achievements: ["Commercial deployment", "Robust locomotion", "Load handling"]
    },
    {
      name: "Unitree Robotics",
      project: "Advanced quadruped and humanoid platforms",
      description: "High-performance robots for research and commercial use",
      achievements: ["Fastest walking speed", "Dynamic movement", "User-friendly design"]
    },
    {
      name: "Sanctuary AI",
      project: "High-fidelity physical intelligence",
      description: "Creating robots with human-like capabilities",
      achievements: ["Advanced AI integration", "Safe operation", "Complex tasks"]
    },
    {
      name: "1X Technologies",
      project: "Humanoid safety and assistance robots",
      description: "Robots for safety-critical and assistance applications",
      achievements: ["Safety focus", "Human collaboration", "Commercial viability"]
    }
  ];

  return (
    <div
      className={clsx(
        styles.card,
        styles.industryCard,
        isActive && styles.activeCard,
        isHovered && styles.hoveredCard
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>🏢 Industry Leaders</h3>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.labsList}>
          {industryLeaders.map((company, index) => (
            <div key={index} className={styles.labItem}>
              <h4 className={styles.labName}>{company.name}</h4>
              <p className={styles.labProject}>{company.project}</p>
              <p className={styles.labDescription}>{company.description}</p>
              <ul className={styles.labAchievements}>
                {company.achievements.map((achievement, idx) => (
                  <li key={idx} className={styles.achievementItem}>• {achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.chartPlaceholder}>
          <h4>Market Growth</h4>
          <div className={styles.barChart}>
            <div className={clsx(styles.bar, styles.bar1, styles.industryBar)} style={{height: '30%'}}></div>
            <div className={clsx(styles.bar, styles.bar2, styles.industryBar)} style={{height: '50%'}}></div>
            <div className={clsx(styles.bar, styles.bar3, styles.industryBar)} style={{height: '75%'}}></div>
            <div className={clsx(styles.bar, styles.bar4, styles.industryBar)} style={{height: '100%'}}></div>
          </div>
          <div className={styles.chartLabels}>
            <span>2021</span>
            <span>2022</span>
            <span>2023</span>
            <span>2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  const {siteConfig} = useDocusaurusContext();
  const [activeCard, setActiveCard] = useState(null);
  const [progress, setProgress] = useState(35);
  const [showModules, setShowModules] = useState(false);

  // Modules data
  const modules = [
    {
      id: 1,
      title: 'Module 1: Introduction to Physical AI & Humanoid Robotics',
      duration: '2 weeks',
      chapters: [
        { id: 1, title: 'Chapter 1: The New World', description: 'Introduction to Physical AI & Humanoid Robotics', path: '/docs/my-book/chapter-1' },
        { id: 2, title: 'Chapter 2: ROS 2 - The Robotic Nervous System', description: 'Understanding Robot Operating System 2', path: '/docs/my-book/chapter-2' }
      ]
    },
    {
      id: 2,
      title: 'Module 2: Sensing and Perception',
      duration: '3 weeks',
      chapters: [
        { id: 1, title: 'Chapter 3: Simulation and Modeling', description: 'Simulation environments for robotics development', path: '/docs/my-book/chapter-3' },
        { id: 2, title: 'Chapter 4: Computer Vision', description: 'Visual perception systems for robots', path: '/docs/my-book/chapter-4' }
      ]
    },
    {
      id: 3,
      title: 'Module 3: Vision-Language-Action (VLA) Systems',
      duration: '4 weeks',
      chapters: [
        { id: 1, title: 'Chapter 5: Advanced VLA Integration', description: 'Vision-Language-Action systems for robotics', path: '/docs/my-book/chapter-5' },
        { id: 2, title: 'Chapter 6: Humanoid Development', description: 'Humanoid robot design and development', path: '/docs/my-book/chapter-6' }
      ]
    },
    {
      id: 4,
      title: 'Module 4: Human-Robot Interaction',
      duration: '3 weeks',
      chapters: [
        { id: 1, title: 'Chapter 7: Conversational Robotics', description: 'Speech and language interaction systems', path: '/docs/my-book/chapter-7' },
        { id: 2, title: 'Chapter 8: Advanced Concepts', description: 'Advanced robotics concepts and applications', path: '/docs/my-book/chapter-8' }
      ]
    },
    {
      id: 5,
      title: 'Module 5: Specialized Applications',
      duration: '3 weeks',
      chapters: [
        { id: 1, title: 'Chapter 9: Advanced Topics', description: 'Advanced topics in humanoid robotics', path: '/docs/my-book/chapter-9' },
        { id: 2, title: 'Chapter 10: Future Directions', description: 'Future of Physical AI & Humanoid Robotics', path: '/docs/my-book/chapter-10' }
      ]
    }
  ];

  // Update progress function
  const updateProgress = (increment) => {
    setProgress(prev => {
      const newProgress = Math.min(100, Math.max(0, prev + increment));
      return newProgress;
    });
  };

  // Auto-rotate cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard(prev => {
        if (prev === null) return 0;
        return 0;
      });
    }, 8000); // Rotate every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContainer}>
          {/* Left Side Content */}
          <div className={styles.heroLeft}>
            <Heading as="h1" className="hero__title">
              PHYSICAL AI & HUMANOIDS ROBOTICS
            </Heading>
            <p className="hero__subtitle">
              Explore the fascinating world of physical AI & HUMANOIDS ROBOTICS, bridging the digital intelligence with physical systems for a new era of interaction and autonomy
            </p>

            {/* Start Learning Button */}
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/docs/intro">
                Start Learning
              </Link>
            </div>

            {/* Modules Dropdown */}
            <div className={styles.modulesSection}>
              <button
                className={styles.modulesButton}
                onClick={() => setShowModules(!showModules)}
              >
                Modules
              </button>

              {showModules && (
                <div className={styles.modulesDropdown}>
                  {modules.map(module => (
                    <div key={module.id} className={styles.moduleItem}>
                      <div className={styles.moduleHeader}>
                        <h4 className={styles.moduleTitle}>{module.title}</h4>
                        <span className={styles.moduleDuration}>{module.duration}</span>
                      </div>
                      <div className={styles.chaptersList}>
                        {module.chapters.map(chapter => (
                          <Link
                            key={chapter.id}
                            to={chapter.path}
                            className={styles.chapterItem}
                            onClick={() => setShowModules(false)}
                          >
                            <h5 className={styles.chapterTitle}>{chapter.title}</h5>
                            <p className={styles.chapterDescription}>{chapter.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cards Section */}
            <div className={styles.cardsContainer}>
              <IndustryCard
                isActive={activeCard === 0}
                onClick={() => setActiveCard(0)}
              />
            </div>

            {/* Enhanced Progress Section */}
            <div className={styles.progressSection}>
              <h4 className={styles.progressTitle}>Learning Progress</h4>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{width: `${progress}%`}}
                ></div>
              </div>
              <p className={styles.progressText}>{progress}% Complete</p>
              <button
                className={styles.progressButton}
                onClick={() => updateProgress(10)}
              >
                Mark Chapter Complete
              </button>
            </div>

            {/* Eco-friendly and Student-focused Content */}
            <div className={styles.contentInfo}>
              <p className={styles.infoText}>
                <strong>Eco-friendly:</strong> Our learning materials are designed to be environmentally sustainable,
                reducing the need for physical textbooks while providing comprehensive digital resources.
              </p>
              <p className={styles.infoText}>
                <strong>Student-focused:</strong> Content designed for all students, whether programmers or not,
                with professional descriptions by scholars and university professors.
              </p>
            </div>
          </div>

          {/* Right Side Image */}
          <div className={styles.heroRight}>
            <div className={styles.imageContainer}>
              <img
                src="/img/hero.jpg"
                alt="Humanoid Robot"
                className={styles.roboticsImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: '500px',
                  objectFit: 'contain'
                }}
              />
              <div className={styles.placeholderText} style={{display: 'none'}}>
                Humanoid Robot Image
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;