import React, { useState } from "react"
import { Modal, Form, Button, Alert } from "react-bootstrap"
import { useRegisterMutation } from "../generated/graphql"
import { IFormModal } from "../interfaces"

const RegisterModal: React.FC<IFormModal> = ({ isVisible, handleClose }) => {

    const [_, register] = useRegisterMutation()
    const [username, setUsername] = useState<string | null>("")
    const [password, setPassword] = useState<string | null>("")
    const [email, setEmail] = useState<string | null>("")
    const [errorMessage, setErrorMessage] = useState<string | null>("")

    const handleUsernameChange = (e: any) => setUsername(e.target.value)
    const handlePasswordChange = (e: any) => setPassword(e.target.value)
    const handleEmailChange = (e: any) => setEmail(e.target.value)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (username && password) {
            try {
                const response = await register({ options: { email: email!, username, password } })
                const data = response.data?.register
                console.log(data)
                if (data?.user) {

                    //clear the input feilds
                    setUsername("")
                    setPassword("")
                    //clear the errors
                    setErrorMessage("")
                    //close the modal
                    handleClose()
                } else {
                    //if registeration fails show error
                    setErrorMessage(data!.message!.message)
                }

            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Modal show={isVisible} onHide={handleClose}>
            <Modal.Header closeButton className="bg-light-black text-light">
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light-black text-light">
                {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}
                <Form className="w-100" onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className="bg-black" type="text" placeholder="Enter Email" value={email!} onChange={handleEmailChange} required />

                    </Form.Group>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control className="bg-black" type="text" placeholder="Enter username" value={username!} onChange={handleUsernameChange} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="bg-black" type="password" placeholder="Password" value={password!} onChange={handlePasswordChange} required />
                    </Form.Group>

                    <Button block variant="danger" type="submit">
                        Register
                </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default RegisterModal
