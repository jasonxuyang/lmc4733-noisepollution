// @ts-nocheck
import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Particle from './Particle'
import { RefObject, useRef } from 'react'
import { ParticleData } from '../../../types'

const RADIUS = 200
const CX = 0
const CY = 0

const positionInCircle = (index, total, scroll) => {
  let offset = 0
  if (total > 4) offset = 1 / (total * 2)
  if (total === 3) offset = 0.25
  const x = CX + RADIUS * Math.cos(2 * Math.PI * (index / total + scroll + 0.005 - offset))
  const y = CY + RADIUS * Math.sin(2 * Math.PI * (index / total + scroll + 0.005 - offset))
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
  roomData: ParticleData[]
}

export default function Room({ scroll, roomData }: RoomProps) {
  const particles = useRef(null)
  const camera = useRef(null)

  useFrame(() => {
    particles.current.children.forEach((child, index) => {
      const position = positionInCircle(index, roomData.length, scroll.current)
      child.position.x = position.x
      child.position.z = position.y
    })
    const cameraPosition = RADIUS * -Math.abs(map(positionInSection(scroll.current, roomData.length), 0, 1, -0.9, 0.9))
    camera.current.position.z = cameraPosition
  })

  const renderParticles = () => {
    return roomData.map((data) => {
      if (!data.src) return
      else return <Particle key={data.src} src={data.src} />
    })
  }

  return (
    <group>
      <group ref={particles}>{renderParticles()}</group>

      <PerspectiveCamera
        ref={camera}
        position={[0, 0, 0]}
        makeDefault
        fov={75}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
        up={[0, 1, 0]}
        zoom={1}
      />
    </group>
  )
}
