import { useEffect, useRef, useState } from 'react'
import { usePrefs } from '../store/prefs'
import { DogSvg } from './DogSvg'

// Easter egg: a black lab–shepherd mix who lives in a little doghouse in the bottom-left
// corner. Click the house to let him out; he trots after the cursor, leaving fading paw
// prints, and sits beside it when he catches up. Click the house again (or type "woof")
// and he trots home. Desktop only: nothing renders without a fine pointer (mouse/trackpad).

const SIZE = 60 // rendered dog width in px (SVG is 120 × 84 units)
const SPEED = 280 // trotting speed, px per second
const SIT_DISTANCE = 4 // px from the target before he sits
const BESIDE = 40 // how far beside the cursor he stops, px
const PAW_EVERY = 16 // px of travel between paw prints
const HOUSE = { left: 16, bottom: 16, width: 56 } // doghouse placement (px)

type Pose = 'run' | 'sit'

/** True only on devices with a mouse or trackpad (never phones/tablets). */
function useFinePointer() {
  const query = '(hover: hover) and (pointer: fine)'
  const [fine, setFine] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setFine(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return fine
}

/** Typing "woof" outside form fields does the same as clicking the doghouse. */
function useWoofKeyword(toggle: () => void) {
  useEffect(() => {
    let buffer = ''
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return
      if (e.key.length !== 1) return
      buffer = (buffer + e.key.toLowerCase()).slice(-4)
      if (buffer === 'woof') {
        buffer = ''
        toggle()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle])
}

/** Where the dog appears from / returns to: just in front of the doghouse door. */
function doorPoint() {
  return {
    x: HOUSE.left + HOUSE.width / 2 - SIZE / 2,
    y: window.innerHeight - HOUSE.bottom - SIZE * 0.62,
  }
}

export function DogEasterEgg() {
  const fine = useFinePointer()
  const out = usePrefs((s) => s.dog)
  const toggleDog = usePrefs((s) => s.toggleDog)
  // `present` lags `out` so the dog can trot home before he disappears.
  const [present, setPresent] = useState(out)
  useWoofKeyword(toggleDog)

  useEffect(() => {
    if (out) setPresent(true)
  }, [out])

  if (!fine) return null
  return (
    <>
      <DogHouse occupied={!present} onClick={toggleDog} out={out} />
      {present && <Dog goingHome={!out} onHome={() => setPresent(false)} />}
    </>
  )
}

function DogHouse({ occupied, out, onClick }: { occupied: boolean; out: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={out ? 'Call the dog home' : 'Let the dog out'}
      title={out ? 'Call him home' : 'Woof?'}
      className="fixed z-30 rounded-lg transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
      style={{ left: HOUSE.left, bottom: HOUSE.bottom, width: HOUSE.width }}
    >
      {occupied && (
        // Always-visible label so visitors know the house does something.
        <span className="dog-house-label absolute bottom-full left-1/2 mb-1.5 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-slate-800 shadow-md ring-1 ring-slate-200 after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-white after:content-[''] dark:bg-slate-100 dark:ring-0 dark:after:border-t-slate-100">
          Let me out!
        </span>
      )}
      <svg viewBox="0 0 64 56" width="100%" aria-hidden>
        <ellipse cx={32} cy={53} rx={28} ry={2.5} fill="rgb(0 0 0 / 0.15)" />
        {/* walls */}
        <path d="M10 24 L32 8 L54 24 L54 52 L10 52 Z" fill="#c2763b" />
        <path d="M10 30 H54 M10 37 H54 M10 44 H54" stroke="#a9622e" strokeWidth={1} />
        {/* roof */}
        <path d="M4 27 L32 5 L60 27" stroke="#9b2c2c" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* door */}
        <path d="M23 52 V40 a9 9 0 0 1 18 0 V52 Z" fill="#1f1410" />
        {occupied && (
          // eyes peeking out of the doorway
          <g className="dog-peek">
            <circle cx={28.5} cy={43} r={1.6} fill="#e3a14a" />
            <circle cx={35.5} cy={43} r={1.6} fill="#e3a14a" />
          </g>
        )}
        {/* name plate */}
        <rect x={25} y={18} width={14} height={6} rx={1.5} fill="#f5e6c8" />
        <path d="M28 21 H36" stroke="#9b2c2c" strokeWidth={1.2} strokeLinecap="round" />
      </svg>
    </button>
  )
}

function Dog({ goingHome, onHome }: { goingHome: boolean; onHome: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const homeRef = useRef(goingHome)
  const onHomeRef = useRef(onHome)
  homeRef.current = goingHome
  onHomeRef.current = onHome
  const [pose, setPose] = useState<Pose>('run')
  const [facingRight, setFacingRight] = useState(true)
  const [bubble, setBubble] = useState<string | null>('Woof!')

  useEffect(() => {
    const t = window.setTimeout(() => setBubble(null), 1600)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    const pos = doorPoint()
    // Until the cursor moves, wander a little way out of the house.
    const pointer = { x: pos.x + SIZE + BESIDE + 120, y: pos.y + SIZE * 0.45 - 40 }
    let right = true
    let current: Pose = 'run'
    let travelled = 0
    let pawSide = 1
    let last = performance.now()
    let frame = 0

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return
      pointer.x = e.clientX
      pointer.y = e.clientY
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const dropPaw = (x: number, y: number, angle: number) => {
      const trail = trailRef.current
      if (!trail) return
      const paw = document.createElement('div')
      paw.className = 'dog-paw'
      // Alternate left/right of the line of travel.
      const ox = Math.cos(angle + Math.PI / 2) * 3 * pawSide
      const oy = Math.sin(angle + Math.PI / 2) * 3 * pawSide
      pawSide = -pawSide
      paw.style.transform = `translate(${x + ox - 4}px, ${y + oy - 4}px) rotate(${angle + Math.PI / 2}rad)`
      paw.addEventListener('animationend', () => paw.remove())
      trail.appendChild(paw)
      while (trail.childElementCount > 40) trail.firstElementChild?.remove()
    }

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      let tx: number
      let ty: number
      if (homeRef.current) {
        const door = doorPoint()
        tx = door.x
        ty = door.y
        right = tx > pos.x
      } else {
        // Face the cursor (with hysteresis) and aim for a spot beside it.
        const centreX = pos.x + SIZE / 2
        if (pointer.x > centreX + 10) right = true
        else if (pointer.x < centreX - 10) right = false
        tx = right ? pointer.x - BESIDE - SIZE / 2 : pointer.x + BESIDE - SIZE / 2
        ty = pointer.y - SIZE * 0.45
      }

      const dx = tx - pos.x
      const dy = ty - pos.y
      const dist = Math.hypot(dx, dy)
      if (dist > SIT_DISTANCE) {
        const step = Math.min(SPEED * dt, dist)
        pos.x += (dx / dist) * step
        pos.y += (dy / dist) * step
        travelled += step
        if (travelled >= PAW_EVERY) {
          travelled = 0
          dropPaw(pos.x + SIZE / 2, pos.y + SIZE * 0.66, Math.atan2(dy, dx))
        }
      } else if (homeRef.current) {
        onHomeRef.current()
        return
      }
      const next: Pose = dist > SIT_DISTANCE * 2 ? 'run' : 'sit'
      if (next !== current) {
        current = next
        setPose(next)
      }
      setFacingRight((prev) => (prev === right ? prev : right))

      pos.x = Math.max(0, Math.min(window.innerWidth - SIZE, pos.x))
      pos.y = Math.max(0, Math.min(window.innerHeight - SIZE * 0.7, pos.y))
      if (ref.current) ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <>
      <div ref={trailRef} className="pointer-events-none fixed inset-0 z-[29]" aria-hidden />
      <div
        ref={ref}
        className="pointer-events-none fixed left-0 top-0 z-40"
        style={{ width: SIZE, willChange: 'transform', transform: `translate3d(${doorPoint().x}px, ${doorPoint().y}px, 0)` }}
        aria-hidden
      >
        {bubble && (
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-800 shadow-md dark:bg-slate-100">
            {bubble}
          </span>
        )}
        <div style={{ transform: facingRight ? undefined : 'scaleX(-1)' }}>
          <DogSvg pose={pose} />
        </div>
      </div>
    </>
  )
}
