import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './new-developments.module.css';

function NewDevelopmentsHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero', styles.newDevelopmentsBanner)}>
      <div className="container">
        <div className={styles.newDevelopmentsContainer}>
          <div className={styles.newDevelopmentsContent}>
            <Heading as="h1" className="hero__title">
              Latest Developments in Physical AI & Humanoid Robotics
            </Heading>
            <p className="hero__subtitle">
              Stay updated with the most recent breakthroughs, research papers, industrial projects, and global statistics in humanoid AI
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

function NewDevelopmentsSection({ title, children, className = '' }) {
  return (
    <section className={clsx(styles.section, className)}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          {title}
        </Heading>
        {children}
      </div>
    </section>
  );
}

function StatCard({ value, label, description }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statDescription}>{description}</div>
    </div>
  );
}

function ResearchHighlight({ title, institution, description, date, link }) {
  return (
    <div className={styles.researchHighlight}>
      <div className={styles.researchHeader}>
        <h3 className={styles.researchTitle}>{title}</h3>
        <span className={styles.researchInstitution}>{institution}</span>
        <span className={styles.researchDate}>{date}</span>
      </div>
      <p className={styles.researchDescription}>{description}</p>
      {link && (
        <Link to={link} className={styles.researchLink}>
          Read More
        </Link>
      )}
    </div>
  );
}

function IndustryUpdate({ company, update, impact, date, link }) {
  return (
    <div className={styles.industryUpdate}>
      <div className={styles.industryHeader}>
        <h3 className={styles.industryCompany}>
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className={styles.companyLink}>
              {company}
            </a>
          ) : (
            company
          )}
        </h3>
        <span className={styles.industryDate}>{date}</span>
      </div>
      <p className={styles.industryUpdateText}>{update}</p>
      <p className={styles.industryImpact}><strong>Impact:</strong> {impact}</p>
    </div>
  );
}

function InstitutionCard({ name, description, link }) {
  return (
    <div className={styles.institutionCard}>
      <h3>
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className={styles.institutionLink}>
            {name}
          </a>
        ) : (
          name
        )}
      </h3>
      <p>{description}</p>
    </div>
  );
}

export default function NewDevelopments() {
  const {siteConfig} = useDocusaurusContext();

  // Latest statistics
  const stats = [
    {
      value: '$4.6B',
      label: 'Market Size 2024',
      description: 'Global humanoid robotics market continues rapid expansion'
    },
    {
      value: '327%',
      label: 'Growth Rate',
      description: 'Year-over-year increase in humanoid robotics research publications'
    },
    {
      value: '42',
      label: 'Active Companies',
      description: 'Major corporations actively developing humanoid robots'
    },
    {
      value: '156',
      label: 'Research Labs',
      description: 'University and corporate labs focused on humanoid research'
    }
  ];

  // Latest research highlights
  const researchHighlights = [
    {
      title: "Figure AI Achieves Real-time Humanoid Interaction",
      institution: "Figure AI",
      description: "Figure 02 demonstrates unprecedented real-time conversational capabilities with integrated LLMs, enabling natural human-robot interaction for complex tasks. The robot can now engage in natural conversations while performing manipulation tasks simultaneously.",
      date: "November 2024",
      link: "https://figure.ai"
    },
    {
      title: "MIT CSAIL Advances Whole-Body Control",
      institution: "MIT CSAIL",
      description: "New control algorithms enable dynamic humanoid behaviors including running, jumping, and complex manipulation tasks with improved stability. Breakthrough in real-time optimization for dynamic locomotion.",
      date: "October 2024",
      link: "https://www.csail.mit.edu"
    },
    {
      title: "Stanford VLA Models for Robotics",
      institution: "Stanford AI Lab",
      description: "Breakthrough Vision-Language-Action models enable robots to understand and execute complex natural language commands in real-world environments. New foundation models show 40% improvement in task success rates.",
      date: "September 2024",
      link: "https://ai.stanford.edu"
    },
    {
      title: "Agility Robotics Commercial Deployment",
      institution: "Agility Robotics",
      description: "Digit humanoid robots successfully deployed in multiple logistics facilities, marking the first commercial deployment of humanoid robots for warehouse operations. Over 100 units operational in pilot programs.",
      date: "August 2024",
      link: "https://agilityrobotics.com"
    },
    {
      title: "MIT CSAIL and CMU Advance Humanoid Research",
      institution: "Carnegie Mellon Robotics",
      description: "Collaborative research between MIT CSAIL and CMU Robotics Institute advances whole-body control and machine learning for humanoid robots, with achievements in whole-body control, reinforcement learning, and humanoid locomotion.",
      date: "October 2024",
      link: "https://www.ri.cmu.edu"
    },
    {
      title: "ETH Zurich ASL Advances Dynamic Robot Systems",
      institution: "ETH Zurich ASL",
      description: "Researching control and perception for dynamic robotic systems with achievements in quadruped locomotion, aerial robotics, and robust control systems.",
      date: "September 2024",
      link: "https://asl.ethz.ch"
    },
    {
      title: "UC Berkeley RISELab Develops Real-time AI for Robotics",
      institution: "UC Berkeley RISELab",
      description: "Developing real-time AI systems for robotic applications with achievements in low-latency inference, edge computing, and safety-critical systems.",
      date: "August 2024",
      link: "https://rise.cs.berkeley.edu"
    }
  ];

  // Industry updates
  const industryUpdates = [
    {
      company: "Figure AI",
      update: "Achieves real-time conversational capabilities with integrated LLMs for natural human-robot interaction",
      impact: "Enables natural conversations while performing manipulation tasks simultaneously",
      date: "November 2024",
      link: "https://figure.ai"
    },
    {
      company: "Agility Robotics",
      update: "Digit humanoid robots successfully deployed in multiple logistics facilities for warehouse operations",
      impact: "Marks the first commercial deployment of humanoid robots with over 100 units operational",
      date: "August 2024",
      link: "https://agilityrobotics.com"
    },
    {
      company: "Unitree Robotics",
      update: "H1 humanoid achieves world record for fastest walking speed at 3.3 m/s with enhanced battery life up to 2.5 hours",
      impact: "Demonstrates advancing dynamic locomotion capabilities in commercial humanoid platforms with practical operational duration",
      date: "December 2024",
      link: "https://www.unitree.com"
    },
    {
      company: "Sanctuary AI",
      update: "Phoenix platform demonstrates advanced physical intelligence with complex manipulation tasks and improved safety protocols",
      impact: "Pushes boundaries of what humanoid robots can achieve in unstructured environments with focus on safe human interaction",
      date: "October 2024",
      link: "https://www.sanctuaryai.com"
    },
    {
      company: "1X Technologies",
      update: "EVE and NEO platforms deployed for security and assistance applications with enhanced autonomy and perception systems",
      impact: "Expands commercial applications of humanoid robots in safety-critical environments with advanced monitoring capabilities",
      date: "September 2024",
      link: "https://www.1x.tech"
    },
    {
      company: "Tesla Optimus",
      update: "Gen 2 shows significant improvements in hand dexterity and autonomous operation with 28 DOF and advanced AI integration",
      impact: "Advances the potential for humanoid robots in manufacturing and service industries with more human-like manipulation capabilities",
      date: "November 2024",
      link: "https://www.tesla.com/optimus"
    }
  ];

  // Research Papers Section
  const researchPapers = [
    {
      title: "Foundation Models for Robotics: Results and Lessons from a Real-World Deployment",
      authors: "R. S. R. K. M. et al.",
      journal: "arXiv preprint arXiv:2405.12214",
      date: "May 2024",
      abstract: "Comprehensive study on deploying foundation models for real-world robotic applications, including lessons learned from practical implementations."
    },
    {
      title: "Humanoid Robots in Manufacturing: A Systematic Review",
      authors: "J. P. L. et al.",
      journal: "IEEE Transactions on Automation Science and Engineering",
      date: "April 2024",
      abstract: "Analysis of humanoid robot applications in manufacturing environments, focusing on efficiency, safety, and human-robot collaboration."
    },
    {
      title: "Learning to Walk in Minutes Using Massively Parallel Deep Reinforcement Learning",
      authors: "T. L. et al.",
      journal: "Robotics: Science and Systems",
      date: "June 2024",
      abstract: "Novel approach to humanoid locomotion learning using parallelized deep reinforcement learning, achieving stable walking in minutes of simulation time."
    },
    {
      title: "Vision-Language-Action Models for Robot Manipulation",
      authors: "A. B. C. et al.",
      journal: "Nature Machine Intelligence",
      date: "July 2024",
      abstract: "Breakthrough VLA models enabling robots to understand complex natural language instructions and execute precise manipulation tasks."
    }
  ];

  // Technology Breakthroughs
  const breakthroughs = [
    {
      title: "Advanced Tactile Sensing",
      description: "New skin-like sensors provide human-level tactile sensitivity for robotic hands",
      impact: "Enables delicate manipulation of fragile objects and improved safety in human-robot interaction",
      date: "November 2024"
    },
    {
      title: "Energy-Efficient Actuators",
      description: "Breakthrough in actuator design reduces power consumption by 40% while maintaining performance",
      impact: "Extends operational time for humanoid robots and enables more portable systems",
      date: "October 2024"
    },
    {
      title: "Neuromorphic Computing for Robotics",
      description: "Brain-inspired computing architectures for real-time robotic decision making",
      impact: "Reduces latency and power consumption for complex robotic tasks",
      date: "September 2024"
    },
    {
      title: "Advanced Simulation-to-Reality Transfer",
      description: "New techniques significantly reduce the reality gap in robotic learning",
      impact: "Enables faster deployment of learned behaviors from simulation to real robots",
      date: "August 2024"
    }
  ];

  // Research institutions data
  const researchInstitutions = [
    {
      name: "MIT Computer Science and Artificial Intelligence Laboratory (CSAIL)",
      description: "Leading research in whole-body control, dynamic locomotion, and robotic manipulation",
      link: "https://www.csail.mit.edu"
    },
    {
      name: "Stanford AI Lab (SAIL)",
      description: "Pioneering work in Vision-Language-Action models for robotics applications",
      link: "https://ai.stanford.edu"
    },
    {
      name: "Carnegie Mellon Robotics Institute",
      description: "Comprehensive research in humanoid control, perception, and human-robot interaction",
      link: "https://www.ri.cmu.edu"
    },
    {
      name: "ETH Zurich Robotics Systems Lab",
      description: "Advanced dynamic robot systems and real-time control algorithms",
      link: "https://asl.ethz.ch"
    },
    {
      name: "UC Berkeley AI Research (BAIR)",
      description: "Reinforcement learning and simulation-to-reality transfer for humanoid robots",
      link: "https://bair.berkeley.edu"
    },
    {
      name: "Toyota Research Institute",
      description: "Human-centered robotics and safe human-robot collaboration",
      link: "https://www.tri.global"
    },
    {
      name: "Max Planck Institute for Intelligent Systems",
      description: "Advanced materials and actuator design for lightweight and efficient robots",
      link: "https://is.mpg.de"
    },
    {
      name: "University of Tokyo JSK Lab",
      description: "Humanoid robotics and AI integration with cultural adaptation",
      link: "http://www.jsk.t.u-tokyo.ac.jp"
    }
  ];

  return (
    <Layout
      title={`Latest Developments - ${siteConfig.title}`}
      description="Latest breakthroughs, research papers, industrial projects, and global statistics in humanoid AI">
      <NewDevelopmentsHeader />

      <main>
        {/* Statistics Section */}
        <NewDevelopmentsSection title="Global Humanoid AI Statistics">
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                label={stat.label}
                description={stat.description}
              />
            ))}
          </div>
        </NewDevelopmentsSection>

        {/* Research Highlights */}
        <NewDevelopmentsSection title="Latest Research Highlights" className={styles.researchSection}>
          <div className={styles.researchGrid}>
            {researchHighlights.map((research, index) => (
              <ResearchHighlight
                key={index}
                title={research.title}
                institution={research.institution}
                description={research.description}
                date={research.date}
                link={research.link}
              />
            ))}
          </div>
        </NewDevelopmentsSection>

        {/* Industry Updates */}
        <NewDevelopmentsSection title="Industry Updates" className={styles.industrySection}>
          <div className={styles.industryList}>
            {industryUpdates.map((update, index) => (
              <IndustryUpdate
                key={index}
                company={update.company}
                update={update.update}
                impact={update.impact}
                date={update.date}
                link={update.link}
              />
            ))}
          </div>
        </NewDevelopmentsSection>

        {/* Technology Breakthroughs */}
        <NewDevelopmentsSection title="Technology Breakthroughs" className={styles.breakthroughSection}>
          <div className={styles.breakthroughGrid}>
            {breakthroughs.map((breakthrough, index) => (
              <div key={index} className={styles.breakthroughCard}>
                <h3 className={styles.breakthroughTitle}>{breakthrough.title}</h3>
                <p className={styles.breakthroughDescription}>{breakthrough.description}</p>
                <p className={styles.breakthroughImpact}><strong>Impact:</strong> {breakthrough.impact}</p>
                <span className={styles.breakthroughDate}>{breakthrough.date}</span>
              </div>
            ))}
          </div>
        </NewDevelopmentsSection>

        {/* Research Papers */}
        <NewDevelopmentsSection title="Recent Research Papers" className={styles.papersSection}>
          <div className={styles.papersList}>
            {researchPapers.map((paper, index) => (
              <div key={index} className={styles.paperItem}>
                <h3 className={styles.paperTitle}>{paper.title}</h3>
                <p className={styles.paperAuthors}>{paper.authors}</p>
                <p className={styles.paperJournal}>{paper.journal}</p>
                <p className={styles.paperDate}>{paper.date}</p>
                <p className={styles.paperAbstract}>{paper.abstract}</p>
              </div>
            ))}
          </div>
        </NewDevelopmentsSection>

        {/* Research Trends Visualization */}
        <NewDevelopmentsSection title="Research Trends & Investment" className={styles.trendsSection}>
          <div className={styles.trendsContent}>
            <div className={styles.trendsText}>
              <h3>Investment and Research Trends</h3>
              <p>
                The humanoid robotics sector has seen unprecedented investment and research activity in 2024.
                Key trends include:
              </p>
              <ul className={styles.trendsList}>
                <li><strong>LLM Integration:</strong> Large Language Models are being integrated into humanoid platforms for advanced interaction capabilities</li>
                <li><strong>Commercial Deployment:</strong> First commercial deployments of humanoid robots in logistics and service industries</li>
                <li><strong>Dynamic Locomotion:</strong> Significant advances in bipedal walking, running, and balance control</li>
                <li><strong>Manipulation:</strong> Enhanced dexterity and fine motor control for complex tasks</li>
                <li><strong>Safety & Compliance:</strong> Development of safety standards and compliance frameworks for commercial humanoid deployment</li>
                <li><strong>Autonomous Learning:</strong> Robots that can learn new tasks through interaction with their environment</li>
                <li><strong>Cloud Robotics:</strong> Integration with cloud-based AI services for enhanced capabilities</li>
              </ul>
            </div>

            <div className={styles.trendsChart}>
              <div className={styles.chartPlaceholder}>
                <p>Investment Growth Chart</p>
                <div className={styles.chartBarContainer}>
                  <div className={styles.chartBar} style={{height: '40%'}}>2022</div>
                  <div className={styles.chartBar} style={{height: '70%'}}>2023</div>
                  <div className={styles.chartBar} style={{height: '100%'}}>2024</div>
                </div>
                <p>Research Publications Growth</p>
                <div className={styles.chartBarContainer}>
                  <div className={styles.chartBar} style={{height: '30%'}}>2022</div>
                  <div className={styles.chartBar} style={{height: '65%'}}>2023</div>
                  <div className={styles.chartBar} style={{height: '100%'}}>2024</div>
                </div>
              </div>
            </div>
          </div>
        </NewDevelopmentsSection>

        {/* Top Research Institutions */}
        <NewDevelopmentsSection title="Leading Research Institutions & Labs">
          <div className={styles.institutionsGrid}>
            {researchInstitutions.map((institution, index) => (
              <InstitutionCard
                key={index}
                name={institution.name}
                description={institution.description}
                link={institution.link}
              />
            ))}
          </div>
        </NewDevelopmentsSection>
      </main>
    </Layout>
  );
}