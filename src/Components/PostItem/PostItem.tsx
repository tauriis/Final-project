import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Post } from "../../types";
import "../../Styles/_main.scss";

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <li key={post._id} className="post-item">
      <div className="post-metrics">
        <p className="post-views">Views: {post.views}</p>
        <p className="post-votes">
          Votes: {post.likes.length - post.dislikes.length}
        </p>
        <p className="post-comments">Comments: {post.comments.length}</p>
      </div>
      <Link to={`/posts/${post._id}`} className="post-link">
        <p className="post-author">
          Posted by <span className="username">{post.userId.username}</span>
          {post.createdAt && (
            <span className="post-time">
              {" "}
              about {formatDistanceToNow(new Date(post.createdAt))} ago
            </span>
          )}
        </p>
        <h3 className="post-title">{post.title}</h3>
        <div className="post-content-wrapper">
        <p className="post-content">{post.content}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
