import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    TextField,
    InputAdornment,
    Button,
    Menu,
    MenuItem,
    Avatar,
    Divider,
    LinearProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import BusinessIcon from '@mui/icons-material/Business';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';

const HighlightText = ({ text = '', highlight = '' }) => {
    if (!text) return null;
    if (!highlight.trim()) return <span>{text}</span>;
    const safeHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${safeHighlight})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <mark key={i} style={{ backgroundColor: '#fff59d', padding: '0 2px', borderRadius: '2px', color: 'black' }}>{part}</mark>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </span>
    );
};

const ProjectSection = ({
    projects,
    tasks,
    customers,
    projectSearch,
    setProjectSearch,
    filters,
    setFilters,
    anchors,
    setAnchors,
    theme
}) => {
    const {
        projectCustomerFilter
    } = filters;

    const { projectFilterAnchorEl } = anchors;

    const isFilterApplied = projectCustomerFilter !== undefined && projectCustomerFilter !== '';

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>Projects</Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                    <TextField
                        placeholder="Search name, ID or customer..."
                        size="small"
                        value={projectSearch}
                        onChange={e => setProjectSearch(e.target.value)}
                        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                        sx={{ minWidth: 300, '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: 'white' } }}
                    />
                    <Button
                        variant="outlined"
                        onClick={e => setAnchors({ ...anchors, projectFilterAnchorEl: e.currentTarget })}
                        startIcon={<FilterListIcon />}
                        sx={{ borderRadius: 3, fontWeight: 700, px: 3 }}
                    >
                        Filter
                    </Button>

                    <Menu
                        anchorEl={projectFilterAnchorEl}
                        open={Boolean(projectFilterAnchorEl)}
                        onClose={() => setAnchors({ ...anchors, projectFilterAnchorEl: null })}
                        PaperProps={{
                            sx: {
                                p: 2,
                                minWidth: 280,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                borderRadius: 3,
                                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                            }
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Project Filters</Typography>

                        <TextField
                            select
                            fullWidth
                            label="Customer"
                            size="small"
                            value={projectCustomerFilter || ''}
                            onChange={e => setFilters({ ...filters, projectCustomerFilter: e.target.value })}
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="">All Customers</MenuItem>
                            {customers.map(c => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
                        </TextField>

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => setAnchors({ ...anchors, projectFilterAnchorEl: null })}
                            sx={{ mt: 1, borderRadius: 2, fontWeight: 800 }}
                        >
                            Apply Filters
                        </Button>

                        <Button
                            fullWidth
                            variant="text"
                            color="error"
                            onClick={() => {
                                setFilters({
                                    ...filters,
                                    projectCustomerFilter: ''
                                });
                                setProjectSearch('');
                                setAnchors({ ...anchors, projectFilterAnchorEl: null });
                            }}
                            sx={{ mt: 0.5, fontWeight: 700 }}
                        >
                            Clear All
                        </Button>
                    </Menu>

                    {isFilterApplied && (
                        <Typography
                            variant="caption"
                            onClick={() => {
                                setProjectSearch('');
                                setFilters({
                                    ...filters,
                                    projectCustomerFilter: ''
                                });
                            }}
                            sx={{ color: 'error.main', cursor: 'pointer', fontWeight: 800, '&:hover': { textDecoration: 'underline' } }}
                        >
                            Reset Filters
                        </Typography>
                    )}
                </Box>
            </Box>

            <Grid container spacing={3} alignItems="stretch">
                {projects.length > 0 ? projects.map(p => (
                    <Grid item xs={12} md={6} key={p._id} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Paper elevation={0} sx={{
                            p: 3, borderRadius: 4, border: '1px solid rgba(0,0,0,0.05)',
                            display: 'flex', flexDirection: 'column', gap: 2,
                            bgcolor: 'white', width: '100%', height: '100%',
                            transition: '0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }
                        }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 900, color: 'text.primary', mb: 0.5 }}>
                                        <HighlightText text={p.name} highlight={projectSearch} />
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="caption" sx={{ fontWeight: 800, bgcolor: 'primary.light', color: 'primary.main', px: 1, py: 0.3, borderRadius: 1 }}>
                                            <HighlightText text={p.projectId} highlight={projectSearch} />
                                        </Typography>
                                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                                            Project
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Divider sx={{ opacity: 0.4 }} />

                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.03)' }}>
                                        <BusinessIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700, display: 'block' }}>CUSTOMER</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                            <HighlightText text={p.customer?.name || 'N/A'} highlight={projectSearch} />
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.03)' }}>
                                        <AccessTimeIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700, display: 'block' }}>TOTAL HRS</Typography>
                                        <Typography variant="caption" sx={{ fontWeight: 800 }}>
                                            {Number(p.hours) || 0} Hrs Allotted
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{ mt: 1, p: 2, borderRadius: 3, bgcolor: '#fafafa', border: '1px solid #f0f0f0' }}>
                                {(() => {
                                    const consumed = tasks.filter(t => (t.project?._id === p._id || t.project === p._id)).reduce((acc, curr) => acc + (Number(curr.timeTaken) || 0), 0);
                                    const limit = Number(p.hours) || 0;
                                    const left = limit - consumed;
                                    const percent = limit > 0 ? Math.min((consumed / limit) * 100, 100) : 0;
                                    const statusColor = percent > 90 ? 'error' : percent > 75 ? 'warning' : 'primary';

                                    return (
                                        <>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                                <Box>
                                                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700, display: 'block' }}>CONSUMED</Typography>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 900, color: 'primary.dark' }}>{consumed.toFixed(2)} Hrs</Typography>
                                                </Box>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700, display: 'block' }}>LIMIT</Typography>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>{limit} Hrs</Typography>
                                                </Box>
                                                <Box sx={{ textAlign: 'right' }}>
                                                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700, display: 'block' }}>LEFT</Typography>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 900, color: left < 0 ? 'error.main' : '#2e7d32' }}>
                                                        {left.toFixed(2)} Hrs
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={percent}
                                                sx={{
                                                    height: 10,
                                                    borderRadius: 5,
                                                    bgcolor: 'rgba(0,0,0,0.05)',
                                                    '& .MuiLinearProgress-bar': { borderRadius: 5, bgcolor: theme.palette[statusColor].main }
                                                }}
                                            />
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                                                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>Utilization</Typography>
                                                <Typography variant="caption" sx={{ fontWeight: 900, color: `${statusColor}.main` }}>
                                                    {percent.toFixed(1)}%
                                                </Typography>
                                            </Box>
                                        </>
                                    );
                                })()}
                            </Box>
                        </Paper>
                    </Grid>
                )) : (
                    <Grid item xs={12}>
                        <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 4, border: '1px dashed #ccc', bgcolor: 'transparent' }}>
                            <Typography color="textSecondary" sx={{ fontWeight: 700 }}>No projects found matching your filters.</Typography>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default ProjectSection;
