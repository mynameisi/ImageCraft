import { useEffect, useRef } from "react";
import type { FilterState } from "@/lib/image-processing";
import { applyFilters } from "@/lib/image-processing";

interface PreviewProps {
  image: string;
  filters: FilterState;
}

export function Preview({ image, filters }: PreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = image;
    
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw initial image
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      
      // Apply filters
      applyFilters(canvas, filters);
    };
  }, [image, filters]);

  return (
    <div className="relative bg-muted rounded-lg overflow-hidden">
      <canvas
        id="preview-canvas"
        ref={canvasRef}
        className="max-w-full h-auto"
      />
    </div>
  );
}
