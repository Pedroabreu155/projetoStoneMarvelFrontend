import React, { useState, useEffect } from 'react'

import { Card, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'

import { Tittle, CredentialName, CredentialValue } from './styles'
import './Profile.css'

import authApi from '../../services/Auth/authApi'
import { getUserId } from '../../services/Auth/auth'

export default function Dashboard(){

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  async function loadUserCredential(){
    const userID = getUserId()
    const response = await authApi.get(`/users/${userID}`)

    const name = response.data.name
    const email = response.data.email

    setUserName(name)
    setUserEmail(email)

  }

  useEffect(() => {
    loadUserCredential()
  }, [])

  return(
    <>
      <Navbar/>
      <Container className="dashboard-wrapper-profile">
        <Card className="dashboard-card-profile" style={{ width: '25rem', height: '20rem' }}>
          <div className="card-content-profile">
            <Tittle>Meus Dados</Tittle>
            <CredentialName>Nome:</CredentialName>
            <CredentialValue>{userName}</CredentialValue>
            <CredentialName>Email:</CredentialName>
            <CredentialValue>{userEmail}</CredentialValue>
          </div>
          <div className="editProfileBox">
              <Link to="/editprofile"><Button size="lg" variant="warning">Editar</Button></Link>
          </div>
        </Card>
      </Container>
    </>
  )
}