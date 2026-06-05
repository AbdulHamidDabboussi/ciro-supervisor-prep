import type { ElementWeight, Question } from '../types'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// A "block" is an atomic unit of presentation: a single standard question, or a whole
// item-set (its questions stay contiguous and in their authored order, scenario shared).
type Block = Question[]

function blocksForElement(questions: Question[]): { sets: Block[]; standards: Block[] } {
  const setMap = new Map<string, Question[]>()
  const standards: Block[] = []
  for (const q of questions) {
    if (q.type === 'item_set' && q.item_set_id) {
      const arr = setMap.get(q.item_set_id) ?? []
      arr.push(q)
      setMap.set(q.item_set_id, arr)
    } else {
      standards.push([q])
    }
  }
  // Keep each set's items in authored id order so the scenario reads coherently.
  const sets = [...setMap.values()].map((qs) => [...qs].sort((a, b) => a.id.localeCompare(b.id)))
  return { sets, standards }
}

/**
 * Assemble a mock form mirroring the real exam:
 *  - exactly `weight.questions` items per element (the official blueprint), and
 *  - about `itemSetBudget` item-set questions in total (the real form is 30 of 90 ≈ 33%).
 *
 * Item-sets are drawn whole and kept contiguous; they are chosen globally up to the budget
 * and each element's capacity, then every element is filled to its weight with standard
 * questions. Without the budget cap, a naive per-element fill would over-include item-sets
 * (the bank's sets are concentrated in a few elements), making mocks unrepresentative.
 *
 * Note: the bank has only 17 item-sets, so the number of *distinct* forms is limited
 * (~3 before heavy reuse) — see PLAN.md. Forms still vary because selection is shuffled.
 */
export function assembleMockForm(
  reviewed: Question[],
  weights: ElementWeight[],
  itemSetBudget = Infinity,
): Question[] {
  const byElement = new Map<number, Question[]>()
  for (const q of reviewed) {
    const arr = byElement.get(q.element) ?? []
    arr.push(q)
    byElement.set(q.element, arr)
  }

  // Remaining question capacity per element (starts at the element's weight).
  const capacity = new Map<number, number>(weights.map((w) => [w.element, w.questions]))
  const pickedByElement = new Map<number, Block[]>(weights.map((w) => [w.element, []]))

  // --- Pass 1: choose item-sets globally, capped by budget and per-element capacity. ---
  const allSets: { element: number; block: Block }[] = []
  for (const w of weights) {
    const { sets } = blocksForElement(byElement.get(w.element) ?? [])
    for (const block of sets) allSets.push({ element: w.element, block })
  }
  let budget = itemSetBudget
  for (const { element, block } of shuffle(allSets)) {
    if (block.length <= budget && block.length <= (capacity.get(element) ?? 0)) {
      pickedByElement.get(element)!.push(block)
      budget -= block.length
      capacity.set(element, capacity.get(element)! - block.length)
    }
  }

  // --- Pass 2: fill each element to its weight with standard questions, then order. ---
  const formBlocks: Block[] = []
  for (const w of weights) {
    const picked = pickedByElement.get(w.element)!
    const { standards } = blocksForElement(byElement.get(w.element) ?? [])
    let remaining = capacity.get(w.element)!
    for (const std of shuffle(standards)) {
      if (remaining === 0) break
      picked.push(std)
      remaining -= 1
    }
    // Shuffle the element's blocks (item-set questions stay contiguous within a block).
    formBlocks.push(...shuffle(picked))
  }

  return formBlocks.flat()
}
