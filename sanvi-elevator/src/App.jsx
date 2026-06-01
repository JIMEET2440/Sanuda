import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const floors = [
  {
    id: 1,
    label: 'Childhood',
    title: 'Tiny tornado, big laugh',
    vibe: 'Scraped knees, big dreams, louder laughter.',
    memories: [
      'Superhero cape phase (bedsheet approved).',
      'Snack negotiations worthy of the UN.',
      'Drawing the family like stick-figure royalty.',
    ],
  },
  {
    id: 2,
    label: 'Adventures',
    title: 'We found a map, so we went',
    vibe: 'Mini road trips, detours, and spontaneous plans.',
    memories: [
      'Getting lost and calling it a scenic route.',
      'Photo ops with the silliest poses.',
      'Secret jokes we still replay.',
    ],
  },
  {
    id: 3,
    label: 'Chaos',
    title: 'Beautiful, lovable chaos',
    vibe: 'Loud laughter and tiny disasters on repeat.',
    memories: [
      'You turning every plan into a party.',
      'That cake moment we will never forget.',
      'Dancing in the kitchen like no one was recording.',
    ],
  },
  {
    id: 4,
    label: 'Growth',
    title: 'Glow-up in real time',
    vibe: 'Big steps, quiet wins, strong choices.',
    memories: [
      'Turning I cannot into watch me.',
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
const soundFiles = {
  door: '/sounds/door.mp3',
  travel: '/sounds/travel.mp3',
  chime: '/sounds/chime.mp3',
}

function App() {
  const [currentFloor, setCurrentFloor] = useState(1)
  const [displayFloor, setDisplayFloor] = useState(1)
  const [targetFloor, setTargetFloor] = useState(null)
  const [phase, setPhase] = useState('idle')
  const [unlockedMax, setUnlockedMax] = useState(1)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const timers = useRef([])
  const soundsRef = useRef(null)

  const activeFloor = useMemo(
    () => floors.find((floor) => floor.id === currentFloor),
    [currentFloor],
  )

  const rotation = useMemo(() => {
    return `${(displayFloor - 1) * (360 / floors.length)}deg`
  }, [displayFloor])

  const clearTimers = () => {
    timers.current.forEach((timer) => clearTimeout(timer))
    timers.current = []
  }

  const playSound = (key) => {
    if (!soundEnabled) {
      return
    }
    const audio = soundsRef.current?.[key]
    if (!audio) {
      return
    }
    audio.currentTime = 0
    audio.play().catch(() => {})
  }

  useEffect(() => {
    soundsRef.current = {
      door: new Audio(soundFiles.door),
      travel: new Audio(soundFiles.travel),
      chime: new Audio(soundFiles.chime),
    }

    Object.values(soundsRef.current).forEach((audio) => {
      audio.volume = 0.6
    })

    return () => {
      clearTimers()
      Object.values(soundsRef.current || {}).forEach((audio) => {
        audio.pause()
        audio.src = ''
      })
    }
  }, [])

  const runTransition = (nextFloor) => {
    if (phase !== 'idle' || nextFloor === currentFloor) {
      return
    }

    clearTimers()
    setTargetFloor(nextFloor)
    setPhase('closing')
    playSound('door')

    timers.current.push(
      setTimeout(() => {
        setPhase('travel')
        setDisplayFloor(nextFloor)
        playSound('travel')
        timers.current.push(
          setTimeout(() => {
            setCurrentFloor(nextFloor)
            setUnlockedMax((prev) => Math.max(prev, nextFloor))
            setPhase('opening')
            playSound('chime')
            timers.current.push(
              setTimeout(() => {
                setPhase('idle')
                setTargetFloor(null)
              }, 900),
            )
          }, 1500),
        )
      }, 900),
    )
  }

  return (
    <main className="app">
      <header className="hero">
        <div className="hero-top">
          <p className="eyebrow">Orbit Deck</p>
          <button
            type="button"
            className={soundEnabled ? 'sound-toggle is-on' : 'sound-toggle'}
            onClick={() => setSoundEnabled((prev) => !prev)}
          >
            Sound {soundEnabled ? 'On' : 'Off'}
          </button>
        </div>
        <h1>Sanvi's Neon Birthday Ride</h1>
        <p className="subtitle">
          Floors unlock in order. Ride the orbit, open the chapter, repeat.
        </p>
      </header>

      <section className="experience">
        <div className="orbit-card">
          <div className="orbit-header">
            <div className="floor-readout">
              <span className="floor-label">Floor</span>
              <span className="floor-value">
                {String(displayFloor).padStart(2, '0')}
              </span>
            </div>
            <div className="status">
              <span className="status-label">Status</span>
              <span className="status-value">
                {phase === 'travel'
                  ? `Traveling to ${String(targetFloor || displayFloor).padStart(2, '0')}`
                  : phase === 'closing'
                    ? 'Doors closing'
                    : phase === 'opening'
                      ? 'Doors opening'
                      : 'Ready'}
              </span>
            </div>
          </div>

          <div className="orbit-core" data-phase={phase}>
            <div className="orbit-wheel" style={{ '--rotation': rotation }}>
              <div className="orbit-ring ring-main" />
              <div className="orbit-ring ring-outer" />
              <div className="orbit-ring ring-inner" />
              <div className="orbit-dots">
                {floors.map((floor, index) => {
                  const isActive = floor.id === currentFloor
                  const isNext = floor.id === unlockedMax + 1
                  const isLocked = floor.id > unlockedMax + 1
                  const state = isActive
                    ? 'active'
                    : isLocked
                      ? 'locked'
                      : isNext
                        ? 'next'
                        : 'unlocked'

                  return (
                    <button
                      key={floor.id}
                      type="button"
                      className="floor-dot"
                      style={{
                        '--angle': `${(index / floors.length) * 360}deg`,
                      }}
                      data-state={state}
                      onClick={() => runTransition(floor.id)}
                      disabled={phase !== 'idle' || isLocked}
                    >
                      <span>{String(floor.id).padStart(2, '0')}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="orbit-elevator" data-phase={phase}>
              <div className="door-slice left" />
              <div className="door-slice right" />
              <div className="door-core" />
            </div>
          </div>

          <div className="orbit-footer">
            <p className="orbit-note">
              Only the next floor unlocks after you visit the current one.
            </p>
            <div className="progress">
              <span>Unlocked: 01 - {String(unlockedMax).padStart(2, '0')}</span>
              <span>
                Next: {String(Math.min(unlockedMax + 1, floors.length)).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        <section className="chapter-card">
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
                  Thanks for being the sister who turns ordinary days into
                  stories worth repeating. Keep shining, keep laughing, keep
                  being you.
                </p>
                <p className="celebration-sign">With all the love, always.</p>
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  )
}

export default App
