import React from "react";
import { Rules, History, Nav, Tournament, SignUp, Home } from './components';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Nav />
      <Home />
      <Tournament />
      <Rules />
      <History />
      <SignUp />
    </div>
  );
}

export default App;