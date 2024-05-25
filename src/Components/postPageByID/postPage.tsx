import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header/header";

interface Comment {
  _id: string;
  text: string;
  username: string;
  userId: string;
  likes: string[];
  dislikes: string[];
}

interface Post {
  _id: string;
  title: string;
  content: string;
  views: number;
  userId: {
    _id: string;
    username: string;
  };
  comments: Comment[];
}

const PostPage = () => {
  console.log("Rendering PostPage component");
  const { id } = useParams();
  const postRef = useRef<Post | null>(null);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

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
      postRef.current = response.data;
      setRender((prev) => !prev);
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  useEffect(() => {
    console.log("Running incrementViewCount useEffect hook");
    const incrementViewCount = async () => {
      try {
        const token = localStorage.getItem("token");

        await axios.put(
          `http://localhost:5000/api/posts/${id}/views`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error incrementing view count:", error);
      }
    };

    incrementViewCount();
  }, [id]);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log(`Submitting comment: ${comment}`);

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:5000/api/posts/${id}/comments`,
        {
          text: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchPost();

      setComment("");
    } catch (error) {
      console.error("Error submitting comment or fetching post:", error);
    }
  };

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

  if (!postRef.current) {
    return <div>Loading...</div>;
  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  console.log("Post User ID:", postRef.current.userId._id);
  console.log("Current User ID:", currentUser.id);

  const handleDeleteComment = async (commentId: string) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/posts/${id}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchPost();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/posts/${id}/comments/${commentId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchPost();
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  const handleDislikeComment = async (commentId: string) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/posts/${id}/comments/${commentId}/dislike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchPost();
    } catch (error) {
      console.error("Error disliking comment:", error);
    }
  };

  return (
    <main className="postIdMain">
      <Header />
      <div>
        <h2>{postRef.current.title}</h2>
        <p>{postRef.current.content}</p>
        <p>Posted by {postRef.current.userId.username}</p>
        <p>Views: {postRef.current.views}</p>
        {postRef.current.userId._id === currentUser.id && (
          <button onClick={deletePost}>Delete Post</button>
        )}
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write a comment"
          />
          <button type="submit">Submit Comment</button>
        </form>
        {postRef.current.comments &&
          postRef.current.comments.map((comment: Comment, index: number) => (
            <div key={index}>
              <p>{comment.text}</p>
              <p>Posted by {comment.username}</p>
              <button onClick={() => handleLikeComment(comment._id)}>
                Like ({comment.likes.length})
              </button>
              <button onClick={() => handleDislikeComment(comment._id)}>
                Dislike ({comment.dislikes.length})
              </button>
              {(currentUser.id === comment.userId ||
                (postRef.current &&
                  currentUser.id === postRef.current.userId._id)) && (
                <button onClick={() => handleDeleteComment(comment._id)}>
                  Delete Comment
                </button>
              )}
            </div>
          ))}
      </div>
    </main>
  );
};

export default PostPage;
