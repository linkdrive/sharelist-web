import { UserConfig } from 'vite'
import path from 'path'
import legacyPlugin from 'vite-plugin-legacy'
import vueJsxPlugin from 'vite-plugin-vue-jsx'

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr)
}

const config: UserConfig = {
  // alias a path to a fs directory
  // the key must start and end with a slash
  debug: true,
  alias: {
    '/@/': pathResolve('./src'),
  },
  cssPreprocessOptions: {
    less: {
      javascriptEnabled: true,
      modifyVars: {
        'preprocess-custom-color': 'green',
      },
    },
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7200/',
      changeOrigin: true,
      // rewrite: path => path.replace(/^\/api/, '')
    },
  },
  plugins: [
    // createJsxPlugin()
    vueJsxPlugin(),
  ],
}

module.exports = config
