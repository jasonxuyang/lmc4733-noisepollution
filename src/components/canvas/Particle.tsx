import { useState, useRef, useEffect } from 'react'
import { Points, PositionalAudio } from '@react-three/drei'
import { rgbToHex } from '../../helpers/utils'
import useAnalyser from '../..//hooks/useAnalyser'
import { useFrame } from '@react-three/fiber'
import React from 'react'
import usePositionalAudio from '../../hooks/usePositionalAudio'
import * as random from 'maath/random'
import * as buffer from 'maath/buffer'
import * as misc from 'maath/misc'
import { useGlobalState } from '../../hooks/useGlobalState'
import { Vector3, Quaternion, Color } from 'three'

const DENSITY = 10_000
const PARTICLE_POINTS_SIZE = 0.05
const ROTATION_FACTOR = 3
const DEFAULT_FFT_SIZE = 32
const MIN_SIZE = 0
const MAX_SIZE = 5
const DEFAULT_DIRECTION = new Vector3(1, 1, 1)
const GREEN = new Color(0x00ff00)
const YELLOW = new Color(0xffff00)
const RED = new Color(0xff0000)
const ORANGE = new Color(0xf28500)

export default function Particle({ src, ...props }) {
  const pointsRef = useRef<typeof Points>(null!)
  const [color, setColor] = useState<string>('#000000')
  const [size, setSize] = useState<number>(MIN_SIZE)
  const [direction, setDirection] = useState<Vector3>(DEFAULT_DIRECTION)
  const { sound, playAudio, pauseAudio } = usePositionalAudio(src)
  const { state } = useGlobalState()
  const { getAverageFrequency } = useAnalyser(sound, DEFAULT_FFT_SIZE)

  const [{ sphere, final }] = useState(() => {
    const sphere = random.inSphere(new Float32Array(DENSITY), { radius: (MIN_SIZE + MAX_SIZE) / 2 })
    const final = sphere.slice(0)
    return { sphere, final }
  })
  const { isPlaying } = state

  function getRMSAmplitude(audioBuffer, startIndex, endIndex) {
    const channelData = audioBuffer.getChannelData(0)
    const length = channelData.length
    let max = 0
    let rms = 0

    if (audioBuffer.numberOfChannels > 1) {
      const channelData2 = audioBuffer.getChannelData(1)
      if (channelData2.length > 0) {
        for (let i = 0; i < length; i++) {
          channelData[i] = (channelData[i] + channelData2[i]) * 0.5
        }
      }
    }

    for (let i = startIndex; i < endIndex; i++) {
      const sample = channelData[i]
      rms += sample * sample
      max = Math.max(max, Math.abs(sample))
    }

    rms /= endIndex - startIndex
    rms = Math.sqrt(rms)

    if (max > 0) {
      rms /= max
    }

    return rms
  }

  useEffect(() => {
    if (isPlaying) {
      playAudio()
    } else {
      pauseAudio()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying])

  useFrame(({ clock }) => {
    mapAudioToVisual()
    animateParticle(clock)
  })

  const mapAudioToVisual = () => {
    const data = getAverageFrequency()
    // const rgbVal = misc.remap(data, [0, DEFAULT_FFT_SIZE], [0, 255])
    // setColor(rgbToHex(rgbVal, rgbVal, 0))
    const sizeVal = misc.remap(data, [0, DEFAULT_FFT_SIZE], [MIN_SIZE, MAX_SIZE])
    setSize(sizeVal)
    // get current position in audio
    const currentTime = sound.current.context.currentTime
    const sampleRate = sound.current.buffer.sampleRate
    const startIndex = Math.floor(currentTime * sampleRate)
    // calculate RMS over 1/60th of a second (Frame rate vs sample rate)
    const endIndex = startIndex + Math.floor(sampleRate / 60)
    const rms = getRMSAmplitude(sound.current.buffer, startIndex, endIndex)
    let color = new Color()
    // color.lerpColors(MIN_COLOR, MAX_COLOR, rms)
    // setColor(color)
    if (rms <= 0.4) {
      // Interpolate between GREEN and YELLOW
      const t = rms / 0.4
      color = GREEN.clone().lerp(YELLOW, t)
    } else {
      // Interpolate between YELLOW and RED
      const t = (rms - 0.6) / 0.6
      color = ORANGE.clone().lerp(RED, t)
    }
    setColor(color)
  }

  const rotationAxis = direction.normalize()
  const q = new Quaternion()

  const animateParticle = (clock: any) => {
    const newSphere = sphere.slice(0).map((particle) => particle * size)
    const tRotation = clock.getElapsedTime() * ROTATION_FACTOR

    if (isPlaying) {
      buffer.lerp(sphere, newSphere, final, 1)
      buffer.rotate(final, {
        q: q.setFromAxisAngle(rotationAxis, tRotation),
      })
    }
  }

  return (
    <group {...props}>
      {/* @ts-expect-error */}
      <Points positions={final as Float32Array} stride={3} ref={pointsRef}>
        <pointsMaterial size={PARTICLE_POINTS_SIZE} color={color} />
      </Points>
      {/* @ts-expect-error */}
      <PositionalAudio url={src} ref={sound} />
    </group>
  )
}
