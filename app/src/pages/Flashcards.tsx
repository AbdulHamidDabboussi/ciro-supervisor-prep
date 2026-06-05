import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../data/DataContext'
import { useProgress } from '../store/progress'
import { Badge, PageHeading, ProgressBar } from '../components/ui'
import type { Flashcard } from '../types'
import { cn } from '../lib/format'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Flashcards() {
  const { deck, syllabus } = useData()
  const cardStatus = useProgress((s) => s.cards)
  const setCardStatus = useProgress((s) => s.setCardStatus)

  const [element, setElement] = useState<number>(syllabus.elements[0]?.id ?? 1)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState(false)
  const [shuffleSeed, setShuffleSeed] = useState(0)

  const baseCards = useMemo<Flashcard[]>(
    () => deck.cards.filter((c) => c.element === element),
    [deck.cards, element],
  )
  const cards = useMemo<Flashcard[]>(
    () => (shuffleSeed === 0 ? baseCards : shuffle(baseCards)),
    [baseCards, shuffleSeed],
  )

  useEffect(() => {
    setIndex(0)
    setFlipped(false)
    setDone(false)
  }, [element])

  const card = cards[index]
  const knownInDeck = cards.filter((c) => cardStatus[c.id] === 'known').length
  const elementTitle = syllabus.elements.find((e) => e.id === element)?.title ?? ''

  function go(delta: number) {
    setFlipped(false)
    setDone(false)
    setIndex((i) => Math.max(0, Math.min(i + delta, cards.length - 1)))
  }

  function mark(status: 'known' | 'again') {
    if (!card) return
    setCardStatus(card.id, status)
    if (index < cards.length - 1) go(1)
    else {
      setFlipped(false)
      setDone(true)
    }
  }

  function restart() {
    setIndex(0)
    setFlipped(false)
    setDone(false)
  }

  function reshuffle() {
    setShuffleSeed((s) => s + 1)
    restart()
  }

  // Keyboard: Space/Enter to flip, ←/→ to navigate.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'SELECT' || tag === 'INPUT' || tag === 'TEXTAREA') return
      if (done || !card) return
      if (e.key === ' ' || e.key === 'Enter') {
        if (tag === 'BUTTON') return
        e.preventDefault()
        setFlipped((f) => !f)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card, done, cards.length])

  return (
    <div>
      <PageHeading
        title="Flashcards"
        subtitle="Crash-course decks, one fact per card. Study an element, then drill it."
      />

      <div className="card mb-6 flex flex-col gap-3 p-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <label className="block w-full min-w-0 sm:max-w-md sm:flex-1">
          <span className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Element</span>
          <select
            className="field w-full truncate"
            value={element}
            onChange={(e) => setElement(Number(e.target.value))}
          >
            {syllabus.elements.map((el) => (
              <option key={el.id} value={el.id}>
                E{el.id} · {el.title} ({deck.cards.filter((c) => c.element === el.id).length} cards)
              </option>
            ))}
          </select>
        </label>
        <div className="flex w-full gap-2 sm:w-auto">
          <button onClick={reshuffle} className="btn-secondary w-full justify-center sm:w-auto">
            Shuffle
          </button>
          <Link
            to={`/drill?element=${element}`}
            className="btn-secondary w-full justify-center sm:w-auto"
          >
            Drill E{element} →
          </Link>
        </div>
      </div>

      {cards.length === 0 ? (
        <div className="card p-8 text-center text-slate-500">No cards for this element.</div>
      ) : done ? (
        <div className="card p-10 text-center">
          <p className="text-2xl font-bold">Deck complete</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            You went through all {cards.length} cards in element {element} — {knownInDeck} marked known.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button className="btn-primary" onClick={restart}>
              Study again
            </button>
            <Link to={`/drill?element=${element}`} className="btn-secondary">
              Drill element {element} →
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Card {index + 1} of {cards.length} · E{element} {elementTitle}
            </span>
            <span>{knownInDeck} marked known</span>
          </div>
          <div className="mb-4">
            <ProgressBar value={knownInDeck} max={cards.length} />
          </div>

          {card && (
            <button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              aria-label={flipped ? 'Showing answer — tap to see the prompt' : 'Showing prompt — tap to reveal the answer'}
              className="block w-full rounded-xl [perspective:1200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              {/* key on the card resets the rotation instantly when navigating, so we only
                  animate a deliberate flip — not card-to-card changes. */}
              <div
                key={card.id}
                className={cn(
                  'card relative grid min-h-[16rem] transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none',
                  flipped && '[transform:rotateY(180deg)]',
                )}
              >
                {/* Front face */}
                <div className="flex flex-col items-center justify-center gap-4 p-8 text-center [grid-area:1/1] [backface-visibility:hidden]">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <Badge tone="violet">{card.type}</Badge>
                    <Badge>Outcome {card.outcome}</Badge>
                    {cardStatus[card.id] && (
                      <Badge tone={cardStatus[card.id] === 'known' ? 'green' : 'amber'}>
                        {cardStatus[card.id]}
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg font-medium leading-relaxed text-slate-800 dark:text-slate-100">
                    {card.front}
                  </p>
                  <span className="text-xs uppercase tracking-wide text-slate-400">Tap to reveal answer</span>
                </div>

                {/* Back face (pre-rotated, revealed when the card flips) */}
                <div className="flex flex-col items-center justify-center gap-4 p-8 text-center [grid-area:1/1] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-500 dark:text-brand-300">
                    Answer
                  </span>
                  <p className="text-lg font-medium leading-relaxed">{card.back}</p>
                  {card.rule_refs.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {card.rule_refs.map((r) => (
                        <Badge key={r}>{r}</Badge>
                      ))}
                    </div>
                  )}
                  <span className="text-xs uppercase tracking-wide text-slate-400">Tap to see prompt</span>
                </div>
              </div>
            </button>
          )}

          <div className="mt-5 flex items-center justify-between gap-3">
            <button className="btn-secondary" onClick={() => go(-1)} disabled={index === 0}>
              ← Prev
            </button>
            <div className="flex gap-2">
              <button className="btn-secondary" onClick={() => mark('again')}>
                Again
              </button>
              <button className="btn-primary" onClick={() => mark('known')}>
                Got it
              </button>
            </div>
            <button className="btn-secondary" onClick={() => go(1)} disabled={index === cards.length - 1}>
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  )
}
