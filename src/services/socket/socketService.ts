import { io, Socket } from 'socket.io-client';
import { store } from '@store/index';
import {
  addMessage,
  setConnectionStatus,
  setTypingUser,
  removeTypingUser,
  updateMessageStatus,
} from '@store/slices/chatSlice';
import { SOCKET_URL } from '@constants/config';
import type { ChatMessage } from '@types/index';

class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect(token: string): void {
    if (this.socket?.connected) return;

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
    });

    this.setupListeners();
  }

  private setupListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      store.dispatch(setConnectionStatus(true));
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', () => {
      store.dispatch(setConnectionStatus(false));
    });

    this.socket.on('connect_error', () => {
      this.reconnectAttempts++;
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        this.disconnect();
      }
    });

    this.socket.on('message:new', (message: ChatMessage) => {
      store.dispatch(addMessage({ roomId: message.receiverId, message }));
    });

    this.socket.on('message:status', (data: { roomId: string; messageId: string; status: ChatMessage['status'] }) => {
      store.dispatch(updateMessageStatus(data));
    });

    this.socket.on('user:typing', (data: { roomId: string; userId: string }) => {
      store.dispatch(setTypingUser(data));
      setTimeout(() => {
        store.dispatch(removeTypingUser(data));
      }, 3000);
    });
  }

  sendMessage(roomId: string, content: string, type: ChatMessage['type'] = 'text'): void {
    this.socket?.emit('message:send', { roomId, content, type });
  }

  sendTyping(roomId: string): void {
    this.socket?.emit('user:typing', { roomId });
  }

  joinRoom(roomId: string): void {
    this.socket?.emit('room:join', { roomId });
  }

  leaveRoom(roomId: string): void {
    this.socket?.emit('room:leave', { roomId });
  }

  markAsRead(roomId: string, messageIds: string[]): void {
    this.socket?.emit('message:read', { roomId, messageIds });
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
    store.dispatch(setConnectionStatus(false));
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

export const socketService = new SocketService();
