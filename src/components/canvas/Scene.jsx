import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { Suspense } from 'react'

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>
      <ambientLight intensity={0.75} />
      <Suspense>{children}</Suspense>
      <Preload all />
      {/* <OrbitControls /> */}
    </Canvas>
  )
}
