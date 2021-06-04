import React, { useState } from 'react'

import './ResetPassword.css'
import { Form, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

import { login } from '../../services/Auth/auth'
import authApi from '../../services/Auth/authApi'

export default function SignUp(){

  const [userEmail, setUserEmail] = useState('')
  const [credentialsErrors, setCredentialErrors] = useState('')

  let history = useHistory()

  function clearErrors(){
    setCredentialErrors('')
  }

  const handleResetPassword = async (e) => {

    e.preventDefault()

    const email = userEmail

    if(!email){
      setCredentialErrors('Preencha todos os campos!')
    } else{
        authApi.post('/reset-password', { email }).then(() => {
          history.push('/')
        }).catch(error => {
          console.log(error)
          setCredentialErrors('Usuário não encontrado!')
        })
        setTimeout(() => {
          clearErrors()
        }, 2500)
    }
  }

  return(
    <>
    <br/>
    <div className="container first-box-form">
      <br/>
        <Form onSubmit={handleResetPassword}>
          <h4 className="subtitle-form">Receba um email com uma senha nova!</h4>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              value={userEmail}
              onChange={event => {setUserEmail(event.target.value);}} 
              type="email" placeholder="Digite seu Email"/>
              <p className="error">{credentialsErrors}</p>
          </Form.Group>
          <br/>
          <div className="btn-form-div">
            <Button type="submit" className="login-btn" variant="dark">Enviar</Button>
          </div>
          <br/>
          <div className="signupLinkWrapper">
            <Link className="signupLink" to="/">Entrar com minha conta</Link>
          </div>
        </Form>
      </div>
      </>
    
  )
}