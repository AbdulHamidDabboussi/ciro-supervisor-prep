import { createHashRouter, Navigate } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Drill from './pages/Drill'
import Mock from './pages/Mock'
import MockResult from './pages/MockResult'
import Flashcards from './pages/Flashcards'
import Progress from './pages/Progress'
import About from './pages/About'
import NotFound from './pages/NotFound'
import { RedesignLayout } from './pages/redesign/shared'
import Aurora from './pages/redesign/Aurora'
import Momentum from './pages/redesign/Momentum'
import Ledger from './pages/redesign/Ledger'

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'drill', element: <Drill /> },
      { path: 'mock', element: <Mock /> },
      { path: 'mock/result', element: <MockResult /> },
      { path: 'flashcards', element: <Flashcards /> },
      { path: 'progress', element: <Progress /> },
      { path: 'about', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  // Redesign mockups (branch-only exploration): full-page canvases outside the app shell.
  {
    path: '/redesign',
    element: <RedesignLayout />,
    children: [
      { index: true, element: <Navigate to="/redesign/aurora" replace /> },
      { path: 'aurora', element: <Aurora /> },
      { path: 'momentum', element: <Momentum /> },
      { path: 'ledger', element: <Ledger /> },
    ],
  },
])
