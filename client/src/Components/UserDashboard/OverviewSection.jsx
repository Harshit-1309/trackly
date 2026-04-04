import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Button
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const OverviewSection = ({ user, counts, setActiveSection }) => {
    return (
        <Box sx={{ mt: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    Welcome, {user?.name || "User"}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Here's what's happening today.
                </Typography>
            </Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>Dashboard Overview</Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#e3f2fd' }}>
                        <AssignmentIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{counts.totalTasks}</Typography>
                        <Typography variant="body2" color="textSecondary">Total Tasks</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#f1f8e9' }}>
                        <PersonIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{counts.userTasks}</Typography>
                        <Typography variant="body2" color="textSecondary">Your Entries</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#fff3e0' }}>
                        <ConfirmationNumberIcon sx={{ color: '#ff9800', fontSize: 40, mb: 1 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{counts.openTickets}</Typography>
                        <Typography variant="body2" color="textSecondary">Open Tickets</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Box sx={{ mt: 6, textAlign: 'center' }}>
                <Button variant="contained" size="large" onClick={() => setActiveSection('manage tasks')}>
                    View All Tasks
                </Button>
            </Box>
        </Box>
    );
};

export default OverviewSection;
