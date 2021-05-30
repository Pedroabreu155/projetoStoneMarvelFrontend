import React, { useState, useEffect, useCallback} from 'react'

import { useHistory, Link } from 'react-router-dom'
import { Table, Button, Modal } from 'react-bootstrap'
import Navbar from '../../components/Navbar'

import marvelApi from '../../services/marvelApi'

import { BsPlusSquare } from 'react-icons/bs'
import { GoArrowUp } from 'react-icons/go'
import './Characters.css'

export default function Characters(){

  const [allCharacters, setAllCharacters] = useState([])
  const [characterModel, setCharacterModel] = useState({})

  const [showModal, setShowModal] = useState(false);

  function handleCloseModal(){
    setShowModal(false)
  }
  function handleShowModal(){
    setShowModal(true)
  }

  useEffect(() => {
    loadTableWithData()
    loadOneCharacterOnPageLoad(1011334)
  }, [])

  async function loadTableWithData(){

    const response = await marvelApi.get('/characters')
    const results = response.data.data.results
    setAllCharacters(results)
  }

  async function loadOneCharacter(id){

    const response = await marvelApi.get(`/characters/${id}`)
    const result = response.data.data.results[0]
    setCharacterModel(result)

    setTimeout(() => {
      handleShowModal()
    }, 1)

  }

  async function loadOneCharacterOnPageLoad(id){

    const response = await marvelApi.get(`/characters/${id}`)
    const result = response.data.data.results[0]
    setCharacterModel(result)

  }

  const history = useHistory()

  function goHome(){
    history.push('/dashboard')
  }

  async function goCustomComics(endpoint){
    let cutedEndpoint = await endpoint.slice(35)
    // console.log(cutedEndpoint)

    let customEndpoint = await cutedEndpoint.replace("/", "-")
    // console.log(customEndpoint)

    let customEndpoint2 = await customEndpoint.replace("/", "-")
    // console.log(customEndpoint2)

    let customEndpoint3 = await customEndpoint2.replace("/", "-")
    // console.log(customEndpoint3)
    history.push(`/custom-comics/${customEndpoint3}`)
  }

  const loadMore = useCallback(async () => {

    const offset = allCharacters.length

    const response = await marvelApi.get('/characters', {
      params: {
        offset
      }
    })
    const results = response.data.data.results
    setAllCharacters([...allCharacters, ...results])

  }, [allCharacters])

  return(
    <>
      <div id="top"></div>
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
                    <Button 
                      disabled={character.comics.available <=0 } 
                      onClick={() => goCustomComics(character.comics.collectionURI)} 
                      className="mb-3 font-weight-bold" s
                      ize="sm" 
                      variant="danger">
                        Ver comics
                    </Button>
                    <Button className="mb-3 font-weight-bold" size="sm" variant="success">Adcionar aos Favoritos</Button>
                    <Button onClick={() => loadOneCharacter(character.id)} size="sm" variant="info">Expandir</Button>
                    <Modal show={showModal} onHide={handleCloseModal}>
                      <Modal.Header>
                        <Modal.Title>{characterModel.name}</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <img className="modal-image" src={`${characterModel.thumbnail.path}.${characterModel.thumbnail.extension}`} alt="aaa"/>
                        <h2 className="modalFirstText">Comics: {characterModel.comics.available === 0 ? "Sem registros!" : characterModel.comics.available}</h2>
                        <h2>Eventos que aparece: {characterModel.events.available}</h2>
                        <Button variant="warning">
                          <a 
                            className="modalLink" 
                            target="_blank"
                            rel="noreferrer" 
                            href={characterModel.urls[0].url === "" ? "https://www.marvel.com/characters" : characterModel.urls[0].url}>
                            Ver na Wiki
                          </a>
                        </Button>
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
          <a className="top" href="#top"><GoArrowUp/></a>
          <div onClick={loadMore} className="loadMoreButton">Carregar Mais<BsPlusSquare/></div>
      </div>
      <br/>
    </>
  )
}