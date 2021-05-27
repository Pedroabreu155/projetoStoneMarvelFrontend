import React from 'react'

import { BsFillPersonFill, BsFillStarFill, BsBookHalf } from 'react-icons/bs'
import { GiBatMask } from 'react-icons/gi'

import * as ReactBootstrap from 'react-bootstrap'
import './Navbar.css'

export default function Navbar() {
  return (
    <ReactBootstrap.Navbar variant="dark" bg="dark" expand="lg">
      <ReactBootstrap.Container>
        <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
        <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
          <ReactBootstrap.Nav className="me-auto customNavbar">
            <ReactBootstrap.Nav.Link>
              Comics<div className="nav-icon"><BsBookHalf/></div>
            </ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link href="/characters">
              Personagens<div className="nav-icon"><GiBatMask/></div>
            </ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link href="/favorites">
              Favoritos<div className="nav-icon"><BsFillStarFill/></div>
            </ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link href="/profile">
              Meu Perfil<div className="nav-icon"><BsFillPersonFill/></div>
            </ReactBootstrap.Nav.Link>
          </ReactBootstrap.Nav>
        </ReactBootstrap.Navbar.Collapse>
      </ReactBootstrap.Container>
    </ReactBootstrap.Navbar>
  )
}