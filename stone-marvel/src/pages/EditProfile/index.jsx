import React, { useState } from 'react'

import './EditProfile.css'
import { Form, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Navbar from '../../components/Navbar'

export default function EditProfile(){

  const [userName, setUserName] = useState('Pedro')
  const [userEmail, setUserEmail] = useState('pedro@email.com')
  const [userPassword, setUserPassword] = useState('')
  const [credentialsErrors, setCredentialErrors] = useState('')

  let history = useHistory()

  function clearInputs(){
    setUserName('')
    setUserEmail('')
    setUserPassword('')
  }

  function clearErrors(){
    setCredentialErrors('')
  }

  const handleChangeCredentials = async (e) => {

    e.preventDefault()

    const name = userName
    const email = userEmail
    const password = userPassword

    if(!name || !email || !password){
      setCredentialErrors('Senha ou usuário inválido!')
    } else{
      console.log('Usuário criado!')
      clearErrors()
      clearInputs()
      history.push('/profile')
    }


  }

  return(
    <>
    <Navbar/>
    <div className="container first-box-form">
      <br/>
        <Form onSubmit={handleChangeCredentials}>
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