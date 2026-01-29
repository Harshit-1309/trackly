import React from "react";
import {
    Box,
    Typography,
    Grid,
    Paper
} from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import DescriptionIcon from '@mui/icons-material/Description';
import BusinessIcon from '@mui/icons-material/Business';
import EngineeringIcon from '@mui/icons-material/Engineering';

const OverviewSection = ({ user, counts }) => {
    const { users, products, contracts, customers, consultants } = counts;

    return (
        <Box sx={{ mt: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    Welcome, {user?.name || "Administrator"}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    System Control Panel
                </Typography>
            </Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Admin Control Center</Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={4} md={2.4}>
                    <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#e3f2fd' }}>
                        <PeopleIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{users}</Typography>
                        <Typography variant="body2" color="textSecondary">Users</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4} md={2.4}>
                    <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#f1f8e9' }}>
                        <InventoryIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{products}</Typography>
                        <Typography variant="body2" color="textSecondary">Products</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4} md={2.4}>
                    <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#fff3e0' }}>
                        <DescriptionIcon sx={{ color: '#ff9800', fontSize: 40, mb: 1 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{contracts}</Typography>
                        <Typography variant="body2" color="textSecondary">Contracts</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4} md={2.4}>
                    <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#f3e5f5' }}>
                        <BusinessIcon sx={{ color: '#9c27b0', fontSize: 40, mb: 1 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{customers}</Typography>
                        <Typography variant="body2" color="textSecondary">Customers</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4} md={2.4}>
                    <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#ffebee' }}>
                        <EngineeringIcon sx={{ color: '#f44336', fontSize: 40, mb: 1 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{consultants}</Typography>
                        <Typography variant="body2" color="textSecondary">Consultants</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Box sx={{ mt: 6 }}>
                <Typography variant="body1" color="textSecondary">
                    Select a category from the sidebar to manage specific records.
                </Typography>
            </Box>
        </Box>
    );
};

export default OverviewSection;
