import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Logo = dynamic(() => import('@/components/canvas/Logo'), { ssr: false })

// Dom components go here
export default function Page(props) {
  const router = useRouter()
  useEffect(() => {
    router.push('/blob')
  }, [router])
}

export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
