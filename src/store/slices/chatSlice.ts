import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ChatMessage, ChatRoom } from '@types/index';

interface ChatState {
  rooms: ChatRoom[];
  activeRoomId: string | null;
  messages: Record<string, ChatMessage[]>;
  isConnected: boolean;
  typingUsers: Record<string, string[]>;
}

const initialState: ChatState = {
  rooms: [],
  activeRoomId: null,
  messages: {},
  isConnected: false,
  typingUsers: {},
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<ChatRoom[]>) => {
      state.rooms = action.payload;
    },
    addRoom: (state, action: PayloadAction<ChatRoom>) => {
      state.rooms.unshift(action.payload);
    },
    setActiveRoom: (state, action: PayloadAction<string | null>) => {
      state.activeRoomId = action.payload;
    },
    setMessages: (state, action: PayloadAction<{ roomId: string; messages: ChatMessage[] }>) => {
      state.messages[action.payload.roomId] = action.payload.messages;
    },
    addMessage: (state, action: PayloadAction<{ roomId: string; message: ChatMessage }>) => {
      const { roomId, message } = action.payload;
      if (!state.messages[roomId]) {
        state.messages[roomId] = [];
      }
      state.messages[roomId].push(message);

      // Update last message in room
      const roomIndex = state.rooms.findIndex(r => r.id === roomId);
      if (roomIndex !== -1) {
        state.rooms[roomIndex].lastMessage = message;
      }
    },
    updateMessageStatus: (
      state,
      action: PayloadAction<{
        roomId: string;
        messageId: string;
        status: ChatMessage['status'];
      }>,
    ) => {
      const { roomId, messageId, status } = action.payload;
      const messages = state.messages[roomId];
      if (messages) {
        const messageIndex = messages.findIndex(m => m.id === messageId);
        if (messageIndex !== -1) {
          messages[messageIndex].status = status;
        }
      }
    },
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setTypingUser: (state, action: PayloadAction<{ roomId: string; userId: string }>) => {
      const { roomId, userId } = action.payload;
      if (!state.typingUsers[roomId]) {
        state.typingUsers[roomId] = [];
      }
      if (!state.typingUsers[roomId].includes(userId)) {
        state.typingUsers[roomId].push(userId);
      }
    },
    removeTypingUser: (state, action: PayloadAction<{ roomId: string; userId: string }>) => {
      const { roomId, userId } = action.payload;
      if (state.typingUsers[roomId]) {
        state.typingUsers[roomId] = state.typingUsers[roomId].filter(id => id !== userId);
      }
    },
    incrementUnreadCount: (state, action: PayloadAction<string>) => {
      const roomIndex = state.rooms.findIndex(r => r.id === action.payload);
      if (roomIndex !== -1) {
        state.rooms[roomIndex].unreadCount += 1;
      }
    },
    resetUnreadCount: (state, action: PayloadAction<string>) => {
      const roomIndex = state.rooms.findIndex(r => r.id === action.payload);
      if (roomIndex !== -1) {
        state.rooms[roomIndex].unreadCount = 0;
      }
    },
    clearChat: () => initialState,
  },
});

export const {
  setRooms,
  addRoom,
  setActiveRoom,
  setMessages,
  addMessage,
  updateMessageStatus,
  setConnectionStatus,
  setTypingUser,
  removeTypingUser,
  incrementUnreadCount,
  resetUnreadCount,
  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;
