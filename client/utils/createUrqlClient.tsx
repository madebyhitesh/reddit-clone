import { cacheExchange } from '@urql/exchange-graphcache';
import { dedupExchange, fetchExchange } from "urql";
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation, ResetPasswordMutation } from "../generated/graphql";
import { updateQuery } from "./updateQuery";


export const createUrlClient = (ssrExchange: any) => {

    return {
        url: 'http://localhost:5000/graphql',
        fetchOptions: {
            credentials: 'include' as const
        },
        exchanges: [dedupExchange, cacheExchange({
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
                    login: (_result, _, cache) => {
                        updateQuery<LoginMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            _result,
                            (result, query) => {
                                if (result.login.message) {
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
                                if (result.register.message) {
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