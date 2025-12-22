import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HeroSection from '@site/src/components/Hero';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <>
      <HeroSection />

      {/* About Section */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutContainer}>
            <div className={styles.aboutContent}>
              <Heading as="h2" className={styles.aboutTitle}>
                About This Book
              </Heading>
              <p className={styles.aboutDescription}>
                "Physical AI & Humanoid Robotics" is a comprehensive textbook designed by leading scholars
                and professors from internationally recognized universities. This groundbreaking work bridges
                the gap between digital intelligence and physical systems, providing students and professionals
                with the knowledge needed to develop the next generation of intelligent robots.
              </p>

            </div>

            {/* Visual Elements Section */}
            <div className={styles.visualElements}>
              <div className={styles.graphContainer}>
                <h4 className={styles.graphTitle}>Learning Progress Overview</h4>
                <div className={styles.graphPlaceholder}>
                  <div className={styles.graphBar}>
                    <div className={styles.graphFill} style={{width: '65%'}}></div>
                  </div>
                  <div className={styles.graphLabels}>
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Advanced</span>
                  </div>
                </div>
              </div>

              <div className={styles.flowChartContainer}>
                <h4 className={styles.graphTitle}>Learning Path Flow</h4>
                <div className={styles.flowChartPlaceholder}>
                  <div className={styles.flowStep}>Fundamentals</div>
                  <div className={styles.flowArrow}>→</div>
                  <div className={styles.flowStep}>Sensors</div>
                  <div className={styles.flowArrow}>→</div>
                  <div className={styles.flowStep}>AI Systems</div>
                  <div className={styles.flowArrow}>→</div>
                  <div className={styles.flowStep}>Humanoids</div>
                </div>
              </div>

              <div className={styles.codeSnippet}>
                <h4 className={styles.graphTitle}>Sample Code</h4>
                <pre className={styles.codeBlock}>
                  <code>{`// Example ROS 2 Node for Humanoid Control
import rclpy
from rclpy.node import Node

class HumanoidController(Node):
    def __init__(self):
        super().__init__('humanoid_controller')
        self.get_logger().info('Humanoid Controller Started')

    def move_joint(self, joint_name, position):
        # Move specified joint to position
        pass`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Physical AI & Humanoid Robotics`}
      description="A comprehensive textbook on Physical AI & Humanoid Robotics">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}