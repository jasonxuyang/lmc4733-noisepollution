import React from 'react'
import Room from '../components/canvas/Room'
import { ParticleData } from '../../types'

// // Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// // WARNING ! errors might get obfuscated by using dynamic import.
// // If something goes wrong go back to a static import to show the error.
// // https://github.com/pmndrs/react-three-next/issues/49

const roomData: ParticleData[] = [
  {
    src: 'audio/Restaurant Ambiance -SoundBible.com-628640170.wav',
    title: 'Urban Entertainment Noise',
    content: (
      <>
        <p>
          Bars, clubs, and restaurants generate a significant amount of noise A normal conversation is around 60-70dB.
          Urban noise in places like restaurants has risen to 80 dB or higher. Increased levels of noise is hazardous to
          human hearing and disruptive to the natural environment. Better urban planning can reduce annoyance and
          damaging effects of urban noise, as well as city permits.
        </p>
      </>
    ),
  },
  {
    src: 'audio/Train_Approach_n_Pass-Mike_Koenig-678807208.wav',
    title: 'Trains',
    content: (
      <>
        <p>
          The noise level from all types of trains is higher than 65 dB. One of the lesser-known hazards of rail
          transport is the kind of noise pollution nobody can hear. Inaudible, low frequency ground vibrations emanate
          from the rolling stock on the railway as it passes. these vibrations can have a detrimental effect on peoples
          health, causing headaches, fatigue and even irritability in people experiencing them
        </p>
      </>
    ),
  },
  {
    src: 'audio/Large_Stadium-stephan_schutze-2122836113.wav',
    title: 'Stadiums and Concerts',
    content: (
      <>
        <p>
          Its estimated that the noise at a Golden State Warriors basketball game reached 100 to 120 dB. Those levels
          are similar to that of a jet engine or a chainsaw. This excessive noise is physically dangerous, with exposure
          to noise over 125 dB causing physical pain in most individuals.
        </p>
      </>
    ),
  },
  {
    src: 'audio/Fireworks Finale-SoundBible.com-370363529.wav',
    title: 'Fireworks',
    content: (
      <>
        <p>
          Fireworks average noise levels between 120 and 130 dB. People should wear noise-cancellation equipment to
          dampen the sound, however, wildlife is still affected. These infrequent bursts of noise affect wildlife sleed
          cycles, feeding efficiency, cause heightened predatory behavior, and affect breeding. Specifically, studies
          have shown that loud noises can cause caterpillar dorsal vessels to beat faster, and cause bluebirds to have
          fewer chicks.
        </p>
      </>
    ),
  },
]

const renderRoomData = () => {
  return roomData.map((data, index) => {
    return (
      <div className="flex flex-col justify-center w-1/3 h-[100vh]" key={index}>
        <h2 className="mb-2 text-4xl">{data.title}</h2>
        {data.content}
      </div>
    )
  })
}

export default function Urban({ scroll, ref }) {
  return <>{renderRoomData()}</>
}

Urban.canvas = ({ scroll }) => {
  return <Room scroll={scroll} roomData={roomData} />
}
