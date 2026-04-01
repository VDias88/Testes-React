import * as THREE from 'three';
import './styles.css';
import React, { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useProgress } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Menu from '@components/Menu';
import { FeatureCard, MetricCard, ProfileCard, StatusCard } from '@components/Card';

const GOLD = new THREE.Color('#e7b84a');
const BG = '#000000';

function Core3D() {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorCenter: { value: new THREE.Color(0x000000) },
      uColorEdge: { value: new THREE.Color(0x1a1a1a) },
    }),
    [],
  );

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
            float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 color = mix(uColorCenter, uColorEdge, fresnel);
            float vignette = smoothstep(0.2, 1.0, fresnel);
            gl_FragColor = vec4(color, 1.0);
          }
        `,
      }),
    [uniforms],
  );

  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (meshRef.current) meshRef.current.rotation.y += dt * 0.1;
  });

  return (
    <mesh ref={meshRef} renderOrder={0}>
      <sphereGeometry args={[2.4, 128, 128]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

function DustInfall() {
  const COUNT = 30000;
  const geom = useMemo(() => new THREE.BufferGeometry(), []);
  const positions = useMemo(() => new Float32Array(COUNT * 3), [COUNT]);
  const speeds = useMemo(() => new Float32Array(COUNT), [COUNT]);
  const angles = useMemo(() => new Float32Array(COUNT), [COUNT]);
  const radii = useMemo(() => new Float32Array(COUNT), [COUNT]);

  useMemo(() => {
    for (let i = 0; i < COUNT; i++) {
      const r = (radii[i] =
        THREE.MathUtils.mapLinear(Math.random(), 0, 1, 2, 14.0) * (1 + Math.random() * 0.2));

      angles[i] = Math.random() * Math.PI * 2;
      speeds[i] = THREE.MathUtils.randFloat(0.18, 0.55);
      positions[i * 3 + 0] = Math.cos(angles[i]) * r;
      positions[i * 3 + 1] = Math.sin(angles[i]) * r;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
    }
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  }, [geom, positions, angles, radii, speeds]);

  useFrame((_, dt) => {
    const pos = geom.attributes.position.array as Float32Array;
    const d = Math.min(0.033, dt);
    for (let i = 0; i < COUNT; i++) {
      let r = radii[i];
      let ang = angles[i];
      r -= speeds[i] * d * (0.6 + 1.2 * (1.0 / (0.2 + r)));
      ang += d * (0.25 + 2.0 / (0.2 + r));
      if (r < 2.5) {
        r = radii[i] = THREE.MathUtils.randFloat(10.0, 14.5);
        ang = angles[i] = Math.random() * Math.PI * 2;
        speeds[i] = THREE.MathUtils.randFloat(0.18, 0.55);
        pos[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
      } else {
        radii[i] = r;
        angles[i] = ang;
      }
      pos[i * 3 + 0] = Math.cos(ang) * r;
      pos[i * 3 + 1] = Math.sin(ang) * r;
    }
    geom.attributes.position.needsUpdate = true;
  });

  return (
    <points geometry={geom} renderOrder={1}>
      <pointsMaterial
        color={GOLD}
        size={0.025}
        transparent
        opacity={1.0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function TwinklingStars() {
  const STAR_COUNT = 5000;
  const COMET_COUNT = 8;
  const ASTEROID_COUNT = 25;

  const starGeom = useMemo(() => new THREE.BufferGeometry(), []);
  const starPositions = useMemo(() => new Float32Array(STAR_COUNT * 3), []);
  const twinkle = useMemo(() => new Float32Array(STAR_COUNT), []);
  const twinkleSpeed = useMemo(() => new Float32Array(STAR_COUNT), []);
  const sizes = useMemo(() => new Float32Array(STAR_COUNT), []);

  useMemo(() => {
    for (let i = 0; i < STAR_COUNT; i++) {
      const radius = THREE.MathUtils.randFloat(50, 200);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3 + 0] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);
      twinkle[i] = Math.random();
      twinkleSpeed[i] = THREE.MathUtils.randFloat(0.5, 2.0);
      sizes[i] = THREE.MathUtils.randFloat(0.05, 0.15);
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  }, [starGeom, starPositions, twinkle, twinkleSpeed, sizes]);

  // ── COMETAS ──────────────────────────────────────────────────────────────
  const TRAIL = 120;
  const cometData = useMemo(
    () =>
      Array.from({ length: COMET_COUNT }, () => {
        const r = THREE.MathUtils.randFloat(80, 180);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const origin = new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        );
        const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
          .normalize()
          .multiplyScalar(THREE.MathUtils.randFloat(12, 30));
        return {
          origin: origin.clone(),
          dir,
          speed: THREE.MathUtils.randFloat(0.6, 1.8),
          phase: Math.random() * 20,
          color: ['#ffffff'][Math.floor(Math.random() * 4)],
          size: THREE.MathUtils.randFloat(0.06, 0.14),
        };
      }),
    [],
  );

  const cometGeoms = useMemo(() => cometData.map(() => new THREE.BufferGeometry()), [cometData]);
  const cometTrailPos = useMemo(
    () => cometData.map(() => new Float32Array(TRAIL * 3)),
    [cometData],
  );
  const cometHistories = useRef<THREE.Vector3[][]>(
    cometData.map(c => Array.from({ length: TRAIL }, () => c.origin.clone())),
  );
  const cometTimers = useRef<number[]>(cometData.map(c => c.phase));
  const cometMeshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useMemo(() => {
    cometGeoms.forEach((g, i) => {
      g.setAttribute('position', new THREE.BufferAttribute(cometTrailPos[i], 3));
    });
  }, [cometGeoms, cometTrailPos]);

  // ── ASTEROIDES ───────────────────────────────────────────────────────────
  const ATRAIL = 40;
  const asteroidData = useMemo(
    () =>
      Array.from({ length: ASTEROID_COUNT }, () => {
        const r = THREE.MathUtils.randFloat(60, 190);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const origin = new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        );
        const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
          .normalize()
          .multiplyScalar(THREE.MathUtils.randFloat(5, 18));
        return {
          origin: origin.clone(),
          dir,
          speed: THREE.MathUtils.randFloat(0.3, 1.1),
          phase: Math.random() * 25,
          color: ['#aaaaaa'][Math.floor(Math.random() * 4)],
          size: THREE.MathUtils.randFloat(0.08, 0.22),
          tumble: new THREE.Euler(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI,
          ),
          tumbleSpeed: new THREE.Vector3(
            THREE.MathUtils.randFloat(-1, 1),
            THREE.MathUtils.randFloat(-1, 1),
            THREE.MathUtils.randFloat(-1, 1),
          ),
        };
      }),
    [],
  );

  const asteroidGeoms = useMemo(
    () => asteroidData.map(() => new THREE.BufferGeometry()),
    [asteroidData],
  );
  const asteroidTrailPos = useMemo(
    () => asteroidData.map(() => new Float32Array(ATRAIL * 3)),
    [asteroidData],
  );
  const asteroidHistories = useRef<THREE.Vector3[][]>(
    asteroidData.map(a => Array.from({ length: ATRAIL }, () => a.origin.clone())),
  );
  const asteroidTimers = useRef<number[]>(asteroidData.map(a => a.phase));
  const asteroidMeshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useMemo(() => {
    asteroidGeoms.forEach((g, i) => {
      g.setAttribute('position', new THREE.BufferAttribute(asteroidTrailPos[i], 3));
    });
  }, [asteroidGeoms, asteroidTrailPos]);

  // ── ANIMAÇÃO ──────────────────────────────────────────────────────────────
  const starMatRef = useRef<THREE.PointsMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, dt) => {
    const d = Math.min(0.033, dt);
    const time = state.clock.elapsedTime;

    // estrelas
    if (starMatRef.current) {
      starMatRef.current.opacity = 0.4 + Math.sin(time * 0.5) * 0.1;
    }
    if (groupRef.current) {
      const tx = state.mouse.x * 0.5;
      const ty = state.mouse.y * 0.5;
      groupRef.current.rotation.y += (tx - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (ty - groupRef.current.rotation.x) * 0.05;
    }

    const CYCLE = 22;

    // cometas
    cometData.forEach((c, i) => {
      cometTimers.current[i] += d * c.speed;
      if (cometTimers.current[i] > CYCLE) {
        cometTimers.current[i] = 0;
        const r = THREE.MathUtils.randFloat(80, 180);
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        c.origin.set(
          r * Math.sin(ph) * Math.cos(th),
          r * Math.sin(ph) * Math.sin(th),
          r * Math.cos(ph),
        );
        c.dir
          .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
          .normalize()
          .multiplyScalar(THREE.MathUtils.randFloat(12, 30));
        cometHistories.current[i].forEach(v => v.copy(c.origin));
      }
      const t = cometTimers.current[i] / CYCLE;
      const pos = c.origin.clone().add(c.dir.clone().multiplyScalar(t * CYCLE));
      if (cometMeshRefs.current[i]) cometMeshRefs.current[i].position.copy(pos);

      cometHistories.current[i].unshift(pos.clone());
      cometHistories.current[i].length = TRAIL;
      const tp = cometTrailPos[i];
      cometHistories.current[i].forEach((v, j) => {
        tp[j * 3] = v.x;
        tp[j * 3 + 1] = v.y;
        tp[j * 3 + 2] = v.z;
      });
      cometGeoms[i].attributes.position.needsUpdate = true;
    });

    // asteroides
    const ACYCLE = 30;
    asteroidData.forEach((a, i) => {
      asteroidTimers.current[i] += d * a.speed;
      if (asteroidTimers.current[i] > ACYCLE) {
        asteroidTimers.current[i] = 0;
        const r = THREE.MathUtils.randFloat(60, 190);
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        a.origin.set(
          r * Math.sin(ph) * Math.cos(th),
          r * Math.sin(ph) * Math.sin(th),
          r * Math.cos(ph),
        );
        a.dir
          .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
          .normalize()
          .multiplyScalar(THREE.MathUtils.randFloat(5, 18));
        asteroidHistories.current[i].forEach(v => v.copy(a.origin));
      }
      const t = asteroidTimers.current[i] / ACYCLE;
      const pos = a.origin.clone().add(a.dir.clone().multiplyScalar(t * ACYCLE));
      if (asteroidMeshRefs.current[i]) {
        const m = asteroidMeshRefs.current[i];
        m.position.copy(pos);
        m.rotation.x += d * a.tumbleSpeed.x;
        m.rotation.y += d * a.tumbleSpeed.y;
        m.rotation.z += d * a.tumbleSpeed.z;
      }

      asteroidHistories.current[i].unshift(pos.clone());
      asteroidHistories.current[i].length = ATRAIL;
      const tp = asteroidTrailPos[i];
      asteroidHistories.current[i].forEach((v, j) => {
        tp[j * 3] = v.x;
        tp[j * 3 + 1] = v.y;
        tp[j * 3 + 2] = v.z;
      });
      asteroidGeoms[i].attributes.position.needsUpdate = true;
    });
  });

  return (
    <group ref={groupRef}>
      {/* Estrelas */}
      <points geometry={starGeom}>
        <pointsMaterial
          ref={starMatRef}
          color="#ffffff"
          size={0.1}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {cometData.map((c, i) => (
        <group key={`comet-${i}`}>
          <mesh ref={el => (cometMeshRefs.current[i] = el)}>
            <sphereGeometry args={[c.size, 8, 8]} />
            <meshBasicMaterial color={c.color} />
          </mesh>
          <points geometry={cometGeoms[i]}>
            <pointsMaterial
              color={c.color}
              size={c.size * 0.55}
              transparent
              opacity={0.65}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              sizeAttenuation
            />
          </points>
        </group>
      ))}

      {asteroidData.map((a, i) => (
        <group key={`asteroid-${i}`}>
          <mesh ref={el => (asteroidMeshRefs.current[i] = el)}>
            <dodecahedronGeometry args={[a.size, 0]} />
            <meshBasicMaterial color={a.color} wireframe={Math.random() > 0.5} />
          </mesh>
          <points geometry={asteroidGeoms[i]}>
            <pointsMaterial
              color={a.color}
              size={a.size * 0.35}
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              sizeAttenuation
            />
          </points>
        </group>
      ))}
    </group>
  );
}

function BootLoaderOverlay() {
  return (
    <div className="bh-boot">
      <div className="bh-spinner" />
      <div className="bh-label">Carregando…</div>
    </div>
  );
}

export const BlackHole = () => {
  const [ready, setReady] = React.useState(false);

  return (
    <div className="container">
      <Menu />
      <div
        style={{
          position: 'fixed',
          zIndex: 10,
          top: '10rem',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem',
        }}>
        <FeatureCard title="test" description="Descrição do teste" />
        <MetricCard label="Teste" value={100} />
        <ProfileCard initials="JD" name="John Doe" role="Developer" />
        <StatusCard title="Status" subtitle="Online" status="active" />
      </div>
      <div className="black-hole-container">
        {!ready && <BootLoaderOverlay />}
        <Canvas
          gl={{ powerPreference: 'high-performance', antialias: true }}
          camera={{ position: [76, -54, 67], fov: 50 }}
          onCreated={({ gl, scene }) => {
            gl.setClearColor(BG);
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            requestAnimationFrame(() => setReady(true));
          }}>
          <TwinklingStars />
          <DustInfall />
          <Core3D />
          <EffectComposer>
            <Bloom intensity={1.15} radius={0.8} threshold={0.0} />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
};
