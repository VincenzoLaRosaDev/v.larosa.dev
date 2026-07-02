'use client';

import { Canvas } from '@react-three/fiber';
import type { RootState } from '@react-three/fiber';
import { WorldScene } from '@/game/scenes/WorldScene';
import { CAMERA } from '@/game/constants';
import { SceneErrorBoundary } from './SceneErrorBoundary';

function handleCreated(state: RootState) {
  const canvas = state.gl.domElement;
  canvas.addEventListener(
    'webglcontextlost',
    (event) => {
      // Prevenire il default consente al browser di ripristinare il contesto
      event.preventDefault();
      console.warn('[WebGL] context lost — tentativo di ripristino');
    },
    false,
  );
  canvas.addEventListener('webglcontextrestored', () => {
    console.info('[WebGL] context restored');
  });
}

export default function GameCanvasInner() {
  return (
    <SceneErrorBoundary>
      <Canvas
        orthographic
        shadows
        dpr={[1, 1.5]}
        camera={{
          zoom: CAMERA.zoom,
          position: [...CAMERA.offset],
          near: 0.1,
          far: 100,
        }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onCreated={handleCreated}
      >
        <WorldScene />
      </Canvas>
    </SceneErrorBoundary>
  );
}
