import React, { useState } from 'react'

import './Home.css'
import { Form, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Home(){

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  function clearInputs(){
    setEmail('')
    setPassword('')
  }

  function clearErrors(){
    setEmailError('')
    setPasswordError('')
  }

  return(
    <>
    <br/>
    <div className="container first-box-form">
      <br/>
        <Form>
          <h4 className="subtitle-form">Faça Login para acessar o App</h4>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
            required
            value={email}
            onChange={event => setEmail(event.target.value)} 
            type="email" placeholder="Digite seu Email"/>
            <p>{emailError}</p>
          </Form.Group>

          <Form.Group controlId="Senha">
            <Form.Label>Senha</Form.Label>
            <Form.Control
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
            type="password" placeholder="Digite sua Senha" />
            <p>{passwordError}</p>
          </Form.Group>
          <div className="btn-form-div">
            <Button className="login-btn" variant="dark">Login</Button>
          </div>
          <div className="signupLinkWrapper">
            <Link className="signupLink" to="/signup">Criar conta grátis</Link>
          </div>
        </Form>
      </div>
      </>
    
  )
}