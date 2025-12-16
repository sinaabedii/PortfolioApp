import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { SyncQueueItem } from '@types/index';

interface SyncState {
  queue: SyncQueueItem[];
  isSyncing: boolean;
  lastSyncAt: number | null;
  isOnline: boolean;
}

const initialState: SyncState = {
  queue: [],
  isSyncing: false,
  lastSyncAt: null,
  isOnline: true,
};

const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    addToQueue: (state, action: PayloadAction<Omit<SyncQueueItem, 'id' | 'timestamp' | 'retryCount'>>) => {
      const item: SyncQueueItem = {
        ...action.payload,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        retryCount: 0,
      };
      state.queue.push(item);
    },
    removeFromQueue: (state, action: PayloadAction<string>) => {
      state.queue = state.queue.filter(item => item.id !== action.payload);
    },
    incrementRetryCount: (state, action: PayloadAction<string>) => {
      const item = state.queue.find(i => i.id === action.payload);
      if (item) {
        item.retryCount += 1;
      }
    },
    setSyncing: (state, action: PayloadAction<boolean>) => {
      state.isSyncing = action.payload;
    },
    setLastSyncAt: (state, action: PayloadAction<number>) => {
      state.lastSyncAt = action.payload;
    },
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    clearQueue: state => {
      state.queue = [];
    },
  },
});

export const {
  addToQueue,
  removeFromQueue,
  incrementRetryCount,
  setSyncing,
  setLastSyncAt,
  setOnlineStatus,
  clearQueue,
} = syncSlice.actions;

export default syncSlice.reducer;
