/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';

declare const document: any;
declare const URL: any;

interface Asset {
  uri: string;
  fileName?: string;
  type?: string;
}

interface UseImagePickerReturn {
  image: Asset | null;
  isLoading: boolean;
  error: string | null;
  pickFromGallery: () => Promise<void>;
  pickFromCamera: () => Promise<void>;
  clearImage: () => void;
}

export const useImagePicker = (): UseImagePickerReturn => {
  const [image, setImage] = useState<Asset | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickFromGallery = useCallback(async () => {
    setIsLoading(true);
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e: any) => {
        const file = e.target?.files?.[0];
        if (file) {
          const uri = URL.createObjectURL(file);
          setImage({ uri, fileName: file.name, type: file.type });
        }
        setIsLoading(false);
      };
      input.click();
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  }, []);

  const pickFromCamera = useCallback(async () => {
    setError('Camera not supported on web');
  }, []);

  const clearImage = useCallback(() => {
    setImage(null);
    setError(null);
  }, []);

  return { image, isLoading, error, pickFromGallery, pickFromCamera, clearImage };
};
