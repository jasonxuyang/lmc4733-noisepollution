import dynamic from 'next/dynamic'
import Particle from '@/components/canvas/Particle'

// // Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// // WARNING ! errors might get obfuscated by using dynamic import.
// // If something goes wrong go back to a static import to show the error.
// // https://github.com/pmndrs/react-three-next/issues/49
// const Sound = dynamic(() => import('@/components/canvas/Sound'), { ssr: false })

export default function HomePage() {}
HomePage.canvas = () => <Particle src='audio/relaxing_forest.mp3' position-y={-0.75} />
