import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="header">
      <Link className="nav-link" to="/"><h2 className="logo">MasterComics</h2></Link>
      <img className="logo-image" src="/heroes.png" alt="marvel-heroes"/>
    </div>
  )
}