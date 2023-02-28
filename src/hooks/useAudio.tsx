import React, { useEffect, useRef } from 'react'

const useAudio = (src: string) => {
  const audioElement = useRef(null)
  const audioContext = useRef(null)
  const analyser = useRef(null)
  const source = useRef(null)

  useEffect(() => {
    window.AudioContext = window.AudioContext || (window as any).webkitAudioContext
    audioContext.current = new AudioContext()
    audioElement.current = new Audio(src)
    source.current = audioContext.current.createMediaElementSource(audioElement.current)
    analyser.current = audioContext.current.createAnalyser()
    source.current.connect(analyser.current)
    analyser.current.connect(audioContext.current.destination)
  }, [])

  const playAudio = () => {
    if (audioContext.current.state === 'suspended') audioContext.current.resume()
    audioElement.current.play()
  }

  const pauseAudio = () => {
    audioElement.current.pause()
  }

  const toggleAudio = () => {
    if (audioElement.current.paused) playAudio()
    else pauseAudio()
  }

  const getByteFrequencyData = () => {
    analyser.current.fftSize = 128
    const bufferLength = analyser.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyser.current.getByteFrequencyData(dataArray)
    return dataArray
  }

  return {
    audioElement: audioElement,
    audioContext: audioContext,
    source: source,
    analyser: analyser,
    playAudio: playAudio,
    pauseAudio: pauseAudio,
    toggleAudio: toggleAudio,
    getByteFrequencyData: getByteFrequencyData,
  }
}

export default useAudio
