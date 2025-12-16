type PermissionType = 'camera' | 'gallery' | 'location' | 'notifications';

export const requestPermission = async (type: PermissionType): Promise<boolean> => {
  // Web permissions are handled differently
  if (type === 'notifications' && 'Notification' in window) {
    const result = await Notification.requestPermission();
    return result === 'granted';
  }
  if (type === 'location' && 'geolocation' in navigator) {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        () => resolve(true),
        () => resolve(false)
      );
    });
  }
  // Camera and gallery permissions are implicit on web
  return true;
};

export const checkPermission = async (type: PermissionType): Promise<boolean> => {
  if (type === 'notifications' && 'Notification' in window) {
    return Notification.permission === 'granted';
  }
  return true;
};

export const requestMultiplePermissions = async (
  types: PermissionType[],
): Promise<Record<PermissionType, boolean>> => {
  const results: Record<string, boolean> = {};
  for (const type of types) {
    results[type] = await requestPermission(type);
  }
  return results as Record<PermissionType, boolean>;
};
