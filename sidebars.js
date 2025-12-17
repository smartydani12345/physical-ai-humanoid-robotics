// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  mainSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        {
          type: 'doc',
          id: 'intro',
          label: 'Introduction to Physical AI & Humanoid Robotics'
        },
        {
          type: 'doc',
          id: 'introduction',
          label: 'Introduction Chapter'
        },
        {
          type: 'doc',
          id: 'beginners-guide',
          label: 'Beginner\'s Guide'
        }
      ],
      collapsed: false
    },
    {
      type: 'category',
      label: 'Foundations & History',
      items: [
        {
          type: 'doc',
          id: 'history-of-humanoid-robotics',
          label: 'History of Humanoid Robotics'
        },
        {
          type: 'doc',
          id: 'research-contributions',
          label: 'Research Contributions'
        },
        {
          type: 'doc',
          id: 'documentation-overview',
          label: 'Documentation Overview'
        }
      ],
      collapsed: false
    },
    {
      type: 'category',
      label: 'Core Concepts - The My Book Series',
      items: [
        {
          type: 'doc',
          id: 'my-book/chapter-1',
          label: 'Chapter 1: The New World - Introduction'
        },
        {
          type: 'doc',
          id: 'my-book/chapter-2',
          label: 'Chapter 2: ROS 2 - The Robotic Nervous System'
        },
        {
          type: 'doc',
          id: 'my-book/chapter-3',
          label: 'Chapter 3: Simulation and Modeling'
        },
        {
          type: 'doc',
          id: 'my-book/chapter-4',
          label: 'Chapter 4: Computer Vision'
        },
        {
          type: 'doc',
          id: 'my-book/chapter-5',
          label: 'Chapter 5: Vision-Language-Action (VLA) Systems'
        },
        {
          type: 'doc',
          id: 'my-book/chapter-6',
          label: 'Chapter 6: Humanoid Development'
        },
        {
          type: 'doc',
          id: 'my-book/chapter-7',
          label: 'Chapter 7: Conversational Robotics'
        },
        {
          type: 'doc',
          id: 'my-book/chapter-8',
          label: 'Chapter 8: Advanced Concepts'
        },
        {
          type: 'doc',
          id: 'my-book/chapter-9',
          label: 'Chapter 9: Advanced Topics'
        },
        {
          type: 'doc',
          id: 'my-book/chapter-10',
          label: 'Chapter 10: Future Directions'
        }
      ],
      collapsed: false
    }
  ],
};

export default sidebars;
