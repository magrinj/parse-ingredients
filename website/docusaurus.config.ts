import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '@magrinj/parse-ingredients',
  tagline: 'A multi-language recipe ingredient parser with zero dependencies',
  favicon: 'img/favicon.ico',

  url: 'https://magrinj.github.io',
  baseUrl: '/parse-ingredients/',

  organizationName: 'magrinj',
  projectName: 'parse-ingredients',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
        out: 'docs/api',
        readme: 'none',
        excludePrivate: true,
        excludeInternal: true,
        sidebar: {
          autoConfiguration: true,
          pretty: true,
        },
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/magrinj/parse-ingredients/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css', './src/css/hero.css'],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: '@magrinj/parse-ingredients',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/api',
          label: 'API',
          position: 'left',
        },
        {
          href: 'https://github.com/magrinj/parse-ingredients',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Getting Started', to: '/docs/getting-started'},
            {label: 'API Reference', to: '/docs/api'},
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'npm',
              href: 'https://www.npmjs.com/package/@magrinj/parse-ingredients',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/magrinj/parse-ingredients',
            },
          ],
        },
      ],
      copyright: `Copyright \u00A9 ${new Date().getFullYear()} J\u00E9r\u00E9my Magrin. MIT License.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
