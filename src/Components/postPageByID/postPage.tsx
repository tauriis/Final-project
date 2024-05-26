import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header/header";
import { Post } from "../../types";
import { Comment } from "../../types";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

const PostPage = () => {
  console.log("Rendering PostPage component");
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "AuthContext is undefined, please verify the context provider."
    );
  }

  const { token } = authContext;

  const fetchPost = async () => {
    try {
      const config = token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {};

      const response = await axios.get(
        `http://localhost:5000/api/posts/${id}`,
        config
      );
      setPost(response.data);

      // view count
      await axios.put(`http://localhost:5000/api/posts/${id}/views`);
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id, token]);

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

  if (!post) {
    return <div>Loading...</div>;
  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

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

  const handleLikePost = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:5000/api/posts/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchPost();
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleDislikePost = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:5000/api/posts/${id}/dislike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchPost();
    } catch (err) {
      console.error("Error disliking post:", err);
    }
  };

  return (
    <main className="postIdMain">
      <Header />
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        {post.tags &&
          post.tags.map((tag, index) => <p key={index}>Tag: {tag}</p>)}
        <p>Posted by {post.userId.username}</p>
        <p>Views: {post.views}</p>
        <button onClick={handleLikePost} disabled={!token}>
          Like
        </button>
        <button onClick={handleDislikePost} disabled={!token}>
          Dislike
        </button>
        <span>Votes: {post.likes.length - post.dislikes.length}</span>
        {token && (
          <>
            {post.userId._id === currentUser.id && (
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
          </>
        )}
        {post.comments &&
          post.comments.map((comment: Comment, index: number) => (
            <div key={index}>
              <p>{comment.text}</p>
              <p>Posted by {comment.username}</p>
              <button
                onClick={() => handleLikeComment(comment._id)}
                disabled={!token}
              >
                Like
              </button>
              <button
                onClick={() => handleDislikeComment(comment._id)}
                disabled={!token}
              >
                Dislike
              </button>
              <span>
                Votes: {comment.likes.length - comment.dislikes.length}
              </span>
              {token &&
                (currentUser.id === comment.userId ||
                  (post && currentUser.id === post.userId._id)) && (
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

export default React.memo(PostPage);