export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api'
  : 'https://api.portfolioapp.com/api';

export const SOCKET_URL = __DEV__
  ? 'http://localhost:3000'
  : 'https://api.portfolioapp.com';

export const GRAPHQL_URL = __DEV__
  ? 'http://localhost:3000/graphql'
  : 'https://api.portfolioapp.com/graphql';

export const GRAPHQL_WS_URL = __DEV__
  ? 'ws://localhost:3000/graphql'
  : 'wss://api.portfolioapp.com/graphql';

export const API_TIMEOUT = 30000;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};

export const STORAGE_KEYS = {
  AUTH_TOKENS: '@auth_tokens',
  USER_DATA: '@user_data',
  SETTINGS: '@settings',
  THEME: '@theme',
  LANGUAGE: '@language',
  ONBOARDING_COMPLETE: '@onboarding_complete',
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'pt', name: 'Português' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
];

export const BIOMETRIC_CONFIG = {
  promptMessage: 'Authenticate to continue',
  cancelButtonText: 'Cancel',
  fallbackPromptMessage: 'Use passcode',
};
