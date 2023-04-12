import { toggleAudio, useGlobalState, pauseAudio } from '../../hooks/useGlobalState'
import { useRouter } from 'next/router'
import React from 'react'

enum Room {
  Home = '/',
  Industrial = '/industrial',
  Ocean = '/ocean',
}

type PageData = {
  label: string
  url: Room
}

const pages: PageData[] = [
  { label: 'Home', url: Room.Home },
  { label: 'Industrial', url: Room.Industrial },
  { label: 'Ocean', url: Room.Ocean },
]

export default function Nav() {
  const router = useRouter()
  const { state, dispatch } = useGlobalState()
  const { isPlaying } = state

  const goToRoom = (room: Room) => {
    dispatch(pauseAudio())
    router.push(room)
  }
  const currentPage = router.pathname

  return (
    <div className='flex flex-row gap-x-4 items-center'>
      {currentPage !== Room.Home && (
        <div
          className='px-6 py-4 text-black bg-white cursor-pointer w-fit'
          onClick={() => {
            dispatch(toggleAudio())
          }}>
          {isPlaying ? 'Pause Audio' : 'Play Audio'}
        </div>
      )}
      {pages.map((pageData) => (
        <div
          className={`cursor-pointer hover:underline ${currentPage === pageData.url ? 'text-yellow-300' : ''}`}
          onClick={() => goToRoom(pageData.url)}>
          {pageData.label}
        </div>
      ))}
    </div>
  )
}
