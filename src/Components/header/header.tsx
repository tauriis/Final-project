import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header>
      <h1>
        <Link to="/">Forum</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to="/all-posts">All Posts</Link>
          </li>
          <li>
            <Link to="/create-post">Post a question</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
