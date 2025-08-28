"use client";

import Image from 'next/image';
import { useState } from 'react';

interface SharedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}

export function SharedImage({ src, alt, width, height, className, style }: SharedImageProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center text-gray-500 text-xs ${className || ''}`}
        style={{ width, height, ...style }}
      >
        {alt}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      onError={() => setImageError(true)}
    />
  );
}
