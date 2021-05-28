import React, { useState, useEffect} from 'react'

import { useHistory, Link } from 'react-router-dom'
import { Table, Button, Modal } from 'react-bootstrap'
import Navbar from '../../components/Navbar'

import marvelApi from '../../services/marvelApi'

export default function Characters(){

  const [allProducts, setAllProducts] = useState([])
  const [productModel, setProductModel] = useState()

  const [showModal, setShowModal] = useState(false);

  function handleCloseModal(){
    setShowModal(false)
  }
  function handleShowModal(){
    setShowModal(true)
  }

  async function loadOneProduct(id){
    const response = ['1234']
    
    setProductModel(response)

    handleShowModal()
  }

  useEffect(() => {
    loadTableWithData()
    marvelApi.get('/comics').then(response => console.log(response.data.data.results)).catch(err => console.log(err))
  }, [])

  async function loadTableWithData(){
    const response = []
    // console.log(response)
    setAllProducts(response)
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
          <h1>Lista de HQs</h1>
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
              {allProducts.map(product => (
                <>
                <tr key={product}>
                  <td>{product}</td>
                  <td>{product}</td>
                  <td>R$ {product}</td>
                  <td>{product} GB</td>
                  <td>
                    <Button onClick={() => loadOneProduct(product)} className="mr-2" size="sm" variant="info">Ver</Button>
                    <Modal show={showModal} onHide={handleCloseModal}>
                      <Modal.Header>
                        <Modal.Title>{productModel}</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <img className="modal-image" src={productModel} alt="aaa"/>
                        <h2>{productModel}</h2>
                        <h2>R$ {productModel}</h2>
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