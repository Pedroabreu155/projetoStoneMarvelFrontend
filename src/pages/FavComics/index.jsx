import React, { useState, useEffect} from 'react'

import { Link } from 'react-router-dom'
import { Table, Button, Modal } from 'react-bootstrap'
import Navbar from '../../components/Navbar'

import marvelApi from '../../services/marvelApi'

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
    const response = []
    // console.log(response)
    setAllComics(response)
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
                    <Button onClick={() => loadOneComic(comic.id)} size="sm" variant="info">Expandir</Button>
                    <Button className="ml-2 favComicsBtn" size="sm" variant="danger">Remover das Favoritas</Button>
                    <Modal show={showModal} onHide={handleCloseModal}>
                      <Modal.Header>
                        <Modal.Title>{comicModel}</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <img className="modal-image" src={comicModel} alt="aaa"/>
                        <h2>{comicModel}</h2>
                        <h2>{comicModel}</h2>
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
    </>
  )
}