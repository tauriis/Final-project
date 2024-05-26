import React, { useEffect, useState } from "react";
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
  const [post, setPost] = useState<Post | null>(null);
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
      setPost(response.data);

      // view count
      await axios.put(
        `http://localhost:5000/api/posts/${id}/views`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  useEffect(() => {
    fetchPost();
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

  return (
    <main className="postIdMain">
      <Header />
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p>Posted by {post.userId.username}</p>
        <p>Views: {post.views}</p>
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
        {post.comments &&
          post.comments.map((comment: Comment, index: number) => (
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
