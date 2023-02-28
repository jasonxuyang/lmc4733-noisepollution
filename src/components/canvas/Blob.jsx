import { useState, useEffect, useRef } from 'react'
import useAudio from '@/hooks/useAudio'
import useAnimationFrame from '@/hooks/useAnimationFrame'
import { useCursor, MeshDistortMaterial } from '@react-three/drei'
import { rgbToHex } from '@/helpers/utils'

export default function Blob({ route, ...props }) {
  const [hovered, hover] = useState(false)
  const [color, setColor] = useState('hotpink')
  const [size, setSize] = useState(1)
  const { toggleAudio, getByteFrequencyData } = useAudio('audio/relaxing_forest.mp3')
  useCursor(hovered)

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
