import { useNavigate } from "react-router-dom";
import Login from "../../modules/userLogin";
import "./userAuthentication.css";

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onRegister }) => {
  const navigate = useNavigate();

  const handleCreateAccountClick = () => {
    onRegister();
    navigate("/register");
  };

  return (
    <main className="authMain">
      <Login onLogin={onLogin} />
    <div className="authRedirect">
      <p>Don't have an account? Create one:</p>
      <button onClick={handleCreateAccountClick}>Create account</button>
    </div>
    </main>
);
};

export default LandingPage;