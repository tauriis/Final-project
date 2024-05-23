import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './modules/navigation';
import CreatePost from './Components/CreatePost/createPost';
import PostPage from './Components/postPageByID/postPage';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/create-post" element={<CreatePost />} />       
        <Route path="/posts/:id" element={<PostPage />} />
      </Routes>
    </Router>
  );
}

export default App;