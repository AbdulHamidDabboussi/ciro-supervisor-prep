import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { usePrefs, applyTheme } from './store/prefs'
import './index.css'

// Apply the persisted theme before first paint, and keep <html> in sync with the store.
applyTheme(usePrefs.getState().theme)
usePrefs.subscribe((s) => applyTheme(s.theme))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
