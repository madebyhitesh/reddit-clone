import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import Box from '../../components/Box'
import Layout from '../../components/Layout'
import { useResetPasswordMutation } from '../../generated/graphql'
import { createUrlClient } from '../../utils/createUrqlClient'



const ResetPassword: React.FC = () => {
    const router = useRouter()
    const token = router.query.token as string;
    const [{ data, fetching }, resetPassword] = useResetPasswordMutation()
    const [newPassword, setNewPassword] = useState<any>("")
    const handlePasswordChange = (e: any) => setNewPassword(e.target.value)
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await resetPassword({ token, newPassword })
        setNewPassword("")
        router.replace("/")

    }


    console.log(data?.resetPassword)


    return (
        <Layout title="Reset Passpord">
            <Box size="medium" className="mx-auto mt-3 p-2">
                {token ?
                    <Form className="w-100" onSubmit={handleSubmit}>
                        {data?.resetPassword.message && <Alert>{data.resetPassword.message.message}</Alert>}
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password"
                                placeholder="Enter new password"
                                value={newPassword!}
                                onChange={handlePasswordChange}
                                required />
                        </Form.Group>
                        <Button block variant="danger" type="submit">
                            {fetching ? <Spinner animation="border" size="sm" /> : "Reset"}
                        </Button>
                    </Form> : <h1>Unautorized</h1>}
            </Box>
        </Layout>
    )
}


export default withUrqlClient(createUrlClient, { ssr: false })(ResetPassword)
