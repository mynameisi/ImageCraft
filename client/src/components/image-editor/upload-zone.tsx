import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from '@/components/ui/card';
import { ImagePlus } from 'lucide-react';

interface UploadZoneProps {
  onUpload: (file: File) => void;
}

export function UploadZone({ onUpload }: UploadZoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    multiple: false,
    noClick: false,
    noKeyboard: false,
    preventDropOnDocument: true
  });

  return (
    <Card 
      {...getRootProps()}
      className={`
        p-12 
        border-2 
        border-dashed 
        cursor-pointer 
        transition-colors
        hover:border-primary
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted'}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <ImagePlus className="w-12 h-12 text-muted-foreground" />
        <div>
          <p className="font-medium">
            {isDragActive ? 'Drop image here' : 'Drag & drop an image here'}
          </p>
          <p className="text-sm text-muted-foreground">
            or click to select a file
          </p>
        </div>
      </div>
    </Card>
  );
}