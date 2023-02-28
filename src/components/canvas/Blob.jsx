import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import useAudio from '../../hooks/useAudio'
import useAnimationFrame from '../../hooks/useAnimationFrame'
import { useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Blob({ route, ...props }) {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  const [color, setColor] = useState('hotpink')
  const [size, setSize] = useState(1)
  const { toggleAudio, getByteFrequencyData } = useAudio('audio/relaxing_forest.mp3')
  useCursor(hovered)

  const rgbToHex = (r, g, b) => {
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)
  }

  const scale = (number, inMin, inMax, outMin, outMax) => {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
  }

  useAnimationFrame(() => {
    const data = getByteFrequencyData()
    const dataIndex = 10
    setColor(rgbToHex(data[dataIndex], 0, 0))
    setSize(data[dataIndex] / 100 === 0 ? 1 : data[dataIndex] / 100)
    console.log(data, color, size)
  })
  return (
    <mesh onClick={() => toggleAudio()} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} {...props}>
      <sphereGeometry args={[size, 64, 64]} />
      <MeshDistortMaterial roughness={0} color={hovered ? 'hotpink' : color === '#000000' ? '#1fb2f5' : color} />
    </mesh>
  )
}
