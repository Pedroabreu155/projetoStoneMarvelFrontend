import React, { useState, useEffect, useCallback} from 'react'

import { Link } from 'react-router-dom'
import { Table, Button, Modal } from 'react-bootstrap'
import Navbar from '../../components/Navbar'


import { BsPlusSquare } from 'react-icons/bs'
import { GoArrowUp } from 'react-icons/go'
import './FavCharacters.css'

import marvelApi from '../../services/marvelApi'

export default function FavCharacters(){

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
    console.log(results)
    setAllCharacters(results)
  }

  async function loadOneCharacter(id){

    const response = await marvelApi.get(`/characters/${id}`)
    const result = response.data.data.results[0]
    console.log(result)
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
          <h1>Personagens Preferidos</h1>
          <br/>
          <div className="page-header">
            <Link to="/favorites"><Button className="add-productBtn" variant="warning">Voltar para Meus Favoritos</Button></Link>
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
                    <Button onClick={() => loadOneCharacter(character.id)} className="mr-2" size="sm" variant="info">Expandir</Button>
                    <Button className="favCharactersBtn" size="sm" variant="danger">Remover dos Favoritos</Button>
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