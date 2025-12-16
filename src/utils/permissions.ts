import { Platform, PermissionsAndroid, Permission } from 'react-native';

type PermissionType = 'camera' | 'gallery' | 'location' | 'notifications';

const ANDROID_PERMISSIONS: Record<PermissionType, Permission> = {
  camera: PermissionsAndroid.PERMISSIONS.CAMERA,
  gallery: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  location: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  notifications: PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
};

export const requestPermission = async (type: PermissionType): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    // iOS permissions handled by native modules
    return true;
  }

  try {
    const permission = ANDROID_PERMISSIONS[type];
    if (!permission) return false;

    const granted = await PermissionsAndroid.request(permission, {
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Permission`,
      message: `This app needs access to your ${type}`,
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch {
    return false;
  }
};

export const checkPermission = async (type: PermissionType): Promise<boolean> => {
  if (Platform.OS === 'ios') return true;

  const permission = ANDROID_PERMISSIONS[type];
  if (!permission) return false;

  const result = await PermissionsAndroid.check(permission);
  return result;
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
