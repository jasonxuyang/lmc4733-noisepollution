import Particle from '../components/canvas/Particle'
import React from 'react'

// // Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// // WARNING ! errors might get obfuscated by using dynamic import.
// // If something goes wrong go back to a static import to show the error.
// // https://github.com/pmndrs/react-three-next/issues/49

export default function Ocean() {
  return <div>Ocean Room</div>
}

Ocean.canvas = () => {
  return <Particle src='audio/ambient_ocean.mp3' />
}
