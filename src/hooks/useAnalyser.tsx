import React, { useRef, useEffect, RefObject } from 'react'
import { AudioAnalyser } from 'three'

export default function useAnalyser(sound: RefObject<any>, fftSize: number) {
  const analyser = useRef(null)
  useEffect(() => void (analyser.current = new AudioAnalyser(sound.current, fftSize)), [])

  const getFrequencyData = () => {
    return analyser.current.getFrequencyData()
  }
  const getAverageFrequency = () => {
    return analyser.current.getAverageFrequency()
  }

  return { analyser, getFrequencyData, getAverageFrequency }
}
