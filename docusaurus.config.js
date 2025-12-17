// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'A comprehensive textbook on AI Systems in the Physical World',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  /*
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },
  */

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Remove editUrl to disable "edit this page" links
          remarkPlugins: [require('mdx-mermaid')],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Remove editUrl to disable "edit this page" links
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themes: [
    '@docusaurus/theme-mermaid',
  ],
  plugins: [
    // Add the root wrapper
    function() {
      return {
        name: 'rag-chatbot-root-wrapper',
        getClientModules() {
          return [require.resolve('./src/components/RAGChatbot/RootWrapper.jsx')];
        },
      };
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Physical AI & Humanoid Robotics',
        logo: {
          alt: 'Physical AI & Humanoid Robotics Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'mainSidebar',
            position: 'left',
            label: 'Courses', // Changed from 'Book Chapters'
          },
          {to: '/modules', label: 'Modules', position: 'left'}, // Changed from '/blog', label 'Blog'
          {to: '/new-developments', label: 'New Developments', position: 'left'},
          {
            href: 'https://github.com/BasenAI',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Courses',
            items: [
              { label: 'Course Introduction', to: '/docs/intro' },
              { label: 'Physical AI & Humanoid Robotics', to: '/' },
              { label: 'Chapter 1: Introduction', to: '/docs/my-book/chapter-1' },
              { label: 'Chapter 2: ROS 2', to: '/docs/my-book/chapter-2' },
              { label: 'Chapter 3: Simulation', to: '/docs/my-book/chapter-3' },
              { label: 'Chapter 4: Computer Vision', to: '/docs/my-book/chapter-4' },
            ],
          },
          {
            title: 'Modules',
            items: [
              { label: 'All Modules', to: '/modules' },
              { label: 'Chapter 5: VLA Systems', to: '/docs/my-book/chapter-5' },
              { label: 'Chapter 6: Humanoid Development', to: '/docs/my-book/chapter-6' },
              { label: 'Chapter 7: Conversational Robotics', to: '/docs/my-book/chapter-7' },
              { label: 'Chapter 8: Advanced Concepts', to: '/docs/my-book/chapter-8' },
              { label: 'Core Concepts', to: '/docs/core-concepts' },
              { label: 'AI Concepts', to: '/docs/core-concepts/ai' },
            ],
          },
        ],
        copyright: `Copyright © Daniyal Azhar. All rights reserved. The author retains full intellectual property rights. This work is published for educational purposes and is accessible for free public learning. No commercial reproduction, redistribution, or modification is permitted without written permission.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
