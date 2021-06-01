import React, { useState, useEffect, useCallback } from 'react'

import { useHistory, Link } from 'react-router-dom'
import { Table, Button, Modal } from 'react-bootstrap'
import Navbar from '../../components/Navbar'
import SearcBox from '../../components/SearchBox'

import marvelApi from '../../services/marvelApi'
import authApi from '../../services/Auth/authApi'
import { getUserId } from '../../services/Auth/auth'

import { BsPlusSquare } from 'react-icons/bs'
import { GoArrowUp } from 'react-icons/go'
import './Comics.css'

export default function Comics(){

  const [allComics, setAllComics] = useState([])
  const [comicModel, setComicModel] = useState({})
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
    loadOneComicOnPageLoad(82970)//this functions loads props and save at comicModel state
  }, [])                       // instead of this the page brokes cause image and props is not defined yet

  useEffect(() => {
    loadTableWithTitle()
  }, [query])

  async function loadTableWithData(){
    const response = await marvelApi.get('/comics')
    const results = response.data.data.results
    setAllComics(results)
  }

  async function loadOneComic(id){
    const response = await marvelApi.get(`/comics/${id}`)
    const result = response.data.data.results[0]
    setComicModel(result)

    setTimeout(() => {
      handleShowModal()
    }, 1)

  }

  async function loadOneComicOnPageLoad(id){

    const response = await marvelApi.get(`/comics/${id}`)
    const result = response.data.data.results[0]
    setComicModel(result)

  }

  async function loadTableWithTitle(){

    if(query === ''){
      const response = await marvelApi.get('/comics')
      const results = response.data.data.results
      setAllComics(results)
    }else{
      const response = await marvelApi.get(`/comics?titleStartsWith=${query}`)
      const results = response.data.data.results
      setAllComics(results)
    }

  }

  async function addFavorite(id){

    const userID = await getUserId()
    const response = await authApi.get(`/users/favorites-comics/${userID}`)
    const result = await response.data.favoriteComics
    let favorites = []
    favorites = [...result]
    favorites.push(id)

    await authApi.put(`/users/edit-favorite-comics/${userID}`, {
      'favoriteComics': favorites
    })

    window.alert('Favorito Adicionado!')

    loadTableWithData()
  }

  const history = useHistory()

  async function goCustomCharacters(endpoint){ //this function handle path changing - in /
    let cutedEndpoint = await endpoint.slice(35)

    let customEndpoint = await cutedEndpoint.replace("/", "-")

    let customEndpoint2 = await customEndpoint.replace("/", "-")

    let customEndpoint3 = await customEndpoint2.replace("/", "-")

    history.push(`/custom-characters/${customEndpoint3}`)
  }

  const loadMore = useCallback(async () => {

    const offset = allComics.length

    const response = await marvelApi.get('/comics', {
      params: {
        offset
      }
    })
    const results = response.data.data.results
    setAllComics([...allComics, ...results])

  }, [allComics])

  return(
    <>
      <div id="top"></div>
      <Navbar/>
      <div className="container manage-products">
          <br/>
          <h1>Lista de HQs</h1>
          <br/>
          <div className="page-header">
            <Link to="/dashboard"><Button className="add-productBtn" variant="warning">Voltar para Dashboard</Button></Link>
          </div>
          <SearcBox placeholder={'Digite as iniciais do título... (ex: fantastic)'} search={(query) => setQuery(query)}/>
          <br/>
          <Table className="text-center" striped bordered hover variant="dark">
          <thead>
              <tr>
                <th>HQ</th>
                <th>Título</th>
                <th>Páginas</th>
                <th>Personagens</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {allComics.map(comic => (
                <>
                <tr key={comic.id}>
                  <td>
                  <img 
                    className="comicImage" 
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
                    alt="characterImage"/>
                  </td>
                  <td>{comic.title}</td>
                  <td>{comic.pageCount === 0 ? "Sem páginas definidas" : `${comic.pageCount} páginas`}</td>
                  <td>{comic.characters.available}</td>
                  <td>
                  <Button 
                    disabled={comic.characters.available <=0 }
                    onClick={() => goCustomCharacters(comic.characters.collectionURI)} 
                    className="mb-3 font-weight-bold" 
                    size="sm" 
                    variant="danger">
                      Ver Personagens
                    </Button><br/>
                    <Button onClick={() => addFavorite(comic.id)} className="mb-3 font-weight-bold" size="sm" variant="success">Adicionar as Favoritas</Button><br/>
                    <Button onClick={() => loadOneComic(comic.id)} className="mr-2" size="sm" variant="info">Expandir</Button>
                    <Modal show={showModal} onHide={handleCloseModal}>
                      <Modal.Header>
                        <Modal.Title>{comicModel.title}</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <img className="modal-image" src={`${comicModel.thumbnail.path}.${comicModel.thumbnail.extension}`}  alt="modalImage"/>
                        <h2 className="modalFirstText">Personagens: {comicModel.characters.available === 0 ? "Sem registros!" : comicModel.characters.available}</h2>
                        <h2>{comicModel.prices[0].price === 0 ? "Sem preço registrado!" : `$Preço de Lançamento: ${comicModel.prices[0].price}`}</h2>
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