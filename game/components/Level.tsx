'use client';

import { Grid } from '@react-three/drei';
import { COLORS, WORLD } from '../constants';

export function Level() {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} receiveShadow position={[0, WORLD.groundY, 0]}>
        <planeGeometry args={[WORLD.floorSize, WORLD.floorSize]} />
        <meshStandardMaterial color={COLORS.floor} roughness={0.88} metalness={0.02} />
      </mesh>

      <Grid
        infiniteGrid
        fadeDistance={50}
        cellColor={COLORS.grid}
        sectionColor={COLORS.gridSection}
        cellSize={1}
        sectionSize={5}
        position={[0, WORLD.groundY + 0.01, 0]}
      />
    </group>
  );
}
