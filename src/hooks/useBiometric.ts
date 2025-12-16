import { useState, useCallback, useEffect } from 'react';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { BIOMETRIC_CONFIG } from '@constants/config';

interface BiometricState {
  isAvailable: boolean;
  biometryType: string | null;
  isLoading: boolean;
  error: string | null;
}

interface UseBiometricReturn extends BiometricState {
  authenticate: () => Promise<boolean>;
  createKeys: () => Promise<string | null>;
}

const rnBiometrics = new ReactNativeBiometrics();

export const useBiometric = (): UseBiometricReturn => {
  const [state, setState] = useState<BiometricState>({
    isAvailable: false,
    biometryType: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async (): Promise<void> => {
    try {
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();

      let biometryName: string | null = null;
      if (biometryType === BiometryTypes.TouchID) {
        biometryName = 'Touch ID';
      } else if (biometryType === BiometryTypes.FaceID) {
        biometryName = 'Face ID';
      } else if (biometryType === BiometryTypes.Biometrics) {
        biometryName = 'Biometrics';
      }

      setState({
        isAvailable: available,
        biometryType: biometryName,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: (error as Error).message,
      }));
    }
  };

  const authenticate = useCallback(async (): Promise<boolean> => {
    if (!state.isAvailable) {
      return false;
    }

    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: BIOMETRIC_CONFIG.promptMessage,
        cancelButtonText: BIOMETRIC_CONFIG.cancelButtonText,
        fallbackPromptMessage: BIOMETRIC_CONFIG.fallbackPromptMessage,
      });

      return success;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: (error as Error).message,
      }));
      return false;
    }
  }, [state.isAvailable]);

  const createKeys = useCallback(async (): Promise<string | null> => {
    try {
      const { publicKey } = await rnBiometrics.createKeys();
      return publicKey;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: (error as Error).message,
      }));
      return null;
    }
  }, []);

  return {
    ...state,
    authenticate,
    createKeys,
  };
};
