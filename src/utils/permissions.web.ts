/* eslint-disable @typescript-eslint/no-explicit-any */
type PermissionType = 'camera' | 'gallery' | 'location' | 'notifications';

declare const window: any;
declare const navigator: any;
declare const Notification: any;

export const requestPermission = async (type: PermissionType): Promise<boolean> => {
  if (typeof window === 'undefined') return true;
  
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
  return true;
};

export const checkPermission = async (type: PermissionType): Promise<boolean> => {
  if (typeof window === 'undefined') return true;
  
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
