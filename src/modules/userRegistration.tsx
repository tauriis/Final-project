import React, { FormEvent, useState } from "react";
import axios from "axios";

interface RegisterProps {
  onLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        email,
        username,
        password,
      });

      localStorage.setItem("currentUser", response.data.user.id);
      localStorage.setItem("token", response.data.token);

      onLogin();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="registrationMain">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </main>
  );
};

export default Register;
