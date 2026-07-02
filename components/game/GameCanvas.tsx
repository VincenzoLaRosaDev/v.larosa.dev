'use client';

import dynamic from 'next/dynamic';

const GameCanvasInner = dynamic(
  () => import('@/components/game/GameCanvasInner'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[#0c0c0c] text-neutral-500 text-sm">
        Caricamento…
      </div>
    ),
  },
);

export function GameCanvas() {
  return (
    <div className="h-full w-full">
      <GameCanvasInner />
    </div>
  );
}
