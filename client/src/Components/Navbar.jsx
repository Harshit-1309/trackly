import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logout from "./Logout";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Divider,
  TextField,
  MenuItem,
  Menu,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Popover
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SetUserContext } from "../App";

const Navbar = ({ isLoggedIn, setIsLoggedIn, user, handleDrawerToggle }) => {
  const setUser = useContext(SetUserContext);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDashboard = location.pathname.includes("dashboard");
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    contactNo: "",
    profileImage: ""
  });
  const [isPassDialogOpen, setIsPassDialogOpen] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  useEffect(() => {
    // Explicitly close popover on navigation
    setProfileAnchorEl(null);
  }, [location.pathname]);

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleEditProfileOpen = () => {
    setEditForm({
      name: user?.name || "",
      email: user?.email || "",
      contactNo: user?.contactNo || "",
      profileImage: user?.profileImage || ""
    });
    setIsEditProfileOpen(true);
    handleProfileClose();
  };

  const handleEditProfileClose = () => {
    setIsEditProfileOpen(false);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast.error("File size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_BASE_URL}/users/${user.id}`, {
        ...editForm,
        role: user.role,
        empId: user.empId
      }, { withCredentials: true });

      if (response.data) {
        toast.success("Profile updated successfully");
        const updatedUser = {
          ...user,
          name: response.data.name,
          email: response.data.email,
          contactNo: response.data.contactNo,
          profileImage: response.data.profileImage
        };
        setUser(updatedUser);
        handleEditProfileClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update profile");
    }
  };

  const handlePassOpen = () => {
    setIsPassDialogOpen(true);
    handleProfileClose();
  };

  const handlePassClose = () => {
    setIsPassDialogOpen(false);
    setNewPass("");
    setConfirmPass("");
  };

  const handlePassSubmit = async (e) => {
    e.preventDefault();
    if (!newPass) {
      toast.error("Password is required");
      return;
    }
    if (newPass !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await axios.patch(`${API_BASE_URL}/users/${user.id}/password`, { password: newPass }, { withCredentials: true });
      toast.success("Password updated successfully");
      handlePassClose();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update password");
    }
  };

  const button = {
    marginRight: isMobile ? "0px" : "20px",
    fontSize: isMobile ? "0.9rem" : "1.1rem",
    fontWeight: "700",
    padding: isMobile ? "0.2rem 0.8rem" : "0.3rem 1.4rem",
  };

  return (
    <AppBar sx={{ bgcolor: "#f5f5f5", color: "#333", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isLoggedIn && isDashboard && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img
              src="/gtech.png"
              alt="Gooner Technologies Logo"
              style={{ width: isMobile ? "35px" : "50px", marginRight: "0.5rem", cursor: "pointer" }}
            />
          </Link>
          <Typography
            variant={isMobile ? "h6" : "h4"}
            component="div"
            sx={{
              fontWeight: "bold",
              display: { xs: isLoggedIn && isDashboard ? "none" : "block", sm: "block" }
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                background: "linear-gradient(90deg, #0000FF 0%, #FF0000 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                cursor: "pointer",
              }}
            >
              {isDashboard ? "Trackly" : "Gooner Technologies"}
            </span>
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!isLoggedIn && location.pathname !== "/login" && (
            <Button
              variant="contained"
              style={button}
              color="error"
              component={Link}
              to="/login"
              sx={{
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  backgroundColor: "darkred",
                },
              }}
            >
              Login
            </Button>
          )}
          {isLoggedIn && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  bgcolor: "#eeeeee",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 10,
                  cursor: "pointer",
                  mr: 2,
                  "&:hover": { bgcolor: "#e0e0e0" },
                  transition: "background-color 0.2s",
                }}
                onClick={handleProfileClick}
              >
                {!isMobile && (
                  <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary" }}>
                    {user?.name || "User"}
                  </Typography>
                )}
                <Avatar
                  src={user?.profileImage}
                  sx={{ width: 40, height: 40, bgcolor: theme.palette.primary.main }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
              </Box>

              <Popover
                open={Boolean(profileAnchorEl)}
                anchorEl={profileAnchorEl}
                onClose={handleProfileClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    p: 0,
                    borderRadius: 2,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    minWidth: 250,
                  },
                }}
              >
                <Box sx={{ p: 2, bgcolor: theme.palette.primary.main, color: "white" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      src={user?.profileImage}
                      sx={{ width: 48, height: 48, bgcolor: "white", color: theme.palette.primary.main }}
                    >
                      {user?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {user?.name}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.9, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {user?.role?.toUpperCase()}
                        <IconButton
                          size="small"
                          onClick={handleEditProfileOpen}
                          sx={{
                            color: 'white',
                            p: 0,
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                          }}
                        >
                          <EditIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Email
                      </Typography>
                      <Typography variant="body2" fontWeight="500">
                        {user?.email}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Contact No.
                      </Typography>
                      <Typography variant="body2" fontWeight="500">
                        {user?.contactNo || "N/A"}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Employee ID
                      </Typography>
                      <Typography variant="body2" fontWeight="500">
                        {user?.empId || "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Divider />
                <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    startIcon={<VpnKeyIcon />}
                    onClick={handlePassOpen}
                    sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
                  >
                    Change Password
                  </Button>
                  <Logout setIsLoggedIn={setIsLoggedIn} />
                </Box>
              </Popover>

              <Dialog open={isEditProfileOpen} onClose={handleEditProfileClose} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white', py: 2 }}>
                  Edit Profile
                </DialogTitle>
                <form onSubmit={handleProfileUpdate}>
                  <DialogContent sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      required
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={editForm.email}
                      onChange={handleEditChange}
                      required
                    />
                    <TextField
                      fullWidth
                      label="Contact Number"
                      name="contactNo"
                      type="number"
                      value={editForm.contactNo}
                      onChange={handleEditChange}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                      <Avatar
                        src={editForm.profileImage}
                        sx={{ width: 60, height: 60, bgcolor: theme.palette.primary.main }}
                      >
                        {editForm.name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Button
                        variant="outlined"
                        component="label"
                        size="small"
                        startIcon={<AddIcon />} // Note: Need to make sure AddIcon is available or just use text
                      >
                        Change Photo
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </Button>
                      {editForm.profileImage && (
                        <Button
                          color="error"
                          size="small"
                          onClick={() => setEditForm({ ...editForm, profileImage: "" })}
                        >
                          Remove
                        </Button>
                      )}
                    </Box>
                  </DialogContent>
                  <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={handleEditProfileClose}>Cancel</Button>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<SaveIcon />}
                      sx={{ borderRadius: 2, px: 3 }}
                    >
                      Save Changes
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>

              <Dialog open={isPassDialogOpen} onClose={handlePassClose} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontWeight: 'bold', bgcolor: 'secondary.main', color: 'white', py: 2 }}>
                  Change Password
                </DialogTitle>
                <form onSubmit={handlePassSubmit}>
                  <DialogContent sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <Typography variant="body2">
                      Update password for <strong>{user?.name}</strong>
                    </Typography>
                    <TextField
                      fullWidth
                      label="New Password"
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      required
                    />
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      type="password"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      required
                    />
                  </DialogContent>
                  <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={handlePassClose}>Cancel</Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      startIcon={<SaveIcon />}
                      sx={{ borderRadius: 2, px: 3 }}
                    >
                      Update Password
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>

  );
};

export default Navbar;