import { useEffect, useCallback } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import {
  removeFromQueue,
  incrementRetryCount,
  setSyncing,
  setLastSyncAt,
} from '@store/slices/syncSlice';
import { apiClient } from '@services/api/client';

const MAX_RETRIES = 3;

export const useOfflineSync = (): void => {
  const dispatch = useAppDispatch();
  const { queue, isOnline, isSyncing } = useAppSelector(state => state.sync);

  const processQueue = useCallback(async () => {
    if (!isOnline || isSyncing || queue.length === 0) return;

    dispatch(setSyncing(true));

    for (const item of queue) {
      if (item.retryCount >= MAX_RETRIES) {
        dispatch(removeFromQueue(item.id));
        continue;
      }

      try {
        switch (item.action) {
          case 'create':
            await apiClient.post(item.endpoint, item.payload);
            break;
          case 'update':
            await apiClient.patch(item.endpoint, item.payload);
            break;
          case 'delete':
            await apiClient.delete(item.endpoint);
            break;
        }
        dispatch(removeFromQueue(item.id));
      } catch {
        dispatch(incrementRetryCount(item.id));
      }
    }

    dispatch(setSyncing(false));
    dispatch(setLastSyncAt(Date.now()));
  }, [dispatch, isOnline, isSyncing, queue]);

  useEffect(() => {
    if (isOnline && queue.length > 0) {
      processQueue();
    }
  }, [isOnline, queue.length, processQueue]);
};
