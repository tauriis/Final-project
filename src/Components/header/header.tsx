import { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { AuthContext } from "../../AuthContext";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "AuthContext is undefined, please verify the context provider."
    );
  }

  const { token, setToken } = authContext;
  const isLoggedIn = Boolean(token);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const dropdownRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <h1>
        <Link to="/">Forum</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to="/all-posts">All Posts</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/create-post">Create Post</Link>
              </li>
              <li ref={dropdownRef}>
                <div onClick={() => setDropdownOpen(!dropdownOpen)}>
                  {currentUser.username}
                </div>
                {dropdownOpen && (
                  <ul>
                    <li>
                      <span onClick={handleLogout}>Logout</span>
                    </li>
                  </ul>
                )}
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
