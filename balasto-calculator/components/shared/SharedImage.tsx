"use client";

import Image from 'next/image';

interface SharedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}

export function SharedImage({ src, alt, width, height, className, style }: SharedImageProps) {
  // Mapear nombres de archivo a rutas del submodule
  const getImagePath = (filename: string) => {
    const imageMap: Record<string, string> = {
      'naranjainsttij.png': '/naranjainsttij.png',
      'naranjalinktij.png': '/naranjalinktij.png',
      'negrologotij.png': '/negrologotij.png',
      'PRORecurso 4tij.png': '/PRORecurso 4tij.png',
    };
    
    return imageMap[filename] || src;
  };

  return (
    <Image
      src={getImagePath(src)}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  );
}
