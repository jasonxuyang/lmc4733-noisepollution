import React from 'react'

// // Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// // WARNING ! errors might get obfuscated by using dynamic import.
// // If something goes wrong go back to a static import to show the error.
// // https://github.com/pmndrs/react-three-next/issues/49

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center w-[80vw] h-[100vh]">
      <h2 className="w-full mb-2 text-4xl">Noise Pollution</h2>
      <p className="w-full mb-8 text-base">
        Noise is often overlooked when understanding the human impact on the environment. However, noise pollution is a
        hazard for environmental and human health. Noise pollution disrupts wildlife, and it can lead to stress and
        disease in humans. Sound is measured in decibel units (dB), and long repeated exposure to sounds above 85 dB can
        cause hearing loss and other health complications. 
      </p>
      <p className="w-full mb-2 text-2xl">
        Noise pollution impacts millions of people on a daily basis, but many people are not aware of the problem.
      </p>
      <p className="w-full mb-2">
        Visit the three spaces in the navigation bar to learn more about noise pollutants and their dangerous effects.
      </p>
    </div>
  )
}
