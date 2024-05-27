import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/_main.scss";
import Header from "../../Components/Header/header";
import Sidebar from "../../Components/SideBar/sideBar";
import PostItem from "../../Components/PostItem/PostItem";
import { Post } from "../../types";
import Footer from "../../Components/Footer/footer";
import "../../Styles/_main.scss"

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : {};

        const response = await axios.get(
          "http://localhost:5000/api/posts",
          config
        );

        const lastThreePosts = response.data.slice(-3);

        const sortedPosts = response.data.sort((a: Post, b: Post) => {
          return b.comments.length - a.comments.length;
        });

        const topThreeTrendingPosts = sortedPosts.slice(0, 3);

        setPosts(lastThreePosts);
        setTrendingPosts(topThreeTrendingPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <div className="homeContainer">
        <aside id="sidebar">
          <Sidebar />
        </aside>
        <main className="homeMain">
          <section id="recentPosts">
            <span className="section-info">
            <h2 className="post-category">Recent posts</h2>
            <p className="category-description">Most recent posts created by users</p>
            </span>
            <ul className="post-item-list">
              {posts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </ul>
          </section>
          <section id="trendingPosts">
            <span className="section-info">
            <h2 className="post-category">Trending posts</h2>
            <p className="category-description">Posts with the most comments under it</p>
            </span>
            <ul className="post-item-list">
              {trendingPosts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </ul>
          </section>
        </main>
      </div>
        <Footer />
    </>
  );
};

export default HomePage;
