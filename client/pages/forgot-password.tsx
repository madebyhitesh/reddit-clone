import { withUrqlClient } from 'next-urql'
import React, { useState } from 'react'
import { Form, Button, Spinner, Alert } from 'react-bootstrap'
import Box from '../components/Box'
import Layout from '../components/Layout'
import { useForgotPasswordMutation } from '../generated/graphql'
import { createUrlClient } from '../utils/createUrqlClient'


const ForgotPassword: React.FC = ({ }) => {
    const [{ fetching, data }, forgotPassword] = useForgotPasswordMutation()
    const [email, setEmail] = useState("")
    const handleEmailChange = (e: any) => setEmail(e.target.value)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const options = {
            email
        }

        await forgotPassword(options)

    }

    return (
        <Layout title="Forgot Passpord">
            <Box size="medium" className="mx-auto mt-3 p-2">
                <Form className="w-100" onSubmit={handleSubmit}>
                    {data?.forgotPassword && <Alert variant="primary">Email send successfully</Alert>}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"
                            placeholder="Enter email"
                            value={email!}
                            onChange={handleEmailChange}
                            required />
                    </Form.Group>
                    <Button block variant="danger" type="submit">
                        {fetching ? <Spinner animation="border" size="sm" /> : "Send Link"}
                    </Button>
                </Form>
            </Box>
        </Layout>
    )
}


export default withUrqlClient(createUrlClient)(ForgotPassword)
