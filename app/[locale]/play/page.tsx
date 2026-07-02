import { GameCanvas } from '@/components/game/GameCanvas';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Play — v.larosa.dev',
  description: 'Prototipo ambiente 3D',
};

export default function PlayPage() {
  return <GameCanvas />;
}
