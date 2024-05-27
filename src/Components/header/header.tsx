import { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../Styles/_main.scss";
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
    <header className="header">
      <h1 className="logo">
        <Link to="/" className="logo-link">
          Forum
        </Link>
      </h1>
      <nav className="navigation">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/all-posts" className="nav-link">
              All Posts
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/create-post" className="nav-link">
                  Create Post
                </Link>
              </li>
              <li ref={dropdownRef} className="dropdown">
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`dropdown-toggle ${dropdownOpen ? "open" : ""}`}
                  id="username"
                >
                  <span className={`username ${dropdownOpen ? "open" : ""}`}>
                    {currentUser.username}
                  </span>
                </div>
                <ul className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}>
                  <li className="dropdown-item">
                    <Link to="/profile" className="dropdown-link">
                      Profile
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <span onClick={handleLogout} className="dropdown-link">
                      Sign-out
                    </span>
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <li className="nav-item" id="login">
              <Link to="/login" className="nav-link">
                Sign-in
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
