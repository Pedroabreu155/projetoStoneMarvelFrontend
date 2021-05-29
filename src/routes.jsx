import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Characters from './pages/Characters'
import Comics from './pages/Comics'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Favorites from './pages/Favorites'
import FavCharacters from './pages/FavCharacters'
import FavComics from './pages/FavComics'
import CustomComics from './pages/CustomComics'
import CustomCharacters from './pages/CustomCharacters'

import { isAuthenticated } from './services/Auth/auth'




const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

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
          <Route path="/editprofile" exact component={EditProfile}/>
          <Route path="/favorites" exact component={Favorites}/>
          <Route path="/favcharacters" exact component={FavCharacters}/>
          <Route path="/favcomics" exact component={FavComics}/>
          <Route path="/custom-comics" exact component={CustomComics}/>
          <Route path="/custom-characters" exact component={CustomCharacters}/>
        </Switch>
    </div>
  )
}