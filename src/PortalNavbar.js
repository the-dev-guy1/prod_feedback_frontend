import React from "react";
import { Button, Nav } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { useAuth } from './context/AuthContext'; // Import useAuth

const PortalNavbar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth(); // Get the logout function from useAuth

    const navigateToFeedbackList = () => {
        navigate('/');
    }

    const navigateToFeedbackForm = () => {
        navigate('/feedback/create');
    }

    return (
        <React.Fragment>
            <Navbar bg="dark" expand="lg" className="navbar-dark">
                <Container>
                    <Navbar.Brand>Product Feedback Tool | Portal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link onClick={navigateToFeedbackList}>Feedback List</Nav.Link>
                            <Nav.Link onClick={navigateToFeedbackForm}>Feedback Form</Nav.Link>
                            {/* Add Logout Button */}
                            <Nav.Link>
                                <Button className="btn-warning" onClick={() => logout()}>
                                    Logout
                                </Button>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    );
}

export default PortalNavbar;
