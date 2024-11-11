import React, { useRef, useMemo } from 'react'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import vertexShader from '../shaders/vertexShader.glsl'
import fragmentShader from '../shaders/fragmentShader.glsl'
import { extend } from '@react-three/fiber'

// Define the shader material
const BlobMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorChange: 0,
  },
  vertexShader,
  fragmentShader
)

extend({ BlobMaterial })

export default function Blob() {
  const mesh = useRef(null)
  const material = useRef(null)

  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(2, 100, 100)
  }, [])

  return (
    <mesh ref={mesh} geometry={geometry}>
      <blobMaterial ref={material} />
    </mesh>
  )
}
