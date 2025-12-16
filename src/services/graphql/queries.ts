import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    me {
      id
      email
      firstName
      lastName
      avatar
      bio
      phone
      createdAt
    }
  }
`;

export const GET_CHAT_ROOMS = gql`
  query GetChatRooms {
    chatRooms {
      id
      participants {
        id
        firstName
        lastName
        avatar
      }
      lastMessage {
        id
        content
        timestamp
      }
      unreadCount
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages($roomId: ID!, $page: Int, $limit: Int) {
    messages(roomId: $roomId, page: $page, limit: $limit) {
      data {
        id
        senderId
        content
        type
        timestamp
        status
      }
      hasMore
      total
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription OnNewMessage($roomId: ID!) {
    messageAdded(roomId: $roomId) {
      id
      senderId
      content
      type
      timestamp
      status
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($roomId: ID!, $content: String!, $type: String) {
    sendMessage(roomId: $roomId, content: $content, type: $type) {
      id
      senderId
      content
      type
      timestamp
      status
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      firstName
      lastName
      bio
      phone
      avatar
    }
  }
`;
