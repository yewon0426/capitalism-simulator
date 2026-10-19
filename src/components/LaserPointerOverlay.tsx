import React, { useState, useEffect } from 'react';

interface LaserPointerOverlayProps {
  isActive: boolean;
}

interface PointerSpot {
  x: number;
  y: number;
  id: number;
}

export const LaserPointerOverlay: React.FC<LaserPointerOverlayProps> = ({ isActive }) => {
  const [spots, setSpots] = useState<PointerSpot[]>([]);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!isActive) {
      setSpots([]);
      setMousePos(null);
    }
  }, [isActive]);

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handlePointerDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const newSpot: PointerSpot = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    };
    setSpots((prev) => [...prev.slice(-4), newSpot]);
  };

  if (!isActive) return null;

  return (
    <div
      onMouseMove={handlePointerMove}
      onMouseDown={handlePointerDown}
      className="absolute inset-0 z-30 cursor-crosshair overflow-hidden pointer-events-auto"
    >
      {/* Real-time laser point tracking mouse */}
      {mousePos && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-75"
          style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
        >
          <div className="w-5 h-5 rounded-full bg-rose-500/80 shadow-[0_0_16px_#f43f5e] animate-ping" />
          <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </div>
      )}

      {/* Persistent clicked pulse beacons */}
      {spots.map((spot) => (
        <div
          key={spot.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-ping"
          style={{ left: `${spot.x}px`, top: `${spot.y}px` }}
        >
          <div className="w-12 h-12 rounded-full border-2 border-rose-400 bg-rose-500/30" />
        </div>
      ))}
    </div>
  );
};
