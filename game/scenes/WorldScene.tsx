'use client';

import { useRef } from 'react';
import type { Group } from 'three';
import { FollowCamera } from '../components/FollowCamera';
import { Level } from '../components/Level';
import { Player } from '../components/Player';
import { COLORS, LIGHTING } from '../constants';

export function WorldScene() {
  const playerRef = useRef<Group>(null);

  return (
    <>
      <color attach="background" args={[COLORS.background]} />
      <fog attach="fog" args={[COLORS.fog, LIGHTING.fogNear, LIGHTING.fogFar]} />

      <ambientLight intensity={LIGHTING.ambient} />
      <hemisphereLight
        color={COLORS.lightSky}
        groundColor={COLORS.lightGround}
        intensity={LIGHTING.hemisphere}
        position={[0, 24, 0]}
      />
      <directionalLight
        castShadow
        intensity={LIGHTING.key}
        position={[...LIGHTING.keyPosition]}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-camera-far={55}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={22}
        shadow-camera-bottom={-22}
      />
      <directionalLight
        intensity={LIGHTING.fill}
        position={[...LIGHTING.fillPosition]}
      />

      <Level />
      <Player ref={playerRef} />
      <FollowCamera target={playerRef} />
    </>
  );
}
