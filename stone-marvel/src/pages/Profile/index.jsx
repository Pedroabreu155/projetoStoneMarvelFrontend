import React from 'react'

import { Card, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'

import { Tittle, CredentialName, CredentialValue } from './styles'
import './Profile.css'

export default function Dashboard(){
  return(
    <>
      <Navbar/>
      <Container className="dashboard-wrapper-profile">
        <Card className="dashboard-card-profile" style={{ width: '25rem', height: '25rem' }}>
          <div className="card-content-profile">
            <Tittle>Meus Dados</Tittle>
            <CredentialName>Nome:</CredentialName>
            <CredentialValue>Pedro</CredentialValue>
            <CredentialName>Email:</CredentialName>
            <CredentialValue>pedro@email.com</CredentialValue>
            <CredentialName>Senha:</CredentialName>
            <CredentialValue>abcd123</CredentialValue>
          </div>
          <div className="editProfileBox">
              <Link to="/editprofile"><Button size="lg" variant="warning">Editar</Button></Link>
          </div>
        </Card>
      </Container>
    </>
  )
}