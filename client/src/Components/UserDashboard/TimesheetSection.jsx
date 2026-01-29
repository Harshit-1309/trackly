import React from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    InputAdornment,
    Menu,
    MenuItem,
    IconButton,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';

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

const TimesheetSection = ({
    tasks,
    groupedTasks,
    searchTerm,
    setSearchTerm,
    sortBy,
    isFilterApplied,
    handleClearFilters,
    setActiveSection,
    handlers,
    customers,
    contracts,
    consultants,
    filters,
    setFilters,
    anchors,
    setAnchors,
    theme,
    getStatusColor
}) => {
    const {
        onActionMenuOpen,
        exportToExcel,
        exportToCSV,
        setSortBy
    } = handlers;

    const {
        filterCustomer,
        filterContract,
        filterConsultant,
        filterProduct,
        filterStatus,
        filterMonth,
        filterYear
    } = filters;

    const {
        filterMenuAnchorEl,
        exportAnchorEl,
        filterAnchorEl
    } = anchors;

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                    <TextField
                        placeholder="Search tasks..."
                        size="small"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                        sx={{ minWidth: 250 }}
                    />

                    <Button
                        variant="outlined"
                        onClick={e => setAnchors({ ...anchors, filterMenuAnchorEl: e.currentTarget })}
                        startIcon={<FilterListIcon />}
                        color="primary"
                    >
                        Filter
                    </Button>

                    <Button variant="outlined" color="primary" onClick={e => setAnchors({ ...anchors, filterAnchorEl: e.currentTarget })}>
                        GroupBy: {sortBy === 'none' ? 'None' : sortBy}
                    </Button>

                    <Button variant="outlined" color="primary" onClick={e => setAnchors({ ...anchors, exportAnchorEl: e.currentTarget })} startIcon={<FileDownloadIcon />}>
                        Export
                    </Button>

                    {isFilterApplied && (
                        <Typography
                            variant="body2"
                            onClick={handleClearFilters}
                            sx={{
                                color: '#d32f2f',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                ml: 1,
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            Clear Filters
                        </Typography>
                    )}
                </Box>
                <Button variant="contained" onClick={() => setActiveSection('new task')} startIcon={<AddIcon />}>Add New Task</Button>
            </Box>

            {/* Filter Menu */}
            <Menu
                anchorEl={filterMenuAnchorEl}
                open={Boolean(filterMenuAnchorEl)}
                onClose={() => setAnchors({ ...anchors, filterMenuAnchorEl: null })}
                PaperProps={{
                    sx: {
                        p: 2,
                        minWidth: 250,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRadius: 3,
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                    }
                }}
            >
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Active Filters</Typography>
                <TextField
                    select
                    fullWidth
                    label="Customer"
                    size="small"
                    value={filterCustomer}
                    onChange={e => setFilters({ ...filters, filterCustomer: e.target.value })}
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="">All Customers</MenuItem>
                    {customers.map(c => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
                </TextField>
                <TextField
                    select
                    fullWidth
                    label="Contract"
                    size="small"
                    value={filterContract}
                    onChange={e => setFilters({ ...filters, filterContract: e.target.value })}
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="">All Contracts</MenuItem>
                    {contracts.map(c => <MenuItem key={c._id} value={c._id}>{c.contractName}</MenuItem>)}
                </TextField>
                <TextField
                    select
                    fullWidth
                    label="Consultant"
                    size="small"
                    value={filterConsultant}
                    onChange={e => setFilters({ ...filters, filterConsultant: e.target.value })}
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="">All Consultants</MenuItem>
                    {consultants.map(c => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
                </TextField>
                <TextField
                    select
                    fullWidth
                    label="Product"
                    size="small"
                    value={filterProduct}
                    onChange={e => setFilters({ ...filters, filterProduct: e.target.value })}
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="">All Products</MenuItem>
                    {Array.from(new Set(contracts.map(c => c.product?._id).filter(id => id))).map(id => {
                        const p = contracts.find(c => c.product?._id === id).product;
                        return <MenuItem key={id} value={id}>{p.name}</MenuItem>;
                    })}
                </TextField>
                <TextField
                    select
                    fullWidth
                    label="Status"
                    size="small"
                    value={filterStatus}
                    onChange={e => setFilters({ ...filters, filterStatus: e.target.value })}
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="">All Statuses</MenuItem>
                    {['Open', 'Working - Customer', 'Working - Consultant', 'On Hold', 'Closed'].map(s => (
                        <MenuItem key={s} value={s}>{s}</MenuItem>
                    ))}
                </TextField>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        select
                        fullWidth
                        label="Month"
                        size="small"
                        value={filterMonth}
                        onChange={e => setFilters({ ...filters, filterMonth: e.target.value })}
                    >
                        <MenuItem value="">All</MenuItem>
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                            <MenuItem key={m} value={i}>{m}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        fullWidth
                        label="Year"
                        size="small"
                        value={filterYear}
                        onChange={e => setFilters({ ...filters, filterYear: e.target.value })}
                    >
                        <MenuItem value="">All</MenuItem>
                        {[2023, 2024, 2025, 2026].map(y => (
                            <MenuItem key={y} value={y}>{y}</MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => setAnchors({ ...anchors, filterMenuAnchorEl: null })}
                    sx={{ mt: 3, py: 1.5, borderRadius: 3, fontWeight: 800 }}
                >
                    Apply Filters
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    color="inherit"
                    onClick={handleClearFilters}
                    sx={{ mt: 1 }}
                >
                    Clear All Filters
                </Button>
            </Menu>

            {/* Export Menu */}
            <Menu
                anchorEl={exportAnchorEl}
                open={Boolean(exportAnchorEl)}
                onClose={() => setAnchors({ ...anchors, exportAnchorEl: null })}
                PaperProps={{ sx: { mt: 1, borderRadius: 3, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' } }}
                disableRestoreFocus
            >
                <MenuItem onClick={() => { exportToExcel(); setAnchors({ ...anchors, exportAnchorEl: null }); }} sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Export as Excel</MenuItem>
                <MenuItem onClick={() => { exportToCSV(); setAnchors({ ...anchors, exportAnchorEl: null }); }} sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Export as CSV</MenuItem>
            </Menu>

            <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={() => setAnchors({ ...anchors, filterAnchorEl: null })} PaperProps={{ sx: { mt: 1, borderRadius: 3, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' } }}>
                {['none', 'customer', 'consultant', 'contract', 'time'].map(m => (
                    <MenuItem key={m} onClick={() => { setSortBy(m); setAnchors({ ...anchors, filterAnchorEl: null }); }} sx={{ fontWeight: 600, fontSize: '0.85rem', textTransform: 'capitalize' }}>
                        {m === 'none' ? 'Flat List' : `Group by ${m}`}
                    </MenuItem>
                ))}
            </Menu>

            {sortBy === 'none' ? (
                <Box sx={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #eee' }}>
                                <th style={{ textAlign: 'left', padding: '12px' }}>Task ID</th>
                                <th style={{ textAlign: 'left', padding: '12px' }}>Customer</th>
                                <th style={{ textAlign: 'left', padding: '12px' }}>Description</th>
                                <th style={{ textAlign: 'left', padding: '12px' }}>Start-End Period</th>
                                <th style={{ textAlign: 'left', padding: '12px' }}>Contract</th>
                                <th style={{ textAlign: 'left', padding: '12px' }}>Hours</th>
                                <th style={{ textAlign: 'left', padding: '12px' }}>Status</th>
                                <th style={{ textAlign: 'center', padding: '12px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(t => (
                                <tr key={t._id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                    <td style={{ padding: '12px' }}>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{t.displayId}</Typography>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                            <HighlightText text={t.customer?.name} highlight={searchTerm} />
                                        </Typography>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <Typography variant="body2">
                                            <HighlightText text={t.description} highlight={searchTerm} />
                                        </Typography>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                                            {t.startTime ? dayjs(t.startTime).format('DD MMM, hh:mm A') : ''} - <br />
                                            {t.endTime ? dayjs(t.endTime).format('DD MMM, hh:mm A') : ''}
                                        </Typography>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <Typography variant="body2">{t.contract?.contractName || 'N/A'}</Typography>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{t.timeTaken}</Typography>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <Chip label={t.status || 'Open'} size="small" sx={{ bgcolor: getStatusColor(t.status) + '20', color: getStatusColor(t.status), fontWeight: 'bold' }} />
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        <IconButton size="small" onClick={e => onActionMenuOpen(e, t)}><MoreVertIcon /></IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Box>
            ) : (
                groupedTasks.map(g => (
                    <Accordion key={g.title} defaultExpanded sx={{
                        mb: 3,
                        borderRadius: '20px !important',
                        boxShadow: 'none',
                        border: '1px solid rgba(0,0,0,0.05)',
                        bgcolor: 'transparent',
                        '&:before': { display: 'none' }
                    }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main', bgcolor: 'rgba(25, 118, 210, 0.08)', borderRadius: 2, p: 0.5 }} />}
                            sx={{
                                bgcolor: 'rgba(25, 118, 210, 0.04)',
                                borderRadius: '20px',
                                px: 3,
                                '& .MuiAccordionSummary-content': { alignItems: 'center', justifyContent: 'space-between' }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 900, color: 'text.primary' }}>{g.title}</Typography>
                                <Chip label={`${g.tasks.length} entries`} size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 800, bgcolor: 'primary.main', color: 'white' }} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase' }}>Total:</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 900, color: 'primary.dark' }}>{g.total.toFixed(2)} hrs</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {g.tasks.map(t => (
                                <Box key={t._id} sx={{
                                    p: 2,
                                    borderRadius: 3,
                                    border: '1px solid #f0f0f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    bgcolor: 'white',
                                    '&:hover': { bgcolor: '#fafafa' }
                                }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                            <HighlightText text={t.description} highlight={searchTerm} />
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                                            <HighlightText text={t.customer?.name} highlight={searchTerm} /> • <HighlightText text={t.consultant?.name} highlight={searchTerm} />
                                        </Typography>
                                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                            {t.startTime ? dayjs(t.startTime).format('DD MMM, hh:mm A') : ''} - {t.endTime ? dayjs(t.endTime).format('DD MMM, hh:mm A') : ''}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 800 }}>{t.timeTaken}h</Typography>
                                        <IconButton size="small" onClick={e => onActionMenuOpen(e, t)}><MoreVertIcon fontSize="small" /></IconButton>
                                    </Box>
                                </Box>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))
            )}
        </Box>
    );
};

export default TimesheetSection;
