import React from 'react'
import Room from '../components/canvas/Room'
import { ParticleData } from '../../types'

// // Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// // WARNING ! errors might get obfuscated by using dynamic import.
// // If something goes wrong go back to a static import to show the error.
// // https://github.com/pmndrs/react-three-next/issues/49

const roomData: ParticleData[] = [
  {
    src: 'audio/Airplane_Fly_Over-Mike_Koenig-1062933207.wav',
    title: 'Air Traffic',
    content: (
      <>
        <p>
          Aircraft engines are the major source of noise and can exceed 140 dB during takeoff. While airborne, the main
          sources of noise are the engines and the high speed turbulence over the fuselage. Aircraft noise at high
          levels can be considered a stressor on the body, and research has found an association between high levels of
          aircraft noise and an increased risk of developing Cardiovascular disease. Reports often indicated that
          children exposed to long term aircraft noise showed a higher degree of annoyance than those children from
          quieter areas. Evidence suggests that children do not habituate to aircraft noise over time, and that an
          increase in noise can be correlated with a delay in reading comprehension compared to those children not
          exposed to high levels of aircraft noise.
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
    src: 'audio/Builders Drilling-SoundBible.com-2062910629.wav',
    title: 'Construction Drilling',
    content: (
      <>
        <p>
          Construction site noise is classed as neighborhood noise, which includes noise arising from industrial
          premises, construction sites and noise in the street. Some sources of noise pollution on construction sites
          include loud machinery, vehicles, raised voices and physical work such as hammering, drilling or digging. The
          wider effects of construction site noise pollution include structural damage to buildings, decreased property
          value, loss of productivity and social impacts such as sickness.
        </p>
      </>
    ),
  },
  {
    src: 'audio/construction_saw.wav',
    title: 'Construction Saw',
    content: (
      <>
        <p>
          Construction noise pollution also has negative effects on biodiversity. Because many animals rely on sounds to
          communicate, find food, or detect predators, man-made noise pollution endangers them by masking these sounds.
        </p>
      </>
    ),
  },
  {
    src: 'audio/Traffic_Jam-Yo_Mama-1164700013-3.wav',
    title: 'Traffic',
    content: (
      <>
        <p>
          Traffic noise levels can range from 70-130 dB. Traffic is a leading cause of noise pollution in urban areas.
          It is better to address traffic noise in urban planning than to attempt to remedy it with noise pollution
          barriers. Traffic noise causes sleep disruption, high cortisol levels, and higher levels of stress which leads
          to vascular dysfunction, hypertension, and inflammation.
        </p>
      </>
    ),
  },
  {
    src: 'audio/Dump_Truck-Mike_Koenig-2078569453.wav',
    title: 'Large Trucks',
    content: (
      <>
        <p>
          Large vehicles like heavy trucks and diesel buses cause noise peaks ranging up to about 90 db. One diesel bus
          or heavy truck produces the noise equivalent of over 32 automobiles The sound power from a diesel bus or heavy
          truck is on the order of some 300 times greater than that of ambient street noise or that produce by an
          electric trolleybus
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

export default function Industrial() {
  return <>{renderRoomData()}</>
}

Industrial.canvas = ({ scroll }) => {
  return <Room scroll={scroll} roomData={roomData} />
}
