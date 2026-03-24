import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'locale/en': 'src/locale/en.ts',
    'locale/fr': 'src/locale/fr.ts',
    'locale/es': 'src/locale/es.ts',
    'locale/it': 'src/locale/it.ts',
    'locale/de': 'src/locale/de.ts',
    'locale/pt': 'src/locale/pt.ts',
  },
  format: ['cjs', 'esm'],
  exports: 'named',
  dts: true,
  outDir: 'lib',
  clean: true,
  fixupCjsExport: true,
  packageJson: false,
});
