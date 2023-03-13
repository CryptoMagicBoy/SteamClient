import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from './hydra.png';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Board from "../tic tac toe/ttt";
import Hangman from "../Hangman/Hangman";
import Game from "../gomoku/gomoku.js";


const Mainpage = () => {





}








export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false // состояние которое отслеживает раскрыт ли навбар
        };
    }

    toggleNavbar = () => {
        this.setState({ expanded: !this.state.expanded }); // переключаем при клике на кнопку
    }

    handleLinkClick = () => {
        this.setState({ expanded: false }); // закрываем навбар после клика
    }

    render() {
        return (
            <Router>
                <Navbar expanded={this.state.expanded} fixed="top" collapseOnSelect expand="me" variant="dark" style={{ backgroundColor: 'rgba(40,40,40,0.5)', boxShadow: '0px 0px 10px white' }}>
                    <Container>
                        <Navbar.Brand href="/">
                            <img src={logo} height="60" width="60" className="d-inline-block align-top" alt="Logo" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={this.toggleNavbar} />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Link style={{ fontSize: "1.5em" ,color: '#cbcbcb' }} to="/tic_tac_toe" className="nav-link" onClick={this.handleLinkClick}>
                                    tic tac toe
                                </Link>
                                <Link style={{ fontSize: "1.5em" ,color: '#cbcbcb' }} to="/Hangman" className="nav-link" onClick={this.handleLinkClick}>
                                    Hangman
                                </Link>
                                <Link style={{ fontSize: "1.5em" ,color: '#cbcbcb' }} to="/GOMOKU" className="nav-link" onClick={this.handleLinkClick}>
                                    GOMOKU
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Routes>
                    <Route path="/tic_tac_toe" element={<Board />} />
                    <Route
                        path="/Hangman"
                        element={
                            <div className="HangmanApp">
                                <Hangman />
                            </div>
                        }
                    />
                    <Route path="/GOMOKU" element={ <Game/>} />
                </Routes>
            </Router>
        );
    }
}
