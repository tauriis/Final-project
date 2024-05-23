import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface Post {
  _id: string;
  title: string;
  content: string;
  userId: {
    _id: string;
    username: string;
  };
}

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:5000/api/posts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPost(response.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchPost();
  }, [id]);

  const deletePost = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || '{}');
  
  console.log('Post User ID:', post.userId._id);
  console.log('Current User ID:', currentUser.id);
  
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Posted by {post.userId.username}</p>
      {post.userId._id === currentUser.id && (
        <button onClick={deletePost}>Delete Post</button>
      )}
    </div>
  );
};

export default PostPage;
