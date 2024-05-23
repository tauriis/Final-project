import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post("http://localhost:5000/api/posts", { title, content }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
    } catch (err) {
      console.error("Error in handleSubmit:", err);
    }
  };

  return (
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
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;