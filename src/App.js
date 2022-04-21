import React, { useState } from "react";
import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";

function App() {
  const [categories] = useState([
    {
      name: "Trip Info",
      description: "Layout of the week",
    },
    {
      name: "Course Info",
      description: "Where we will be going",
    },
    {
      name: "Sign Up",
      description: "Put your name either as going or waitlist",
    },
    {
      name: "Rules",
      description: "You know them if your old. Please read if youre new",
    },
    {
      name: "Info Board",
      description: "Shoutouts we need",
    },
  ]);

  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  
  return (
    <div>
      <Jumbotron />
      <Nav
        categories={categories}
        setCurrentCategory={setCurrentCategory}
        currentCategory={currentCategory}
      />
    </div>
  );
}

export default App;
