import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const secureStorage = {
  set: (key: string, value: string): void => {
    storage.set(key, value);
  },

  get: (key: string): string | undefined => {
    return storage.getString(key);
  },

  setObject: <T>(key: string, value: T): void => {
    storage.set(key, JSON.stringify(value));
  },

  getObject: <T>(key: string): T | null => {
    const value = storage.getString(key);
    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch {
        return null;
      }
    }
    return null;
  },

  delete: (key: string): void => {
    storage.delete(key);
  },

  contains: (key: string): boolean => {
    return storage.contains(key);
  },

  clearAll: (): void => {
    storage.clearAll();
  },

  getAllKeys: (): string[] => {
    return storage.getAllKeys();
  },
};

export default secureStorage;
