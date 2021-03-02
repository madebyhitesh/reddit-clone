import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { ArrowDownSquare, ArrowUpSquare } from 'react-bootstrap-icons'
import { PostResponseFragment, useVoteMutation } from '../generated/graphql'
import { createUrlClient } from '../utils/createUrqlClient'

interface Props {
    post: any
}

const PostContainer: NextPage<Props> = ({ post }) => {

    const [, vote] = useVoteMutation()
    return (

        <Card key={post._id} className="mt-2">
            <Container className="py-2 px-1 d-flex m-0">
                <div className="points d-flex flex-column align-items-center mr-2 justify-content-center">
                    <ArrowUpSquare cursor="pointer"
                        color={post.hasVote === 1 ? "green" : "black"}
                        size={24}
                        onClick={() => vote({ postId: post._id, vote: 1 })} />
                    {post.points}
                    <ArrowDownSquare cursor="pointer"
                        color={post.hasVote === -1 ? "red" : "black"}
                        size={24} onClick={() => vote({ postId: post._id, vote: -1 })} />
                </div>
                <Card.Body className="p-0">
                    <Card.Title>
                        <strong>{post.title}</strong><br></br><span className="lead">by {post.creatorId.username}</span>
                    </Card.Title>
                    <Card.Text>{post.textSnippet}</Card.Text>
                </Card.Body>
            </Container>
        </Card>
    )
}



export default withUrqlClient(createUrlClient)(PostContainer)
