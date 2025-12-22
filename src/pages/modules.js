import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './modules.module.css';

function ModulesPage() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Modules - ${siteConfig.title}`}
      description="Modules for Physical AI & Humanoid Robotics textbook">
      <main className={styles.modulesContainer}>
        <div className="container container--fluid padding-horiz--xl padding-vert--lg">
          <div className="row">
            <div className="col col--12 padding-vert--lg">
              <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
                Course Modules
              </Heading>
              <p className="hero__subtitle">
                Explore the different modules of the Physical AI & Humanoid Robotics curriculum
              </p>

              <div className={styles.modulesGrid}>
                <div className={styles.moduleCard}>
                  <div className={styles.moduleIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/>
                    </svg>
                  </div>
                  <h3>Module 1: ROS 2 Fundamentals</h3>
                  <p>Learn the basics of Robot Operating System 2, including nodes, topics, services, and actions.</p>
                  <div className={styles.moduleTopics}>
                    <span className={styles.topicTag}>Nodes</span>
                    <span className={styles.topicTag}>Topics</span>
                    <span className={styles.topicTag}>Services</span>
                    <span className={styles.topicTag}>Actions</span>
                  </div>
                  <Link to="/docs/my-book/chapter-2" className={styles.moduleLink}>
                    Start Learning
                  </Link>
                </div>

                <div className={styles.moduleCard}>
                  <div className={styles.moduleIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>
                    </svg>
                  </div>
                  <h3>Module 2: Sensors and End Effectors</h3>
                  <p>Understanding different types of sensors and actuators used in robotics applications.</p>
                  <div className={styles.moduleTopics}>
                    <span className={styles.topicTag}>Sensors</span>
                    <span className={styles.topicTag}>Actuators</span>
                    <span className={styles.topicTag}>LIDAR</span>
                    <span className={styles.topicTag}>Cameras</span>
                  </div>
                  <Link to="/docs/my-book/chapter-3" className={styles.moduleLink}>
                    Start Learning
                  </Link>
                </div>

                <div className={styles.moduleCard}>
                  <div className={styles.moduleIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                  </div>
                  <h3>Module 3: Vision-Language-Action (VLA) Systems</h3>
                  <p>Integration of computer vision, natural language processing, and action for intelligent robotics.</p>
                  <div className={styles.moduleTopics}>
                    <span className={styles.topicTag}>Vision</span>
                    <span className={styles.topicTag}>Language</span>
                    <span className={styles.topicTag}>Action</span>
                    <span className={styles.topicTag}>Whisper</span>
                  </div>
                  <Link to="/docs/my-book/chapter-5" className={styles.moduleLink}>
                    Start Learning
                  </Link>
                </div>

                <div className={styles.moduleCard}>
                  <div className={styles.moduleIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 8c2.64 0 4.85 1.52 5.5 4 .02.06.02.14 0 .2 0 .41-.34.75-.75.75H7c-.41 0-.75-.34-.75-.75 0-.06 0-.14.02-.2.65-2.48 2.86-4 5.5-4z"/><path d="M12 18.5c-2.64 0-4.85-1.52-5.5-4 .02-.06.02-.14 0-.2 0-.41.34-.75.75-.75h11.5c.41 0 .75.34.75.75 0 .06 0 .14-.02.2-.65 2.48-2.86 4-5.5 4z"/><circle cx="12" cy="12" r="10"/>
                    </svg>
                  </div>
                  <h3>Module 4: Humanoid Robot Development</h3>
                  <p>Mechanical design, control systems, and development of humanoid robots.</p>
                  <div className={styles.moduleTopics}>
                    <span className={styles.topicTag}>Mechanics</span>
                    <span className={styles.topicTag}>Control</span>
                    <span className={styles.topicTag}>Kinematics</span>
                    <span className={styles.topicTag}>Dynamics</span>
                  </div>
                  <Link to="/docs/my-book/chapter-6" className={styles.moduleLink}>
                    Start Learning
                  </Link>
                </div>

                <div className={styles.moduleCard}>
                  <div className={styles.moduleIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <h3>Module 5: Conversational Robotics</h3>
                  <p>Speech recognition, natural language understanding, and human-robot interaction.</p>
                  <div className={styles.moduleTopics}>
                    <span className={styles.topicTag}>Speech</span>
                    <span className={styles.topicTag}>NLU</span>
                    <span className={styles.topicTag}>Dialogue</span>
                    <span className={styles.topicTag}>Interaction</span>
                  </div>
                  <Link to="/docs/my-book/chapter-7" className={styles.moduleLink}>
                    Start Learning
                  </Link>
                </div>

                <div className={styles.moduleCard}>
                  <div className={styles.moduleIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                  </div>
                  <h3>Module 6: Advanced Robotics Concepts</h3>
                  <p>Advanced topics in robotics including perception-action loops and real-time requirements.</p>
                  <div className={styles.moduleTopics}>
                    <span className={styles.topicTag}>Perception</span>
                    <span className={styles.topicTag}>Action</span>
                    <span className={styles.topicTag}>Real-time</span>
                    <span className={styles.topicTag}>Systems</span>
                  </div>
                  <Link to="/docs/my-book/chapter-8" className={styles.moduleLink}>
                    Start Learning
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default ModulesPage;