import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  Link,
  Button,
  TextField,
  Typography,
  Fade
} from "@mui/material";
import { toast } from 'react-toastify';
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [empId, setEmpId] = useState("");
  const [contactNo, setContactNo] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/signup`, { name, email, password, empId, contactNo })
      .then((result) => {
        if (result.status === 201) {
          toast.success("User added successfully");
          navigate("/admin-dashboard");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          toast.error("Email already exists. Please use a different email.");
          console.log("Email already exists!");
        } else {
          console.log(err);
        }
      });
  };

  const heading = { fontSize: "2.5rem", fontWeight: "600" };
  const paperStyle = {
    padding: "2rem",
    margin: "100px auto",
    borderRadius: "1rem",
    boxShadow: "10px 10px 10px",
  };
  const row = { display: "flex", marginTop: "2rem" };
  const btnStyle = {
    marginTop: "2rem",
    fontSize: "1.2rem",
    fontWeight: "700",
    backgroundColor: "blue",
    borderRadius: "0.5rem",
  };
  return (
    <Fade in={true} timeout={800}>
      <div>
        <Grid>
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
            }}
          >
            <Typography component="h1" variant="h5" style={heading}>
              {" "}
              Add New User{" "}
            </Typography>
            <form onSubmit={handleSignup}>
              <TextField
                style={row}
                sx={{ label: { fontWeight: "700", fontSize: "1.3rem" } }}
                fullWidth
                type="text"
                label="Enter Your Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></TextField>
              <TextField
                style={row}
                sx={{ label: { fontWeight: "700", fontSize: "1.3rem" } }}
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                style={row}
                sx={{ label: { fontWeight: "700", fontSize: "1.3rem" } }}
                fullWidth
                label="Employee ID"
                variant="outlined"
                type="text"
                placeholder="Enter Employee ID"
                name="empId"
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
              />
              <TextField
                style={row}
                sx={{ label: { fontWeight: "700", fontSize: "1.3rem" } }}
                fullWidth
                label="Contact Number"
                variant="outlined"
                type="number"
                placeholder="Enter Contact Number"
                name="contactNo"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
              />
              <TextField
                style={row}
                sx={{ label: { fontWeight: "700", fontSize: "1.3rem" } }}
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                placeholder="Enter Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button style={btnStyle} variant="contained" type="submit">
                Add User
              </Button>
            </form>
          </Paper>
        </Grid>
      </div>
    </Fade>
  );
};

export default Signup;
