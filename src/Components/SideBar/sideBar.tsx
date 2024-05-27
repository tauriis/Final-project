import React from "react";
import { Link } from "react-router-dom";
import '../../Styles/_main.scss';

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
    <div className="sidebar-container">
      <h2 className="sidebar-title">Browse posts by tags</h2>
      <ul className="tag-list">
        {tags.map((tag, index) => (
          <li key={index} className="tag-item">
            <Link to={`/posts/tag/${tag}`} className="tag-link">
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
