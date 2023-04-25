import React from 'react'
import Room from '../components/canvas/Room'

// // Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// // WARNING ! errors might get obfuscated by using dynamic import.
// // If something goes wrong go back to a static import to show the error.
// // https://github.com/pmndrs/react-three-next/issues/49

const audio = [
  'audio/Airplane_Fly_Over-Mike_Koenig-1062933207.wav',
  'audio/City Ambiance-SoundBible.com-1513196434.wav',
  'audio/Builders Drilling-SoundBible.com-2062910629.wav',
  'audio/Traffic_Jam-Yo_Mama-1164700013-3.wav',
]

export default function Industrial({ scroll, ref }) {
  return (
    <div>
      <div className='h-96'>Hello World</div>
      <div className='h-96'>Hello World</div>
      <div className='h-96'>Hello World</div>
    </div>
  )
}

Industrial.canvas = ({ scroll }) => {
  return <Room scroll={scroll} audioFiles={audio} />
}
