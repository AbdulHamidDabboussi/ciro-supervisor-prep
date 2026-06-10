// Variant D — "Liquid": Apple Liquid Glass, maximum effort.
// - True refraction: SVG displacement inside backdrop-filter (panes bend the backdrop)
// - The refraction FLOWS: SMIL-animated turbulence, so the warp itself moves like water
// - Cursor-reactive: a light source under the glass follows the mouse and refracts
//   through panes; a soft specular sheen tracks it on the surface above
// - Floating glass lens orbs that magnify/warp the scene, with cursor parallax
// - 3D tilt physics on showcase panes, gel springs, shimmer CTAs, chromatic rims

import { useEffect, useRef } from 'react'
import { SAMPLE_QUESTION as Q, SAMPLE_CARD as C, SAMPLE_ELEMENTS, STATS } from './shared'
import { cn } from '../../lib/format'

const sf = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" }

const CSS = `
@keyframes lg-drift-a { 0%{transform:translate(0,0) scale(1)} 50%{transform:translate(110px,-70px) scale(1.2)} 100%{transform:translate(-50px,50px) scale(.92)} }
@keyframes lg-drift-b { 0%{transform:translate(0,0) scale(1.1)} 50%{transform:translate(-130px,80px) scale(.88)} 100%{transform:translate(70px,-60px) scale(1.22)} }
@keyframes lg-drift-c { 0%{transform:translate(0,0)} 50%{transform:translate(80px,100px) scale(1.3)} 100%{transform:translate(-90px,-50px)} }
@keyframes lg-spin { to { transform: rotate(360deg) } }
@keyframes lg-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-26px)} }
@keyframes lg-shimmer { 0%{transform:translateX(-160%) skewX(-18deg)} 100%{transform:translateX(260%) skewX(-18deg)} }
@keyframes lg-gradflow { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }

/* ---- the material ---------------------------------------------------- */
.lg-pane{
  position:relative; isolation:isolate;
  background:linear-gradient(135deg,rgba(255,255,255,.42),rgba(255,255,255,.15));
  -webkit-backdrop-filter:blur(14px) saturate(1.9);
  backdrop-filter:url(#lg-distort) blur(12px) saturate(1.9);
  box-shadow:
    0 28px 70px rgba(15,25,55,.25),
    0 2px 8px rgba(15,25,55,.08),
    inset 0 1.5px 1px rgba(255,255,255,.95),
    inset 0 -1px 1px rgba(255,255,255,.3),
    inset 1.5px 0 1px rgba(255,255,255,.45),
    inset -1.5px 0 1px rgba(255,255,255,.45);
}
.dark .lg-pane{
  background:linear-gradient(135deg,rgba(255,255,255,.12),rgba(255,255,255,.03));
  box-shadow:
    0 28px 70px rgba(0,0,0,.6),
    inset 0 1.5px 1px rgba(255,255,255,.32),
    inset 0 -1px 1px rgba(255,255,255,.07),
    inset 1.5px 0 1px rgba(255,255,255,.14),
    inset -1.5px 0 1px rgba(255,255,255,.14);
}
.lg-pane::before{
  content:''; position:absolute; inset:0; border-radius:inherit; padding:1.5px; pointer-events:none; z-index:2;
  background:linear-gradient(135deg,rgba(255,255,255,.95),rgba(160,225,255,.55) 30%,rgba(255,170,225,.4) 65%,rgba(255,255,255,.8));
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor; mask-composite:exclude;
}
.dark .lg-pane::before{
  background:linear-gradient(135deg,rgba(255,255,255,.5),rgba(120,200,255,.28) 30%,rgba(255,140,210,.22) 65%,rgba(255,255,255,.4));
}
.lg-pane::after{
  content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none; z-index:2;
  background:
    radial-gradient(130% 65% at 50% -25%,rgba(255,255,255,.55),transparent 62%),
    linear-gradient(115deg,transparent 32%,rgba(255,255,255,.2) 43%,transparent 55%);
  opacity:.85;
}
.dark .lg-pane::after{ opacity:.32 }

/* ---- glass lens orbs -------------------------------------------------- */
.lg-orb{
  border-radius:9999px; pointer-events:none;
  -webkit-backdrop-filter:blur(2px) saturate(1.7) brightness(1.1);
  backdrop-filter:url(#lg-lens) blur(1px) saturate(1.75) brightness(1.12);
  background:radial-gradient(circle at 33% 28%,rgba(255,255,255,.5),rgba(255,255,255,.06) 55%,rgba(255,255,255,.14));
  box-shadow:
    0 30px 80px rgba(15,25,55,.3),
    inset 0 2px 2px rgba(255,255,255,1),
    inset 0 -10px 24px rgba(255,255,255,.25),
    inset 3px 0 3px rgba(255,255,255,.4),
    inset -8px -8px 20px rgba(80,120,255,.18);
  animation:lg-bob 9s ease-in-out infinite;
}
.dark .lg-orb{
  background:radial-gradient(circle at 33% 28%,rgba(255,255,255,.28),rgba(255,255,255,.02) 55%,rgba(255,255,255,.08));
  box-shadow:0 30px 80px rgba(0,0,0,.6),inset 0 2px 2px rgba(255,255,255,.6),inset 0 -10px 24px rgba(255,255,255,.12),inset -8px -8px 20px rgba(80,120,255,.12);
}

/* gel interaction */
.lg-gel{ transition:transform .45s cubic-bezier(.34,1.6,.64,1), box-shadow .45s; }
.lg-gel:hover{ transform:scale(1.04) }
.lg-gel:active{ transform:scale(.95) }

/* primary capsule with sweeping shimmer */
.lg-cta{ position:relative; overflow:hidden;
  background:linear-gradient(180deg,#4aa6ff,#0a84ff);
  box-shadow:inset 0 1.5px 1px rgba(255,255,255,.55),inset 0 -2px 6px rgba(0,40,120,.35),0 8px 28px rgba(10,132,255,.55);
}
.lg-cta::after{ content:''; position:absolute; top:0; bottom:0; width:45%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent);
  animation:lg-shimmer 3.2s ease-in-out infinite;
}

/* flowing gradient headline */
.lg-gradtext{
  background-image:linear-gradient(90deg,#0a84ff,#bf5af2,#ff375f,#ff9f0a,#0a84ff);
  background-size:200% 100%;
  -webkit-background-clip:text; background-clip:text; color:transparent;
  animation:lg-gradflow 9s linear infinite;
}

/* structured backdrop */
.lg-dots{
  background-image:radial-gradient(rgba(20,40,90,.4) 1.2px,transparent 1.2px);
  background-size:26px 26px;
}
.dark .lg-dots{ background-image:radial-gradient(rgba(255,255,255,.18) 1.2px,transparent 1.2px); }

/* 3D tilt targets */
.lg-tilt{ will-change:transform; transition:transform .18s ease-out; transform:perspective(1100px); }

@media (prefers-reduced-motion: reduce){
  .lg-liquid *{ animation:none !important; transition:none !important; }
}
`

function useTilt(max = 6) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `perspective(1100px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`
    }
    const leave = () => {
      el.style.transform = 'perspective(1100px)'
    }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [max])
  return ref
}

function Blob({ className, anim, color }: { className: string; anim: string; color: string }) {
  return (
    <div
      className={cn('absolute rounded-full blur-[90px]', className)}
      style={{ background: color, animation: `${anim} 24s ease-in-out infinite alternate` }}
    />
  )
}

export default function Liquid() {
  const rootRef = useRef<HTMLDivElement>(null)
  const heroTilt = useTilt(6)
  const cardTilt = useTilt(4)
  const focusTilt = useTilt(4)

  // Cursor → CSS vars: a light under the glass (gets refracted) + sheen above + parallax.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      el.style.setProperty('--mx', `${e.clientX}px`)
      el.style.setProperty('--my', `${e.clientY}px`)
      el.style.setProperty('--mxr', `${(e.clientX / window.innerWidth - 0.5).toFixed(3)}`)
      el.style.setProperty('--myr', `${(e.clientY / window.innerHeight - 0.5).toFixed(3)}`)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={rootRef}
      className="lg-liquid relative min-h-screen overflow-hidden pb-32 text-slate-900 dark:text-white"
      style={sf}
    >
      <style>{CSS}</style>
      {/* Displacement filters. SMIL-animated turbulence = the refraction itself flows. */}
      <svg className="absolute h-0 w-0" aria-hidden>
        <filter id="lg-distort" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.016" numOctaves="2" seed="7" result="noise">
            <animate
              attributeName="baseFrequency"
              dur="18s"
              values="0.01 0.016;0.014 0.012;0.01 0.016"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feGaussianBlur in="noise" stdDeviation="2.5" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="74" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="lg-lens" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.004 0.006" numOctaves="1" seed="3" result="n">
            <animate
              attributeName="baseFrequency"
              dur="13s"
              values="0.004 0.006;0.007 0.004;0.004 0.006"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feGaussianBlur in="n" stdDeviation="4" result="s" />
          <feDisplacementMap in="SourceGraphic" in2="s" scale="190" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* ---- Animated structured backdrop (what the glass refracts) ---- */}
      <div className="fixed inset-0 -z-10 bg-[#e7ecf6] dark:bg-[#04060d]">
        <Blob className="-left-40 -top-44 h-[42rem] w-[42rem] opacity-55 dark:opacity-30" anim="lg-drift-a" color="radial-gradient(circle at 35% 35%, #4aa6ff, #0a84ff 60%, transparent 75%)" />
        <Blob className="right-[-12rem] top-12 h-[36rem] w-[36rem] opacity-45 dark:opacity-26" anim="lg-drift-b" color="radial-gradient(circle at 40% 30%, #d78cff, #bf5af2 60%, transparent 75%)" />
        <Blob className="bottom-[-10rem] left-1/4 h-[38rem] w-[38rem] opacity-45 dark:opacity-20" anim="lg-drift-c" color="radial-gradient(circle at 40% 40%, #7be1ff, #64d2ff 55%, transparent 75%)" />
        <Blob className="bottom-24 right-1/4 h-80 w-80 opacity-35 dark:opacity-15" anim="lg-drift-a" color="radial-gradient(circle at 40% 40%, #ff7a9e, #ff375f 60%, transparent 78%)" />
        {/* thin drifting rings — they warp beautifully under the lenses */}
        <div className="absolute left-[52%] top-[-6rem] h-[44rem] w-[44rem] rounded-full border border-white/50 dark:border-white/15" style={{ animation: 'lg-drift-b 34s ease-in-out infinite alternate' }} />
        <div className="absolute bottom-[-8rem] left-[6%] h-[30rem] w-[30rem] rounded-full border border-white/40 dark:border-white/10" style={{ animation: 'lg-drift-c 28s ease-in-out infinite alternate' }} />
        <div className="lg-dots absolute inset-0 opacity-70 [mask-image:radial-gradient(85%_75%_at_50%_35%,#000,transparent)]" />
      </div>

      {/* Cursor light UNDER the glass — panes visibly refract it as you move */}
      <div
        className="pointer-events-none fixed inset-0 -z-[5] opacity-90 dark:opacity-60"
        style={{
          background:
            'radial-gradient(22rem circle at var(--mx,50vw) var(--my,38vh), rgba(255,255,255,.65), rgba(150,205,255,.3) 38%, transparent 70%)',
        }}
      />
      {/* Specular sheen ON the glass surface, tracking the cursor */}
      <div
        className="pointer-events-none fixed inset-0 z-30 opacity-60 mix-blend-soft-light dark:opacity-40"
        style={{
          background:
            'radial-gradient(26rem circle at var(--mx,50vw) var(--my,38vh), rgba(255,255,255,.95), transparent 62%)',
        }}
      />

      {/* Floating glass lens orbs (cursor parallax, slow bob, strong refraction) */}
      <div
        className="pointer-events-none absolute left-[3%] top-[19rem] z-10 hidden md:block"
        style={{ transform: 'translate(calc(var(--mxr,0)*34px), calc(var(--myr,0)*24px))' }}
      >
        <div className="lg-orb h-64 w-64" />
      </div>
      <div
        className="pointer-events-none absolute right-[5%] top-[30rem] z-10 hidden md:block"
        style={{ transform: 'translate(calc(var(--mxr,0)*-46px), calc(var(--myr,0)*-30px))' }}
      >
        <div className="lg-orb h-36 w-36" style={{ animationDelay: '-4s' }} />
      </div>

      {/* ---- Floating glass dock ---- */}
      <header className="sticky top-4 z-20 mx-auto mt-4 w-fit max-w-[calc(100%-2rem)]">
        <div className="lg-pane flex items-center gap-1 rounded-full px-2 py-2">
          <span className="relative z-10 flex items-center gap-2 pl-2 pr-3 text-sm font-semibold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-b from-[#4aa6ff] to-[#0a84ff] text-xs font-bold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,.55)]">
              C
            </span>
            CIRO&thinsp;Prep
          </span>
          {['Home', 'Drill', 'Mock', 'Cards', 'Progress'].map((n, i) => (
            <span
              key={n}
              className={cn(
                'lg-gel relative z-10 cursor-pointer rounded-full px-3.5 py-1.5 text-[13px] font-medium',
                i === 0
                  ? 'bg-white/75 shadow-[inset_0_1px_1px_rgba(255,255,255,.95),0_2px_6px_rgba(0,0,0,.1)] dark:bg-white/20 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,.35)]'
                  : 'text-slate-600 hover:bg-white/40 dark:text-slate-300 dark:hover:bg-white/10',
              )}
            >
              {n}
            </span>
          ))}
          <button className="lg-cta lg-gel relative z-10 ml-1 rounded-full px-4 py-1.5 text-[13px] font-semibold text-white">
            Study
          </button>
        </div>
      </header>

      {/* ---- Hero ---- */}
      <section className="relative mx-auto max-w-5xl px-6 pb-12 pt-16 text-center">
        <h1 className="mx-auto max-w-3xl text-[3.4rem] font-bold leading-[1.03] tracking-[-0.04em] md:text-[4.2rem]">
          Prep that flows.
          <br />
          <span className="lg-gradtext">Answers crystal clear.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg font-medium leading-relaxed text-slate-600 dark:text-slate-300">
          {STATS.questions} questions, every one explained with the exact rule it tests. Drill, mock,
          and watch weak areas dissolve.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button className="lg-cta lg-gel rounded-full px-7 py-3 font-semibold text-white">Start drilling</button>
          <button className="lg-pane lg-gel rounded-full px-7 py-3 font-semibold">
            <span className="relative z-10">Take a mock</span>
          </button>
        </div>

        {/* Hero glass window — tilts in 3D toward the cursor */}
        <div ref={heroTilt} className="lg-tilt mx-auto mt-12 max-w-3xl">
          <div className="lg-pane rounded-[2.5rem] p-7">
            <div className="relative z-10 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                [`${STATS.attempted}`, 'attempted'],
                [`${STATS.accuracy}%`, 'accuracy'],
                [`${STATS.mocks}`, 'mock exams'],
                [`${STATS.cards}`, 'flashcards'],
              ].map(([v, l]) => (
                <div
                  key={l}
                  className="lg-gel rounded-3xl bg-white/45 px-4 py-5 shadow-[inset_0_1px_1px_rgba(255,255,255,.9)] dark:bg-white/[0.07] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,.2)]"
                >
                  <p className="text-3xl font-bold tracking-tight">{v}</p>
                  <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">{l}</p>
                </div>
              ))}
            </div>
            <div className="relative z-10 mx-auto mt-6 flex w-fit gap-1 rounded-full bg-white/35 p-1.5 shadow-[inset_0_1px_3px_rgba(15,25,55,.14),inset_0_-1px_1px_rgba(255,255,255,.6)] dark:bg-black/25 dark:shadow-[inset_0_1px_3px_rgba(0,0,0,.5)]">
              {['Drill', 'Mock exam', 'Flashcards'].map((s, i) => (
                <span
                  key={s}
                  className={cn(
                    'lg-gel cursor-pointer rounded-full px-5 py-2 text-sm font-semibold',
                    i === 0
                      ? 'bg-gradient-to-b from-white to-white/80 text-slate-800 shadow-[0_2px_8px_rgba(15,25,55,.2),inset_0_1px_1px_rgba(255,255,255,1)] dark:from-white/30 dark:to-white/15 dark:text-white'
                      : 'text-slate-500 dark:text-slate-400',
                  )}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="relative mx-auto max-w-5xl space-y-8 px-6">
        {/* Question slab */}
        <section className="lg-pane rounded-[2.5rem] p-8">
          <div className="relative z-10">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {[`Element ${Q.element} · ${Q.outcome}`, Q.taxonomy, 'Easy'].map((b) => (
                <span
                  key={b}
                  className="rounded-full bg-white/55 px-3 py-1 text-xs font-semibold text-slate-600 shadow-[inset_0_1px_1px_rgba(255,255,255,.9)] dark:bg-white/10 dark:text-slate-300 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,.18)]"
                >
                  {b}
                </span>
              ))}
              <span className="lg-gel ml-auto cursor-pointer text-xl text-[#ffd60a] drop-shadow-[0_0_8px_rgba(255,214,10,.65)]">
                ★
              </span>
            </div>
            <p className="text-xl font-semibold leading-relaxed tracking-[-0.01em]">{Q.stem}</p>
            <div className="mt-6 space-y-2.5">
              {Object.entries(Q.options).map(([k, v]) => {
                const correct = k === Q.answer
                const chosen = k === 'D'
                return (
                  <div
                    key={k}
                    className={cn(
                      'lg-gel flex items-start gap-3.5 rounded-2xl p-4 text-[15px] font-medium',
                      correct
                        ? 'bg-[#30d158]/30 ring-1 ring-[#30d158]/60 shadow-[inset_0_1.5px_1px_rgba(255,255,255,.6),0_4px_18px_rgba(48,209,88,.35)] dark:bg-[#30d158]/15'
                        : chosen
                          ? 'bg-[#ff453a]/25 ring-1 ring-[#ff453a]/50 shadow-[inset_0_1.5px_1px_rgba(255,255,255,.5)] dark:bg-[#ff453a]/12'
                          : 'bg-white/45 shadow-[inset_0_1.5px_1px_rgba(255,255,255,.85),0_1px_4px_rgba(15,25,55,.06)] hover:bg-white/65 dark:bg-white/[0.06] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,.16)] dark:hover:bg-white/[0.1]',
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-7 w-7 flex-none place-items-center rounded-full text-xs font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,.55)]',
                        correct
                          ? 'bg-gradient-to-b from-[#5ce888] to-[#30d158] text-white'
                          : chosen
                            ? 'bg-gradient-to-b from-[#ff7a72] to-[#ff453a] text-white'
                            : 'bg-white/80 text-slate-500 dark:bg-white/15 dark:text-slate-300',
                      )}
                    >
                      {k}
                    </span>
                    <span className="pt-0.5">{v}</span>
                  </div>
                )
              })}
            </div>
            <div className="mt-6 rounded-2xl bg-gradient-to-b from-white/70 to-white/40 p-5 shadow-[inset_0_1.5px_1px_rgba(255,255,255,.95)] dark:from-white/[0.12] dark:to-white/[0.05] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,.2)]">
              <p className="text-sm font-bold text-[#0071e3] dark:text-[#6cb9ff]">Why B is correct</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{Q.rationale}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {Q.rule_refs.map((r) => (
                  <span
                    key={r}
                    className="rounded-full bg-[#0a84ff]/15 px-2.5 py-1 text-xs font-semibold text-[#0064d0] shadow-[inset_0_1px_1px_rgba(255,255,255,.5)] dark:bg-[#0a84ff]/25 dark:text-[#9bcdff]"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Flashcard droplet + focus areas — both tilt */}
        <section className="grid gap-6 md:grid-cols-2">
          <div ref={cardTilt} className="lg-tilt">
            <div className="lg-pane flex h-full flex-col rounded-[2.5rem] p-7">
              <div className="relative z-10 flex h-full flex-col">
                <span className="w-fit rounded-full bg-[#ff9f0a]/25 px-3 py-1 text-xs font-bold text-[#b06d00] shadow-[inset_0_1px_1px_rgba(255,255,255,.6)] dark:text-[#ffd60a]">
                  ⚡ Trap card · {C.outcome}
                </span>
                <p className="mt-4 text-lg font-semibold leading-snug tracking-[-0.01em]">{C.front}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{C.back}</p>
                <div className="mt-auto flex gap-2.5 pt-6">
                  <button className="lg-gel flex-1 rounded-full bg-white/55 py-2.5 text-sm font-semibold shadow-[inset_0_1.5px_1px_rgba(255,255,255,.9),0_2px_6px_rgba(15,25,55,.08)] dark:bg-white/10 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,.2)]">
                    Again
                  </button>
                  <button className="lg-gel flex-1 rounded-full bg-gradient-to-b from-[#5ce888] to-[#30d158] py-2.5 text-sm font-semibold text-white shadow-[inset_0_1.5px_1px_rgba(255,255,255,.5),0_4px_14px_rgba(48,209,88,.45)]">
                    Got it
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div ref={focusTilt} className="lg-tilt">
            <div className="lg-pane h-full rounded-[2.5rem] p-7">
              <div className="relative z-10">
                <p className="font-bold tracking-tight">Focus areas</p>
                <div className="mt-5 space-y-5">
                  {SAMPLE_ELEMENTS.map((e) => (
                    <div key={e.id}>
                      <div className="mb-2 flex justify-between text-sm font-medium">
                        <span>
                          E{e.id} · {e.title}
                        </span>
                        <span className="font-semibold text-slate-500 dark:text-slate-400">{e.pct}%</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-white/40 shadow-[inset_0_1px_3px_rgba(15,25,55,.15)] dark:bg-black/30 dark:shadow-[inset_0_1px_3px_rgba(0,0,0,.6)]">
                        <div
                          className={cn(
                            'h-full rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,.6)]',
                            e.pct < 70
                              ? 'bg-gradient-to-r from-[#ffb340] to-[#ff6961]'
                              : 'bg-gradient-to-r from-[#4aa6ff] to-[#0a84ff]',
                          )}
                          style={{ width: `${e.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button className="lg-cta lg-gel mt-7 w-full rounded-full py-3 text-sm font-semibold text-white">
                  Drill weakest areas →
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
