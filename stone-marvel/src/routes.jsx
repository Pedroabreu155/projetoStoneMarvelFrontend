import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Characters from './pages/Characters'
import Comics from './pages/Comics'
import Profile from './pages/Profile'
import Favorites from './pages/Favorites'

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/signup" exact component={SignUp}/>
        <Route path="/dashboard" exact component={Dashboard}/>
        <Route path="/characters" exact component={Characters}/>
        <Route path="/comics" exact component={Comics}/>
        <Route path="/profile" exact component={Profile}/>
        <Route path="/favorites" exact component={Favorites}/>
      </Switch>
    </div>
  )
}