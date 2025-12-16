import { useState, useCallback } from 'react';
import { launchCamera, launchImageLibrary, ImagePickerResponse, Asset } from 'react-native-image-picker';
import { requestPermission } from '@utils/permissions';

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

  const handleResponse = useCallback((response: ImagePickerResponse) => {
    setIsLoading(false);
    if (response.didCancel) return;
    if (response.errorCode) {
      setError(response.errorMessage || 'Failed to pick image');
      return;
    }
    if (response.assets?.[0]) {
      setImage(response.assets[0]);
      setError(null);
    }
  }, []);

  const pickFromGallery = useCallback(async () => {
    const hasPermission = await requestPermission('gallery');
    if (!hasPermission) {
      setError('Gallery permission denied');
      return;
    }
    setIsLoading(true);
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, handleResponse);
  }, [handleResponse]);

  const pickFromCamera = useCallback(async () => {
    const hasPermission = await requestPermission('camera');
    if (!hasPermission) {
      setError('Camera permission denied');
      return;
    }
    setIsLoading(true);
    launchCamera({ mediaType: 'photo', quality: 0.8 }, handleResponse);
  }, [handleResponse]);

  const clearImage = useCallback(() => {
    setImage(null);
    setError(null);
  }, []);

  return { image, isLoading, error, pickFromGallery, pickFromCamera, clearImage };
};
