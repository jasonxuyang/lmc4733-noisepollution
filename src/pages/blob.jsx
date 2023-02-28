import dynamic from 'next/dynamic'

const Blob = dynamic(() => import('@/components/canvas/Blob'), { ssr: false })

export default function BlobPage() {}

Page.canvas = () => <Blob route='/' position-y={-0.75} />
