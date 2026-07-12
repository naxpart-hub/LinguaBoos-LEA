import React, { useState, useEffect } from 'react';

interface TransparentImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * TransparentImage component.
 * Renders an image using a client-side flood-fill algorithm
 * to make the surrounding white background transparent.
 */
export const TransparentImage: React.FC<TransparentImageProps> = ({ src, alt, className = '', style }) => {
  const [processedSrc, setProcessedSrc] = useState<string>(src);

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
          setProcessedSrc(src);
        }
      };

      img.src = src;
    };

    processImage();

    return () => {
      active = false;
    };
  }, [src]);

  return (
    <img 
      src={processedSrc} 
      alt={alt} 
      className={className} 
      style={style} 
    />
  );
};
