import React, { useState, useEffect, useCallback} from 'react'

import { Link } from 'react-router-dom'
import { Table, Button, Modal } from 'react-bootstrap'
import Navbar from '../../components/Navbar'

import marvelApi from '../../services/marvelApi'
import authApi from '../../services/Auth/authApi'

import { getUserId } from '../../services/Auth/auth'

import { BsPlusSquare } from 'react-icons/bs'
import { GoArrowUp } from 'react-icons/go'
import './FavComics.css'

export default function FavComics(){

  const [allComics, setAllComics] = useState([])
  const [comicModel, setComicModel] = useState([])

  const [showModal, setShowModal] = useState(false);

  function handleCloseModal(){
    setShowModal(false)
  }
  function handleShowModal(){
    setShowModal(true)
  }

  useEffect(() => {
    loadTableWithData()
    loadOneComicOnPageLoad(82970)
  }, [])

  async function loadTableWithData(){

    const userID = await getUserId()
    const response = await authApi.get(`/users/favorites-comics/${userID}`)
    const result = await response.data.favoriteComics

    const favoritesResults = []

    await result.map(async (characterId) => {
        const response = await marvelApi.get(`/comics/${characterId}`)
        const result = response.data.data.results[0]
        favoritesResults.push(result)
      })

      setTimeout(() => {
        setAllComics(favoritesResults)
      }, 1000)
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

  return(
    <>
      <div id="top"></div>
      <Navbar/>
      <div className="container manage-products">
          <br/>
          <h1>HQs Preferidas</h1>
          <br/>
          <div className="page-header">
            <Link to="/favorites"><Button className="add-productBtn" variant="warning">Voltar para Meus Favoritos</Button></Link>
          </div>
          <br/>
          <Table className="text-center" striped bordered hover variant="dark">
          <thead>
              <tr>
                <th>HQs</th>
                <th>Títulos</th>
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
                    <Button onClick={() => loadOneComic(comic.id)} className="mb-3" size="sm" variant="info">Expandir</Button><br/>
                    <Button className="ml-2 favComicsBtn" size="sm" variant="danger">Remover das Favoritas</Button>
                    <Modal show={showModal} onHide={handleCloseModal}>
                      <Modal.Header>
                        <Modal.Title>{comicModel.title}</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <img className="modal-image" src={`${comicModel.thumbnail.path}.${comicModel.thumbnail.extension}`} alt="ComicImage"/>
                        <h2>Personagens: {comicModel.characters.available === 0 ? "Sem registros!" : comicModel.characters.available}</h2>
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
      </div>
    </>
  )
}