import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Post } from "../../types"

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <li key={post._id}>
      <Link to={`/posts/${post._id}`}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </Link>
      <p>Posted by {post.userId.username}</p>
      <p>Views: {post.views}</p>
      <p>Votes: {post.likes.length - post.dislikes.length}</p>
      {post.createdAt && (
        <p>{formatDistanceToNow(new Date(post.createdAt))} ago</p>
      )}
    </li>
  );
};

export default PostItem;