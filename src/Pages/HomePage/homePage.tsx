import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./homePage.css";
import Header from "../../Components/Header/header";
import { formatDistanceToNow } from "date-fns";

// interface User {
//   _id: string;
//   username: string;
// }

interface Post {
  _id: string;
  title: string;
  content: string;
  userId: {
    _id: string;
    username: string;
  };
  createdAt: string | null;
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

        // Get the last 3 posts
        const lastThreePosts = response.data.slice(-3);

        setPosts(lastThreePosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <main className="homeMain">
        <section>
          <h2>Recent posts</h2>
          <ul>
            {posts.map((post) => (
              <li key={post._id}>
                <Link to={`/posts/${post._id}`}>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </Link>
                <p>Posted by {post.userId.username}</p>
                {post.createdAt && (
                  <p>{formatDistanceToNow(new Date(post.createdAt))} ago</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default HomePage;
