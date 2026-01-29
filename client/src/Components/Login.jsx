import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Link,
  Button,
  Paper,
  TextField,
  Typography,
  Fade
} from "@mui/material";
import { toast } from 'react-toastify';
import { SetIsLoggedInContext, SetUserContext } from "../App";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setIsLoggedIn = useContext(SetIsLoggedInContext);
  const setUser = useContext(SetUserContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/login`, { email, password }, { withCredentials: true })
      .then((result) => {
        if (result.data.status === "Success") {
          console.log("Login Result:", result.data);
          console.log("User Role:", result.data.role);
          setIsLoggedIn(true);
          setUser(result.data.user);
          const state = { user: result.data.user };
          if (result.data.role === "admin") {
            navigate("/admin-dashboard", { state });
          } else {
            navigate("/user-dashboard", { state });
          }
        } else {
          toast.error("Login failed");
        }
      })
      .catch((err) => console.log(err));
  };

  const paperStyle = {
    padding: "2rem",
    margin: "100px auto",
    borderRadius: "1rem",
    boxShadow: "10px 10px 10px",
  };
  const heading = { fontSize: "2.5rem", fontWeight: "bold" };
  const row = { display: "flex", marginTop: "2rem" };
  const btnStyle = {
    marginTop: "2rem",
    fontSize: "1.2rem",
    fontWeight: "700",
    backgroundColor: "blue",
    borderRadius: "0.5rem",
  };
  const label = { fontWeight: "700" };

  return (
    <Fade in={true} timeout={800}>
      <div>
        <Grid align="center" className="wrapper">
          <Paper
            style={paperStyle}
            sx={{
              width: {
                xs: "90vw",
                sm: "70vw",
                md: "50vw",
                lg: "30vw",
                xl: "20vw",
              },
              height: "auto",
              margin: { xs: "80px auto", sm: "100px auto" },
              padding: { xs: "1.5rem", sm: "2rem" },
              backgroundColor: "#f5f5dc", // Beige
              transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "20px 20px 20px rgba(0,0,0,0.3)",
              },
            }}
          >
            <img
              src="/gtech.png"
              alt="Gooner Technologies Logo"
              style={{ width: "100px", marginBottom: "1rem" }}
            />
            <Typography component="h1" variant="h5" style={heading}>
              Login
            </Typography>
            <form onSubmit={handleLogin}>
              <span style={row}>
                <TextField
                  sx={{ label: { fontWeight: "700", fontSize: "1.3rem" }, backgroundColor: "white" }}
                  style={label}
                  label="Email"
                  fullWidth
                  variant="outlined"
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
              <span style={row}>
                <TextField
                  sx={{ label: { fontWeight: "700", fontSize: "1.3rem" }, backgroundColor: "white" }}
                  label="Password"
                  fullWidth
                  variant="outlined"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </span>


              <Button
                style={btnStyle}
                variant="contained"
                type="submit"
                sx={{
                  "&:hover": {
                    backgroundColor: "darkblue !important", // Ensure it overrides the inline style
                  },
                }}
              >
                Login
              </Button>
            </form>
          </Paper>
        </Grid>
      </div>
    </Fade>
  );
}

export default Login;
