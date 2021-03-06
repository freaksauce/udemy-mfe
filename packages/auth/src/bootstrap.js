import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App'

// Mount function to start app
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  })
  if (onNavigate) {
    history.listen(onNavigate)
  }
  ReactDOM.render(
    <App onSignIn={onSignIn} history={history} />,
    el
  )

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location
      if (pathname !== nextPathname) {
        history.push(nextPathname)
      }
    }
  }
}

// If in dev and in isolation call mount immediately
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root')
  console.log('devRoot: ', devRoot);
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() })
  }
}

// If running through container export the mount function
export { mount }