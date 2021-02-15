import React, { useState } from "react"
import { Modal, Form, Button, Alert } from "react-bootstrap"
import { useRegisterMutation } from "../generated/graphql"
import { IFormModal } from "../interfaces"

const RegisterModal: React.FC<IFormModal> = ({ isVisible, handleClose }) => {

    const [_, register] = useRegisterMutation()
    const [username, setUsername] = useState<string | null>("")
    const [password, setPassword] = useState<string | null>("")
    const [errorMessage, setErrorMessage] = useState<string | null>("")

    const handleUsernameChange = (e: any) => setUsername(e.target.value)
    const handlePasswordChange = (e: any) => setPassword(e.target.value)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (username && password) {
            try {
                const response = await register({ username, password })
                const data = response.data?.register
                console.log(data)
                if (data?.user) {
                    //if register is sucessfull set token received in localstorage
                    localStorage.setItem("x-auth-token-redit", data.token!)
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
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}
                <Form className="w-100" onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username!} onChange={handleUsernameChange} required />
                        <Form.Text className="text-muted">
                            We'll never share your detials with anyone else.
                    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password!} onChange={handlePasswordChange} required />
                    </Form.Group>

                    <Button block variant="primary" type="submit">
                        Register
                </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default RegisterModal
