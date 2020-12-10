import React from 'react';
import {useEffect, useRef} from 'react';
import Card from './Card'
import '../App.css';
import axios from '../axios.js'
import {BrowserRouter as Router,Link,Route,Switch,useLocation} from 'react-router-dom';

function HomeScreen() {

    const location = useLocation();
    

    useEffect(async () =>  {
        console.log("Requestion server!!!!");
        const res = axios.get('/');
        console.log(res);
        console.log(location.state.userUid);
      }, []);
    
      return (
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
        <div className="container">
          <a className="navbar-brand js-scroll-trigger" href="#page-top">To PDF</a>
    
        </div>
      </nav>
    
    
      <header className="masthead">
        <div className="container">
          <div className="intro-text">
            <div className="intro-heading text-uppercase">Convert text from different files to pdf</div>
          
          </div>
        </div>
      </header>
    
      <Card userID={location.state.userUid}/>
    
        </div>
      );
}

export default HomeScreen
