import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="card p-12 text-center">
      <p className="text-4xl font-bold text-brand-700 dark:text-brand-300">404</p>
      <p className="mt-2 text-slate-500 dark:text-slate-400">That page doesn’t exist.</p>
      <Link to="/" className="btn-primary mt-5 inline-flex">
        Back to home
      </Link>
    </div>
  )
}
