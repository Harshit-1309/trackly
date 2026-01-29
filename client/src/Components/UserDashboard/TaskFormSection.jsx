import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    TextField,
    MenuItem,
    Button,
    InputAdornment
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TaskFormSection = ({
    taskForm,
    editingTaskId,
    customers,
    consultants,
    contracts,
    isMobile,
    handlers
}) => {
    const {
        handleTaskChange,
        handleDateChange,
        handleCreateTask,
        onCancelEdit
    } = handlers;

    return (
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={8} lg={6}>
                <Paper elevation={0} sx={{ p: 5, borderRadius: 5, border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 20px 50px rgba(0,0,0,0.03)' }}>
                    <Typography variant="h5" sx={{ fontWeight: 900, mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <AddBoxIcon color="primary" /> {editingTaskId ? "Edit Task Details" : "Log New Task Entry"}
                    </Typography>
                    <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
                            <TextField select fullWidth label="Customer" name="customer" value={taskForm.customer} onChange={handleTaskChange} required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}>
                                {customers.map(c => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
                            </TextField>
                            <TextField select fullWidth label="Consultant" name="consultant" value={taskForm.consultant} onChange={handleTaskChange} required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}>
                                {consultants.map(c => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
                            </TextField>
                        </Box>
                        <TextField select fullWidth label="Select Contract" name="contract" value={taskForm.contract} onChange={handleTaskChange} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}>
                            <MenuItem value=""><em>General Support (No Specific Contract)</em></MenuItem>
                            {contracts.map(c => <MenuItem key={c._id} value={c._id}>{c.contractName}</MenuItem>)}
                        </TextField>
                        <TextField fullWidth multiline rows={4} label="Task Description" name="description" value={taskForm.description} onChange={handleTaskChange} required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />

                        <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
                            <DateTimePicker
                                label="Start Time"
                                value={taskForm.startTime}
                                onChange={(newValue) => handleDateChange('startTime', newValue)}
                                slotProps={{ textField: { fullWidth: true, required: true, sx: { '& .MuiOutlinedInput-root': { borderRadius: 3 } } } }}
                            />
                            <DateTimePicker
                                label="End Time"
                                value={taskForm.endTime}
                                onChange={(newValue) => handleDateChange('endTime', newValue)}
                                slotProps={{ textField: { fullWidth: true, required: true, sx: { '& .MuiOutlinedInput-root': { borderRadius: 3 } } } }}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Total Hours"
                                name="timeTaken"
                                value={taskForm.timeTaken}
                                onChange={handleTaskChange}
                                required
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><AccessTimeIcon fontSize="small" /></InputAdornment>
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                helperText="Automatically calculated from times"
                            />
                            <TextField select fullWidth label="Current Status" name="status" value={taskForm.status} onChange={handleTaskChange} required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}>
                                {['Open', 'Working - Customer', 'Working - Consultant', 'On Hold', 'Closed'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                            </TextField>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                            <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 2, borderRadius: 3, fontWeight: 800, textTransform: 'none', fontSize: '1rem' }}>
                                {editingTaskId ? "Update Task Entry" : "Save Task Entry"}
                            </Button>
                            {editingTaskId && (
                                <Button variant="outlined" color="secondary" size="large" onClick={onCancelEdit} sx={{ py: 2, borderRadius: 3, fontWeight: 800, textTransform: 'none' }}>
                                    Cancel
                                </Button>
                            )}
                        </Box>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default TaskFormSection;
