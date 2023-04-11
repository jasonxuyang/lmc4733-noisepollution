import { useState, useRef, useEffect } from 'react'
import { Points, PositionalAudio } from '@react-three/drei'
import { rgbToHex } from '@/helpers/utils'
import useAnalyser from '@/hooks/useAnalyser'
import { useFrame } from '@react-three/fiber'
import React from 'react'
import usePositionalAudio from '@/hooks/usePositionalAudio'
import * as random from 'maath/random'
import * as buffer from 'maath/buffer'
import * as misc from 'maath/misc'
import { useGlobalState } from '@/hooks/useGlobalState'
import { Vector3, Quaternion } from 'three'

const DENSITY = 10_000
const PARTICLE_POINTS_SIZE = 0.2
const ROTATION_FACTOR = 3
const DEFAULT_FFT_SIZE = 32
const MIN_SIZE = 0
const MAX_SIZE = 10

export default function Particle({ src, fftSize, ...props }) {
  const pointsRef = useRef<typeof Points>(null!)
  const [color, setColor] = useState('hotpink')
  const [size, setSize] = useState(MIN_SIZE)
  const { sound, playAudio, pauseAudio } = usePositionalAudio('audio/relaxing_forest.mp3')
  const { state } = useGlobalState()
  const { getAverageFrequency } = useAnalyser(sound, fftSize ?? DEFAULT_FFT_SIZE)

  const [{ sphere, final }] = useState(() => {
    const sphere = random.inSphere(new Float32Array(DENSITY), { radius: 5 })
    const final = sphere.slice(0)
    return { sphere, final }
  })
  const { isPlaying } = state

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
    const data = getAverageFrequency()
    const rgbVal = misc.remap(data, [0, fftSize ?? DEFAULT_FFT_SIZE], [0, 255])
    const sizeVal = misc.remap(data, [0, fftSize ?? DEFAULT_FFT_SIZE], [MIN_SIZE, MAX_SIZE])
    setColor(rgbToHex(rgbVal, rgbVal, 0))
    setSize(sizeVal)
  }

  const rotationAxis = new Vector3(1, 1, 0).normalize()
  const q = new Quaternion()

  const animateParticle = (clock: any) => {
    const newSphere = sphere.slice(0).map((particle) => particle * size)
    const tRotation = clock.getElapsedTime() * ROTATION_FACTOR

    if (isPlaying) {
      buffer.lerp(sphere, newSphere, final, 1)
      buffer.rotate(final, {
        q: q.setFromAxisAngle(rotationAxis, tRotation),
      })
    }
  }

  return (
    <group {...props}>
      {/* @ts-expect-error */}
      <Points positions={final as Float32Array} stride={2} ref={pointsRef}>
        <pointsMaterial size={PARTICLE_POINTS_SIZE} color={color} />
      </Points>
      {/* @ts-expect-error */}
      <PositionalAudio url={src} ref={sound} />
    </group>
  )
}
