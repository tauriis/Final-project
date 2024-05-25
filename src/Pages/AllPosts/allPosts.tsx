import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/header";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface Post {
  _id: string;
  title: string;
  content: string;
  userId: {
    _id: string;
    username: string;
  };
  createdAt: string | null;
  comments: any[];
}

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

  return (
    <>
      <Header />
      <main className="allPostsMain">
        <section>
          <select value={filter} onChange={handleFilterChange}>
            <option value="default">Default</option>
            <option value="answered">Answered</option>
          </select>
          {filteredPosts.map((post) => (
            <div key={post._id}>
              <Link to={`/posts/${post._id}`}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </Link>
              <p>Posted by {post.userId.username}</p>
              {post.createdAt && (
                <p>
                  Posted {formatDistanceToNow(new Date(post.createdAt))} ago
                </p>
              )}
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default AllPostsPage;
