import React from "react";
import { Rules, History, Nav, Tournament, SignUp } from './components';
import './App.scss';

function App() {
  return (
    <div className="app">
      {/* <Nav /> */}
      <Tournament />
      <Rules />
      <History />
      <SignUp />
    </div>
  );
}

export default App;