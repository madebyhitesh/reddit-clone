import { withUrqlClient } from 'next-urql'
import { useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import CreatePostModal from '../components/CreatePostModal'
import Layout from '../components/Layout'
import { useGetPostsQuery } from '../generated/graphql'
import { createUrlClient } from '../utils/createUrqlClient'

const IndexPage = () => {
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [{ data }] = useGetPostsQuery()

  const handleCreatePostToggle = () => setShowCreatePost(!showCreatePost)




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
          data?.getPost.posts?.map((post) => (
            <Card key={post._id} className="mt-2">
              <Card.Body>
                <Card.Title>{post.title} <span className="lead">by {post.creatorId.username}</span></Card.Title>
                <Card.Text>{post.body}</Card.Text>
              </Card.Body>
            </Card>
          ))
        }
        {data?.getPost.posts?.length}
      </Container>
    </Layout>
  )
}


export default withUrqlClient(createUrlClient, { ssr: true })(IndexPage)