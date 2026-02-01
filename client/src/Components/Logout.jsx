import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api";
import axios from "axios";
import { Button } from "@mui/material";
import { SetIsLoggedInContext, SetUserContext } from "../App";

function Logout() {
  const navigate = useNavigate();
  const setIsLoggedIn = useContext(SetIsLoggedInContext);
  const setUser = useContext(SetUserContext);

  const handleLogout = () => {
    axios
      .post(`${API_BASE_URL}/logout`, {}, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(false);
          setUser(null);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        // Force logout in UI even if server call fails
        setIsLoggedIn(false);
        setUser(null);
        navigate("/login");
      });
  };
  const button = {
    fontSize: "1.2rem",
    fontWeight: "700",
    padding: "0.3rem 1.4rem",
  };
  return (
    <Button
      variant="contained"
      color="error"
      style={button}
      onClick={handleLogout}
      sx={{
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.1)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          backgroundColor: "darkred",
        },
      }}
    >
      Logout
    </Button>
  );
}

export default Logout;
