import { toggleAudio, useGlobalState, pauseAudio } from '../../hooks/useGlobalState'
import { useRouter } from 'next/router'
import React from 'react'

enum Room {
  Home = '/',
  Industrial = '/industrial',
  Ocean = '/ocean',
  Urban = '/urban',
}

type PageData = {
  label: string
  url: Room
}

const pages: PageData[] = [
  { label: 'Home', url: Room.Home },
  { label: 'Industrial', url: Room.Industrial },
  { label: 'Ocean', url: Room.Ocean },
  { label: 'Urban', url: Room.Urban },
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
    <div className="flex flex-row items-center justify-between w-full h-16 p-8 gap-x-4">
      <div className="flex flex-row items-center gap-x-4">
        {pages.map((pageData) => (
          <div
            key={pageData.label}
            className={`cursor-pointer hover:underline ${currentPage === pageData.url ? 'text-yellow-300' : ''}`}
            onClick={() => goToRoom(pageData.url)}>
            {pageData.label}
          </div>
        ))}
      </div>
      {currentPage !== Room.Home && (
        <div
          className="px-6 py-2 text-black bg-white cursor-pointer w-fit"
          onClick={() => {
            dispatch(toggleAudio())
          }}>
          {isPlaying ? 'Pause Audio' : 'Play Audio'}
        </div>
      )}
    </div>
  )
}
