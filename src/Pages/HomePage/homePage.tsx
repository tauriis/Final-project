import React from 'react';
import { Link } from 'react-router-dom';
import './homePage.css';

const HomePage = () => {
  return (
    <div>
      <header>
        <h1><Link to="/">Forum</Link></h1>
        <nav>
          <ul>
            <li><Link to="/create-post">Create Post</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <h2>Welcome to our forum!</h2>
        <section>
          <h3>Categories</h3>
          <ul>
            <li><Link to="/category/1">Category 1</Link></li>
            <li><Link to="/category/2">Category 2</Link></li>
            <li><Link to="/category/3">Category 3</Link></li>
          </ul>
        </section>
        <section>
          <h3>Recent Posts</h3>
          <ul>
            <li><Link to="/post/1">Post 1</Link></li>
            <li><Link to="/post/2">Post 2</Link></li>
            <li><Link to="/post/3">Post 3</Link></li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default HomePage;