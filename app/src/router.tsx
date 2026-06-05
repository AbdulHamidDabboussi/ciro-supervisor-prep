import { createHashRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Drill from './pages/Drill'
import Mock from './pages/Mock'
import MockResult from './pages/MockResult'
import Flashcards from './pages/Flashcards'
import About from './pages/About'
import NotFound from './pages/NotFound'

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
      { path: 'about', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
