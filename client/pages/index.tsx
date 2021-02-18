import { withUrqlClient } from 'next-urql'
import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreatePostModal from '../components/CreatePostModal'
import Layout from '../components/Layout'
import LoginModal from '../components/LoginModal'
import { useGetPostsQuery } from '../generated/graphql'
import { createUrlClient } from '../utils/createUrqlClient'
import useIsAuth from '../utils/useIsAuth'

const IndexPage = () => {
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [{ data }] = useGetPostsQuery()

  const { isLogged } = useIsAuth()

  const handleCreatePostToggle = () => setShowCreatePost(!showCreatePost)




  return (
    <Layout title="Reddit Clone | Typescript | Nextjs ">


      {/* create post */}
      <Container className="mt-3 d-flex" fluid>
        <Button as="button" variant="danger" className="ml-auto" onClick={handleCreatePostToggle}>Create Post</Button>
        {
          !isLogged() ?
            <LoginModal isVisible={showCreatePost} handleClose={handleCreatePostToggle} />
            :
            <CreatePostModal isVisible={showCreatePost} handleClose={handleCreatePostToggle} />

        }
      </Container>

      {/* display data here */}
      <Container fluid>
        {
          data?.getPost.posts?.map((post) => (
            <div key={post._id}>
              {
                post.title
              }
            </div>
          ))
        }

      </Container>
    </Layout>
  )
}


export default withUrqlClient(createUrlClient, { ssr: true })(IndexPage)