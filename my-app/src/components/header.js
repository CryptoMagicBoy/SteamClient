import React, { Component } from 'react';
import { Navbar, Nav, FormControl, Container, Form, Button } from 'react-bootstrap';
import logo from './hydra.png';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Board from "../tic tac toe/ttt";
import Hangman from "../Hangman/Hangman";
export default class Header extends Component {
    render() {
        return (
            <>
                <Router>
                    <Navbar fixed="top" collapseOnSelect expand="me" variant="dark" style={{ backgroundColor: 'rgba(40,40,40,0.5)', boxShadow: '0px 0px 10px white' }}>
                        <Container>
                            <Navbar.Brand href="/">
                                <img src={logo} height="80" width="80" className="d-inline-block align-top" alt="Logo" />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                    <Link to="/" className="nav-link">Home</Link>
                                    <Link to="/about" className="nav-link">About</Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Routes>
                        <Route path="/" element={ <Board/>} />
                        <Route path="/about" element={
                            <div className="HangmanApp">
                            <Hangman/>
                            </div>
                        } />
                    </Routes>
                </Router>

            </>
        )
    }
}