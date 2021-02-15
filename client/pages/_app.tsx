import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { createClient, Provider, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { updateQuery } from '../utils/updateQuery';
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql';


const client = createClient({
    url: 'http://localhost:5000/graphql',
    fetchOptions: {
        credentials: 'include'
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
                }
            }
        }
    }), fetchExchange]

});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider value={client}>
            <Component {...pageProps} />
        </Provider>
    )
}


export default MyApp