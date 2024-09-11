import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { AiOutlineFundProjectionScreen, AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { CgFileDocument } from 'react-icons/cg';
import { ImBlog } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Import the AuthContext
import API from '../../utilities/api';
import Profile from '../profile';
import './navbar.scss';
import useOutsideClick from '../../hooks/useOutsideClick';

function NavBar() {
    const [expand, setExpand] = useState(false);
    const [navbarColor, setNavbarColor] = useState(false);
    const { logout } = useAuth(); // Get user and logout function from AuthContext
    const navbarReference = useOutsideClick(()=> setExpand(false));
    const navigate = useNavigate();

    const [showProfile, setShowProfile] = useState(false);
    const handleCloseProfile = () => {
        setShowProfile(false);
        setExpand(false);
    };
    const handleShowProfile = () => {
        setShowProfile(true);
        setExpand(false);
    }
    
    const handleSignOut = async () => {
        try {
            const token = localStorage.getItem("token");
            await API.delete(`/auth/logout`, {
                headers: {"x-auth-token": token}
            });
            logout();
            navigate("/auth/signin");
        } catch (error) {
            console.log("🚀 ~ handleSignOut ~ error:", error)
        } finally {
            setExpand(false);
        }
        
    }

    useEffect(() => {
        const handleScroll = () => {
            window.scrollY >= 20 ? setNavbarColor(true) : setNavbarColor(false);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Navbar
            expanded={expand}
            fixed="top"
            expand="lg"
            className={navbarColor || expand ? 'sticky' : 'navbar'}
            ref={navbarReference}
        >
            <Container>
                <Navbar.Brand href="/" className="d-flex">
                    <span className='logo'>Moventure</span>
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    onClick={() => {
                        setExpand(expand ? false : 'expanded');
                    }}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto" defaultActiveKey="#home">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" onClick={() => setExpand(false)}>
                                <AiOutlineHome style={{ marginBottom: '2px' }} /> Home
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link
                                as={Link}
                                to="/about"
                                onClick={() => setExpand(false)}
                            >
                                <AiOutlineUser style={{ marginBottom: '2px' }} /> About
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link
                                as={Link}
                                to="/my-projects"
                                onClick={() => setExpand(false)}
                            >
                                <AiOutlineFundProjectionScreen style={{ marginBottom: '2px' }} /> Destination
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link
                                as={Link}
                                to="/contact-me"
                                onClick={() => setExpand(false)}
                            >
                                <CgFileDocument style={{ marginBottom: '2px' }} /> Tour
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <ImBlog style={{ marginBottom: '2px' }} />&nbsp;Blog
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto" defaultActiveKey="#home">
                        {!localStorage.getItem("token") ? (
                            <>
                                <Nav.Item>
                                    <Button as={Link} to="/auth/signin" variant="outline-accent2" onClick={() => setExpand(false)}>Sign In</Button>
                                </Nav.Item>

                                <Nav.Item>
                                    <Button as={Link} to="/auth/signup" variant="accent2" className='text-white' onClick={() => setExpand(false)}>Sign Up</Button>
                                </Nav.Item>
                            </>
                        ) : (
                            <>
                                <Nav.Item>
                                    <Button variant="outline-accent2" onClick={handleSignOut}>Sign Out</Button>
                                </Nav.Item>
                                <Nav.Item>
                                    <Button variant="accent2" className='text-white rounded' onClick={handleShowProfile}>
                                        <AiOutlineUser size={24} />
                                    </Button>
                                    <Profile show={showProfile} handleClose={handleCloseProfile} />

                                </Nav.Item>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
