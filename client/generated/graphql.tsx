import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  me: UserResponse;
  getPost: PostResponse;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  message?: Maybe<Message>;
  user?: Maybe<Array<User>>;
};

export type Message = {
  __typename?: 'Message';
  type: Scalars['String'];
  message: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type PostResponse = {
  __typename?: 'PostResponse';
  message?: Maybe<Message>;
  posts?: Maybe<Array<Post>>;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  creatorId: User;
  points: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  deleteUser: Message;
  resetPassword: UserResponse;
  logout: Scalars['Boolean'];
  createPost: PostResponse;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationDeleteUserArgs = {
  username: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationCreatePostArgs = {
  options: InputCreatePost;
};

export type RegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type InputCreatePost = {
  title: Scalars['String'];
  body: Scalars['String'];
};

export type PostResponseFragment = (
  { __typename?: 'PostResponse' }
  & { message?: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'type' | 'message'>
  )>, posts?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, '_id' | 'title' | 'body'>
    & { creatorId: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'username'>
    ) }
  )>> }
);

export type UserResponseFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'username' | 'email'>
);

export type CreatePostMutationVariables = Exact<{
  options: InputCreatePost;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'PostResponse' }
    & PostResponseFragment
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  options: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { message?: Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, 'message'>
    )>, user?: Maybe<Array<(
      { __typename?: 'User' }
      & UserResponseFragment
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { message?: Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, 'message'>
    )>, user?: Maybe<Array<(
      { __typename?: 'User' }
      & UserResponseFragment
    )>> }
  ) }
);

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'UserResponse' }
    & { message?: Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, 'message'>
    )>, user?: Maybe<Array<(
      { __typename?: 'User' }
      & UserResponseFragment
    )>> }
  ) }
);

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = (
  { __typename?: 'Query' }
  & { getPost: (
    { __typename?: 'PostResponse' }
    & PostResponseFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'UserResponse' }
    & { message?: Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, 'type' | 'message'>
    )>, user?: Maybe<Array<(
      { __typename?: 'User' }
      & UserResponseFragment
    )>> }
  ) }
);

export const PostResponseFragmentDoc = gql`
    fragment PostResponse on PostResponse {
  message {
    type
    message
  }
  posts {
    _id
    title
    creatorId {
      _id
      username
    }
    body
  }
}
    `;
export const UserResponseFragmentDoc = gql`
    fragment UserResponse on User {
  _id
  username
  email
}
    `;
export const CreatePostDocument = gql`
    mutation CreatePost($options: InputCreatePost!) {
  createPost(options: $options) {
    ...PostResponse
  }
}
    ${PostResponseFragmentDoc}`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($options: LoginInput!) {
  login(options: $options) {
    message {
      message
    }
    user {
      ...UserResponse
    }
  }
}
    ${UserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    message {
      message
    }
    user {
      ...UserResponse
    }
  }
}
    ${UserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $newPassword: String!) {
  resetPassword(token: $token, newPassword: $newPassword) {
    message {
      message
    }
    user {
      ...UserResponse
    }
  }
}
    ${UserResponseFragmentDoc}`;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const GetPostsDocument = gql`
    query GetPosts {
  getPost {
    ...PostResponse
  }
}
    ${PostResponseFragmentDoc}`;

export function useGetPostsQuery(options: Omit<Urql.UseQueryArgs<GetPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostsQuery>({ query: GetPostsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    message {
      type
      message
    }
    user {
      ...UserResponse
    }
  }
}
    ${UserResponseFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};