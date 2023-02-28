import dynamic from 'next/dynamic'
import useAudio from '../hooks/useAudio'
import useAnimationFrame from '../hooks/useAnimationFrame'
import { useState, useRef } from 'react'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Logo = dynamic(() => import('@/components/canvas/Logo'), { ssr: false })

// Dom components go here
export default function Page(props) {
  const { audioContext, audioElement, analyser, source, playAudio, pauseAudio, getByteFrequencyData } =
    useAudio('audio/relaxing_forest.mp3')
  const test = useRef(0)

  // useAnimationFrame(() => {
  //   test.current = getByteFrequencyData()[0]
  //   console.log(test.current)
  // })

  return (
    <div>
      <div onClick={playAudio}>Play</div>
      <div onClick={pauseAudio}>Pause</div>
    </div>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => <Logo scale={0.5} route='/blob' position-y={-1} />

export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
