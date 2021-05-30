import React, { useState, useEffect } from 'react'

import './Home.css'
import { Form, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../../services/Auth/auth'

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

    if(email !== 'pedro@email.com' || password !== 'abcd123' ){
      setCredentialErrors('Senha ou Usuário inválido!')
    } else{
      clearErrors()
      clearInputs()
      history.push('/dashboard')
    }


  }

  useEffect(() => {
    logout()
  }, []) //this effect clear token from session storage, so the user cant access routes by typing on bar
         //only logging again

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
          <br/>
          <Form.Group controlId="Senha">
            <Form.Label>Senha</Form.Label>
            <Form.Control
            required
            value={userPassword}
            onChange={event => setUserPassword(event.target.value)}
            type="password" placeholder="Digite sua Senha" />
            <p className="error mt-3">{credentialsErrors}</p>
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