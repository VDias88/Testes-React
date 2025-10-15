import * as THREE from 'three'
import './styles.css'
import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

const GOLD = new THREE.Color('#e7b84a')
const BG = '#0b100a'

// function Core() {
//   // disco negro
//   return (
//     <mesh position={[0, 0, 0]}>
//       <circleGeometry args={[2.4, 256]} />
//       <meshBasicMaterial color="black" />
//     </mesh>
//   )
// }

function Core3D() {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorCenter: { value: new THREE.Color(0x000000) },
      uColorEdge: { value: new THREE.Color(0x1a1a1a) },
    }),
    []
  )

  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        side: THREE.FrontSide,
        transparent: true,
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vWorldPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * viewMatrix * worldPosition;
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vWorldPosition;
          uniform vec3 uColorCenter;
          uniform vec3 uColorEdge;

          void main() {
            // centro negro profundo
            float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 color = mix(uColorCenter, uColorEdge, fresnel);
            // halo muito sutil
            float vignette = smoothstep(0.2, 1.0, fresnel);
            gl_FragColor = vec4(color, 1.0);
          }
        `,
      }),
    [uniforms]
  )

  // rotação lenta
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (meshRef.current) meshRef.current.rotation.y += dt * 0.1
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.4, 128, 128]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
}



function DustInfall() {
  const COUNT = 25000
  const geom = useMemo(() => new THREE.BufferGeometry(), [])
  const positions = useMemo(() => new Float32Array(COUNT * 3), [COUNT])
  const speeds = useMemo(() => new Float32Array(COUNT), [COUNT])
  const angles = useMemo(() => new Float32Array(COUNT), [COUNT])
  const radii = useMemo(() => new Float32Array(COUNT), [COUNT])

  useMemo(() => {
    for (let i = 0; i < COUNT; i++) {
      const r = (radii[i] = THREE.MathUtils.mapLinear(Math.random(), 0, 1, 3.2, 8.0) * (1 + Math.random() * 0.2))
      angles[i] = Math.random() * Math.PI * 2
      speeds[i] = THREE.MathUtils.randFloat(0.18, 0.55)
      positions[i * 3 + 0] = Math.cos(angles[i]) * r
      positions[i * 3 + 1] = Math.sin(angles[i]) * r
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.25
    }
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  }, [geom, positions, angles, radii, speeds])

  useFrame((_, dt) => {
    const pos = geom.attributes.position.array as Float32Array
    const d = Math.min(0.033, dt)
    for (let i = 0; i < COUNT; i++) {
      let r = radii[i]
      let ang = angles[i]
      r -= speeds[i] * d * (0.6 + 1.2 * (1.0 / (0.2 + r)))
      ang += d * (0.25 + 2.0 / (0.2 + r))
      if (r < 2.5) {
        r = radii[i] = THREE.MathUtils.randFloat(6.0, 8.5)
        ang = angles[i] = Math.random() * Math.PI * 2
        speeds[i] = THREE.MathUtils.randFloat(0.18, 0.55)
        pos[i * 3 + 2] = (Math.random() - 0.5) * 0.25
      } else {
        radii[i] = r
        angles[i] = ang
      }
      pos[i * 3 + 0] = Math.cos(ang) * r
      pos[i * 3 + 1] = Math.sin(ang) * r
    }
    geom.attributes.position.needsUpdate = true
  })

  return (
    <points geometry={geom}>
      <pointsMaterial color={GOLD} size={0.015} transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

export const BlackHole = ()=> {
  return (
    <Canvas
      gl={{ powerPreference: 'high-performance', antialias: true }}
      camera={{ position: [0, 0, 9], fov: 50 }}
      onCreated={({ gl }) => {
        gl.setClearColor(BG)
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      }}
    >

      <Core3D />
      <DustInfall />

      <EffectComposer>
        <Bloom intensity={1.15} radius={0.8} threshold={0.0} />
      </EffectComposer>

      <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.25} />
    </Canvas>
  )
}
