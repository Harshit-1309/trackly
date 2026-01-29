import React from "react";
import {
    Box,
    Typography,
    Button,
    IconButton,
    Avatar,
    Paper,
    Grid,
    Divider,
    Chip
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ManagementSections = ({
    activeSection,
    data,
    handlers,
    theme,
    expandedContracts,
    toggleContractExpand
}) => {
    const { users, customers, consultants, products, contracts } = data;
    const { onAdd, onActionMenuOpen } = handlers;

    if (activeSection === 'users') {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>User List</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => onAdd('user')}
                            size="small"
                            sx={{ py: 1, px: 2, fontWeight: 'bold' }}
                        >
                            Add User
                        </Button>
                    </Box>
                    <Box sx={{ overflowX: 'auto', width: '100%' }}>
                        <table style={{ minWidth: '600px', width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ borderBottom: "1px solid #ddd" }}>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Name</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Email</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Emp ID</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Contact</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Role</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u._id} style={{ borderBottom: "1px solid #eee" }}>
                                        <td style={{ padding: "8px" }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <Avatar
                                                    src={u.profileImage}
                                                    sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}
                                                >
                                                    {u.name.charAt(0).toUpperCase()}
                                                </Avatar>
                                                {u.name}
                                            </Box>
                                        </td>
                                        <td style={{ padding: "8px" }}>{u.email}</td>
                                        <td style={{ padding: "8px" }}>{u.empId || 'N/A'}</td>
                                        <td style={{ padding: "8px" }}>{u.contactNo || 'N/A'}</td>
                                        <td style={{ padding: "8px" }}>{u.role}</td>
                                        <td style={{ padding: "8px" }}>
                                            <IconButton color="inherit" onClick={(e) => onActionMenuOpen(e, u, 'user')}>
                                                <MoreVertIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                </Box>
            </Box>
        );
    }

    if (activeSection === 'customers') {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Customer List</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => onAdd('customer')}
                            size="small"
                            sx={{ py: 1, px: 2, fontWeight: 'bold' }}
                        >
                            Add Customer
                        </Button>
                    </Box>
                    <Box sx={{ overflowX: 'auto', width: '100%' }}>
                        <table style={{ minWidth: '1000px', width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ borderBottom: "1px solid #ddd" }}>
                                    <th style={{ textAlign: "left", padding: "8px" }}>ID</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Name</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Email</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Address</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Channel Partner Name</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Phone</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((c) => (
                                    <tr key={c._id} style={{ borderBottom: "1px solid #eee" }}>
                                        <td style={{ padding: "8px" }}>{c.customerId || 'N/A'}</td>
                                        <td style={{ padding: "8px" }}>{c.name}</td>
                                        <td style={{ padding: "8px" }}>{c.email}</td>
                                        <td style={{ padding: "8px" }}>{c.address}</td>
                                        <td style={{ padding: "8px" }}>{c.channelPartnerName || 'N/A'}</td>
                                        <td style={{ padding: "8px" }}>{c.phone || 'N/A'}</td>
                                        <td style={{ padding: "8px" }}>
                                            <IconButton color="inherit" onClick={(e) => onActionMenuOpen(e, c, 'customer')}>
                                                <MoreVertIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                </Box>
            </Box>
        );
    }

    if (activeSection === 'consultants') {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Consultant List</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => onAdd('consultant')}
                            size="small"
                            sx={{ py: 1, px: 2, fontWeight: 'bold' }}
                        >
                            Add Consultant
                        </Button>
                    </Box>
                    <Box sx={{ overflowX: 'auto', width: '100%' }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ borderBottom: "1px solid #ddd" }}>
                                    <th style={{ textAlign: "left", padding: "8px" }}>ID</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Name</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Email</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {consultants.map((c) => (
                                    <tr key={c._id} style={{ borderBottom: "1px solid #eee" }}>
                                        <td style={{ padding: "8px" }}>{c.consultantId}</td>
                                        <td style={{ padding: "8px" }}>{c.name}</td>
                                        <td style={{ padding: "8px" }}>{c.email}</td>
                                        <td style={{ padding: "8px" }}>
                                            <IconButton color="inherit" onClick={(e) => onActionMenuOpen(e, c, 'consultant')}>
                                                <MoreVertIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                </Box>
            </Box>
        );
    }

    if (activeSection === 'products') {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Product List</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => onAdd('product')}
                            size="small"
                            sx={{ py: 1, px: 2, fontWeight: 'bold' }}
                        >
                            Add Product
                        </Button>
                    </Box>
                    <Box sx={{ overflowX: 'auto', width: '100%' }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ borderBottom: "1px solid #ddd" }}>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Product ID</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Name</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Description</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                    <tr key={p._id} style={{ borderBottom: "1px solid #eee" }}>
                                        <td style={{ padding: "8px" }}>{p.productId}</td>
                                        <td style={{ padding: "8px" }}>{p.name}</td>
                                        <td style={{ padding: "8px" }}>{p.description || "N/A"}</td>
                                        <td style={{ padding: "8px" }}>
                                            <IconButton color="inherit" onClick={(e) => onActionMenuOpen(e, p, 'product')}>
                                                <MoreVertIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                </Box>
            </Box>
        );
    }

    if (activeSection === 'contracts') {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Contract List</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => onAdd('contract')}
                            size="small"
                            sx={{ py: 1, px: 2, fontWeight: 'bold' }}
                        >
                            Add Contract
                        </Button>
                    </Box>
                    <Box sx={{ overflowX: 'auto', width: '100%' }}>
                        <table style={{ minWidth: '800px', width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ borderBottom: "1px solid #ddd" }}>
                                    <th style={{ width: "40px" }}></th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Contract ID</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Name</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Total Limit</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Limit Left</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Status</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Customer</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contracts.map((c) => (
                                    <React.Fragment key={c._id}>
                                        <tr style={{ borderBottom: "1px solid #eee" }}>
                                            <td style={{ padding: "8px" }}>
                                                <IconButton size="small" onClick={() => toggleContractExpand(c._id)}>
                                                    {expandedContracts[c._id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </td>
                                            <td style={{ padding: "8px" }}>{c.contractId}</td>
                                            <td style={{ padding: "8px", fontWeight: 'bold' }}>{c.contractName}</td>
                                            <td style={{ padding: "8px" }}>{c.usageLimit || 0}</td>
                                            <td style={{ padding: "8px" }}>
                                                <Typography variant="body2" sx={{ color: (c.usageLeft || 0) < 5 ? 'error.main' : 'success.main', fontWeight: 'bold' }}>
                                                    {c.usageLeft || 0}
                                                </Typography>
                                            </td>
                                            <td style={{ padding: "8px" }}>
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        px: 1.5,
                                                        py: 0.5,
                                                        borderRadius: 1,
                                                        fontSize: '0.75rem',
                                                        fontWeight: 'bold',
                                                        textTransform: 'uppercase',
                                                        backgroundColor:
                                                            c.contractStatus === 'Active' ? 'rgba(76, 175, 80, 0.1)' :
                                                                c.contractStatus === 'Expired' ? 'rgba(158, 158, 158, 0.1)' :
                                                                    c.contractStatus === 'Draft' ? 'rgba(3, 169, 244, 0.1)' :
                                                                        c.contractStatus === 'Terminated' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                                                        color:
                                                            c.contractStatus === 'Active' ? '#2e7d32' :
                                                                c.contractStatus === 'Expired' ? '#757575' :
                                                                    c.contractStatus === 'Draft' ? '#0288d1' :
                                                                        c.contractStatus === 'Terminated' ? '#d32f2f' : '#000',
                                                        border: `1px solid ${c.contractStatus === 'Active' ? '#4caf50' :
                                                            c.contractStatus === 'Expired' ? '#9e9e9e' :
                                                                c.contractStatus === 'Draft' ? '#03a9f4' :
                                                                    c.contractStatus === 'Terminated' ? '#f44336' : '#ccc'
                                                            }`
                                                    }}
                                                >
                                                    {c.contractStatus || 'N/A'}
                                                </Box>
                                            </td>
                                            <td style={{ padding: "8px" }}>{c.customer?.name || "None"}</td>
                                            <td style={{ padding: "8px" }}>
                                                <IconButton color="inherit" onClick={(e) => onActionMenuOpen(e, c, 'contract')}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </td>
                                        </tr>
                                        {expandedContracts[c._id] && (
                                            <tr>
                                                <td colSpan={8} style={{ padding: "0" }}>
                                                    <Box sx={{ p: 3, backgroundColor: "rgba(0, 0, 0, 0.02)", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}>
                                                        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: "1px solid #e0e0e0" }}>
                                                            <Grid container spacing={4}>
                                                                <Grid item xs={12} md={3}>
                                                                    <Typography variant="overline" sx={{ fontWeight: 'bold', color: 'primary.main', letterSpacing: 1.2 }}>
                                                                        Basic Information
                                                                    </Typography>
                                                                    <Divider sx={{ mb: 2, mt: 0.5 }} />
                                                                    <Box sx={{ mb: 1.5 }}>
                                                                        <Typography variant="caption" color="text.secondary">Contract Number</Typography>
                                                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{c.contractNumber || 'N/A'}</Typography>
                                                                    </Box>
                                                                    <Box sx={{ mb: 1.5 }}>
                                                                        <Typography variant="caption" color="text.secondary">Product</Typography>
                                                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{c.product?.name || 'N/A'}</Typography>
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography variant="caption" color="text.secondary">Contract Type</Typography>
                                                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{c.contractType}</Typography>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    <Typography variant="overline" sx={{ fontWeight: 'bold', color: 'primary.main', letterSpacing: 1.2 }}>
                                                                        Timeline
                                                                    </Typography>
                                                                    <Divider sx={{ mb: 2, mt: 0.5 }} />
                                                                    <Box sx={{ mb: 1.5 }}>
                                                                        <Typography variant="caption" color="text.secondary">Effective Date</Typography>
                                                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{c.effectiveDate ? new Date(c.effectiveDate).toLocaleDateString() : 'N/A'}</Typography>
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography variant="caption" color="text.secondary">Start - End Period</Typography>
                                                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                                            {new Date(c.startDate).toLocaleDateString()} — {new Date(c.endDate).toLocaleDateString()}
                                                                        </Typography>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    <Typography variant="overline" sx={{ fontWeight: 'bold', color: 'primary.main', letterSpacing: 1.2 }}>
                                                                        Service & Support
                                                                    </Typography>
                                                                    <Divider sx={{ mb: 2, mt: 0.5 }} />
                                                                    <Box sx={{ mb: 1.5 }}>
                                                                        <Typography variant="caption" color="text.secondary">Support Level / Hours</Typography>
                                                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                                            {c.supportLevel || 'N/A'} / {c.supportHours || 'N/A'}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography variant="caption" color="text.secondary">Renewal / Included Tickets</Typography>
                                                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                                            {c.renewalType || 'N/A'} / {c.includedTickets || 0} Tickets
                                                                        </Typography>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    <Typography variant="overline" sx={{ fontWeight: 'bold', color: 'primary.main', letterSpacing: 1.2 }}>
                                                                        Usage Tracking
                                                                    </Typography>
                                                                    <Divider sx={{ mb: 2, mt: 0.5 }} />
                                                                    <Box sx={{ mb: 1.5 }}>
                                                                        <Typography variant="caption" color="text.secondary">Limit / Consumed</Typography>
                                                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                                            {c.usageLimit || 0} / {c.usageConsumed || 0}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography variant="caption" color="text.secondary">Usage Left</Typography>
                                                                        <Typography variant="body1" sx={{ color: (c.usageLeft || 0) < 5 ? 'error.main' : 'success.main', fontWeight: 'bold' }}>
                                                                            {c.usageLeft || 0}
                                                                        </Typography>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Divider sx={{ mb: 2 }} />
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12} md={6}>
                                                                            <Typography variant="caption" color="text.secondary">Excluded Services</Typography>
                                                                            <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 0.5 }}>
                                                                                {c.excludedServices || 'No services excluded.'}
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={6}>
                                                                            <Typography variant="caption" color="text.secondary">Associated Customer</Typography>
                                                                            <Box sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                                                {c.customer ? (
                                                                                    <Box sx={{ px: 1.5, py: 0.5, borderRadius: 10, backgroundColor: 'primary.light', color: 'primary.contrastText', fontSize: '0.75rem', fontWeight: 600 }}>
                                                                                        {c.customer.name}
                                                                                    </Box>
                                                                                ) : (
                                                                                    <Typography variant="body2">No customer associated.</Typography>
                                                                                )}
                                                                            </Box>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Paper>
                                                    </Box>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                </Box>
            </Box>
        );
    }

    return null;
};

export default ManagementSections;
