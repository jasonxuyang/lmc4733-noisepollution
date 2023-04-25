import { useLoader, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { AudioListener, AudioLoader } from 'three'

const usePositionalAudio = (src: string) => {
  const sound = useRef(null)
  const { camera } = useThree()
  const [listener] = useState(() => new AudioListener())
  const buffer = useLoader(AudioLoader, src)

  useEffect(() => {
    sound.current.setBuffer(buffer)
    sound.current.setRefDistance(1)
    sound.current.setLoop(true)
    camera.add(listener)
    return () => {
      camera.remove(listener)
    }
  }, [])

  const playAudio = async () => {
    await sound.current.context.resume()
    sound.current.play()
  }

  const pauseAudio = async () => {
    await sound.current.context.suspend()
    sound.current.pause()
  }

  const toggleAudio = () => {
    if (!sound.current.isPlaying) playAudio()
    else pauseAudio()
  }

  return {
    sound: sound,
    playAudio: playAudio,
    pauseAudio: pauseAudio,
    toggleAudio: toggleAudio,
  }
}

export default usePositionalAudio
