"use client";

import { ImageIcon } from "lucide-react";
import { achievementPhotos } from "@/lib/data";

export function AchievementsGallery() {
  const hasPhotos = achievementPhotos.length > 0;
  // Duplicate the list so the scroll loop is seamless once photos are added.
  const track = hasPhotos ? [...achievementPhotos, ...achievementPhotos] : [];

  return (
    <div className="mt-10">
      <p className="mb-4 font-mono text-xs uppercase tracking-wider text-ink-500 dark:text-ink-300">
        Achievement photos
      </p>
      <div className="relative overflow-hidden card-hover rounded-lg border border-ink-300/20 dark:border-ink-500/20 bg-white/40 dark:bg-graphite-900/40 py-4">
        {hasPhotos ? (
          <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-4 px-4 hover:[animation-play-state:paused]">
            {track.map((photo, i) => (
              <figure
                key={`${photo.src}-${i}`}
                className="h-40 w-56 shrink-0 overflow-hidden rounded-md border border-ink-300/20 dark:border-ink-500/20"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.src} alt={photo.caption} className="h-full w-full object-cover" />
              </figure>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 px-4 py-10 text-sm text-ink-500 dark:text-ink-300">
            <ImageIcon size={16} />
            Achievement and certificate photos will appear here as a scrolling gallery once added.
          </div>
        )}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
