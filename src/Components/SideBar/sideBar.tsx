// Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";

const tags = [
  "Technology",
  "Lifestyle",
  "Sports",
  "Business",
  "Education",
  "Health & Fitness",
  "Entertainment",
  "Politics",
  "Music",
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Tags</h2>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>
            <Link to={`/posts/tag/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
