import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Preview } from "@/components/image-editor/preview";
import { Filters } from "@/components/image-editor/filters";
import { UploadZone } from "@/components/image-editor/upload-zone";
import { useToast } from "@/hooks/use-toast";
import type { FilterState } from "@/lib/image-processing";

export default function Editor() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [filters, setFilters] = useState<FilterState>({
    artistic: {
      grayscale: 0,
      sepia: 0,
      vintage: 0
    },
    color: {
      brightness: 0,
      contrast: 0,
      saturation: 0
    },
    effects: {
      blur: 0,
      sharpen: 0,
      vignette: 0
    }
  });

  const handleImageUpload = async (file: File) => {
    try {
      setLoading(true);

      // Create a promise-based FileReader
      const readFileAsDataURL = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        });
      };

      const dataUrl = await readFileAsDataURL(file);
      setImage(dataUrl);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load image",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (category: keyof FilterState, filter: string, value: number) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [filter]: value
      }
    }));
  };

  const handleDownload = async () => {
    if (!image) return;

    try {
      setLoading(true);
      const canvas = document.querySelector('#preview-canvas') as HTMLCanvasElement;
      if (!canvas) {
        throw new Error('Canvas not found');
      }

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'edited-image.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to download image",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Image Editor</h1>
          <p className="text-muted-foreground">
            Upload an image and apply filters in real-time
          </p>
        </div>

        {!image ? (
          <UploadZone onUpload={handleImageUpload} />
        ) : (
          <Card className="p-6">
            <div className="grid gap-6 md:grid-cols-[1fr_300px]">
              <Preview image={image} filters={filters} />

              <div className="space-y-4">
                <Tabs defaultValue="artistic">
                  <TabsList className="w-full">
                    <TabsTrigger value="artistic">Artistic</TabsTrigger>
                    <TabsTrigger value="color">Color</TabsTrigger>
                    <TabsTrigger value="effects">Effects</TabsTrigger>
                  </TabsList>

                  <TabsContent value="artistic">
                    <Filters
                      category="artistic"
                      filters={filters.artistic}
                      onChange={(filter, value) => handleFilterChange('artistic', filter, value)}
                    />
                  </TabsContent>

                  <TabsContent value="color">
                    <Filters
                      category="color"
                      filters={filters.color}
                      onChange={(filter, value) => handleFilterChange('color', filter, value)}
                    />
                  </TabsContent>

                  <TabsContent value="effects">
                    <Filters
                      category="effects"
                      filters={filters.effects}
                      onChange={(filter, value) => handleFilterChange('effects', filter, value)}
                    />
                  </TabsContent>
                </Tabs>

                <button
                  className="w-full bg-primary text-primary-foreground rounded-md py-2 px-4 disabled:opacity-50"
                  onClick={handleDownload}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Download Image'}
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}