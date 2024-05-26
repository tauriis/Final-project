import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header/header";
import PostItem from "../../Components/PostItem/PostItem";
import { Post } from "../../types";

const TagPage = () => {
  const { tag } = useParams<{ tag: string }>();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/tag/${tag}`
        );
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, [tag]);

  return (
    <>
      <Header />
      <main>
        <h2>Posts tagged with "{tag}"</h2>
        <ul>
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </ul>
      </main>
    </>
  );
};

export default TagPage;
