import React, { useState, useEffect} from 'react'

import { useHistory, Link } from 'react-router-dom'
import { Table, Button, Modal } from 'react-bootstrap'
import Navbar from '../../components/Navbar'

import marvelApi from '../../services/marvelApi'

import './Characters.css'

export default function Characters(){

  const [allCharacters, setAllCharacters] = useState([])
  const [oneCharacter, setOneCharacter] = useState([])

  const [showModal, setShowModal] = useState(false);

  function handleCloseModal(){
    setShowModal(false)
  }
  function handleShowModal(){
    setShowModal(true)
  }

  useEffect(() => {
    loadTableWithData()
  }, [])

  async function loadTableWithData(){

    const response = await marvelApi.get('/characters')
    const results = response.data.data.results
    console.log(response)
    setAllCharacters(results)
  }

  async function loadOneProduct(id){
    const response = await marvelApi.get(`/characters/${id}`)
    const result = response.data.data.results
    // console.log(result)
    setOneCharacter(result)
    handleShowModal()
    console.log(oneCharacter)
  }

  const history = useHistory()

  function goHome(){
    history.push('/')
  }

  return(
    <>
      <Navbar/>
      <div className="container manage-products">
          <br/>
          <h1>Lista de Personagens</h1>
          <br/>
          <div className="page-header">
            <Link to="/dashboard"><Button onClick={goHome} className="add-productBtn" variant="warning">Voltar para Dashboard</Button></Link>
          </div>
          <br/>
          <Table className="text-center" striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Personagem</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Nº de Quadrinhos</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {allCharacters.map(character => (
                <>
                <tr key={character.id}>
                  <td>
                    <img 
                      className="characterImage" 
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
                      alt="characterImage"/>
                  </td>
                  <td>{character.name}</td>
                  <td>{character.description === "" ? "Personagem sem descrição..." : character.description}</td>
                  <td>{character.comics.available}</td>
                  <td>
                    <Button onClick={() => loadOneProduct(character.id)} className="mr-2" size="sm" variant="info">Ver</Button>
                    <Modal show={showModal} onHide={handleCloseModal}>
                      <Modal.Header>
                        <Modal.Title></Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <img className="modal-image" src="aaa" alt="aaa"/>
                        <h2>aaa</h2>
                        <h2>aaa</h2>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseModal}>Ok</Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
              </tr>
              </>

              ))}
              
            </tbody>
          </Table>
      </div>
      <br/>
    </>
  )
}