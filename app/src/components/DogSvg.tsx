/**
 * Side view (facing right) of a black Labrador × German Shepherd mix, drawn from the
 * owner's dogs and common traits of the mix: solid black coat, big upright pointed
 * shepherd ears, amber eyes, a long but broad muzzle greying at the tip, a small white
 * chest patch, a lean athletic body a little longer than tall, and a long bushy tail.
 *
 * Animation hooks (see the `.dog-*` rules in index.css): legs swing from the hip in
 * diagonal pairs (leg-a / leg-b), the tail wags around its base (bottom-right of its
 * box), and the tongue shows only while running. 'sit' drops the haunches to the ground.
 */
const NEAR = '#141414'
const FAR = '#050505'
const SHADE = '#262626'

// Leg outlines, drawn downward from the hip at (0, 0); paws point forward (right).
const FRONT_LEG = 'M-4 -4 Q0 -6 4 -4 L3 24 Q7.5 24.5 7.5 27 L7 28 L-3 28 Q-3.6 26.5 -3 24 Z'
const BACK_LEG =
  'M-7 -3 Q0 -7 5 -3 Q8 5 6 11 L2 19 L2.5 28 Q7 28 7.5 30.5 L7 31 L-3 31 Q-4 29 -3 27 L-4 20 Q-8 10 -7 -3 Z'
const SIT_BACK_LEG = 'M-9 3 Q-9 -7 1 -7 Q11 -7 11 3 Q11 7 9 9 Q14 9.5 14 11.2 L13.5 12 L-5 12 Q-9 10 -9 3 Z'

type LegProps = { x: number; y: number; cls: 'leg-a' | 'leg-b'; d: string; near?: boolean }

function Leg({ x, y, cls, d, near }: LegProps) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={`dog-leg ${cls}`}>
        <path d={d} fill={near ? NEAR : FAR} />
        {/* outline the folded haunch so it reads against the body */}
        {near && d === SIT_BACK_LEG && <path d={d} fill="none" stroke={SHADE} strokeWidth={0.9} />}
      </g>
    </g>
  )
}

export function DogSvg({ pose }: { pose: 'run' | 'sit' }) {
  const sit = pose === 'sit'
  return (
    <svg viewBox="0 0 120 84" className={`dog-svg dog-${pose}`} width="100%">
      <ellipse cx={sit ? 66 : 62} cy={78.5} rx={sit ? 30 : 36} ry={3} fill="rgb(0 0 0 / 0.16)" />
      <g className="dog-body">
        {/* far-side legs, behind the body */}
        <Leg x={sit ? 75 : 72} y={49} cls="leg-a" d={FRONT_LEG} />
        <Leg x={47} y={sit ? 64 : 46} cls="leg-b" d={sit ? SIT_BACK_LEG : BACK_LEG} />
        {/* long, bushy shepherd tail: carried low in a sabre curve, resting on the ground when sitting */}
        <path
          className="dog-tail"
          d={sit ? 'M35 67 Q22 72 8 69 Q8 74 14 75.5 Q25 77 36 75 Z' : 'M36 40 Q22 39 9 29 Q8 35 12 39 Q20 47 36 47 Z'}
          fill={NEAR}
        />
        {/* lean, deep-chested body with a tucked-up belly; tilts back onto the haunches to sit */}
        <g transform={sit ? 'translate(0 -4) rotate(-34 84 58)' : undefined}>
          <path
            d="M84 35 Q62 37 40 39 C31 40 28 50 37 53 Q47 50 57 50.5 Q70 52 78 58 Q86 61 90 55 Q93 47 89 40 Q87 35.5 84 35 Z"
            fill={NEAR}
          />
          <path
            d="M45 40.5 Q62 38.8 80 37.6 M46 43 Q38 45 39 52 M81 41 Q75 47 79 56"
            stroke={SHADE}
            strokeWidth={1.6}
            strokeLinecap="round"
            fill="none"
          />
        </g>
        <Leg x={sit ? 41 : 40} y={sit ? 65 : 46} cls="leg-a" d={sit ? SIT_BACK_LEG : BACK_LEG} near />
        {/* strong neck, then the small white chest patch */}
        <path d="M71 45 Q77 28 87 19 L101 25 Q96 36 91 50 Q82 52 75 42 Z" fill={NEAR} />
        <path d="M88 42.5 Q91.5 42 91.5 46 Q90.5 50.5 87.5 52 Q85.5 47 88 42.5 Z" fill="#f2f2f2" />
        <Leg x={sit ? 81 : 79} y={49} cls="leg-b" d={FRONT_LEG} near />
        <g className="dog-head">
          {/* big upright pointed ears; the far one peeks out behind */}
          <path d="M82.5 19.5 Q82 10 84.5 3.5 Q89.5 8.5 90.5 17 Z" fill={FAR} />
          <path d="M87.5 17 Q87.5 8 91.5 1.5 Q96.5 7.5 98 15.5 Z" fill={NEAR} />
          <path d="M90.3 14.5 Q90.5 9 92 5.5 Q95 9.5 95.6 14 Z" fill="#3b2a2a" />
          {/* broad skull and a long, slightly tapering muzzle */}
          <ellipse cx={94} cy={23} rx={10.5} ry={9.5} fill={NEAR} />
          <path d="M97 17 Q105 18.5 111 21.5 Q116 22.5 116 26 Q115.5 30 111 31 Q105 33 99 35 Z" fill={NEAR} />
          {/* greying muzzle and chin */}
          <path
            d="M104 32.3 Q109 32 113.5 30 M107 22 Q110 22.6 112 23.6"
            stroke="#707070"
            strokeWidth={1.6}
            strokeLinecap="round"
            fill="none"
            opacity={0.7}
          />
          <ellipse cx={114.3} cy={24} rx={2.7} ry={2.2} fill={FAR} />
          <circle cx={115.1} cy={23.2} r={0.6} fill="#5a5a5a" />
          <ellipse className="dog-tongue" cx={106.5} cy={35.5} rx={2.3} ry={3.6} fill="#e8638c" />
          <path d="M101 32 Q106 33.5 110.5 31.2" stroke={FAR} strokeWidth={1} strokeLinecap="round" fill="none" />
          {/* brow and amber eye */}
          <path d="M96 17.8 Q99.5 16.3 102.5 18" stroke={SHADE} strokeWidth={1.3} strokeLinecap="round" fill="none" />
          <circle cx={99.5} cy={21} r={2.8} fill="#e0a040" />
          <circle cx={99.9} cy={21.1} r={1.3} fill="#1a0f05" />
          <circle cx={100.6} cy={20.2} r={0.7} fill="#fff" />
        </g>
      </g>
    </svg>
  )
}
