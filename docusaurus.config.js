// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "NITCbase",
  tagline: "Relational database project",
  url: "https://nitcbase.github.io/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "NITCbase", // Usually your GitHub org/user name.
  projectName: "nitcbase.github.io", // Usually your repo name.
  deploymentBranch: "gh-pages",

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          remarkPlugins: [math],
          rehypePlugins: [katex],
          breadcrumbs: false,
        },
        blog: {
          showReadingTime: false,
          path: "feedback",
          routeBasePath: "feedback",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        indexPages: true,
        searchBarShortcut: false,
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
    "@docusaurus/theme-mermaid",
  ],
  markdown: {
    mermaid: true,
  },
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        hideOnScroll: true,
        title: "NITCbase",
        logo: {
          alt: "NITCbase",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "Roadmap/introduction",
            position: "left",
            label: "Roadmap",
          },
          {
            type: "doc",
            docId: "Design/Architecture",
            position: "left",
            label: "Design",
          },
          {
            type: "doc",
            docId: "User Interface Commands/introduction",
            position: "left",
            label: "NITCbase Commands",
          },
          {
            type: "doc",
            docId: "Misc/index",
            position: "left",
            label: "Miscellaneous",
          },
          {
            label: "Feedback",
            to: "feedback",
            position: "right",
          },
          {
            label: "About Us",
            to: "AboutUs",
            position: "right",
          },
          {
            href: "https://github.com/nitcbase",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          // {
          //   title: "References",
          //   items: [
          //     {
          //       label: "Docs",
          //       to: "/docs/intro",
          //     },
          //   ],
          // },
          {
            title: "More",
            items: [
              {
                label: "About Us",
                to: "AboutUs",
              },
              {
                label: "GitHub",
                href: "https://github.com/Nitcbase",
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
      colorMode: {
        defaultMode: "dark",
      },
    }),
};

module.exports = config;
