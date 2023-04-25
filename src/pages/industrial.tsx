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
    title: 'Sound One',
    content: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </>
    ),
  },
  {
    src: 'audio/City Ambiance-SoundBible.com-1513196434.wav',
    title: 'Sound Two',
    content: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </>
    ),
  },
  {
    src: 'audio/Builders Drilling-SoundBible.com-2062910629.wav',
    title: 'Sound Three',
    content: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </>
    ),
  },
  {
    src: 'audio/Traffic_Jam-Yo_Mama-1164700013-3.wav',
    title: 'Sound Four',
    content: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
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

export default function Industrial({ scroll, ref }) {
  return <>{renderRoomData()}</>
}

Industrial.canvas = ({ scroll }) => {
  return <Room scroll={scroll} roomData={roomData} />
}
