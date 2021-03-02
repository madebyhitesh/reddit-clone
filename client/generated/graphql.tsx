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
  getPost: PostResponse;
  getSinglePost: PostResponse;
  me: UserResponse;
  getVoteStatus: VoteStatusResponse;
};


export type QueryGetPostArgs = {
  cursor?: Maybe<Scalars['DateTime']>;
};


export type QueryGetSinglePostArgs = {
  id: Scalars['String'];
};


export type QueryGetVoteStatusArgs = {
  postId: Scalars['String'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  message?: Maybe<Message>;
  posts?: Maybe<Array<Post>>;
};

export type Message = {
  __typename?: 'Message';
  type: Scalars['String'];
  message: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['String'];
  hasVote?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  textSnippet: Scalars['String'];
  creatorId: User;
  points: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  createdAt: Scalars['DateTime'];
  count: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};


export type UserResponse = {
  __typename?: 'UserResponse';
  message?: Maybe<Message>;
  user?: Maybe<Array<User>>;
};

export type VoteStatusResponse = {
  __typename?: 'VoteStatusResponse';
  message?: Maybe<Message>;
  vote?: Maybe<Vote>;
};

export type Vote = {
  __typename?: 'Vote';
  _id: Scalars['String'];
  userId: User;
  postId: Post;
  vote: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: PostResponse;
  deletePost: Message;
  updatePost: Message;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  deleteUser: Message;
  resetPassword: UserResponse;
  logout: Scalars['Boolean'];
  vote: Message;
};


export type MutationCreatePostArgs = {
  options: InputCreatePost;
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  options: InputCreatePost;
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


export type MutationVoteArgs = {
  vote: Scalars['Int'];
  postId: Scalars['String'];
};

export type InputCreatePost = {
  title: Scalars['String'];
  body: Scalars['String'];
  postId: Scalars['String'];
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

export type PostResponseFragment = (
  { __typename?: 'PostResponse' }
  & { message?: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'type' | 'message'>
  )>, posts?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, '_id' | 'title' | 'hasVote' | 'points' | 'textSnippet' | 'body' | 'createdAt' | 'updatedAt'>
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

export type DeletePostMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & { deletePost: (
    { __typename?: 'Message' }
    & Pick<Message, 'type' | 'message'>
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

export type UpdatePostMutationVariables = Exact<{
  options: InputCreatePost;
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost: (
    { __typename?: 'Message' }
    & Pick<Message, 'type' | 'message'>
  ) }
);

export type VoteMutationVariables = Exact<{
  vote: Scalars['Int'];
  postId: Scalars['String'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & { vote: (
    { __typename?: 'Message' }
    & Pick<Message, 'type' | 'message'>
  ) }
);

export type GetPostsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['DateTime']>;
}>;


export type GetPostsQuery = (
  { __typename?: 'Query' }
  & { getPost: (
    { __typename?: 'PostResponse' }
    & PostResponseFragment
  ) }
);

export type GetSinglePostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetSinglePostQuery = (
  { __typename?: 'Query' }
  & { getSinglePost: (
    { __typename?: 'PostResponse' }
    & PostResponseFragment
  ) }
);

export type GetVoteStatusQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type GetVoteStatusQuery = (
  { __typename?: 'Query' }
  & { getVoteStatus: (
    { __typename?: 'VoteStatusResponse' }
    & { message?: Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, 'type' | 'message'>
    )>, vote?: Maybe<(
      { __typename?: 'Vote' }
      & Pick<Vote, '_id' | 'vote'>
    )> }
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
    hasVote
    points
    textSnippet
    creatorId {
      _id
      username
    }
    body
    createdAt
    updatedAt
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
export const DeletePostDocument = gql`
    mutation DeletePost($id: String!) {
  deletePost(id: $id) {
    type
    message
  }
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
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
export const UpdatePostDocument = gql`
    mutation UpdatePost($options: InputCreatePost!) {
  updatePost(options: $options) {
    type
    message
  }
}
    `;

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument);
};
export const VoteDocument = gql`
    mutation Vote($vote: Int!, $postId: String!) {
  vote(vote: $vote, postId: $postId) {
    type
    message
  }
}
    `;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
};
export const GetPostsDocument = gql`
    query GetPosts($cursor: DateTime) {
  getPost(cursor: $cursor) {
    ...PostResponse
  }
}
    ${PostResponseFragmentDoc}`;

export function useGetPostsQuery(options: Omit<Urql.UseQueryArgs<GetPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostsQuery>({ query: GetPostsDocument, ...options });
};
export const GetSinglePostDocument = gql`
    query GetSinglePost($id: String!) {
  getSinglePost(id: $id) {
    ...PostResponse
  }
}
    ${PostResponseFragmentDoc}`;

export function useGetSinglePostQuery(options: Omit<Urql.UseQueryArgs<GetSinglePostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSinglePostQuery>({ query: GetSinglePostDocument, ...options });
};
export const GetVoteStatusDocument = gql`
    query GetVoteStatus($postId: String!) {
  getVoteStatus(postId: $postId) {
    message {
      type
      message
    }
    vote {
      _id
      vote
    }
  }
}
    `;

export function useGetVoteStatusQuery(options: Omit<Urql.UseQueryArgs<GetVoteStatusQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetVoteStatusQuery>({ query: GetVoteStatusDocument, ...options });
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