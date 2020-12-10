import React from 'react';
import {useEffect} from 'react';
import Card from './components/Card'
import './App.css';
import axios from './axios.js'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import Login from './components/AuthComponents/Login';
import SignUp from './components/AuthComponents/SignUp';
import Histroy from './components/Histroy';


function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/homeScreen'>
            <HomeScreen />
          </Route>

          <Route exact path='/'>
            <Login />
          </Route>

          <Route exact path='/signUp'>
            <SignUp />
          </Route>

          <Route exact path='/history/:userID'>
            <Histroy />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
