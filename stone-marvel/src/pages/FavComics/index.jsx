import React, { useState, useEffect} from 'react'

import { Link } from 'react-router-dom'
import { Table, Button, Modal } from 'react-bootstrap'
import Navbar from '../../components/Navbar'

export default function FavComics(){

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
  }, [])

  async function loadTableWithData(){
    const response = []
    // console.log(response)
    setAllProducts(response)
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
                <th>Marca</th>
                <th>Produto</th>
                <th>Preço</th>
                <th>Armazenamento</th>
                <th>Tecnologia 5G</th>
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