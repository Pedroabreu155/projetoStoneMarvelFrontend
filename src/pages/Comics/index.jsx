import React, { useState, useEffect} from 'react'

import { useHistory, Link } from 'react-router-dom'
import { Table, Button, Modal } from 'react-bootstrap'
import Navbar from '../../components/Navbar'

import marvelApi from '../../services/marvelApi'

import './Comics.css'

export default function Comics(){

  const [allComics, setAllComics] = useState([])
  const [comicModel, setComicModel] = useState({})

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
  }, [])                         // instead of this the page brokes cause image and props is not defined yet

  async function loadTableWithData(){
    const response = await marvelApi.get('/comics')
    const results = response.data.data.results
    // console.log(results)
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
    console.log(result)
    setComicModel(result)

  }

  const history = useHistory()

  function goHome(){
    history.push('/dashboard')
  }

  async function goCustomCharacters(endpoint){
    let cutedEndpoint = await endpoint.slice(35)
    // console.log(cutedEndpoint)

    let customEndpoint = await cutedEndpoint.replace("/", "-")
    // console.log(customEndpoint)

    let customEndpoint2 = await customEndpoint.replace("/", "-")
    // console.log(customEndpoint2)

    let customEndpoint3 = await customEndpoint2.replace("/", "-")
    // console.log(customEndpoint3)
    history.push(`/custom-characters/${customEndpoint3}`)
  }

  return(
    <>
      <Navbar/>
      <div className="container manage-products">
          <br/>
          <h1>Lista de HQs</h1>
          <br/>
          <div className="page-header">
            <Link to="/dashboard"><Button onClick={goHome} className="add-productBtn" variant="warning">Voltar para Dashboard</Button></Link>
          </div>
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
                    </Button>
                    <Button className="mb-3 font-weight-bold" size="sm" variant="success">Adicionar as Favoritas</Button><br/>
                    <Button onClick={() => loadOneComic(comic.id)} className="mr-2" size="sm" variant="info">Expandir</Button>
                    <Modal show={showModal} onHide={handleCloseModal}>
                      <Modal.Header>
                        <Modal.Title>{comicModel.title}</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <img className="modal-image" src={`${comicModel.thumbnail.path}.${comicModel.thumbnail.extension}`}  alt="modalImage"/>
                        <h2 className="modalFirstText">Personagens: {comicModel.characters.available === 0 ? "Sem registros!" : comicModel.characters.available}</h2>
                        <h2>Preço de Lançamento: {comicModel.prices[0].price === 0 ? "Sem preço registrado!" : `$${comicModel.prices[0].price}`}</h2>
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