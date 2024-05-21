import { useNavigate } from 'react-router-dom';
import Login from './userLogin';

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onRegister }) => {
  const navigate = useNavigate();

  const handleCreateAccountClick = () => {
    onRegister();
    navigate('/register');
  }

  return (
    <div>
      <Login onLogin={onLogin} />
      <p>Don't have an account? Create one:</p>
      <button onClick={handleCreateAccountClick}>Create account</button>
    </div>
  );
}

export default LandingPage;