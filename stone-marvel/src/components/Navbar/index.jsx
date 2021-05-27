import React from 'react'

import { BsFillPersonFill, BsFillStarFill, BsBookHalf } from 'react-icons/bs'
import { GiBatMask } from 'react-icons/gi'
import { Link } from 'react-router-dom'

import * as ReactBootstrap from 'react-bootstrap'
import './Navbar.css'

export default function Navbar() {
  return (
    <ReactBootstrap.Navbar variant="dark" bg="dark" expand="lg">
      <ReactBootstrap.Container>
        <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
        <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
          <ReactBootstrap.Nav className="me-auto customNavbar">
            <ReactBootstrap.Navbar.Text>
              <Link className="navbar-link-custom" to="/comics"><div className="nav-option">Comics<div className="nav-option-img"><BsBookHalf/></div></div></Link>
            </ReactBootstrap.Navbar.Text>
            <ReactBootstrap.Navbar.Text>
              <Link className="navbar-link-custom" to="/characters"><div className="nav-option">Personagens<div className="nav-option-img"><GiBatMask/></div></div></Link>
            </ReactBootstrap.Navbar.Text>
            <ReactBootstrap.Navbar.Text>
              <Link className="navbar-link-custom" to="/favorites"><div className="nav-option">Favoritos<div className="nav-option-img"><BsFillStarFill/></div></div></Link>
            </ReactBootstrap.Navbar.Text>
            <ReactBootstrap.Navbar.Text>
              <Link className="navbar-link-custom" to="/profile"><div className="nav-option">Meu Perfil<div className="nav-option-img"><BsFillPersonFill/></div></div></Link>
            </ReactBootstrap.Navbar.Text>
          </ReactBootstrap.Nav>
        </ReactBootstrap.Navbar.Collapse>
      </ReactBootstrap.Container>
    </ReactBootstrap.Navbar>
  )
}