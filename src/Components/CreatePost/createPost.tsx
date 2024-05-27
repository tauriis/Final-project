import React, { useState } from "react";
import axios from "axios";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import "../../Styles/_main.scss";

const CreatePost = () => {
  console.log("Rendering CreatePost component");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");

  const availableTags = [
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
    <>
      <Header />
      <main className="createPostMain">
        <form onSubmit={handleSubmit} className="create-post-form">
          <h2>Create a new post</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              if (e.target.value.length <= 60) {
                setTitle(e.target.value);
              }
            }}
            placeholder="Title"
            className="create-post-title"
            minLength={10}
            maxLength={60}
          />
          <textarea
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= 300) {
                setContent(e.target.value);
              }
            }}
            placeholder="Content"
            className="create-post-content"
            maxLength={500}
          />
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
            className="create-post-tag"
          >
            <option value="">Select a tag</option>
            {availableTags.map((availableTag) => (
              <option value={availableTag} key={availableTag}>
                {availableTag}
              </option>
            ))}
          </select>
          <button type="submit" className="btn">
            Post
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default CreatePost;
