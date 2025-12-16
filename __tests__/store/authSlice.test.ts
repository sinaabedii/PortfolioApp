import authReducer, { setUser, setTokens, clearAuth, clearError } from '@store/slices/authSlice';
import type { AuthState, User, AuthTokens } from '@types/index';

describe('authSlice', () => {
  const initialState: AuthState = {
    user: null,
    tokens: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  };

  const mockTokens: AuthTokens = {
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
    expiresAt: Date.now() + 3600000,
  };

  it('should return initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setUser', () => {
    const state = authReducer(initialState, setUser(mockUser));
    expect(state.user).toEqual(mockUser);
  });

  it('should handle setTokens', () => {
    const state = authReducer(initialState, setTokens(mockTokens));
    expect(state.tokens).toEqual(mockTokens);
    expect(state.isAuthenticated).toBe(true);
  });

  it('should handle clearAuth', () => {
    const authenticatedState: AuthState = {
      ...initialState,
      user: mockUser,
      tokens: mockTokens,
      isAuthenticated: true,
    };
    const state = authReducer(authenticatedState, clearAuth());
    expect(state).toEqual(initialState);
  });

  it('should handle clearError', () => {
    const stateWithError: AuthState = { ...initialState, error: 'Some error' };
    const state = authReducer(stateWithError, clearError());
    expect(state.error).toBeNull();
  });
});
