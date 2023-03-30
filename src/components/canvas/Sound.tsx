import { useEffect, useRef, useState } from 'react'
import React from 'react'
import { useLoader, useThree } from '@react-three/fiber'
import { AudioListener, AudioLoader } from 'three'

export default function Sound({ url }) {
  const sound = useRef(null)
  const { camera } = useThree()
  const [listener] = useState(() => new AudioListener())
  const buffer = useLoader(AudioLoader, url)

  useEffect(() => {
    sound.current.setBuffer(buffer)
    sound.current.setRefDistance(1)
    sound.current.setLoop(true)
    sound.current.play()
    camera.add(listener)
    return () => {
      camera.remove(listener)
      sound.current.pause
    }
  }, [])
  return <positionalAudio ref={sound} args={[listener]} />
}
