import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";
import AdminDashboard from "./Components/AdminDashboard";
import UserDashboard from "./Components/UserDashboard";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

axios.defaults.withCredentials = true;

export const IsLoggedInContext = createContext();
export const SetIsLoggedInContext = createContext();
export const UserContext = createContext();
export const SetUserContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user`, { withCredentials: true })
      .then((response) => {
        if (response.data.user) {
          setIsLoggedIn(true);
          setUser(response.data.user);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const DashboardRedirect = () => {
    if (!isLoggedIn || !user) return <Navigate to="/login" />;
    if (user.role === "admin") return <Navigate to="/admin-dashboard" />;
    if (user.role === "user") return <Navigate to="/user-dashboard" />;
    return <Navigate to="/login" />;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SetIsLoggedInContext.Provider value={setIsLoggedIn}>
      <IsLoggedInContext.Provider value={isLoggedIn}>
        <UserContext.Provider value={user}>
          <SetUserContext.Provider value={setUser}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <BrowserRouter>
                <Navbar
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  user={user}
                  handleDrawerToggle={handleDrawerToggle}
                />
                <ToastContainer position="top-right" autoClose={3000} />

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />

                  <Route
                    path="/login"
                    element={
                      isLoggedIn ? (
                        <DashboardRedirect />
                      ) : (
                        <Login setIsLoggedIn={setIsLoggedIn} />
                      )
                    }
                  />


                  <Route
                    path="/add-user"
                    element={
                      isLoggedIn && user?.role === "admin" ? (
                        <Signup />
                      ) : (
                        <DashboardRedirect />
                      )
                    }
                  />
                  <Route
                    path="/admin-dashboard"
                    element={
                      isLoggedIn && user?.role === "admin" ? (
                        <AdminDashboard mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                      ) : (
                        <DashboardRedirect />
                      )
                    }
                  />
                  <Route
                    path="/user-dashboard"
                    element={
                      isLoggedIn && (user?.role === "user" || user?.role === "admin") ? (
                        <UserDashboard mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                      ) : (
                        <DashboardRedirect />
                      )
                    }
                  />
                </Routes>
              </BrowserRouter>
            </LocalizationProvider>
          </SetUserContext.Provider>
        </UserContext.Provider>
      </IsLoggedInContext.Provider>
    </SetIsLoggedInContext.Provider>
  );
}

export default App;
