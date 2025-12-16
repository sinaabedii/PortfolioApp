import { useEffect, useState, useCallback } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { useAppDispatch } from './useAppDispatch';
import { setOnlineStatus } from '@store/slices/syncSlice';

interface NetworkStatus {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  type: string;
}

export const useNetworkStatus = (): NetworkStatus => {
  const dispatch = useAppDispatch();
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isConnected: true,
    isInternetReachable: true,
    type: 'unknown',
  });

  const handleNetworkChange = useCallback(
    (state: NetInfoState) => {
      const isOnline = state.isConnected && state.isInternetReachable !== false;
      setNetworkStatus({
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
      });
      dispatch(setOnlineStatus(isOnline));
    },
    [dispatch],
  );

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(handleNetworkChange);

    // Get initial state
    NetInfo.fetch().then(handleNetworkChange);

    return () => unsubscribe();
  }, [handleNetworkChange]);

  return networkStatus;
};
