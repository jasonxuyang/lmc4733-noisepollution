import { GlobalStateProvider } from '@/hooks/useGlobalState'
import { useRef, forwardRef, useImperativeHandle } from 'react'

const Layout = forwardRef(({ children, ...props }, ref) => {
  const localRef = useRef()

  useImperativeHandle(ref, () => localRef.current)

  return (
    <GlobalStateProvider>
      <div
        {...props}
        ref={localRef}
        className='relative w-screen h-screen overflow-hidden dom bg-zinc-900 text-gray-50'>
        {children}
      </div>
    </GlobalStateProvider>
  )
})
Layout.displayName = 'Layout'

export default Layout
