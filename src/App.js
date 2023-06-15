import React, {useState, useCallback} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  const login = useCallback((uid, token) => {
    setUserId(uid)
    setToken(token)
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  let routes;

  if(token){
    routes = (
      <Switch>
        <Route path="/" exact> <Users /> </Route>
        <Route path="/places/new" exact> <NewPlace /> </Route>
        <Route path="/places/:placeId" exact> <UpdatePlace /> </Route>
        <Route path="/:userId/places" exact> <UserPlaces /> </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact> <Users /> </Route>
        <Route path="/auth" exact> <Auth /> </Route>
        <Route path="/:userId/places" exact> <UserPlaces /> </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }


  return (
    <AuthContext.Provider value={
      {
        isLoggedIn: !!token,
        userId: userId,
        token: token,
        login: login, 
        logout: logout
      }}>
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
