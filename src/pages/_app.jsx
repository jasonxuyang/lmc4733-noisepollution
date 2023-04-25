import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Header from '../config'
import Layout from '../components/dom/Layout'
import '../styles/index.css'
import Nav from '../components/dom/Nav'

const Scene = dynamic(() => import('../components/canvas/Scene'), { ssr: true })

export default function App({ Component, pageProps = { title: 'index' } }) {
  const ref = useRef()
  const scroll = useRef(0)

  return (
    <>
      <Header title={pageProps.title} />
      <Layout ref={ref}>
        {/* The canvas can either be in front of the dom or behind. If it is in front it can overlay contents.
         * Setting the event source to a shared parent allows both the dom and the canvas to receive events.
         * Since the event source is now shared, the canvas would block events, we prevent that with pointerEvents: none. */}
        <div className="absolute top-0 left-0 z-0 w-full h-full pointer-events-none">
          {Component?.canvas && (
            <Scene eventSource={ref} eventPrefix="client">
              <Component.canvas pageProps={pageProps} scroll={scroll} />
            </Scene>
          )}
        </div>
        <div
          className="absolute top-0 left-0 z-10 w-full h-full px-8 overflow-scroll"
          onScroll={(e) => {
            scroll.current = e.target.scrollTop / e.target.scrollHeight
          }}>
          <Component {...pageProps} scroll={scroll} />
        </div>
        <div className="absolute top-0 left-0 z-10 w-full">
          <Nav />
        </div>
      </Layout>
    </>
  )
}
