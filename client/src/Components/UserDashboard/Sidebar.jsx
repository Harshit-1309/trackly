import React from 'react';
import {
    Box,
    Toolbar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import TableChartIcon from '@mui/icons-material/TableChart';
import AddBoxIcon from '@mui/icons-material/AddBox';

const Sidebar = ({ activeSection, setActiveSection, isMobile, setMobileOpen }) => {
    const menuItems = [
        { text: 'Overview', icon: <DashboardIcon /> },
        { text: 'Contracts', icon: <ReceiptLongIcon /> },
        { text: 'Manage Tasks', icon: <TableChartIcon /> },
        { text: 'New Task', icon: <AddBoxIcon /> }
    ];

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Toolbar />
            <List sx={{ px: 2, py: 3 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            onClick={() => {
                                setActiveSection(item.text.toLowerCase());
                                if (isMobile) setMobileOpen(false);
                            }}
                            selected={activeSection === item.text.toLowerCase()}
                            sx={{
                                borderRadius: 3,
                                '&.Mui-selected': {
                                    bgcolor: 'primary.light',
                                    '&:hover': { bgcolor: 'primary.light' }
                                }
                            }}
                        >
                            <ListItemIcon sx={{
                                minWidth: 40,
                                color: activeSection === item.text.toLowerCase() ? 'primary.main' : 'inherit'
                            }}>
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
