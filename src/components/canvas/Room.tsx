import { PerspectiveCamera, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Particle from './Particle'
import { RefObject, useEffect, useRef } from 'react'

const RADIUS = 50
const CX = 0
const CY = 0

const positionInCircle = (index, total, scroll) => {
  const x = CX + RADIUS * Math.cos(2 * Math.PI * (index / total + scroll))
  const y = CY + RADIUS * Math.sin(2 * Math.PI * (index / total + scroll))
  return { x, y }
}

export type RoomProps = {
  scroll: RefObject<number>
  audioFiles: string[]
}

export default function Room({ scroll, audioFiles }) {
  const group = useRef(null)

  useFrame(() => {
    group.current.children.forEach((child, index) => {
      const position = positionInCircle(index, 4, scroll.current)
      child.position.x = position.x
      child.position.z = position.y
    })
  })

  const renderParticles = () => {
    return audioFiles.map((src) => {
      return <Particle key={src} src={src} />
    })
  }

  return (
    <group>
      <group ref={group}>{renderParticles()}</group>

      <PerspectiveCamera
        makeDefault
        fov={75}
        rotation={[0, 0, 0]}
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
        up={[0, 1, 0]}
        zoom={1}
      />
    </group>
  )
}
