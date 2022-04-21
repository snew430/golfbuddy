import React, { useState } from "react";
import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import { Outlet } from "react-router-dom";

function App() {
  const [categories] = useState([
    {
      name: "Trip Info",
      ref: "/trip",
      description: "Layout of the week",
    },
    {
      name: "Course Info",
      ref: "/course",
      description: "Where we will be going",
    },
    {
      name: "Sign Up",
      ref: "/signup",
      description: "Put your name either as going or waitlist",
    },
    {
      name: "Rules",
      ref: "/rules",
      description: "You know them if your old. Please read if youre new",
    },
    {
      name: "Info Board",
      ref: "/info",
      description: "Shoutouts we need",
    },
  ]);

  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  console.log(currentCategory.name);

  return (
    <div className="dom">
      <Jumbotron />
      <Nav
        categories={categories}
        setCurrentCategory={setCurrentCategory}
        currentCategory={currentCategory}
      />
      <div className="board">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
