import { cacheExchange, Resolver } from '@urql/exchange-graphcache';
import { dedupExchange, fetchExchange, stringifyVariables } from "urql";
import { CreatePostMutation, DeletePostMutationVariables, GetPostsDocument, GetPostsQuery, LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation, ResetPasswordMutation, UpdatePostMutationVariables, VoteMutationVariables } from "../generated/graphql";
import { isServer } from './isServer';
import { updateQuery } from "./updateQuery";


const cursorPagination = (): Resolver => {
    return (_parent, fieldArgs, cache, info) => {
        const { parentKey: entityKey, fieldName } = info;
        // console.log("info", info);
        // console.log("cache", cache)
        const allFields = cache.inspectFields(entityKey);
        // console.log("allFeilds", allFields)
        const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
        const size = fieldInfos.length;
        if (size === 0) {
            return undefined;
        }

        const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
        const isItInTheCache = cache.resolve(
            cache.resolve(entityKey, fieldKey) as string,
            "posts"
        );
        info.partial = !isItInTheCache;
        const results: string[] = [];
        fieldInfos.forEach((fi) => {
            const key = cache.resolve(entityKey, fi.fieldKey) as string;
            const data = cache.resolve(key, "posts") as string[];
            // const _hasMore = cache.resolve(key, "hasMore");

            results.push(...data);
        });
        // console.log("result", results)
        return {
            __typename: "PostResponse",
            posts: results,

        };
    };
};


export const createUrlClient = (ssrExchange: any, ctx: any) => {
    let cookie = null;
    if (ctx && isServer()) {
        cookie = ctx.req.headers.cookie
    }

    return {
        url: process.env.PORT || 'http://localhost:5000/graphql',
        fetchOptions: {
            credentials: 'include' as const,
            headers: {
                cookie
            }
        },
        exchanges: [dedupExchange, cacheExchange({
            keys: {
                UserResponse: () => null,
                Message: () => null,
                PostResponse: () => null,
                VoteStatusResponse: () => null
            },
            resolvers: {

                Query: {
                    getPost: cursorPagination()
                }
            },
            updates: {
                Mutation: {
                    vote: (_result, args, cache) => {
                        cache.invalidate({
                            __typename: "Query",
                            posts: {
                                __typename: "PostResponse",
                                _id: (args as VoteMutationVariables).postId
                            }
                        })
                    },
                    deletePost: (_result, args, cache) => {

                        cache.invalidate({
                            __typename: "Query",
                            posts: {
                                __typename: "PostResponse",
                                _id: (args as DeletePostMutationVariables).id
                            }
                        })
                    },
                    updatePost: (_result, args, cache) => {

                        cache.invalidate({
                            __typename: "Query",
                            posts: {
                                __typename: "PostResponse",
                                _id: (args as UpdatePostMutationVariables).options.postId
                            }
                        })
                    },
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
                        cache.invalidate({ __typename: "Query" })
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