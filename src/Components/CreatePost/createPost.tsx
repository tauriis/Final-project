import React, { useState } from "react";
import axios from "axios";
import Header from "../Header/header";

const CreatePost = () => {
  console.log("Rendering CreatePost component");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");

  const availableTags = ["Technology", "Lifestyle", "Sports", "Business", "Education", "Health & Fitness", "Entertainment", "Politics", "Music"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/posts",
        { title, content, tag },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
    } catch (err) {
      console.error("Error in handleSubmit:", err);
    }
  };

  return (
    <main className="createPostMain">
      <Header />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          required
        >
          <option value="">Select a tag</option>
          {availableTags.map((availableTag) => (
            <option value={availableTag} key={availableTag}>
              {availableTag}
            </option>
          ))}
        </select>
        <button type="submit">Create Post</button>
      </form>
    </main>
  );
};

export default CreatePost;