import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Box,
    Typography,
    IconButton,
    Grid,
    Avatar,
    Paper,
    Chip,
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    Tooltip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoIcon from '@mui/icons-material/Info';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

const TaskDialogs = ({
    selectedTask,
    user,
    dialogs,
    anchors,
    handlers,
    getStatusColor
}) => {
    const { infoOpen, deleteDialogOpen } = dialogs;
    const { actionMenuAnchorEl } = anchors;
    const {
        onCloseInfo,
        onCloseDelete,
        onCloseActionMenu,
        onDeleteConfirm,
        onEditClick,
        onDeleteClick,
        onInfoOpen
    } = handlers;

    const canModify = user?.role === 'admin' || (selectedTask && (selectedTask.createdBy?._id === user?.id || selectedTask.createdBy === user?.id));

    return (
        <>
            {/* Action Menu */}
            <Menu
                anchorEl={actionMenuAnchorEl}
                open={Boolean(actionMenuAnchorEl)}
                onClose={onCloseActionMenu}
                PaperProps={{ sx: { borderRadius: 3, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' } }}
            >
                <MenuItem onClick={onInfoOpen} sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    <ListItemIcon><InfoIcon fontSize="small" color="info" /></ListItemIcon>View Details
                </MenuItem>
                {canModify && (
                    <MenuItem onClick={() => onEditClick(selectedTask)} sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                        <ListItemIcon><EditIcon fontSize="small" color="primary" /></ListItemIcon>Edit Task
                    </MenuItem>
                )}
                {canModify && (
                    <MenuItem onClick={() => onDeleteClick(selectedTask._id)} sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                        <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>Delete Task
                    </MenuItem>
                )}
            </Menu>

            {/* Task Details Dialog */}
            <Dialog
                open={infoOpen}
                onClose={onCloseInfo}
                maxWidth="sm"
                fullWidth
                PaperProps={{ sx: { borderRadius: 4, bgcolor: '#fbfbfb' } }}
            >
                <DialogTitle sx={{
                    fontWeight: 900,
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #eee'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <AssignmentIcon color="primary" sx={{ fontSize: 28 }} />
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 900, fontSize: '1.2rem', lineHeight: 1.2 }}>Task Details</Typography>
                            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800 }}>ID: {selectedTask?.displayId || 'N/A'}</Typography>
                        </Box>
                    </Box>
                    <IconButton onClick={onCloseInfo} size="small" sx={{ bgcolor: '#f0f0f0' }}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: 3 }}>
                    {selectedTask && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
                            <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'white', border: '1px solid #eee' }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light', color: 'primary.main' }}>
                                                <PersonIcon sx={{ fontSize: 18 }} />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>Logged By</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 700 }}>{selectedTask.createdBy?.name || user?.name || 'N/A'}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'success.light', color: 'success.main' }}>
                                                <BusinessIcon sx={{ fontSize: 18 }} />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>Customer</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 700 }}>{selectedTask.customer?.name || 'N/A'}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'warning.light', color: 'warning.main' }}>
                                                <EngineeringIcon sx={{ fontSize: 18 }} />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>Consultant</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 700 }}>{selectedTask.consultant?.name || 'N/A'}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'info.light', color: 'info.main' }}>
                                                <ReceiptLongIcon sx={{ fontSize: 18 }} />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>Contract</Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{selectedTask.contract?.contractName || 'General Support'}</Typography>
                                                    {selectedTask.contract && (
                                                        <Tooltip
                                                            title={
                                                                <Box sx={{ p: 1 }}>
                                                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.2)', mb: 1, pb: 0.5 }}>
                                                                        {selectedTask.contract.contractName}
                                                                    </Typography>
                                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                                        <Typography variant="caption" sx={{ display: 'block', opacity: 0.9 }}>
                                                                            <strong>ID:</strong> {selectedTask.contract.contractId}
                                                                        </Typography>
                                                                        <Typography variant="caption" sx={{ display: 'block', opacity: 0.9 }}>
                                                                            <strong>Type:</strong> {selectedTask.contract.contractType}
                                                                        </Typography>
                                                                        <Typography variant="caption" sx={{ display: 'block', opacity: 0.9 }}>
                                                                            <strong>Period:</strong> {dayjs(selectedTask.contract.startDate).format('DD MMM YYYY')} - {dayjs(selectedTask.contract.endDate).format('DD MMM YYYY')}
                                                                        </Typography>
                                                                        <Typography variant="caption" sx={{ display: 'block', opacity: 0.9 }}>
                                                                            <strong>Status:</strong> {selectedTask.contract.contractStatus || 'N/A'}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                            }
                                                            arrow
                                                            placement="top"
                                                        >
                                                            <InfoOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary', cursor: 'pointer' }} />
                                                        </Tooltip>
                                                    )}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <DescriptionIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                    <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>Description</Typography>
                                </Box>
                                <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: 'white', border: '1px solid #eee' }}>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>{selectedTask.description}</Typography>
                                </Paper>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={7}>
                                    <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'white', border: '1px solid #eee', height: '100%' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                            <AccessTimeIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                                            <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>Work Timeline</Typography>
                                        </Box>
                                        <Box sx={{ pl: 1 }}>
                                            <Box sx={{ borderLeft: '2px dashed #eee', pl: 2, pb: 2, position: 'relative' }}>
                                                <Box sx={{ position: 'absolute', left: -5, top: 0, width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                                                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>START</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 700 }}>{selectedTask.startTime ? dayjs(selectedTask.startTime).format('DD MMM YYYY, hh:mm A') : 'N/A'}</Typography>
                                            </Box>
                                            <Box sx={{ borderLeft: '2px solid transparent', pl: 2, position: 'relative' }}>
                                                <Box sx={{ position: 'absolute', left: -5, top: 0, width: 8, height: 8, borderRadius: '50%', bgcolor: 'error.main' }} />
                                                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>END</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 700 }}>{selectedTask.endTime ? dayjs(selectedTask.endTime).format('DD MMM YYYY, hh:mm A') : 'Ongoing'}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
                                        <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
                                            <Typography variant="caption" sx={{ fontWeight: 800, opacity: 0.8 }}>TOTAL DURATION</Typography>
                                            <Typography variant="h4" sx={{ fontWeight: 900 }}>{selectedTask.timeTaken}<Typography component="span" variant="h6" sx={{ fontWeight: 700, ml: 0.5 }}>h</Typography></Typography>
                                        </Box>
                                        <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'white', border: '1px solid #eee', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', mb: 1 }}>TICKET STATUS</Typography>
                                            <Box>
                                                <Chip
                                                    label={selectedTask.status}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: getStatusColor(selectedTask.status) + '20',
                                                        color: getStatusColor(selectedTask.status),
                                                        fontWeight: 900,
                                                        borderRadius: 1.5,
                                                        px: 1
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #eee', bgcolor: 'white', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 800, display: 'block', mb: -0.5 }}>ENTRY CREATED</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary' }}>
                            {dayjs(selectedTask?.createdAt).format('DD MMM YYYY, hh:mm A')}
                        </Typography>
                    </Box>
                    <Button
                        onClick={onCloseInfo}
                        variant="outlined"
                        color="inherit"
                        sx={{ fontWeight: 800, borderRadius: 2.5, px: 4 }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={onCloseDelete} PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
                <DialogTitle sx={{ fontWeight: 900 }}>Delete Task Entry?</DialogTitle>
                <DialogContent><DialogContentText sx={{ fontWeight: 500 }}>This action is permanent and cannot be reversed. Are you sure you want to proceed?</DialogContentText></DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onCloseDelete} sx={{ fontWeight: 700 }}>Cancel</Button>
                    <Button onClick={onDeleteConfirm} color="error" variant="contained" sx={{ fontWeight: 800, borderRadius: 2 }}>Yes, Delete Task</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TaskDialogs;
