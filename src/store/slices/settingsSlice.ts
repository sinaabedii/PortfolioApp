import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppSettings } from '@types/index';

const initialState: AppSettings = {
  theme: 'system',
  language: 'en',
  notifications: true,
  biometricEnabled: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    toggleNotifications: state => {
      state.notifications = !state.notifications;
    },
    toggleBiometric: state => {
      state.biometricEnabled = !state.biometricEnabled;
    },
    updateSettings: (state, action: PayloadAction<Partial<AppSettings>>) => {
      return { ...state, ...action.payload };
    },
    resetSettings: () => initialState,
  },
});

export const {
  setTheme,
  setLanguage,
  toggleNotifications,
  toggleBiometric,
  updateSettings,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
