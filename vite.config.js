import { defineConfig } from 'vite'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  let return_val = {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, "./public")
      }
    }
  }

  if (command === 'serve') {
  } else {
    return_val.base = '/locoButton2/'
  }
  return return_val
})