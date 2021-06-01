import React, { useState } from 'react'

import './SignUp.css'
import { Form, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

import { login } from '../../services/Auth/auth'
import authApi from '../../services/Auth/authApi'

export default function SignUp(){

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [credentialsErrors, setCredentialErrors] = useState('')

  let history = useHistory()

  function clearErrors(){
    setCredentialErrors('')
  }

  const handleSignUp = async (e) => {

    e.preventDefault()

    const name = userName
    const email = userEmail
    const password = userPassword

    if(!name || !email || !password){
      setCredentialErrors('Preencha todos os campos!')
    } else{

      try {
        
        const response = await authApi.post('/signup', { name, email, password})
        const token = response.data.token
        const id = response.data.createdUser.id
        login(token, id)
        history.push('/dashboard')

      } catch (error) {
        setCredentialErrors('Erro ao criar sua conta!')
        setTimeout(() => {
          clearErrors()
        }, 2500)
      }
    }


  }

  return(
    <>
    <br/>
    <div className="container first-box-form">
      <br/>
        <Form onSubmit={handleSignUp}>
          <h4 className="subtitle-form">Crie seu perfil para acessar o App!</h4>
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
              type="password" placeholder="Digite sua Senha" />
            <p className="error">{credentialsErrors}</p>
          </Form.Group>
          <div className="btn-form-div">
            <Button type="submit" className="login-btn" variant="dark">Criar Usuário</Button>
          </div>
          <div className="signupLinkWrapper">
            <Link className="signupLink" to="/">Entrar com minha conta</Link>
          </div>
        </Form>
      </div>
      </>
    
  )
}