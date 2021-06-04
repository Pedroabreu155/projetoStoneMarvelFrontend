import React from 'react'

import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { Tittle, Text } from './styles'

import './Dashboard.css'

export default function Dashboard(){

  return(
    <>
      <Navbar/>
      <br/>
      <div className="container dashboardTitle"><h1>Dashboard</h1></div>
      <Container className="dashboard-wrapper">
        <Link to="/comics" className="card-link">
          <Card className="dashboard-card" style={{ width: '20rem', height: '20rem' }}>
            <div className="card-content">
              <Tittle>COMICS</Tittle>
              <Text>Procure e descubra os principais HQs da Marvel</Text>
              <img className="cardImageComics" src="/comics.png" alt="heroes"/>
            </div>
          </Card>
        </Link>
        <Link to="/characters" className="card-link">
          <Card className="dashboard-card" style={{ width: '20rem', height: '20rem' }}>
            <div className="card-content">
              <Tittle>PERSONAGENS</Tittle>
              <Text>Veja os grandes heróis e vilões da Marvel e aprenda sobre eles</Text>
              <img className="cardImageHeroes" src="/heroes.png" alt="heroes"/>
            </div>
          </Card>
        </Link>
      </Container>
    </>
  )
}