import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./modules/navigation";
import CreatePost from "./Components/CreatePost/createPost";
import PostPage from "./Components/postPageByID/postPage";
import AllPostsPage from "./Pages/AllPosts/allPosts";
import TagPage from "./Pages/PageByTag/tagPage";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/all-posts" element={<AllPostsPage />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts/tag/:tag" element={<TagPage />} />
        <Route path="/posts/:id" element={<PostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
