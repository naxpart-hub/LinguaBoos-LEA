import React, { useState, useEffect } from 'react';
import { asset } from '../services/assets';

export type MascotMood = 'idle' | 'happy' | 'sad' | 'thinking' | 'celebrate';

interface MascotProps {
  mood?: MascotMood;
  className?: string;
}

/**
 * Mascot component for the Spanish grammar learning game.
 * Uses 3D-rendered stone gargoyle PNG images.
 * Dynamically removes the white background using a client-side flood-fill algorithm
 * to keep eye reflections intact and maintain transparent backgrounds.
 */
export const Mascot: React.FC<MascotProps> = ({ mood = 'idle', className = '' }) => {
  const rawImageSrc = asset({
    idle: '/mascot_gargoyle_idle.png',
    happy: '/mascot_gargoyle_happy.png',
    sad: '/mascot_gargoyle_sad.png',
    thinking: '/mascot_gargoyle_thinking.png',
    celebrate: '/mascot_gargoyle_happy.png',
  }[mood] || '/mascot_gargoyle_idle.png');

  const [processedSrc, setProcessedSrc] = useState<string>(rawImageSrc);

  useEffect(() => {
    let active = true;

    const processImage = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const w = canvas.width;
        const h = canvas.height;

        const getIdx = (x: number, y: number) => (y * w + x) * 4;
        const visited = new Uint8Array(w * h);
        const queue: [number, number][] = [];

        // Seed flood fill queue with all outer border pixels
        for (let x = 0; x < w; x++) {
          queue.push([x, 0]);
          queue.push([x, h - 1]);
          visited[0 * w + x] = 1;
          visited[(h - 1) * w + x] = 1;
        }
        for (let y = 1; y < h - 1; y++) {
          queue.push([0, y]);
          queue.push([w - 1, y]);
          visited[y * w + 0] = 1;
          visited[y * w + (w - 1)] = 1;
        }

        let head = 0;
        // Threshold: all RGB values > 238 are considered "white background"
        const threshold = 238;

        while (head < queue.length) {
          const [cx, cy] = queue[head++];
          const idx = getIdx(cx, cy);
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          if (r > threshold && g > threshold && b > threshold) {
            data[idx + 3] = 0; // Set Alpha to 0 (fully transparent)

            // Inspect 4 neighbors
            const neighbors = [
              [cx + 1, cy],
              [cx - 1, cy],
              [cx, cy + 1],
              [cx, cy - 1]
            ];

            for (const [nx, ny] of neighbors) {
              if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                const nIdx = ny * w + nx;
                if (visited[nIdx] === 0) {
                  visited[nIdx] = 1;
                  queue.push([nx, ny]);
                }
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        if (active) {
          setProcessedSrc(canvas.toDataURL());
        }
      };
      
      img.onerror = () => {
        if (active) {
          setProcessedSrc(rawImageSrc);
        }
      };
      
      img.src = rawImageSrc;
    };

    processImage();

    return () => {
      active = false;
    };
  }, [rawImageSrc]);

  const animationClass = {
    idle: 'mascot-idle',
    happy: 'mascot-happy',
    sad: 'mascot-sad',
    thinking: 'mascot-thinking',
    celebrate: 'mascot-celebrate',
  }[mood] || 'mascot-idle';

  return (
    <div className={`relative ${className} select-none pointer-events-none flex items-center justify-center`} aria-hidden="true">
      <img 
        src={processedSrc} 
        alt={`Gargouille ${mood}`} 
        className={`w-full h-full object-contain ${animationClass}`}
        style={{ transformOrigin: 'bottom center' }}
      />
      
      {/* Floating question mark bubble when thinking */}
      {mood === 'thinking' && (
        <div className="absolute top-0 right-0 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 w-8 h-8 rounded-full flex items-center justify-center shadow-md animate-bubble-in">
          <span className="font-black text-sky-500 text-base">?</span>
        </div>
      )}
    </div>
  );
};
