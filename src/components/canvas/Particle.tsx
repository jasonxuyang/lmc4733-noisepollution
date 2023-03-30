import { useState, useRef, Suspense } from 'react'
import { useCursor, MeshDistortMaterial, PositionalAudio } from '@react-three/drei'
import { rgbToHex } from '@/helpers/utils'
import Sound from './Sound'
import useAnalyser from '@/hooks/useAnalyser'
import { useFrame } from '@react-three/fiber'
import React from 'react'
import usePositionalAudio from '@/hooks/usePositionalAudio'

export default function Particle({ src, ...props }) {
  const [hovered, hover] = useState(false)
  const [color, setColor] = useState('hotpink')
  const [size, setSize] = useState(1)
  const { sound, toggleAudio } = usePositionalAudio('audio/relaxing_forest.mp3')
  const { getFrequencyData } = useAnalyser(sound, 128)

  useFrame(() => {
    const data = getFrequencyData()
    const dataIndex = 10
    setColor(rgbToHex(data[dataIndex], 0, 0))
    setSize(data[dataIndex] / 100 === 0 ? 1 : data[dataIndex] / 100)
    console.log(data, color, size)
  })
  useCursor(hovered)

  return (
    <mesh onClick={() => toggleAudio()} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} {...props}>
      <sphereGeometry args={[size, 64, 64]} />
      <MeshDistortMaterial roughness={0} color={hovered ? 'hotpink' : color === '#000000' ? '#1fb2f5' : color} />
      <PositionalAudio url={src} ref={sound} />
    </mesh>
  )
}
