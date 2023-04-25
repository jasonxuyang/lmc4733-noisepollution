import { PerspectiveCamera, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Particle from './Particle'
import { RefObject, useEffect, useRef } from 'react'

const RADIUS = 200
const CX = 0
const CY = 0

const positionInCircle = (index, total, scroll) => {
  const x = CX + RADIUS * Math.cos(2 * Math.PI * (index / total + scroll + 0.005))
  const y = CY + RADIUS * Math.sin(2 * Math.PI * (index / total + scroll + 0.005))
  return { x, y }
}
const positionInSection = (scroll, sectionCount) => {
  const percentage = 100 / sectionCount
  return ((scroll * 100) % percentage) / percentage
}

const map = (number, inMin, inMax, outMin, outMax) => {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export type RoomProps = {
  scroll: RefObject<number>
  audioFiles: string[]
}

export default function Room({ scroll, audioFiles }: RoomProps) {
  const particles = useRef(null)
  const camera = useRef(null)

  useFrame(() => {
    particles.current.children.forEach((child, index) => {
      const position = positionInCircle(index, 4, scroll.current)
      child.position.x = position.x
      child.position.z = position.y
    })
    const cameraPosition =
      RADIUS * -Math.abs(map(positionInSection(scroll.current, audioFiles.length), 0, 1, -0.9, 0.9))
    camera.current.position.z = cameraPosition
  })

  const renderParticles = () => {
    return audioFiles.map((src) => {
      return <Particle key={src} src={src} />
    })
  }

  return (
    <group>
      <group ref={particles}>{renderParticles()}</group>
      <group ref={camera} position={[0, 0, 0]}>
        <PerspectiveCamera makeDefault fov={75} rotation={[0, 0, 0]} scale={[1, 1, 1]} up={[0, 1, 0]} zoom={1} />
      </group>
    </group>
  )
}
