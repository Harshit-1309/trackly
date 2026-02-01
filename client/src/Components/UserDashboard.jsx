import React, { useEffect, useState, useContext } from 'react';
import {
    Container, Box, Drawer, Toolbar, AppBar, IconButton, Typography, Fade, Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../App';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import { API_BASE_URL } from '../api';

// Sub-components
import Sidebar from './UserDashboard/Sidebar';
import OverviewSection from './UserDashboard/OverviewSection';
import TimesheetSection from './UserDashboard/TimesheetSection';
import ContractSection from './UserDashboard/ContractSection';
import TaskFormSection from './UserDashboard/TaskFormSection';
import TaskDialogs from './UserDashboard/TaskDialogs';

const UserDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useContext(UserContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('overview');

    const [customers, setCustomers] = useState([]);
    const [consultants, setConsultants] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [taskForm, setTaskForm] = useState({
        customer: '', consultant: '', description: '', startTime: null, endTime: null, timeTaken: '', status: 'Open', contract: '', createdBy: ''
    });
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [infoOpen, setInfoOpen] = useState(false);

    // Filters and Sorting
    const [sortBy, setSortBy] = useState('none');
    const [searchTerm, setSearchTerm] = useState('');
    const [contractSearch, setContractSearch] = useState('');

    const [filters, setFilters] = useState({
        filterCustomer: '',
        filterConsultant: '',
        filterContract: '',
        filterProduct: '',
        filterMonth: '',
        filterYear: '',
        filterStatus: '',
        contractStatusFilter: '',
        contractCustomerFilter: '',
        contractTypeFilter: '',
        contractMonthFilter: '',
        contractYearFilter: ''
    });

    const [anchors, setAnchors] = useState({
        filterMenuAnchorEl: null,
        exportAnchorEl: null,
        filterAnchorEl: null,
        contractFilterAnchorEl: null
    });

    useEffect(() => {
        const load = async () => {
            if (!user) return;
            try {
                const [cu, co, cn, ta] = await Promise.all([
                    axios.get(`${API_BASE_URL}/customers`),
                    axios.get(`${API_BASE_URL}/consultants`),
                    axios.get(`${API_BASE_URL}/contracts`),
                    axios.get(`${API_BASE_URL}/tasks`)
                ]);
                setCustomers(cu.data); setConsultants(co.data); setContracts(cn.data); setTasks(ta.data);
                setTaskForm(prev => ({ ...prev, createdBy: user?.id || '' }));
            } catch (e) {
                if (e.response?.status !== 401) {
                    toast.error(e.response?.data?.error || "Failed to load initial data");
                }
            }
        };
        load();
    }, [user]);

    useEffect(() => {
        if (location.state && location.state.activeTab) {
            setActiveSection(location.state.activeTab);
        }
    }, [location.state]);

    const handleTaskChange = (e) => setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
    const handleDateChange = (n, v) => setTaskForm({ ...taskForm, [n]: v });

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            if (editingTaskId) {
                await axios.put(`${API_BASE_URL}/tasks/${editingTaskId}`, taskForm, { withCredentials: true });
            } else {
                await axios.post(`${API_BASE_URL}/tasks`, taskForm, { withCredentials: true });
            }
            toast.success("Task saved successfully");
            const res = await axios.get(`${API_BASE_URL}/tasks`, { withCredentials: true });
            setTasks(res.data);
            setActiveSection('manage tasks');
            setEditingTaskId(null);
            setTaskForm({ customer: '', consultant: '', description: '', startTime: null, endTime: null, timeTaken: '', status: 'Open', contract: '', createdBy: user?.id || '' });
        } catch (err) {
            const errMsg = err.response?.data?.error || err.response?.data?.detail || "Error saving task";
            toast.error(errMsg);
        }
    };

    const handleEdit = (t) => {
        setEditingTaskId(t._id);
        setTaskForm({
            customer: t.customer?._id || '',
            consultant: t.consultant?._id || '',
            description: t.description,
            startTime: dayjs(t.startTime),
            endTime: dayjs(t.endTime),
            timeTaken: t.timeTaken,
            status: t.status || 'Open',
            contract: t.contract?._id || '',
            createdBy: t.createdBy?._id || t.createdBy || ''
        });
        setActiveSection('new task');
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/tasks/${taskToDelete}`);
            setTasks(tasks.filter(t => t._id !== taskToDelete));
            setDeleteDialogOpen(false);
            toast.success("Task deleted");
        } catch (e) { toast.error("Error deleting task"); }
    };

    const getFilteredTasks = () => {
        let filtered = [...tasks];
        if (searchTerm) {
            const s = searchTerm.toLowerCase();
            filtered = filtered.filter(t =>
                t.description?.toLowerCase().includes(s) ||
                t.customer?.name?.toLowerCase().includes(s) ||
                t.consultant?.name?.toLowerCase().includes(s)
            );
        }
        if (filters.filterCustomer) filtered = filtered.filter(t => t.customer?._id === filters.filterCustomer);
        if (filters.filterConsultant) filtered = filtered.filter(t => t.consultant?._id === filters.filterConsultant);
        if (filters.filterContract) filtered = filtered.filter(t => t.contract?._id === filters.filterContract);
        if (filters.filterProduct) filtered = filtered.filter(t => (t.contract?.product?._id === filters.filterProduct || t.contract?.product === filters.filterProduct));
        if (filters.filterMonth !== '') filtered = filtered.filter(t => dayjs(t.startTime).month() === Number(filters.filterMonth));
        if (filters.filterYear !== '') filtered = filtered.filter(t => dayjs(t.startTime).year() === Number(filters.filterYear));
        if (filters.filterStatus) filtered = filtered.filter(t => t.status === filters.filterStatus);

        const chronological = [...tasks].sort((a, b) => dayjs(a.createdAt).diff(dayjs(b.createdAt)));
        const idMap = new Map(chronological.map((t, i) => [t._id, `SR${i + 1}`]));

        return filtered
            .map(t => ({ ...t, displayId: idMap.get(t._id) }))
            .sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)));
    };

    const getGroupedTasks = () => {
        const groups = {};
        getFilteredTasks().forEach(t => {
            let k = 'Other';
            if (sortBy === 'customer') k = t.customer?.name || 'Unknown';
            else if (sortBy === 'consultant') k = t.consultant?.name || 'Unknown';
            else if (sortBy === 'contract') k = t.contract?.contractName || 'General';
            else if (sortBy === 'time') k = dayjs(t.startTime).format('DD MMM YYYY');
            if (!groups[k]) groups[k] = { title: k, tasks: [], total: 0 };
            groups[k].tasks.push(t);
            groups[k].total += Number(t.timeTaken) || 0;
        });
        return Object.values(groups).sort((a, b) => a.title.localeCompare(b.title));
    };

    const getFilteredContracts = () => {
        let filtered = [...contracts];
        if (contractSearch) {
            const s = contractSearch.toLowerCase();
            filtered = filtered.filter(c =>
                c.contractName?.toLowerCase().includes(s) ||
                c.contractId?.toLowerCase().includes(s) ||
                c.customer?.name?.toLowerCase().includes(s)
            );
        }
        if (filters.contractStatusFilter) filtered = filtered.filter(c => c.contractStatus === filters.contractStatusFilter);
        if (filters.contractCustomerFilter) filtered = filtered.filter(c => (c.customer?._id || c.customer) === filters.contractCustomerFilter);
        if (filters.contractTypeFilter) filtered = filtered.filter(c => c.contractType === filters.contractTypeFilter);
        if (filters.contractMonthFilter !== '') filtered = filtered.filter(c => dayjs(c.startDate).month() === Number(filters.contractMonthFilter));
        if (filters.contractYearFilter !== '') filtered = filtered.filter(c => dayjs(c.startDate).year() === Number(filters.contractYearFilter));
        return filtered;
    };

    const getStatusColor = (s) => {
        const map = { 'Open': '#4caf50', 'Closed': '#757575', 'On Hold': '#f44336', 'Working - Customer': '#2196f3', 'Working - Consultant': '#2196f3' };
        return map[s] || '#757575';
    };

    const exportToExcel = () => {
        const data = getFilteredTasks().map(t => ({
            'Date': dayjs(t.startTime).format('DD MMM YYYY'),
            'Customer': t.customer?.name || 'N/A',
            'Consultant': t.consultant?.name || 'N/A',
            'Contract': t.contract?.contractName || 'General',
            'Description': t.description,
            'Hours': t.timeTaken,
            'Status': t.status || 'Open'
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Tasks");
        XLSX.writeFile(wb, `TimeTracker_Export_${dayjs().format('YYYY-MM-DD')}.xlsx`);
    };

    const exportToCSV = () => {
        const data = getFilteredTasks().map(t => ({
            'Date': dayjs(t.startTime).format('DD MMM YYYY'),
            'Customer': t.customer?.name || 'N/A',
            'Consultant': t.consultant?.name || 'N/A',
            'Contract': t.contract?.contractName || 'General',
            'Description': t.description,
            'Hours': t.timeTaken,
            'Status': t.status || 'Open'
        }));
        if (data.length === 0) { toast.info("No data to export"); return; }
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(obj => Object.values(obj).map(val => `"${val}"`).join(','));
        const csvContent = [headers, ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `TimeTracker_Export_${dayjs().format('YYYY-MM-DD')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleClearFilters = () => {
        setFilters({
            ...filters,
            filterCustomer: '', filterConsultant: '', filterContract: '',
            filterProduct: '', filterMonth: '', filterYear: '', filterStatus: ''
        });
        setAnchors({ ...anchors, filterMenuAnchorEl: null });
    };

    const isFilterApplied = filters.filterCustomer || filters.filterConsultant || filters.filterContract || filters.filterProduct || filters.filterMonth !== '' || filters.filterYear !== '' || filters.filterStatus;

    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return <OverviewSection
                    user={user}
                    counts={{
                        totalTasks: tasks.length,
                        userTasks: tasks.filter(t => (t.createdBy?._id || t.createdBy) === user?.id).length,
                        openTickets: tasks.filter(t => t.status === 'Open').length
                    }}
                    setActiveSection={setActiveSection}
                />;
            case 'manage tasks':
                return <TimesheetSection
                    tasks={getFilteredTasks()}
                    groupedTasks={getGroupedTasks()}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    sortBy={sortBy}
                    isFilterApplied={isFilterApplied}
                    handleClearFilters={handleClearFilters}
                    setActiveSection={setActiveSection}
                    theme={theme}
                    getStatusColor={getStatusColor}
                    customers={customers}
                    contracts={contracts}
                    consultants={consultants}
                    filters={filters}
                    setFilters={setFilters}
                    anchors={anchors}
                    setAnchors={setAnchors}
                    handlers={{
                        onActionMenuOpen: (e, t) => { setActionMenuAnchorEl(e.currentTarget); setSelectedTask(t); },
                        exportToExcel,
                        exportToCSV,
                        setSortBy
                    }}
                />;
            case 'contracts':
                return <ContractSection
                    contracts={getFilteredContracts()}
                    tasks={tasks}
                    customers={customers}
                    contractSearch={contractSearch}
                    setContractSearch={setContractSearch}
                    filters={filters}
                    setFilters={setFilters}
                    anchors={anchors}
                    setAnchors={setAnchors}
                    theme={theme}
                />;
            case 'new task':
                return <TaskFormSection
                    taskForm={taskForm}
                    editingTaskId={editingTaskId}
                    customers={customers}
                    consultants={consultants}
                    contracts={contracts}
                    isMobile={isMobile}
                    handlers={{
                        handleTaskChange,
                        handleDateChange,
                        handleCreateTask,
                        onCancelEdit: () => { setEditingTaskId(null); setTaskForm({ customer: '', consultant: '', description: '', startTime: null, endTime: null, timeTaken: '', status: 'Open', contract: '' }); setActiveSection('manage tasks'); }
                    }}
                />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f7f9' }}>
            <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}>
                <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }}
                    sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 } }}>
                    <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} isMobile={isMobile} setMobileOpen={setMobileOpen} />
                </Drawer>
                <Drawer variant="permanent" open
                    sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, mt: '64px', border: 'none', height: 'calc(100% - 64px)' } }}>
                    <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} isMobile={isMobile} setMobileOpen={setMobileOpen} />
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 4 }, width: { sm: `calc(100% - 240px)` } }}>
                <AppBar position="fixed" sx={{ width: { sm: `calc(100% - 240px)` }, ml: { sm: `240px` }, bgcolor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', color: 'text.primary', boxShadow: 'none', borderBottom: '1px solid rgba(0,0,0,0.05)', display: { sm: 'none' } }}>
                    <Toolbar>
                        <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2, display: { sm: 'none' } }}><MenuIcon /></IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 800 }}>Dashboard</Typography>
                    </Toolbar>
                </AppBar>
                <Toolbar sx={{ display: { xs: 'block', sm: 'none' } }} />
                <Toolbar />
                <Container maxWidth="xl" sx={{ p: 0 }}>
                    {user?.role === 'admin' && (
                        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/admin-dashboard')} sx={{ mb: 3, textTransform: 'none', fontWeight: 700 }}>Back to Admin</Button>
                    )}
                    <Fade in timeout={500}>
                        <Box>{renderContent()}</Box>
                    </Fade>
                </Container>

                <TaskDialogs
                    selectedTask={selectedTask}
                    user={user}
                    dialogs={{ infoOpen, deleteDialogOpen }}
                    anchors={{ actionMenuAnchorEl }}
                    handlers={{
                        onCloseInfo: () => setInfoOpen(false),
                        onCloseDelete: () => setDeleteDialogOpen(false),
                        onCloseActionMenu: () => setActionMenuAnchorEl(null),
                        onDeleteConfirm: handleDelete,
                        onEditClick: handleEdit,
                        onDeleteClick: (id) => { setTaskToDelete(id); setDeleteDialogOpen(true); setActionMenuAnchorEl(null); },
                        onInfoOpen: () => { setInfoOpen(true); setActionMenuAnchorEl(null); }
                    }}
                    getStatusColor={getStatusColor}
                />
            </Box>
        </Box>
    );
};

export default UserDashboard;
