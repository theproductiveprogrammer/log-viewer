import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
  props: document.logViewerConfig,
})

export default app