import { isLocalDraftPreview } from '@/sanity/preview';

export function DraftPreviewBanner() {
  if (!isLocalDraftPreview) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-[9999] -translate-x-1/2 rounded-full border border-white/20 bg-black/80 px-4 py-2 text-xs text-white shadow-lg backdrop-blur-sm">
      Local draft preview
    </div>
  );
}
