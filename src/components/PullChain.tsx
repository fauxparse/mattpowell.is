import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
} from 'react'

import { cn } from '../lib/utils'

class Vec2 {
  constructor(
    readonly x: number,
    readonly y: number,
  ) {}
  add(o: Vec2) {
    return new Vec2(this.x + o.x, this.y + o.y)
  }
  subtract(o: Vec2) {
    return new Vec2(this.x - o.x, this.y - o.y)
  }
  scale(f: number) {
    return new Vec2(this.x * f, this.y * f)
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
  normalize() {
    const l = this.length()
    return l === 0 ? this : this.scale(1 / l)
  }
}

type Position = number | `${number}%` | 'center'

type PullChainProps = {
  className?: string
  position?: Position
  length?: number
  checked: boolean
  color?: ComponentProps<'path'>['stroke']
  strokeWidth?: ComponentProps<'path'>['strokeWidth']
  onCheckedChange: (checked: boolean) => void
}

export const PullChain = ({
  className,
  color = 'white',
  strokeWidth = 3,
  length = 200,
  checked,
  position = 'center',
  onCheckedChange,
}: PullChainProps) => {
  const pathElement = useRef<SVGPathElement | null>(null)
  const ringElement = useRef<SVGGElement | null>(null)
  const ringRadius = 10
  const chain = useRef<Chain>(new Chain(0, -50, length))
  const mouseDown = useRef<boolean>(false)
  const toggled = useRef<boolean>(false)
  const startAnimation = useRef<(() => void) | null>(null)
  const subPixelFrames = useRef<number>(0)

  const [container, setContainer] = useState<SVGSVGElement | null>(null)

  useEffect(() => {
    chain.current = new Chain(0, -50, length)
  }, [length])

  useEffect(() => {
    if (!container) return

    container.style.position = 'fixed'
    container.style.inset = '0'

    const resized = () => {
      const { width, height } = container.getBoundingClientRect()
      const x = parsePosition(position, width)

      const viewBox = `${-x} 0 ${width} ${height}`
      container.setAttribute('viewBox', viewBox)
    }

    const resizeObserver = new ResizeObserver(resized)
    resizeObserver.observe(container)
    resized()

    return () => {
      resizeObserver.disconnect()
    }
  }, [container, position])

  const draw = useCallback(() => {
    if (!pathElement.current) return
    pathElement.current.setAttribute('d', chain.current.path)
    const tail = chain.current.tail
    if (tail && ringElement.current) {
      const prev =
        chain.current.particles[chain.current.particles.length - 2] ?? tail
      const c = tail.position
        .subtract(prev.position)
        .normalize()
        .scale(ringRadius)
        .add(tail.position)
      ringElement.current.style.transform = `translate(${c.x}px, ${c.y}px)`
    }
  }, [])

  useEffect(() => {
    let animationFrameId: number | null = null
    let lastFrameTime: number | null = null

    const stop = () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId)
      animationFrameId = null
      lastFrameTime = null
    }

    const frame = (time: number) => {
      animationFrameId = null
      if (lastFrameTime !== null) {
        const dt = Math.min((time - lastFrameTime) / 1000, maxDeltaTime)
        const maxMovement = chain.current.update(dt)
        draw()

        if (!mouseDown.current && maxMovement < staticMovementThreshold) {
          subPixelFrames.current += 1
          if (subPixelFrames.current >= staticFrameThreshold) {
            chain.current.makeStatic()
            return
          }
        } else {
          subPixelFrames.current = 0
        }
      }
      lastFrameTime = time
      animationFrameId = requestAnimationFrame(frame)
    }

    startAnimation.current = () => {
      if (animationFrameId !== null) return
      subPixelFrames.current = 0
      lastFrameTime = null
      animationFrameId = requestAnimationFrame(frame)
    }

    startAnimation.current()

    return () => {
      startAnimation.current = null
      stop()
    }
  }, [draw])

  const pointerDown = useCallback(
    (event: React.PointerEvent<SVGGElement>) => {
      mouseDown.current = true
      toggled.current = false
      startAnimation.current?.()
      const svg = event.currentTarget.closest('svg')
      if (!svg) return
      const ring = event.currentTarget
      const { pointerId } = event
      ring.setPointerCapture(pointerId)
      const moved = (event: PointerEvent) => {
        const pointer = getSvgPointerPosition(svg, event)
        if (!pointer) return

        const tail = chain.current.tail
        const head = chain.current.head
        if (tail && head) {
          const resistedPosition = applyDragResistance(
            head.position,
            pointer,
            chain.current.restLength,
          )
          const switchThreshold =
            chain.current.restLength * switchThresholdMultiplier
          const switchNotch = applySwitchNotch(
            head.position,
            resistedPosition,
            switchThreshold,
            toggled.current,
          )
          tail.lock()
          tail.position = switchNotch.position
          tail.velocity = new Vec2(0, 0)
          draw()

          if (switchNotch.crossed) {
            toggled.current = true
            onCheckedChange(!checked)
          }
        }
      }

      moved(event.nativeEvent)
      window.addEventListener('pointermove', moved)

      const ended = () => {
        mouseDown.current = false
        window.removeEventListener('pointermove', moved)
        window.removeEventListener('pointerup', ended)
        window.removeEventListener('pointercancel', ended)
        if (ring.hasPointerCapture(pointerId))
          ring.releasePointerCapture(pointerId)
        chain.current.tail?.unlock?.()
      }

      window.addEventListener('pointerup', ended, { once: true })
      window.addEventListener('pointercancel', ended, { once: true })
    },
    [checked, draw, onCheckedChange],
  )

  return (
    <svg
      ref={setContainer}
      className={cn(
        'fixed inset-0 w-full h-full pointer-events-none z-100',
        className,
      )}
    >
      <g
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="sketchy"
      >
        <path ref={pathElement} d={initialChainPath} />
        <g
          ref={ringElement}
          onPointerDown={pointerDown}
          style={{ pointerEvents: 'auto', cursor: 'grab' }}
        >
          <circle cx={0} cy={0} r={ringRadius} />
          <circle cx={0} cy={0} r={20} fill="transparent" stroke="none" />
        </g>
      </g>
    </svg>
  )
}

const particleDamping = 0.99
const maxDeltaTime = 1 / 30
const gravity = new Vec2(0, 980)
const dragResistanceLength = 420
const switchThresholdMultiplier = 2
const switchNotchWidth = 24
const switchNotchResistance = 24
const switchSnapDistance = 20
const pathSmoothingPasses = 2
const staticMovementThreshold = 0.01
const staticFrameThreshold = 30

function getSvgPointerPosition(svg: SVGSVGElement, event: PointerEvent) {
  const screenMatrix = svg.getScreenCTM()
  if (!screenMatrix) return null

  const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(
    screenMatrix.inverse(),
  )
  return new Vec2(point.x, point.y)
}

function applyDragResistance(anchor: Vec2, pointer: Vec2, freeLength: number) {
  const displacement = pointer.subtract(anchor)
  const distance = displacement.length()
  if (distance === 0 || distance <= freeLength) return pointer

  const excess = distance - freeLength
  const resistedLength =
    freeLength +
    dragResistanceLength * Math.log1p(excess / dragResistanceLength)
  return anchor.add(displacement.scale(resistedLength / distance))
}

function applySwitchNotch(
  anchor: Vec2,
  position: Vec2,
  threshold: number,
  tripped: boolean,
) {
  if (tripped) return { position, crossed: false }

  const displacement = position.subtract(anchor)
  const distance = displacement.length()
  if (distance === 0 || distance < threshold - switchNotchWidth) {
    return { position, crossed: false }
  }

  const direction = displacement.scale(1 / distance)
  if (distance <= threshold) {
    const progress =
      (distance - (threshold - switchNotchWidth)) / switchNotchWidth
    const notchedDistance =
      distance - switchNotchResistance * smoothstep(progress)
    return {
      position: anchor.add(direction.scale(notchedDistance)),
      crossed: false,
    }
  }

  return {
    position: anchor.add(direction.scale(distance + switchSnapDistance)),
    crossed: true,
  }
}

function smoothstep(value: number) {
  const t = Math.max(0, Math.min(1, value))
  return t * t * (3 - 2 * t)
}

class Particle {
  position: Vec2
  velocity: Vec2
  acceleration: Vec2
  locked = false
  mass: number

  constructor(x: number, y: number, mass = 1.5) {
    this.position = new Vec2(x, y)
    this.velocity = new Vec2(0, 0)
    this.acceleration = new Vec2(0, 0)
    this.mass = mass
  }

  get x() {
    return this.position.x
  }

  get y() {
    return this.position.y
  }

  lock() {
    this.locked = true
    return this
  }

  unlock() {
    this.locked = false
    return this
  }

  applyForce(force: Vec2) {
    if (this.locked) return
    this.acceleration = this.acceleration.add(force.scale(1 / this.mass))
  }

  update(dt: number) {
    if (this.locked) {
      this.acceleration = new Vec2(0, 0)
      return 0
    }

    const previousPosition = this.position
    this.velocity = this.velocity
      .add(this.acceleration.add(gravity).scale(dt))
      .scale(Math.exp(-particleDamping * dt))
    this.position = this.position.add(this.velocity.scale(dt))
    this.acceleration = new Vec2(0, 0)
    return this.position.subtract(previousPosition).length()
  }

  toString() {
    return `${this.x},${this.y}`
  }
}

class Spring {
  a: Particle
  b: Particle
  restLength: number
  stiffness = 2000

  constructor(a: Particle, b: Particle, restLength: number) {
    this.a = a
    this.b = b
    this.restLength = restLength
  }

  applyForces() {
    const difference = this.b.position.subtract(this.a.position)
    const distance = difference.length()
    if (distance === 0) return

    const direction = difference.scale(1 / distance)
    const springTension = this.stiffness * (distance - this.restLength)
    const force = direction.scale(springTension)
    this.a.applyForce(force)
    this.b.applyForce(force.scale(-1))
  }
}

class Chain {
  particles: Particle[] = []
  springs: Spring[] = []
  restLength = 0

  constructor(x: number, y: number, length: number, n = 10) {
    const segmentLength = length / (n - 1)
    for (let i = 0; i < n; i++) {
      const particle = new Particle(x, y + i * segmentLength * 1.242)
      if (i === 0) particle.lock()
      if (i === n - 1) particle.mass = 5
      this.particles.push(particle)
      if (i > 0) {
        const spring = new Spring(
          this.particles[i - 1],
          particle,
          segmentLength,
        )
        spring.stiffness = i ? 4000 : 1000
        this.springs.push(spring)
        this.restLength += segmentLength
      }
    }
  }

  update(dt: number, substeps = 8) {
    const subDt = dt / substeps
    let maxMovement = 0
    for (let i = 0; i < substeps; i++) {
      for (const spring of this.springs) {
        spring.applyForces()
      }
      for (const particle of this.particles) {
        maxMovement = Math.max(maxMovement, particle.update(subDt))
      }
    }
    return maxMovement
  }

  makeStatic() {
    for (const particle of this.particles) {
      particle.velocity = new Vec2(0, 0)
      particle.acceleration = new Vec2(0, 0)
    }
  }

  get path() {
    if (this.particles.length < 2) return ''

    const points = smoothPathPoints(
      this.particles.map((particle) => particle.position),
      pathSmoothingPasses,
    )
    const commands = [`M${pointToString(points[0])}`]

    for (let i = 1; i < points.length - 1; i++) {
      const current = points[i]
      const next = points[i + 1]
      const midpoint = current.add(next.subtract(current).scale(0.5))

      commands.push(`Q${pointToString(current)} ${pointToString(midpoint)}`)
    }

    commands.push(`L${pointToString(points[points.length - 1])}`)
    return commands.join('')
  }

  get tail() {
    return this.particles[this.particles.length - 1]
  }

  get head() {
    return this.particles[0]
  }
}

const initialChainPath = new Chain(0, 0, 200).path

function smoothPathPoints(points: Vec2[], passes: number) {
  let smoothed = points

  for (let pass = 0; pass < passes; pass++) {
    smoothed = smoothed.map((point, index) => {
      if (index === 0 || index === smoothed.length - 1) return point

      return smoothed[index - 1]
        .add(point.scale(2))
        .add(smoothed[index + 1])
        .scale(1 / 4)
    })
  }

  return smoothed
}

function pointToString(point: Vec2) {
  return `${point.x},${point.y}`
}

function parsePosition(position: Position, width: number) {
  let x = position === 'center' ? width / 2 : parseFloat(String(position))
  if (String(position).endsWith('%')) {
    x *= width / 100
  }
  if (x < 0) {
    x += width
  }
  return x
}
