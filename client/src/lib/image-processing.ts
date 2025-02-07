declare const Caman: any;

export interface FilterState {
  artistic: {
    grayscale: number;
    sepia: number;
    vintage: number;
  };
  color: {
    brightness: number;
    contrast: number;
    saturation: number;
  };
  effects: {
    blur: number;
    sharpen: number;
    vignette: number;
  };
}

export async function resizeImage(dataUrl: string, maxDimension = 1200): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions while maintaining aspect ratio
      if (width > height && width > maxDimension) {
        height = (height * maxDimension) / width;
        width = maxDimension;
      } else if (height > maxDimension) {
        width = (width * maxDimension) / height;
        height = maxDimension;
      }

      // Create canvas for resizing
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      // Draw resized image
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataUrl;
  });
}

export function applyFilters(canvas: HTMLCanvasElement, filters: FilterState) {
  Caman(canvas, function(this: any) {
    // Reset previous filters
    this.revert();

    // Apply artistic filters
    if (filters.artistic.grayscale > 0) {
      this.greyscale();
      this.brightness(filters.artistic.grayscale);
    }

    if (filters.artistic.sepia > 0) {
      this.sepia(filters.artistic.sepia);
    }

    if (filters.artistic.vintage > 0) {
      this.vintage();
      this.brightness(filters.artistic.vintage);
    }

    // Apply color adjustments
    if (filters.color.brightness !== 0) {
      this.brightness(filters.color.brightness);
    }

    if (filters.color.contrast !== 0) {
      this.contrast(filters.color.contrast);
    }

    if (filters.color.saturation !== 0) {
      this.saturation(filters.color.saturation);
    }

    // Apply effects
    if (filters.effects.blur > 0) {
      this.stackBlur(filters.effects.blur * 0.2);
    }

    if (filters.effects.sharpen > 0) {
      this.sharpen(filters.effects.sharpen);
    }

    if (filters.effects.vignette > 0) {
      this.vignette(filters.effects.vignette);
    }

    // Render the changes
    this.render();
  });
}