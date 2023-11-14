import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { userLogout } = useContext(AuthContext);

  useEffect(() => {
    userLogout();
    navigate("/login");
  }, [userLogout, navigate]);

  return null;
};

export default Logout;
