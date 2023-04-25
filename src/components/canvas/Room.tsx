// @ts-nocheck
import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Particle from './Particle'
import { RefObject, useEffect, useRef, useState } from 'react'
import { Vector2 } from 'three'

const RADIUS = 70

const positionInCircle = (index, total, cx, cy, camera) => {
  const angle = (2 * Math.PI * index) / total
  const x = RADIUS * Math.cos(angle)
  const z = RADIUS * Math.sin(angle)
  return { x, y: 0, z }
}

export type RoomProps = {
  scroll: RefObject<number>
  audioFiles: string[]
}

export default function Room({ scroll, audioFiles }: RoomProps) {
  const particles = useRef(null)
  const camera = useRef(null)
  const [cx, setCx] = useState(0)
  const [cy, setCy] = useState(0)

  useEffect(() => {
    const handleKeyDown = (event) => {
      const angle = camera.current.rotation.y
      switch (event.key) {
        case 'ArrowUp':
          // setCy(cy + Math.cos(angle) * 10)
          // setCx(cx + Math.sin(angle) * 10)
          setCy(cy + 10)
          break
        case 'ArrowDown':
          // setCy(cy - Math.cos(angle) * 10)
          // setCx(cx - Math.sin(angle) * 10)
          setCy(cy - 10)
          break
        case 'ArrowLeft':
          camera.current.rotation.y += Math.PI / 18
          break
        case 'ArrowRight':
          camera.current.rotation.y -= Math.PI / 18
          breaks
        case 'r':
          camera.current.position.x = 0
          camera.current.position.y = 0
          camera.current.position.z = RADIUS
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [cx, cy])

  useFrame(() => {
    particles.current.children.forEach((child, index) => {
      const position = positionInCircle(index, 4, cy, cx, camera) // switch cx and cy
      child.position.x = position.x
      child.position.z = position.y
    })
    camera.current.position.z = RADIUS
  })

  const renderParticles = () => {
    return audioFiles.map((src) => {
      return <Particle key={src} src={src} />
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

// import { PerspectiveCamera } from '@react-three/drei'
// import { useFrame } from '@react-three/fiber'
// import Particle from './Particle'
// import { RefObject, useEffect, useRef } from 'react'

// const RADIUS = 200
// const CX = 0
// const CY = 0

// const positionInCircle = (index, total, scroll) => {
//   const x = CX + RADIUS * Math.cos(2 * Math.PI * (index / total + scroll + 0.005))
//   const y = CY + RADIUS * Math.sin(2 * Math.PI * (index / total + scroll + 0.005))
//   return { x, y }
// }
// const positionInSection = (scroll, sectionCount) => {
//   const percentage = 100 / sectionCount
//   return ((scroll * 100) % percentage) / percentage
// }

// const map = (number, inMin, inMax, outMin, outMax) => {
//   return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
// }

// export type RoomProps = {
//   scroll: RefObject<number>
//   audioFiles: string[]
// }

// export default function Room({ scroll, audioFiles }: RoomProps) {
//   const particles = useRef(null)
//   const camera = useRef(null)

//   useFrame(() => {
//     particles.current.children.forEach((child, index) => {
//       const position = positionInCircle(index, 4, scroll.current)
//       child.position.x = position.x
//       child.position.z = position.y
//     })
//     const cameraPosition =
//       RADIUS * -Math.abs(map(positionInSection(scroll.current, audioFiles.length), 0, 1, -0.9, 0.9))
//     camera.current.position.z = cameraPosition
//   })

//   const renderParticles = () => {
//     return audioFiles.map((src) => {
//       return <Particle key={src} src={src} />
//     })
//   }

//   return (
//     <group>
//       <group ref={particles}>{renderParticles()}</group>

//       <PerspectiveCamera
//         ref={camera}
//         position={[0, 0, 0]}
//         makeDefault
//         fov={75}
//         rotation={[0, 0, 0]}
//         scale={[1, 1, 1]}
//         up={[0, 1, 0]}
//         zoom={1}
//       />
//     </group>
//   )
// }
