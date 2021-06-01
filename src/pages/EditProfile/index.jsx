import React, { useState } from 'react'

import './EditProfile.css'
import { Form, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Navbar from '../../components/Navbar'

import authApi from '../../services/Auth/authApi'
import { getUserId } from '../../services/Auth/auth'

export default function EditProfile(){

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [credentialsErrors, setCredentialErrors] = useState('')

  let history = useHistory()

  function clearErrors(){
    setCredentialErrors('')
  }

  const handleEditCredentials = async (e) => {

    e.preventDefault()

    const name = userName
    const email = userEmail
    const password = userPassword
    const userID = getUserId()

    if(!name || !email || !password){
      setCredentialErrors('Preencha todos os campos!')
    } else{

      try {
        
        const response = await authApi.put(`/users/edit-user/${userID}`, { name, email, password})
        history.push('/profile')

      } catch (error) {
        setCredentialErrors('Erro ao editar sua conta!')
        setTimeout(() => {
          clearErrors()
        }, 2500)
      }
    }


  }

  return(
    <>
    <Navbar/>
    <div className="container first-box-form">
      <br/>
        <Form onSubmit={handleEditCredentials}>
          <h4 className="subtitle-form">Edite os dados que quiser!</h4>
          <Form.Group controlId="formBasicText">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              value={userName}
              onChange={event => {setUserName(event.target.value);}} 
              type="text" placeholder="Digite seu Nome"/>
          </Form.Group>
          <br/>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              value={userEmail}
              onChange={event => {setUserEmail(event.target.value);}} 
              type="email" placeholder="Digite seu Email"/>
          </Form.Group>
          <br/>
          <Form.Group controlId="Senha">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              required
              value={userPassword}
              onChange={event => setUserPassword(event.target.value)}
              type="password" placeholder="Digite sua nova Senha" />
            <p className="error">{credentialsErrors}</p>
          </Form.Group>
          <div className="btn-form-div">
            <Button type="submit" className="login-btn" variant="dark">Salvar alterações</Button>
          </div>
          <div className="signupLinkWrapper">
            <Link className="signupLink" to="/profile">Sair sem salvar</Link>
          </div>
        </Form>
      </div>
      </>
    
  )
}