import React from "react";
import { Rules, History, Nav, Tournament } from './components';

function App() {
  return (
    <div className="app">
      <Nav />
      <Tournament />
      <Rules />
      <History />
    </div>
  );
}

export default App;