import { defineConfig } from 'astro/config';
import Unfonts from 'unplugin-fonts/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [
    Unfonts({
      google: {
        families: [
          'Cabin',
          {
            name: 'Open Sans',
            styles: 'wght@300;400',
          },
        ],
      },
    })
  ]
});
