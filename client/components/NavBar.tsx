import React, { useState } from 'react'

import { Navbar, Nav, Button } from 'react-bootstrap'
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';



const NavBar = () => {
    const [, logout] = useLogoutMutation();
    const [{ fetching, data }] = useMeQuery();
    const [show, setShow] = useState<boolean>(false);
    const [showLogin, setLoginShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLoginClose = () => setLoginShow(false);
    const handleLoginShow = () => setLoginShow(true);
    let body;

    if (fetching)
        body = null;
    else if (data?.me.user) {
        body = (
            <div className="logout">
                <p className=" text-light mr-2">Welcome {data?.me.user && data?.me.user[0].username}</p>
                <Button variant="danger" onClick={() => logout()}>LogOut</Button>
            </div>
        )
    } else {
        body = (
            <div>
                <Button variant="outline-danger" onClick={handleShow}>Register </Button>
                <Button variant="danger" className="ml-2" onClick={handleLoginShow}>Login </Button>
            </div>
        )
    }

    return (
        <>
            <Navbar bg="dark" collapseOnSelect expand="lg" variant="dark">
                <Navbar.Brand href="/" ><h2 className="text-danger">Reddit</h2></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="mr-auto" activeKey="/">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/">Post</Nav.Link>
                        <Nav.Link href="/">Awards</Nav.Link>
                    </Nav>
                    {
                        body
                    }
                </Navbar.Collapse>
            </Navbar>
            {/* register model */}
            <RegisterModal isVisible={show} handleClose={handleClose} />
            {/* login modal */}
            <LoginModal isVisible={showLogin} handleClose={handleLoginClose} />
        </>
    )
}

export default NavBar
