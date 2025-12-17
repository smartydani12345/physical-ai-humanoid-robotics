import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import SvgMountain from '@site/static/img/undraw_docusaurus_mountain.svg';
import SvgTree from '@site/static/img/undraw_docusaurus_tree.svg';
import SvgReact from '@site/static/img/undraw_docusaurus_react.svg';

const FeatureList = [
  {
    title: 'Cutting-Edge Research',
    Svg: SvgMountain,
    description: (
      <>
        Explore the latest in AI, robotics, and humanoid engineering. We are at the forefront of research and development, pushing the boundaries of what&apos;s possible.
      </>
    ),
    link: '/docs/my-book/chapter-1',
    linkText: 'Explore Research'
  },
  {
    title: 'Open Source Hardware',
    Svg: SvgTree,
    description: (
      <>
        Our commitment to open source means you can access, modify, and contribute to our hardware designs. Let&apos;s build the future of robotics together.
      </>
    ),
    link: '/docs/my-book/chapter-4',
    linkText: 'View Hardware'
  },
  {
    title: 'Community-Driven Collaboration',
    Svg: SvgReact,
    description: (
      <>
        Join a vibrant community of engineers, researchers, and hobbyists. Share your ideas, get feedback, and collaborate on exciting projects.
      </>
    ),
    link: '/docs/my-book/chapter-10',
    linkText: 'Join Community'
  },
  {
    title: 'Module 1: ROS 2 Fundamentals',
    icon: '🤖',
    description: (
      <>
        Learn the basics of Robot Operating System 2, including nodes, topics, services, and actions for building robust robotic applications.
      </>
    ),
    link: '/docs/my-book/chapter-2',
    linkText: 'Start Learning'
  },
  {
    title: 'Module 2: Sensors and End Effectors',
    icon: '📡',
    description: (
      <>
        Understanding different types of sensors and actuators used in robotics applications for perception and interaction.
      </>
    ),
    link: '/docs/my-book/chapter-3',
    linkText: 'Start Learning'
  },
  {
    title: 'Module 3: Vision-Language-Action (VLA) Systems',
    icon: '👁️',
    description: (
      <>
        Integration of computer vision, natural language processing, and action for intelligent robotics systems.
      </>
    ),
    link: '/docs/my-book/chapter-5',
    linkText: 'Start Learning'
  },
  {
    title: 'Module 4: Humanoid Robot Development',
    icon: '🦾',
    description: (
      <>
        Mechanical design, control systems, and development of humanoid robots with advanced mobility and interaction.
      </>
    ),
    link: '/docs/my-book/chapter-6',
    linkText: 'Start Learning'
  },
  {
    title: 'Module 5: Conversational Robotics',
    icon: '💬',
    description: (
      <>
        Speech recognition, natural language understanding, and human-robot interaction for intuitive communication.
      </>
    ),
    link: '/docs/my-book/chapter-7',
    linkText: 'Start Learning'
  },
  {
    title: 'Module 6: Advanced Robotics Concepts',
    icon: '⚙️',
    description: (
      <>
        Advanced topics in robotics including perception-action loops and real-time requirements for complex systems.
      </>
    ),
    link: '/docs/my-book/chapter-8',
    linkText: 'Start Learning'
  },
];

function Feature({Svg, title, description, link, linkText, icon}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {Svg ? (
          <Svg className={styles.featureSvg} role="img" />
        ) : (
          <div className={styles.featureIcon}>
            {icon}
          </div>
        )}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        {link && linkText && (
          <div className="text--center padding-vert--md">
            <Link className="button button--secondary button--md" to={link}>
              {linkText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

Feature.propTypes = {
  Svg: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  link: PropTypes.string,
  linkText: PropTypes.string,
  icon: PropTypes.string,
};

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        {/* First row: Core features */}
        <div className="row padding-bottom--lg">
          {FeatureList.slice(0, 3).map(({title, Svg, description, link, linkText}) => (
            <Feature
              key={title}
              title={title}
              Svg={Svg}
              description={description}
              link={link}
              linkText={linkText}
            />
          ))}
        </div>

        {/* Second row: Modules */}
        <div className="row padding-bottom--lg">
          {FeatureList.slice(3, 6).map(({title, icon, description, link, linkText}) => (
            <Feature
              key={title}
              title={title}
              icon={icon}
              description={description}
              link={link}
              linkText={linkText}
            />
          ))}
        </div>

        {/* Third row: More modules */}
        <div className="row">
          {FeatureList.slice(6, 9).map(({title, icon, description, link, linkText}) => (
            <Feature
              key={title}
              title={title}
              icon={icon}
              description={description}
              link={link}
              linkText={linkText}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
