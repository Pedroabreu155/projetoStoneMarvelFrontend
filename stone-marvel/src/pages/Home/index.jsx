import React, { useState } from 'react'

import './Home.css'
import { Form, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

export default function Home(){

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [credentialsErrors, setCredentialErrors] = useState('')

  let history = useHistory()

  function clearInputs(){
    setUserEmail('')
    setUserPassword('')
  }

  function clearErrors(){
    setCredentialErrors('')
  }

  const handleSignIn = async (e) => {

    e.preventDefault()

    const email = userEmail
    const password = userPassword

    if(email === 'pedro@email.com' && password === 'abcd123'){
      console.log('logado')
      clearErrors()
      clearInputs()
      history.push('/dashboard')
    } else{
      setCredentialErrors('Senha ou usuário inválido!')
    }


  }

  return(
    <>
    <br/>
    <div className="container first-box-form">
      <br/>
        <Form onSubmit={handleSignIn}>
          <h4 className="subtitle-form">Faça Login para acessar o App</h4>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
            required
            value={userEmail}
            onChange={event => {setUserEmail(event.target.value);}} 
            type="email" placeholder="Digite seu Email"/>
          </Form.Group>

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
            <Button type="submit" className="login-btn" variant="dark">Login</Button>
          </div>
          <div className="signupLinkWrapper">
            <Link className="signupLink" to="/signup">Criar conta grátis</Link>
          </div>
        </Form>
      </div>
      </>
    
  )
}