import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { Container, Spinner } from 'react-bootstrap'
import EditDeleteButtons from '../../components/EditDeleteButtons'
import Layout from '../../components/Layout'
import VoteButtons from '../../components/VoteButtons'
import { Post, useGetSinglePostQuery } from '../../generated/graphql'
import { createUrlClient } from '../../utils/createUrqlClient'



const SinglePostPage = () => {
    const router = useRouter()
    const id = router.query.id as string;
    const [{ data, fetching }] = useGetSinglePostQuery({
        variables: {
            id
        }
    })

    if (fetching) {
        return (
            <Layout>
                <Container fluid className="align-items-center justify-content-center d-flex mt-2">
                    <Spinner animation="border" />
                </Container>
            </Layout>
        )
    }

    if (!data) {
        return (
            <Layout>
                <Container fluid className="align-items-center justify-content-center d-flex mt-2">
                    <h2>Something went wrong</h2>
                </Container>
            </Layout>
        )
    }

    if (!data.getSinglePost.posts) {
        return (
            <Layout>
                <Container fluid className="align-items-center justify-content-center d-flex mt-2">
                    <h2>{data.getSinglePost.message?.message}</h2>
                </Container>
            </Layout>
        )
    }
    const post = data.getSinglePost.posts[0] as Post

    return (
        <Layout>
            {/* display data here */}
            <Container fluid>
                <Container className="py-2 px-1 d-flex m-0">
                    <VoteButtons postId={post._id} hasVote={post.hasVote} points={post.points} />
                    <Container className="p-0">
                        <div className="d-flex">

                            <h2>
                                <strong>{post.title}</strong><br></br><span className="lead">by {post.creatorId.username}</span>
                            </h2>
                            <EditDeleteButtons id={post._id} creatorId={post.creatorId._id} />
                        </div>
                        <p>{post.body}</p>
                    </Container>
                </Container>
            </Container>
        </Layout>
    )
}

export default withUrqlClient(createUrlClient)(SinglePostPage)
