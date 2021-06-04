import React from 'react'

import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { Tittle, Text } from './styles'

import './Favorites.css'

export default function Favorites(){
  return(
    <>
      <Navbar/>
      <br/>
      <div className="container favoritesTitle"><h1>Meus Favoritos</h1></div>
      <Container className="dashboard-wrapper">
        <Link to="/favcomics" className="card-link">
          <Card className="dashboard-card" style={{ width: '20rem', height: '20rem' }}>
            <div className="card-content">
              <Tittle>COMICS</Tittle>
              <Text>Veja suas HQs preferidas</Text>
              <img className="cardImageComics" src="/favcomics.png" alt="heroes"/>
            </div>
          </Card>
        </Link>
        <Link to="/favcharacters" className="card-link">
          <Card className="dashboard-card" style={{ width: '20rem', height: '20rem' }}>
            <div className="card-content">
              <Tittle>PERSONAGENS</Tittle>
              <Text>Veja os personagens que você mais curte</Text>
              <img className="cardImageHeroes" src="/favheroes.png" alt="heroes"/>
            </div>
          </Card>
        </Link>
      </Container>
    </>
  )
}