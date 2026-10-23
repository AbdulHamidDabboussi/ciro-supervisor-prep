import { createHashRouter } from 'react-router-dom'
import App, { ExamScope, ExamIndexRedirect } from './App'
import Home from './pages/Home'
import Drill from './pages/Drill'
import Mock from './pages/Mock'
import MockResult from './pages/MockResult'
import Flashcards from './pages/Flashcards'
import StudyGuide from './pages/StudyGuide'
import Progress from './pages/Progress'
import About from './pages/About'
import NotFound from './pages/NotFound'

// Every page is scoped to an exam: #/<examId>/<page>. `#/` lands on the last-studied
// exam; pre-multi-exam links (#/drill, #/mock/result, …) are redirected by ExamScope.
export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <ExamIndexRedirect /> },
      {
        path: ':examId',
        element: <ExamScope />,
        children: [
          { index: true, element: <Home /> },
          { path: 'drill', element: <Drill /> },
          { path: 'mock', element: <Mock /> },
          { path: 'mock/result', element: <MockResult /> },
          { path: 'flashcards', element: <Flashcards /> },
          { path: 'study', element: <StudyGuide /> },
          { path: 'progress', element: <Progress /> },
          { path: 'about', element: <About /> },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
])
