import React from 'react'
import Room from '../components/canvas/Room'
import { ParticleData } from '../../types'

// // Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// // WARNING ! errors might get obfuscated by using dynamic import.
// // If something goes wrong go back to a static import to show the error.
// // https://github.com/pmndrs/react-three-next/issues/49

const roomData: ParticleData[] = [
  {
    src: 'audio/Crisp_Ocean_Waves-Mike_Koenig-1486046376.wav',
    title: 'The Ocean',
    content: (
      <>
        <p>
          Ocean noise refers to sounds made by human activities that can interfere with or obscure the ability of marine animals to hear natural sounds in the ocean.
          Ships, oil drills, sonar devices, and seismic tests have made the once tranquil marine environment loud and chaotic
          Noise pollution both in and around water disrupts biodiversity and the health of marine life.
        </p>
      </>
    ),
  },
  {
    src: 'audio/Old Sub Sonar-SoundBible.com-2099530271.wav',
    title: 'Submarines',
    content: (
      <>
        <p>
          Some of the main sources of underwater noise pollution are marine vessels, seismic surveys that involve blasting louds sounds into the ocean to map the sea floor, sonar, construction and underwater operations such as deep-sea mining, and oil and gas extraction and processing.
          Military sonar can reach volumes of more than 200 dB, while seismic air guns can reach up to 250 dB. The force of these vibrations is enough to kill zooplankton.
          Technology can help us manage noise. For example, modifying and retrofitting propellers or using bubble curtains around pile driving and construction.
          We also know that operational measures such as slowing down ships can reduce noise output.
          While technology helps, critical or sensitive habitats should be off-limits to intense noise generating activities.
        </p>
      </>
    ),
  },
  {
    src: 'audio/Humpback Whale-SoundBible.com-93645231.wav',
    title: 'Humpback Whales',
    content: (
      <>
        <p>
          Whales and dolphins are particularly impacted by noise pollution. These marine mammals rely on echolocation to communicate, navigate, feed, and find mates, and excess noise interferes with their ability to effectively echolocate
          Noise pollution affects whale behaviour, causing the marine mammals to feed less or to produce fewer calls.
          Shipping noise also cause whales to become stressed, with the build-up of stress related chemicals linked to growth suppression, lower fertility and poor immune system function.
        </p>
      </>
    ),
  },
  {
    src: 'audio/Orca Whales Talking-SoundBible.com-871053726.wav',
    title: 'Orca Whales',
    content: (
      <>
        <p>
          Orcas are particularly at risk from noise pollution because the rely on sound to navigate and hunt.
          Although they are called killer whales, orcas are related to dolphins and are highly social mammals that live in maternal pods and hunt cooperatively.
          How loud is an orca whale? The energy of burst-pulse sounds usually lies between 500 Hz and 25 kHz with levels between 130 and 176 dB.
        </p>
      </>
    ),
  }
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

export default function Ocean({ scroll, ref }) {
  return <>{renderRoomData()}</>
}

Ocean.canvas = ({ scroll }) => {
  return <Room scroll={scroll} roomData={roomData} />
}
