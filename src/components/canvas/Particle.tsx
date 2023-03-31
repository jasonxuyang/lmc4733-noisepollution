import { useState, useRef, Suspense, useEffect } from 'react'
import { useCursor, MeshDistortMaterial, PositionalAudio } from '@react-three/drei'
import { rgbToHex } from '@/helpers/utils'
import useAnalyser from '@/hooks/useAnalyser'
import { useFrame } from '@react-three/fiber'
import React from 'react'
import usePositionalAudio from '@/hooks/usePositionalAudio'
import * as random from 'maath/random'
import * as buffer from 'maath/buffer'
import * as misc from 'maath/misc'
import { Points } from '@react-three/drei'
import { Group, Quaternion, Vector3 } from 'three'
import { pauseAudio, useGlobalState } from '@/hooks/useGlobalState'

export default function Particle({ src, ...props }) {
  const pointsRef = useRef<THREE.Points>(null!)
  const [color, setColor] = useState('hotpink')
  const [size, setSize] = useState(5)
  const { sound, playAudio, pauseAudio } = usePositionalAudio('audio/relaxing_forest.mp3')
  const { state } = useGlobalState()
  const { getFrequencyData } = useAnalyser(sound, 128)
  const [{ sphere1, sphere2, final }] = useState(() => {
    const sphere1 = random.inSphere(new Float32Array(10_000), { radius: size })
    const sphere2 = random.inSphere(new Float32Array(10_000), { radius: size })
    const final = sphere1.slice(0)
    return { sphere1, sphere2, final }
  })
  const { isPlaying } = state
  const rotationAxis = new Vector3(0, 1, 0).normalize()
  const q = new Quaternion()

  useEffect(() => {
    if (isPlaying) {
      playAudio()
    } else {
      pauseAudio()
    }
  }, [isPlaying])

  useFrame(({ clock }) => {
    mapAudioToVisual()
    animateParticle(clock)
  })

  const mapAudioToVisual = () => {
    const data = getFrequencyData()
    const dataIndex = 10
    setColor(rgbToHex(data[dataIndex] * 5, data[dataIndex] * 5, 0))
    setSize(data[dataIndex] / 100 === 0 ? 0 : data[dataIndex] / 100)
  }

  const animateParticle = (clock: any) => {
    const t2 = misc.remap(Math.sin(clock.getElapsedTime()), [-1, 1], [0, 1])

    if (isPlaying) {
      buffer.rotate(final, {
        q: q.setFromAxisAngle(rotationAxis, t2 * 0.1),
      })
      buffer.lerp(sphere1, sphere2, final, size * 2)
    }
  }

  return (
    <group {...props}>
      <Points positions={final as Float32Array} stride={3} ref={pointsRef}>
        <pointsMaterial size={0.1} color={color} />
      </Points>
      <PositionalAudio url={src} ref={sound} />
    </group>
  )
}
