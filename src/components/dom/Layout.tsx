import React from 'react'
import { GlobalStateProvider } from '../../hooks/useGlobalState'
import { useRef, forwardRef, useImperativeHandle } from 'react'
import Nav from './Nav'

const Layout = forwardRef(({ children, ...props }: any, ref) => {
  const localRef = useRef()

  useImperativeHandle(ref, () => localRef.current)

  return (
    <GlobalStateProvider>
      <div {...props} ref={localRef} className='relative w-screen h-screen overflow-hidden dom'>
        {children}
      </div>
    </GlobalStateProvider>
  )
})
Layout.displayName = 'Layout'

export default Layout
