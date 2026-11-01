import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Candle({ position, index }) {
  const flameRef = useRef();

  useFrame((state) => {
    if (flameRef.current) {
      const t = state.clock.getElapsedTime() + index;

      flameRef.current.scale.x = 0.85 + Math.sin(t * 12) * 0.15;
      flameRef.current.scale.y = 1 + Math.sin(t * 15) * 0.2;
    }
  });


  return (
    <group position={position}>
      {/* Candle */}
      <mesh position={[0, 0.16, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.03, 0.32, 16]} />
        <meshStandardMaterial color="#fff0d8" roughness={0.35} />
      </mesh>

      {/* Candle stripes */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.031, 0.031, 0.32, 16]} />
        <meshStandardMaterial
          color="#e99ab6"
          roughness={0.4}
        />
      </mesh>

      {/* Wick */}
      <mesh position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 0.04, 8]} />
        <meshStandardMaterial color="#292020" />
      </mesh>

      {/* Animated Flame */}
      <group ref={flameRef} position={[0, 0.4, 0]}>
        <mesh>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#ff9d32" />
        </mesh>

        <mesh position={[0, 0.015, 0]}>
          <sphereGeometry args={[0.019, 16, 16]} />
          <meshBasicMaterial color="#fff4b0" />
        </mesh>

        <pointLight
          color="#ffb347"
          intensity={0.8}
          distance={1.2}
        />
      </group>
    </group>
  );
}

function Strawberry({ position }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.065, 20, 20]} />
        <meshStandardMaterial color="#e94b65" roughness={0.3} />
      </mesh>

      <mesh position={[0, 0.055, 0]}>
        <coneGeometry args={[0.035, 0.06, 6]} />
        <meshStandardMaterial color="#548b58" />
      </mesh>
    </group>
  );
}

export default function Cake({ isCut = false }) {
  const sliceRef = useRef();

  useFrame((state, delta) => {
    if (sliceRef.current && isCut) {
      sliceRef.current.position.z +=
        (1.05 - sliceRef.current.position.z) *
        Math.min(delta * 2, 1);

      sliceRef.current.position.x +=
        (0.2 - sliceRef.current.position.x) *
        Math.min(delta * 2, 1);
    }
  });

  const candles = [
    [-0.25, 1.08, 0],
    [0, 1.08, -0.25],
    [0.25, 1.08, 0],
    [-0.16, 1.08, 0.2],
    [0.16, 1.08, 0.2],
  ];

  const cutStart = Math.PI / 3;
  const cutAngle = Math.PI / 3;
  const remainingAngle = Math.PI * 2 - cutAngle;

  return (
    <group scale={1.2} rotation={[0, -0.25, 0]}>

      {/* Cake Plate */}
      <mesh position={[0, -0.08, 0]} receiveShadow>
        <cylinderGeometry args={[0.96, 0.96, 0.07, 64]} />
        <meshStandardMaterial
          color="#fff4ed"
          metalness={0.25}
          roughness={0.25}
        />
      </mesh>

      {/* Bottom Cake Layer */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        {isCut ? (
          <cylinderGeometry
            args={[
              0.85, 0.85, 0.5, 64, 1, false,
              cutStart + cutAngle,
              remainingAngle,
            ]}
          />
        ) : (
          <cylinderGeometry args={[0.85, 0.85, 0.5, 64]} />
        )}

        <meshStandardMaterial color="#a96855" roughness={0.65} />
      </mesh>

      {/* Bottom Pink Frosting */}
      <mesh position={[0, 0.615, 0]}>
        {isCut ? (
          <cylinderGeometry
            args={[
              0.86, 0.86, 0.03, 64, 1, false,
              cutStart + cutAngle,
              remainingAngle,
            ]}
          />
        ) : (
          <cylinderGeometry args={[0.86, 0.86, 0.03, 64]} />
        )}

        <meshStandardMaterial color="#f5a9bd" roughness={0.25} />
      </mesh>

      {/* Top Cake Tier */}
      <mesh position={[0, 0.83, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.59, 0.42, 64]} />
        <meshStandardMaterial color="#b87965" roughness={0.6} />
      </mesh>

      {/* Top Pink Frosting */}
      <mesh position={[0, 1.045, 0]}>
        <cylinderGeometry args={[0.59, 0.59, 0.025, 64]} />
        <meshStandardMaterial color="#ffd1dc" roughness={0.25} />
      </mesh>

      {/* Pink cream decoration */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.59,
              0.83,
              Math.sin(angle) * 0.59,
            ]}
          >
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial color="#fff0f3" />
          </mesh>
        );
      })}

      {/* Strawberries */}
      <Strawberry position={[-0.38, 1.08, -0.12]} />
      <Strawberry position={[0.38, 1.08, -0.12]} />
      <Strawberry position={[0, 1.08, 0.38]} />

      {/* Candles */}
      {candles.map((position, index) => (
        <Candle
          key={index}
          position={position}
          index={index}
        />
      ))}

      {/* Moving Cake Slice */}
      <group ref={sliceRef} position={[0, 0.35, 0]}>
        <mesh castShadow>
          <cylinderGeometry
            args={[
              0.85, 0.85, 0.5, 32, 1, false,
              cutStart, cutAngle,
            ]}
          />
          <meshStandardMaterial color="#a96855" roughness={0.65} />
        </mesh>

        {/* Pink frosting on slice */}
        <mesh position={[0, 0.265, 0]}>
          <cylinderGeometry
            args={[
              0.86, 0.86, 0.03, 32, 1, false,
              cutStart, cutAngle,
            ]}
          />
          <meshStandardMaterial color="#f5a9bd" />
        </mesh>
      </group>

    </group>
  );
}