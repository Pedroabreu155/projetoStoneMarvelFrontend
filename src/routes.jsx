import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from './pages/Login'
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
          <Route path="/" exact component={Login}/>
          <Route path="/signup" exact component={SignUp}/>
          <PrivateRoute path="/dashboard" exact component={Dashboard}/>
          <PrivateRoute path="/characters" exact component={Characters}/>
          <PrivateRoute path="/comics" exact component={Comics}/>
          <PrivateRoute path="/profile" exact component={Profile}/>
          <PrivateRoute path="/editprofile" exact component={EditProfile}/>
          <PrivateRoute path="/favorites" exact component={Favorites}/>
          <PrivateRoute path="/favcharacters" exact component={FavCharacters}/>
          <PrivateRoute path="/favcomics" exact component={FavComics}/>
          <PrivateRoute path="/custom-comics/:endpoint" exact component={CustomComics}/>
          <PrivateRoute path="/custom-characters/:endpoint" exact component={CustomCharacters}/>
        </Switch>
    </div>
  )
}