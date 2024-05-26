import React, { useState, useEffect } from "react";
import axios from "axios";
import "./homePage.css";
import Header from "../../Components/Header/header";
import Sidebar from "../../Components/SideBar/sideBar";
import PostItem from "../../Components/PostItem/PostItem";
import { Post } from "../../types"

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
      <Sidebar />
      <main className="homeMain">
        <section>
          <h2>Recent posts</h2>
          <ul>
          {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default HomePage;
