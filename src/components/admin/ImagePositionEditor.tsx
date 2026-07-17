"use client";

import { useState, useRef } from "react";

interface ImagePositionEditorProps {
  imageUrl: string;
  positionX: number;
  positionY: number;
  scale: number;
  onChange: (positionX: number, positionY: number, scale: number) => void;
}

export default function ImagePositionEditor({
  imageUrl,
  positionX,
  positionY,
  scale,
  onChange,
}: ImagePositionEditorProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    // Convert pixel movement to percentage
    const newX = Math.max(0, Math.min(100, positionX - (deltaX / rect.width) * 100));
    const newY = Math.max(0, Math.min(100, positionY - (deltaY / rect.height) * 100));

    onChange(newX, newY, scale);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScaleChange = (delta: number) => {
    const newScale = Math.max(10, Math.min(300, scale + delta));
    onChange(positionX, positionY, newScale);
  };

  const handleReset = () => {
    onChange(50, 50, 100);
  };

  // Calculate image transform based on position and scale
  const imageStyle = {
    transform: `translate(${positionX}%, ${positionY}%) scale(${scale / 100})`,
    transformOrigin: "center center",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Image Position Editor</h3>
        <button
          type="button"
          onClick={handleReset}
          className="text-sm text-rangoli-maroon hover:underline"
        >
          Reset Position
        </button>
      </div>

      {/* Image Preview Container */}
      <div
        ref={containerRef}
        className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Center marker */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-rangoli-maroon rounded-full opacity-50" />
        </div>

        {/* Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt="Product preview"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-75"
          style={imageStyle}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />

        {/* Drag indicator */}
        {isDragging && (
          <div className="absolute inset-0 bg-rangoli-maroon/10 pointer-events-none flex items-center justify-center">
            <span className="bg-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
              Drag to position
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {/* Position Controls */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Horizontal Position: {Math.round(positionX)}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={positionX}
              onChange={(e) => onChange(Number(e.target.value), positionY, scale)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vertical Position: {Math.round(positionY)}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={positionY}
              onChange={(e) => onChange(positionX, Number(e.target.value), scale)}
              className="w-full"
            />
          </div>
        </div>

        {/* Scale Controls */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Scale: {Math.round(scale)}%
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScaleChange(-10)}
              className="px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm font-medium"
            >
              -
            </button>
            <input
              type="range"
              min="10"
              max="300"
              value={scale}
              onChange={(e) => onChange(positionX, positionY, Number(e.target.value))}
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => handleScaleChange(10)}
              className="px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm font-medium"
            >
              +
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onChange(50, 50, scale)}
            className="flex-1 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm font-medium"
          >
            Center
          </button>
          <button
            type="button"
            onClick={() => onChange(positionX, 0, scale)}
            className="flex-1 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm font-medium"
          >
            Top
          </button>
          <button
            type="button"
            onClick={() => onChange(positionX, 100, scale)}
            className="flex-1 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm font-medium"
          >
            Bottom
          </button>
          <button
            type="button"
            onClick={() => onChange(0, positionY, scale)}
            className="flex-1 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm font-medium"
          >
            Left
          </button>
          <button
            type="button"
            onClick={() => onChange(100, positionY, scale)}
            className="flex-1 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm font-medium"
          >
            Right
          </button>
        </div>
      </div>
    </div>
  );
}
