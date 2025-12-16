import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@store/index';
import { setTokens, clearAuth } from '@store/slices/authSlice';
import { API_BASE_URL } from '@constants/config';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.tokens?.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.tokens?.refreshToken;

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        api.dispatch(setTokens(refreshResult.data as RootState['auth']['tokens']));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(clearAuth());
      }
    } else {
      api.dispatch(clearAuth());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Chat', 'Messages'],
  endpoints: builder => ({
    // User endpoints
    getProfile: builder.query({
      query: () => '/user/profile',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: body => ({
        url: '/user/profile',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    // Chat endpoints
    getChatRooms: builder.query({
      query: () => '/chat/rooms',
      providesTags: ['Chat'],
    }),
    getMessages: builder.query({
      query: ({ roomId, page = 1, limit = 50 }) =>
        `/chat/rooms/${roomId}/messages?page=${page}&limit=${limit}`,
      providesTags: ['Messages'],
    }),
    sendMessage: builder.mutation({
      query: ({ roomId, content, type = 'text' }) => ({
        url: `/chat/rooms/${roomId}/messages`,
        method: 'POST',
        body: { content, type },
      }),
      invalidatesTags: ['Messages'],
    }),

    // Search endpoint
    search: builder.query({
      query: ({ query, filters, page = 1, limit = 20 }) => ({
        url: '/search',
        params: { q: query, ...filters, page, limit },
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetChatRoomsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useSearchQuery,
  useLazySearchQuery,
} = apiSlice;
