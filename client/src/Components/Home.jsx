import { Link } from "react-router-dom";
import Footer from "./Footer";
import { Paper, Button, Typography, Box, Fade } from "@mui/material";
import { useContext } from "react";
import { IsLoggedInContext, UserContext } from "../App";

function Home() {
  const isLoggedIn = useContext(IsLoggedInContext);
  const user = useContext(UserContext);

  const getDashboardLink = () => {
    if (user?.role === 'admin') return '/admin-dashboard';
    return '/user-dashboard';
  };
  return (
    <Fade in={true} timeout={800}>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", minHeight: "100vh" }}>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
          <Paper
            sx={{
              padding: { xs: "2rem 1rem", sm: "3rem" },
              textAlign: "center",
              borderRadius: "15px",
              maxWidth: "600px",
              width: "90%",
              backgroundColor: "#f5f5dc", // Beige
              transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              },
            }}
            elevation={6}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                marginBottom: "1rem",
                fontWeight: "bold",
                fontFamily: "'Dancing Script', cursive", // Stylish font
                fontSize: { xs: "2.5rem", sm: "4rem" }, // Increase size for impact
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)", // Stylish Blue Gradient
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))",
              }}
            >
              Trackly
            </Typography>
            <Typography
              variant="h5"
              sx={{
                marginBottom: "2rem",
                color: "#333",
                fontFamily: "'Dancing Script', cursive", // Stylish font
                fontSize: { xs: "1.2rem", sm: "2rem" },
                fontWeight: "bold",
              }}
            >
              Welcome To Trackly,
              Manage All Your Tickets
            </Typography>
            <Box sx={{ marginTop: "2rem" }}>
              <Button
                component={Link}
                to={isLoggedIn ? getDashboardLink() : "/login"}
                variant="contained"
                sx={{
                  padding: { xs: "0.4rem 1.5rem", sm: "0.5rem 2rem" }, // Smaller padding
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  fontWeight: "700",
                  borderRadius: "0.5rem", // Match Login card radius
                  backgroundColor: "blue", // Match Login card color
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "darkblue", // Match Login card hover
                    transform: "scale(1.1)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                  },
                }}
              >
                {isLoggedIn ? "Go to Dashboard" : "Login"}
              </Button>
            </Box>
          </Paper>
        </Box>
        <Footer />
      </div>
    </Fade>
  );
}

export default Home;
