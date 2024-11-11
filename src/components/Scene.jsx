'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Blob from './Blob'

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Blob />
      <OrbitControls />
    </Canvas>
  )
}

export default Scene
