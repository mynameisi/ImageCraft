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

export function applyFilters(canvas: HTMLCanvasElement, filters: FilterState) {
  Caman(canvas, function() {
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
