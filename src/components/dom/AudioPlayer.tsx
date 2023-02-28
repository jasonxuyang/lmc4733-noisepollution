// import useAudio from '@/hooks/useAudio'
// import React, { useEffect, useRef } from 'react'

// export default function AudioPlayer() {
//   const { audioContext, audioElement, analyser, source, playAudio, pauseAudio } = useAudio('audio/relaxing_forest.mp3')

//   const analyze = () => {
//     analyser.current.fftSize = 128
//     const bufferLength = analyser.current.frequencyBinCount
//     const dataArray = new Uint8Array(bufferLength)
//     analyser.current.getByteFrequencyData(dataArray)
//   }

//   return (
//     <div>
//       <audio src='audio/relaxing_forest.mp3' />
//       <div
//         onClick={() => {
//           console.log(audioContext.current)
//           analyze()
//           playAudio()
//         }}>
//         Play music
//       </div>
//       <div
//         onClick={() => {
//           pauseAudio()
//         }}>
//         Pause music
//       </div>
//     </div>
//   )
// }
