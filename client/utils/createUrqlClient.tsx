import { cacheExchange } from '@urql/exchange-graphcache';
import { dedupExchange, fetchExchange } from "urql";
import { CreatePostMutation, GetPostsDocument, GetPostsQuery, LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation, ResetPasswordMutation } from "../generated/graphql";
import { updateQuery } from "./updateQuery";


export const createUrlClient = (ssrExchange: any) => {

    return {
        url: 'http://localhost:5000/graphql',
        fetchOptions: {
            credentials: 'include' as const
        },
        exchanges: [dedupExchange, cacheExchange({
            keys: {
                UserResponse: () => null,
                Message: () => null,
                PostResponse: () => null,
            },
            updates: {
                Mutation: {
                    logout: (_result, _, cache) => {
                        updateQuery<LogoutMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            _result,
                            () => {
                                return {
                                    __typename: "Query",
                                    me: {
                                        __typename: "UserResponse",
                                        message: {
                                            message: "User loged out",
                                            type: "Logout"
                                        },
                                        user: null
                                    }
                                }
                            })
                    },
                    createPost: (_result, _, cache) => {
                        updateQuery<CreatePostMutation, GetPostsQuery>(
                            cache,
                            { query: GetPostsDocument },
                            _result,
                            (result, query) => {
                                if (!result.createPost.posts) {
                                    return query;
                                } else {

                                    return {
                                        __typename: "Query",
                                        getPost: {
                                            __typename: "PostResponse",
                                            posts: [...result.createPost.posts, ...query.getPost.posts!]
                                        }
                                    }
                                }
                            })
                    },
                    login: (_result, _, cache) => {
                        updateQuery<LoginMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            _result,
                            (result, query) => {
                                if (!result.login.user) {
                                    return query;
                                } else {
                                    return {
                                        __typename: "Query",
                                        me: {
                                            __typename: "UserResponse",
                                            user: result.login.user
                                        }
                                    }
                                }
                            }
                        )
                    },
                    register: (_result, _, cache) => {
                        updateQuery<RegisterMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            _result,
                            (result, query) => {
                                if (!result.register.user) {
                                    return query;
                                } else {
                                    return {
                                        __typename: "Query",
                                        me: {
                                            __typename: "UserResponse",
                                            user: result.register.user
                                        }
                                    }
                                }
                            }
                        )
                    },
                    resetPassword: (_result, _, cache) => {
                        updateQuery<ResetPasswordMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            _result,
                            (result, query) => {
                                if (result.resetPassword.message) {
                                    return query;
                                } else {
                                    return {
                                        __typename: "Query",
                                        me: {
                                            __typename: "UserResponse",
                                            user: result.resetPassword.user
                                        }
                                    }
                                }
                            }
                        )
                    }
                }
            }
        }),
            ssrExchange,
            fetchExchange]

    }
}