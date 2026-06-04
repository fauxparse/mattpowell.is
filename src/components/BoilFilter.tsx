import { useEffect, useRef } from 'react'

const CYCLE = [-0.02, 0.01, -0.01, 0.02]

export const BoilFilter = () => {
  const cycleIndex = useRef(0)
  const turbulence = useRef<SVGFETurbulenceElement | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      cycleIndex.current = (cycleIndex.current + 1) % CYCLE.length
      turbulence.current?.setAttribute(
        'baseFrequency',
        (CYCLE[cycleIndex.current] / 20 + 0.03).toString(),
      )
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <svg width="0" height="0">
      <filter id="boil">
        <feTurbulence
          ref={turbulence}
          type="turbulence"
          baseFrequency="0.03"
          numOctaves="2"
          seed="1"
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="5"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
      <filter id="sketchy">
        <feTurbulence
          type="turbulence"
          baseFrequency="0.03"
          numOctaves="2"
          seed="1"
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="5"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  )
}
