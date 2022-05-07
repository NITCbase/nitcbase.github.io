// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Nitcbase',
  tagline: 'Relational database project',
  url: 'https://nitcbase.github.io/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'NITCbase', // Usually your GitHub org/user name.
  projectName: 'nitcbase.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          showReadingTime: true,      
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    (
    {
      hideableSidebar: true,
      navbar: {
        hideOnScroll: true,
        title: 'NITCbase',
        // logo: {
        //   alt: 'NITCbase',
        //   src: 'img/logo.svg',
        // },
        items: [
          {
            type: 'doc',
            docId: 'Design/Architecture',
            position: 'left',
            label: 'Design',
          },
          {
            type: 'doc',
            docId: 'Roadmap/introduction',
            position: 'left',
            label: 'Roadmap',
          },
          {
            type: 'doc',
            docId: 'Tutorials/Indexing',
            position: 'left',
            label: 'Tutorials',
          },
          {
            type: 'doc',
            docId: 'XFS Interface/introduction',
            position: 'left',
            label: 'XFS Interface',
          },
          {
            type: 'doc',
            docId: 'NITCbase_Commands',
            position: 'left',
            label: 'NITCbase Commands',
          },
          {
            label: 'TODO(Work left)',
            to: 'TODO',
            position: 'right',
          },
          {
            label: 'About Us',
            to: 'AboutUs',
            position: 'right',
          },
          {
            href: 'https://github.com/nitcbase',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      announcementBar: {
        id: 'support_us',
        content:
          'This webiste is under contruction.',
        backgroundColor: '#d4d4d4',
        textColor: '##fc4069',
        isCloseable: true,
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'References',
            items: [
              {
                label: 'Docs',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'About Us',
                to: 'AboutUs',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} National Institute of Technology Calicut. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
