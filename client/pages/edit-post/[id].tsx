import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap'
import Box from '../../components/Box'
import Layout from '../../components/Layout'
import { InputCreatePost, useGetSinglePostQuery, useUpdatePostMutation } from '../../generated/graphql'
import { createUrlClient } from '../../utils/createUrqlClient'



const EditPage = () => {
    const router = useRouter()
    const id = router.query.id as string;
    const [{ data: updateData, fetching: updateFetching }, updatePost] = useUpdatePostMutation()

    const [{ data, fetching }] = useGetSinglePostQuery({
        variables: {
            id
        }
    })

    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string | undefined>("")
    const handleTitleChange = (e: any) => setTitle(e.target.value)
    const handleBobyChange = (e: any) => setBody(e.target.value)

    useEffect(() => {
        if (!fetching) {
            if (data?.getSinglePost.posts) {
                setTitle(data.getSinglePost.posts[0].title as string)
                setBody(data.getSinglePost.posts[0].body as string)
            } else {
                setTitle("")
                setBody("")
            }
        }
    }, [data, fetching])

    useEffect(() => {
        if (!updateFetching && updateData) {
            if (updateData.updatePost.type.includes("Sucess"))
                router.back()
        } else {
            setErrorMessage(updateData?.updatePost.message)
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




    const handleSubmit = async (e: any) => {
        const options = {
            body,
            title,
            postId: id
        } as InputCreatePost

        e.preventDefault()
        await updatePost({ options })

    }

    return (
        <Layout title="Edit Post">
            <Container fluid className="d-flex align-items-center justify-content-center mt-3" >
                <Box>
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    <Form className="w-100" onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter title"
                                value={title!}
                                onChange={handleTitleChange}
                                required />

                        </Form.Group>
                        <Form.Group controlId="body">
                            <Form.Label>Body</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter body"
                                value={body!} onChange={handleBobyChange} required />
                        </Form.Group>
                        <Button block variant="danger" type="submit">
                            Edit Post
                </Button>
                    </Form>
                </Box>
            </Container>
        </Layout>
    )
}

export default withUrqlClient(createUrlClient)(EditPage)
