'use client';

import { Component, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

export class SceneErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error('[WorldScene crash]', error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#0c0c0c] p-6 text-center">
          <p className="text-sm font-semibold text-red-400">Errore nella scena 3D</p>
          <pre className="max-w-full overflow-auto whitespace-pre-wrap text-xs text-neutral-400">
            {this.state.error.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
