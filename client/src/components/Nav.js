import React, { useEffect } from "react";
import { capitalizeFirstLetter } from "../utils/helpers";
import { Link } from "react-router-dom";

function Nav({ categories = [], setCurrentCategory, currentCategory }) {
  useEffect(() => {
    document.title = capitalizeFirstLetter(currentCategory.name);
  }, [currentCategory]);

  return (
    <header className="flex-row px-1">
      <h2>
        <a data-testid="link" href="/">
          <span role="img" aria-label="flag">
            ⛳️
          </span>
          It Takes Balls
        </a>
      </h2>
      <nav>
        <ul className="flex-row">
          {categories.map((category) => (
            <Link to={category.ref} key={category.name}>
              {category.name}
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
