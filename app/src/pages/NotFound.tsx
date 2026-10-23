import { Link } from '../components/ExamLink'

export default function NotFound() {
  return (
    <div className="card p-12 text-center">
      <p className="font-display text-4xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
        404
      </p>
      <p className="mt-2 text-slate-500 dark:text-slate-400">That page doesn’t exist.</p>
      <Link to="/" className="btn-primary mt-5 inline-flex">
        Back to home
      </Link>
    </div>
  )
}
