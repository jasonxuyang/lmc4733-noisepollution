import dynamic from 'next/dynamic'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Blob = dynamic(() => import('@/components/canvas/Blob'), { ssr: false })

export default function HomePage() {}
HomePage.canvas = () => <Blob route='/' position-y={-0.75} />
