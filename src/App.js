import './App.css'; 

import React, { Component } from 'react'
import Navbar from './Component/Navbar'; 
import Newsapp from './Component/Newsapp'; 

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Newsapp pageSize={9} />
      </div>
    );
  }
}

