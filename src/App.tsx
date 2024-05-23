import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './modules/navigation';
import CreatePost from './Components/CreatePost/createPost';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/create-post" element={<CreatePost />} />
        {/* Add your other routes here */}
      </Routes>
    </Router>
  );
}

export default App;