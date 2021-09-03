import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
  base: './',
  plugins: [
    legacy ({ 
      targets : [ 'ie >= 11' ] , 
      additionalLegacyPolyfills : [ 'regenerator-runtime/runtime' ] 
    }), 
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`,
        },
      ],
    })
  ]
})
