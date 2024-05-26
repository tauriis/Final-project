import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../Pages/HomePage/homePage";
import LandingPage from "../Pages/UserAuthentication/userAuthentication";
import Register from "./userRegistration";
import AllPosts from "../Pages/AllPosts/allPosts";
import CreatePost from "../Components/CreatePost/createPost";
import PostsByTag from "../Pages/PageByTag/tagPage";
import PostById from "../Components/postPageByID/postPage";

function Navigation() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;

  const handleLogin = () => {
    navigate("/");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LandingPage onLogin={handleLogin} onRegister={handleRegister} />} />
      <Route path="/register" element={<Register onLogin={handleLogin} />} />
      <Route path="/all-posts" element={<AllPosts />} />
      <Route path="/create-post" element={isLoggedIn ? <CreatePost /> : <Navigate to="/login" />} />
      <Route path="/posts/tag/:tag" element={<PostsByTag />} />
      <Route path="/posts/:id" element={<PostById />} />
    </Routes>
  );
}

export default Navigation;