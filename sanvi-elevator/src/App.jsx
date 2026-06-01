import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const floors = [
  {
    id: 1,
    label: 'Childhood',
    title: 'Tiny tornado, big laugh',
    vibe: 'The era of scraped knees and unstoppable curiosity.',
    memories: [
      'Your superhero cape phase (bedsheet = official uniform).',
      'Snack negotiations that could win the UN.',
      'Drawing the family as stick-figure royalty.',
    ],
  },
  {
    id: 2,
    label: 'Adventures',
    title: 'We found a map, so we went',
    vibe: 'Explorations, mini road trips, and spontaneous detours.',
    memories: [
      'Getting lost and calling it a scenic route.',
      'Photo ops with the silliest poses.',
      'Secret jokes we still laugh about.',
    ],
  },
  {
    id: 3,
    label: 'Chaos',
    title: 'Beautiful, lovable chaos',
    vibe: 'The highlights reel of loud laughter and tiny disasters.',
    memories: [
      'You turning every plan into a party.',
      'That one time the cake almost did not survive.',
      'Dancing in the kitchen like no one was recording.',
    ],
  },
  {
    id: 4,
    label: 'Growth',
    title: 'Glow-up in real time',
    vibe: 'Big steps, quiet wins, and strong choices.',
    memories: [
      'Turning “I cannot” into “watch me.”',
      'Bravery in places that felt new.',
      'Kindness that keeps spreading.',
    ],
  },
  {
    id: 5,
    label: 'Today',
    title: 'Main character energy',
    vibe: 'You are the vibe, the light, and the punchline.',
    memories: [
      'Your laugh that resets the room.',
      'The way you show up for people.',
      'Your plans, your glow, your time.',
    ],
  },
  {
    id: 6,
    label: 'Future',
    title: 'The next floor is legendary',
    vibe: 'We are just getting started.',
    memories: [
      'New cities, new stories, same sister bond.',
      'Every dream is on the schedule.',
      'This elevator only goes up.',
    ],
    isFinal: true,
  },
]

const photoSlots = ['Photo 1', 'Photo 2', 'Photo 3']

function App() {
  const [currentFloor, setCurrentFloor] = useState(1)
  const [displayFloor, setDisplayFloor] = useState(1)
  const [targetFloor, setTargetFloor] = useState(null)
  const [phase, setPhase] = useState('idle')
  const timers = useRef([])

  const activeFloor = useMemo(
    () => floors.find((floor) => floor.id === currentFloor),
    [currentFloor],
  )

  const clearTimers = () => {
    timers.current.forEach((timer) => clearTimeout(timer))
    timers.current = []
  }

  useEffect(() => {
    return () => clearTimers()
  }, [])

  const runTransition = (nextFloor) => {
    if (phase !== 'idle' || nextFloor === currentFloor) {
      return
    }

    clearTimers()
    setTargetFloor(nextFloor)
    setPhase('closing')

    timers.current.push(
      setTimeout(() => {
        setPhase('travel')
        setDisplayFloor(nextFloor)
        timers.current.push(
          setTimeout(() => {
            setCurrentFloor(nextFloor)
            setPhase('opening')
            timers.current.push(
              setTimeout(() => {
                setPhase('idle')
                setTargetFloor(null)
              }, 900),
            )
          }, 1400),
        )
      }, 900),
    )
  }

  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">Hotel Sanvi</p>
        <h1>Birthday Elevator for Sanvi</h1>
        <p className="subtitle">
          Select a floor to unlock a chapter. The doors will close, travel, and
          reopen with a new memory waiting.
        </p>
      </header>

      <section className="elevator">
        <div className="panel">
          <div className="panel-top">
            <div className="display">
              <div className="display-label">Floor</div>
              <div className="display-value">
                {String(displayFloor).padStart(2, '0')}
              </div>
              <div className="display-status">
                {phase === 'travel'
                  ? 'Traveling'
                  : phase === 'closing'
                    ? 'Doors closing'
                    : phase === 'opening'
                      ? 'Doors opening'
                      : 'Ready'}
              </div>
            </div>

            <div className="ambient" aria-hidden="true">
              <span className="ambient-dot" />
              <span className="ambient-dot" />
              <span className="ambient-dot" />
            </div>
          </div>

          <div className="buttons">
            {floors.map((floor) => (
              <button
                key={floor.id}
                type="button"
                className={
                  currentFloor === floor.id
                    ? 'floor-button is-active'
                    : 'floor-button'
                }
                onClick={() => runTransition(floor.id)}
                disabled={phase !== 'idle'}
              >
                <span className="floor-number">
                  {String(floor.id).padStart(2, '0')}
                </span>
                <span className="floor-name">{floor.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="shaft">
          <div className="doors" data-state={phase}>
            <div className="door door-left" />
            <div className="door door-right" />
            <div className="door-seam" />
          </div>
          <div className="door-glow" aria-hidden="true" />
        </div>
      </section>

      <section className="chapter">
        <div className="chapter-header">
          <p className="chapter-label">Chapter {activeFloor.id}</p>
          <h2>{activeFloor.title}</h2>
          <p className="chapter-vibe">{activeFloor.vibe}</p>
        </div>

        <div className="chapter-body">
          <div className="memories">
            {activeFloor.memories.map((memory) => (
              <div className="memory-card" key={memory}>
                <span className="memory-bullet" />
                <p>{memory}</p>
              </div>
            ))}
          </div>

          <div className="photos">
            {photoSlots.map((slot) => (
              <div className="photo-slot" key={slot}>
                <div className="photo-placeholder" />
                <span>{slot}</span>
              </div>
            ))}
          </div>
        </div>

        {activeFloor.isFinal && (
          <div className="celebration">
            <div className="confetti" aria-hidden="true">
              {Array.from({ length: 24 }).map((_, index) => (
                <span
                  key={index}
                  style={{
                    '--x': `${(index * 4) % 100}%`,
                    '--delay': `${index * 0.12}s`,
                  }}
                />
              ))}
            </div>
            <div className="celebration-card">
              <p className="celebration-title">Happy Birthday, Sanvi!</p>
              <p className="celebration-text">
                Thanks for being the sister who turns ordinary days into stories
                worth repeating. You are the sparkle in this family elevator.
                Keep shining, keep laughing, and keep being you.
              </p>
              <p className="celebration-sign">With all the love, always.</p>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
