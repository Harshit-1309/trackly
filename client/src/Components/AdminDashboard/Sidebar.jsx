import React from "react";
import {
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BusinessIcon from '@mui/icons-material/Business';
import EngineeringIcon from '@mui/icons-material/Engineering';
import TableChartIcon from '@mui/icons-material/TableChart';
import AddBoxIcon from '@mui/icons-material/AddBox';

const Sidebar = ({ activeSection, setActiveSection, isMobile, handleDrawerToggle, navigate }) => {
  const menuItems = [
    { text: 'Overview', icon: <DashboardIcon /> },
    { text: 'Users', icon: <PeopleIcon /> },
    { text: 'Products', icon: <InventoryIcon /> },
    { text: 'Contracts', icon: <ReceiptLongIcon /> },
    { text: 'Customers', icon: <BusinessIcon /> },
    { text: 'Consultants', icon: <EngineeringIcon /> },
    { text: 'Manage Tasks', icon: <TableChartIcon /> },
    { text: 'Log Task', icon: <AddBoxIcon /> }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => {
                if (item.text === 'Manage Tasks') {
                  navigate("/user-dashboard", { state: { activeTab: 'manage tasks' } });
                } else if (item.text === 'Log Task') {
                  navigate("/user-dashboard", { state: { activeTab: 'new task' } });
                } else {
                  setActiveSection(item.text.toLowerCase());
                }
                if (isMobile) handleDrawerToggle();
              }}
              selected={activeSection === item.text.toLowerCase()}
              sx={{
                borderRadius: 3,
                '&.Mui-selected': { bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.light' } }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: activeSection === item.text.toLowerCase() ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: activeSection === item.text.toLowerCase() ? 800 : 600,
                  fontSize: '0.9rem'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
