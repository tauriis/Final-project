import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import Sidebar from "../SideBar/sideBar";
import { Post } from "../../types";
import { Comment } from "../../types";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { formatDistanceToNow, parseISO } from "date-fns";
import "../../Styles/_main.scss";

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
      await axios.put(
        `http://localhost:5000/api/posts/${id}/views`,
        {},
        config
      );
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id, token]);

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
    <>
      <Header />
      <div className="container">
        <aside className="sidebar">
          <Sidebar />
        </aside>
        <main className="postIdMain">
          <div className="post-container" id={`post-${post._id}`}>
            <span className="content-wrapper">
              <p className="post-author">
                Posted by{" "}
                <span className="username">{post.userId.username}</span>
              </p>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-content">{post.content}</p>
            </span>
            {post.tags &&
              post.tags.map((tag, index) => (
                <p key={index} className="post-tag">
                  Tag: <span className="tag">{tag}</span>
                </p>
              ))}
            <span className="count-wrapper">
              <p className="post-views">
                Views: <span className="view-count">{post.views}</span>
              </p>
              <span className="post-votes">
                Votes:{" "}
                <span className="vote-count">
                  {post.likes.length - post.dislikes.length}
                </span>
              </span>
            </span>
            <button
              className="like-button"
              onClick={handleLikePost}
              disabled={!token}
            >
              Like
            </button>
            <button
              className="dislike-button"
              onClick={handleDislikePost}
              disabled={!token}
            >
              Dislike
            </button>
            {token && (
              <>
                {post.userId._id === currentUser.id && (
                  <button className="delete-post-button" onClick={deletePost}>
                    Delete Post
                  </button>
                )}
                <form className="comment-form" onSubmit={handleCommentSubmit}>
                  <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Write a comment"
                    className="comment-input"
                    maxLength={300}
                  />

                  <button type="submit" className="submit-comment-button">
                    Submit Comment
                  </button>
                </form>
              </>
            )}
          </div>
          {post.comments &&
            post.comments.map((comment: Comment, index: number) => (
              <div
                key={index}
                className="comment-container"
                id={`comment-${comment._id}`}
              >
                <p className="comment-author">
                  Posted by <span className="username">{comment.username}</span>{" "}
                </p>
                <p className="comment-text">{comment.text}</p>
                {comment.createdAt && (
                  <p className="comment-time">
                    {formatDistanceToNow(parseISO(comment.createdAt))} ago
                  </p>
                )}
                <span className="comment-votes">
                  Votes:{" "}
                  <span className="vote-count">
                    {comment.likes.length - comment.dislikes.length}
                  </span>
                </span>
                <button
                  className="like-comment-button"
                  onClick={() => handleLikeComment(comment._id)}
                  disabled={!token}
                >
                  Like
                </button>
                <button
                  className="dislike-comment-button"
                  onClick={() => handleDislikeComment(comment._id)}
                  disabled={!token}
                >
                  Dislike
                </button>
                {token &&
                  (currentUser.id === comment.userId ||
                    (post && currentUser.id === post.userId._id)) && (
                    <button
                      className="delete-comment-button"
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      Delete comment
                    </button>
                  )}
              </div>
            ))}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default React.memo(PostPage);
