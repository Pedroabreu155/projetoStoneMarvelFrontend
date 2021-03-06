import React, { useState, useEffect, useCallback} from 'react'

import { useHistory, Link } from 'react-router-dom'
import { Table, Button, Modal } from 'react-bootstrap'
import Navbar from '../../components/Navbar'
import SearcBox from '../../components/SearchBox'

import marvelApi from '../../services/marvelApi'
import authApi from '../../services/Auth/authApi'
import { getUserId } from '../../services/Auth/auth'

import { BsPlusSquare } from 'react-icons/bs'
import { GoArrowUp } from 'react-icons/go'
import './Characters.css'

export default function Characters(){

  const [allCharacters, setAllCharacters] = useState([])
  const [characterModel, setCharacterModel] = useState({})
  const [query, setQuery] = useState('') //this state is used on searchBox

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

  useEffect(() => {
    loadTableWithName()
  }, [query])

  async function loadTableWithData(){
      const response = await marvelApi.get('/characters')
      const results = response.data.data.results
      setAllCharacters(results)
  }

  async function loadTableWithName(){

    if(query === ''){
      const response = await marvelApi.get('/characters')
      const results = response.data.data.results
      setAllCharacters(results)
    }else{
      const response = await marvelApi.get(`/characters?nameStartsWith=${query}`)
      const results = response.data.data.results
      setAllCharacters(results)
    }

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

  async function addFavorite(id){

    const userID = await getUserId()
    const response = await authApi.get(`/users/favorites-characters/${userID}`)
    const result = await response.data.favoriteCharacters
    let favorites = []
    favorites = [...result]
    favorites.push(id)

    await authApi.put(`/users/edit-favorite-characters/${userID}`, {
      'favoriteCharacters': favorites
    })

    window.alert('Favorito Adicionado!')

    loadTableWithData()
  }

  const history = useHistory()

  async function goCustomComics(endpoint){ //this function handle path changing - in /
    let cutedEndpoint = await endpoint.slice(35)

    let customEndpoint = await cutedEndpoint.replace("/", "-")

    let customEndpoint2 = await customEndpoint.replace("/", "-")

    let customEndpoint3 = await customEndpoint2.replace("/", "-")

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
      <div className="container">
          <br/>
          <h1>Lista de Personagens</h1>
          <br/>
          <div className="page-header">
            <Link to="/dashboard"><Button className="add-productBtn" variant="warning">Voltar para Dashboard</Button></Link>
          </div>
          <SearcBox placeholder={'Digite as iniciais do nome... (ex: tony)'} search={(query) => setQuery(query)}/>
          <br/>
          <Table className="text-center" striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Personagem</th>
                <th>Nome</th>
                <th>Descri????o</th>
                <th>N?? de Quadrinhos</th>
                <th>Op????es</th>
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
                  <td>{character.description === "" ? "Personagem sem descri????o..." : character.description}</td>
                  <td>{character.comics.available}</td>
                  <td>
                    <Button 
                      disabled={character.comics.available <=0 } 
                      onClick={() => goCustomComics(character.comics.collectionURI)} 
                      className="tableButton mb-3 font-weight-bold" s
                      ize="sm" 
                      variant="danger">
                        Ver comics
                    </Button><br/>
                    <Button
                      className="tableButton mb-3 font-weight-bold" 
                      onClick={() => addFavorite(character.id)} 
                      size="sm" 
                      variant="success">
                        Adcionar aos Favoritos
                    </Button><br/>
                    <Button className="tableButton" onClick={() => loadOneCharacter(character.id)} size="sm" variant="info">Expandir</Button>
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