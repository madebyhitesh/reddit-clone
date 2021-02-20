import React, { useState } from "react"
import { Alert, Button, Form, Modal } from "react-bootstrap"
import { useCreatePostMutation } from "../generated/graphql"
import { IFormModal } from "../interfaces"


const CreatePostModal: React.FC<IFormModal> = ({ isVisible, handleClose }) => {
    const [, createPost] = useCreatePostMutation()

    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string | null>("")
    const handleTitleChange = (e: any) => setTitle(e.target.value)
    const handleBobyChange = (e: any) => setBody(e.target.value)


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        //creting a post
        const data = await createPost({ options: { title, body } })
        const error = data.data?.createPost.message?.message
        if (error) {
            setErrorMessage(error)
        } else {
            // clearing the input
            setTitle("")
            setBody("")
            // closing the modal on success
            handleClose()
        }
    }


    return (
        <Modal show={isVisible} onHide={handleClose} >
            <Modal.Header closeButton className="bg-light-black text-light">
                <Modal.Title>Create Post</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light-black text-light">
                {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}
                <Form className="w-100" onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text"
                            className="bg-black"
                            placeholder="Enter title"
                            value={title!}
                            onChange={handleTitleChange}
                            required />

                    </Form.Group>
                    <Form.Group controlId="body">
                        <Form.Label>Body</Form.Label>
                        <Form.Control as="textarea" rows={3} className="bg-black" placeholder="Enter body"
                            value={body!} onChange={handleBobyChange} required />
                    </Form.Group>
                    <Button block variant="danger" type="submit">
                        Create Post
                </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default CreatePostModal