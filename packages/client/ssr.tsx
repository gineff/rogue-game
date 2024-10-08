import App from './src/components/App'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { store } from './src/store'

export function render(url: string) {
  const reactHtml = renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  )
  const injectStoreScript = `
  <script>
  window.__PRELOADED_STATE__=${JSON.stringify(store.getState()).replace(
    /</g,
    '\\u003c'
  )}
  </script>`
  return `<div id="root">${reactHtml}</div>${injectStoreScript}`
}
