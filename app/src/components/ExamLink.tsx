import { useCallback } from 'react'
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  useNavigate,
  useParams,
  type LinkProps,
  type NavLinkProps,
  type NavigateOptions,
} from 'react-router-dom'

// Every page lives under /:examId/… — these wrappers let pages keep writing absolute
// in-exam paths ("/drill?element=4", "/") and prefix the current exam automatically.

/** "/drill?x=1" → "/<examId>/drill?x=1"; "/" → "/<examId>". */
export function useExamPath(): (path: string) => string {
  const { examId } = useParams()
  return useCallback((path: string) => `/${examId}${path === '/' ? '' : path}`, [examId])
}

export function Link({ to, ...rest }: LinkProps & { to: string }) {
  const p = useExamPath()
  return <RouterLink to={p(to)} {...rest} />
}

export function NavLink({ to, ...rest }: NavLinkProps & { to: string }) {
  const p = useExamPath()
  return <RouterNavLink to={p(to)} {...rest} />
}

export function useExamNavigate(): (to: string, opts?: NavigateOptions) => void {
  const navigate = useNavigate()
  const p = useExamPath()
  return useCallback((to: string, opts?: NavigateOptions) => navigate(p(to), opts), [navigate, p])
}
