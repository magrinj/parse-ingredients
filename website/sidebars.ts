import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'getting-started',
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/language-support',
        'guides/combining-ingredients',
        'guides/pretty-printing',
        'guides/unicode-fractions',
      ],
    },
  ],
};

export default sidebars;
