import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./homePage.css";
import Header from "../../Components/Header/header";

interface User {
  _id: string;
  username: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  userId: User;
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:5000/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="homeMain">
      <Header />

      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <Link to={`/posts/${post._id}`}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </Link>
            <p>Posted by {post.userId.username}</p>
          </div>
        ))}
      </div>

      <h2>Welcome to our forum!</h2>
      <section>
        <h3>Categories</h3>
        <ul>
          <li>
            <Link to="/category/1">Category 1</Link>
          </li>
          <li>
            <Link to="/category/2">Category 2</Link>
          </li>
          <li>
            <Link to="/category/3">Category 3</Link>
          </li>
        </ul>
      </section>
      <section>
        <h3>Recent Posts</h3>
        <ul>
          <li>
            <Link to="/post/1">Post 1</Link>
          </li>
          <li>
            <Link to="/post/2">Post 2</Link>
          </li>
          <li>
            <Link to="/post/3">Post 3</Link>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default HomePage;
