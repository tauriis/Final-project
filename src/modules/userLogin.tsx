// import React, { FormEvent, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// interface LoginProps {
//   onLogin: () => void;
// }

// const Login: React.FC<LoginProps> = ({ onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("/api/auth", {
//         email,
//         username,
//         password,
//       });

//       console.log(response.data);

//       // Store the user's ID in local storage
//       localStorage.setItem("currentUser", response.data.user.id);
//       localStorage.setItem("token", response.data.token);

//       onLogin();
//       navigate("/");
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   };

//   return (
//     <form id="loginFields" onSubmit={handleSubmit}>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;

import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth", {
        email,
        password,
      });
  
      // Store the user's ID, username and JWT token in local storage
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
  
      onLogin();
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <form id="loginFields" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
