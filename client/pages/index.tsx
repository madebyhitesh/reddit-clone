import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import React, { useState } from 'react'
import { Button, Card, Container, NavLink, Spinner } from 'react-bootstrap'

import CreatePostModal from '../components/CreatePostModal'
import EditDeleteButtons from '../components/EditDeleteButtons'
import Layout from '../components/Layout'
import VoteButtons from '../components/VoteButtons'
import { useGetPostsQuery } from '../generated/graphql'
import { createUrlClient } from '../utils/createUrqlClient'
const IndexPage = () => {
  const [variables, setVariables] = useState({ cursor: null })
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [{ data, fetching, }] = useGetPostsQuery({
    variables
  })

  const handleCreatePostToggle = () => setShowCreatePost(!showCreatePost)

  if (!data) {

    return (
      <Layout title="Index">
        <h1>No data found</h1>
      </Layout>
    )
  }

  if (!data.getPost.posts) {

    return (
      <Layout title="Index">
        <h1>No data found</h1>
      </Layout>
    )
  }

  const cursor = data.getPost.posts.length - 1;

  return (
    <Layout title="Reddit Clone | Typescript | Nextjs ">


      {/* create post */}
      <Container className="mt-3 d-flex" fluid>
        <Button as="button" variant="danger" className="ml-auto" onClick={handleCreatePostToggle}>Create Post</Button>


        <CreatePostModal isVisible={showCreatePost} handleClose={handleCreatePostToggle} />
      </Container>

      {/* display data here */}
      <Container fluid>
        {
          data.getPost.posts.length > 0 && data.getPost.posts.map((post) => (
            <Card key={post._id} className="mt-2">
              <Container fluid className="py-2 px-1 d-flex m-0">
                <VoteButtons postId={post._id} hasVote={post.hasVote} points={post.points} />
                <Card.Body className="p-0" style={{ flex: 1 }}>
                  <Container fluid className="d-flex p-0 m-0">
                    <div className="p-0 m-0">
                      <NextLink href={{ pathname: "/post/[slug]", query: { slug: post._id } }}>
                        <NavLink href={`/post/${post._id}`} className="p-0 m-0">
                          <Card.Title className="m-0 p-0">
                            <strong>{post.title}</strong><br></br>
                          </Card.Title>
                        </NavLink>
                      </NextLink>
                      <p className="p-0 m-0">by {post.creatorId.username}</p>
                    </div>
                    <EditDeleteButtons id={post._id} creatorId={post.creatorId._id} />
                  </Container>
                  <Card.Text className="mt-1">{post.textSnippet}</Card.Text>
                </Card.Body>
              </Container>
            </Card>
          ))
        }
      </Container>
      <Container className="my-3 d-flex align-items-center justify-content-center">
        <Button variant="outline-danger" onClick={() => {
          if (data.getPost.posts) {
            setVariables({
              cursor: data.getPost.posts[cursor - 1].createdAt
            })
          }
        }}> {fetching ? <Spinner animation="border" /> : "Load More"}</Button>
      </Container>
    </Layout >
  )
}


export default withUrqlClient(createUrlClient, { ssr: true })(IndexPage)