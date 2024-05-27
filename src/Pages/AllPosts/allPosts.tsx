import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/header";
import Sidebar from "../../Components/SideBar/sideBar";
import Footer from "../../Components/Footer/footer";
import PostItem from "../../Components/PostItem/PostItem";
import { Post } from "../../types";
import "../../Styles/_main.scss";

const AllPostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState(
    localStorage.getItem("filter") || "default"
  );

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
    localStorage.setItem("filter", e.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    if (filter === "answered") {
      return post.comments && post.comments.length > 0;
    }
    return true;
  });

  if (filter === "votes") {
    filteredPosts.sort((a, b) => {
      const aVotes = a.likes.length - a.dislikes.length;
      const bVotes = b.likes.length - b.dislikes.length;
      return bVotes - aVotes;
    });
  }

  if (filter === "leastVotes") {
    filteredPosts.sort((a, b) => {
      const aVotes = a.likes.length - a.dislikes.length;
      const bVotes = b.likes.length - b.dislikes.length;
      return aVotes - bVotes;
    });
  }

  if (filter === "mostViews") {
    filteredPosts.sort((a, b) => b.views - a.views);
  }

  if (filter === "leastViews") {
    filteredPosts.sort((a, b) => a.views - b.views);
  }

  if (filter === "mostComments") {
    filteredPosts.sort((a, b) => b.comments.length - a.comments.length);
  }

  if (filter === "leastComments") {
    filteredPosts.sort((a, b) => a.comments.length - b.comments.length);
  }

  const clearFilters = () => {
    setFilter("default");
    localStorage.setItem("filter", "default");
  };

  return (
    <>
      <Header />
      <div id="allPostsContainer">
        <aside id="sidebar">
          <Sidebar />
        </aside>
        <main id="allPostsMain">
          <section id="filterSection">
            <h3 className="filters-title">Filters:</h3>
            <select value={filter} onChange={handleFilterChange}>
              <option value="default">Default</option>
              <option value="answered">With comments</option>
              <option value="votes">Most Votes</option>
              <option value="leastVotes">Least Votes</option>
              <option value="mostViews">Most Views</option>
              <option value="leastViews">Least Views</option>
              <option value="mostComments">Most Comments</option>
              <option value="leastComments">Least Comments</option>
            </select>
            <button className="btn" onClick={clearFilters}>Clear Filters</button>
          </section>
          <section id="postsSection">
            <ul className="post-item-list">
              {filteredPosts.map((post) => (
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

export default AllPostsPage;
