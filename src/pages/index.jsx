import dynamic from 'next/dynamic'
import Particle from '@/components/canvas/Particle'
import { GlobalStateProvider, playAudio, toggleAudio, useGlobalState } from '@/hooks/useGlobalState'

// // Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// // WARNING ! errors might get obfuscated by using dynamic import.
// // If something goes wrong go back to a static import to show the error.
// // https://github.com/pmndrs/react-three-next/issues/49
// const Sound = dynamic(() => import('@/components/canvas/Sound'), { ssr: false })

export default function HomePage() {
  const { state, dispatch } = useGlobalState()
  const { isPlaying } = state
  return (
    <div
      class='p-6 m-6 text-black bg-white cursor-pointer w-fit'
      onClick={() => {
        dispatch(toggleAudio())
      }}>
      {isPlaying ? 'Pause Audio' : 'Play Audio'}
    </div>
  )
}
HomePage.canvas = () => {
  return <Particle src='audio/relaxing_forest.mp3' position-y={-0.75} />
}
