import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Box,
  Toolbar,
  Drawer,
  Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Sub-components
import Sidebar from "./AdminDashboard/Sidebar";
import OverviewSection from "./AdminDashboard/OverviewSection";
import ManagementSections from "./AdminDashboard/ManagementSections";
import FormDialogs from "./AdminDashboard/FormDialogs";

const AdminDashboard = ({ mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeSection, setActiveSection] = useState('overview');
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState(null);
  const [selectedItemInMenu, setSelectedItemInMenu] = useState(null);
  const [itemTypeInMenu, setItemTypeInMenu] = useState(null);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const drawerWidth = 240;

  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customerForm, setCustomerForm] = useState({
    customerId: "",
    name: "",
    email: "",
    address: "",
    channelPartnerName: "",
    phone: "",
  });
  const [consultants, setConsultants] = useState([]);
  const [consultantForm, setConsultantForm] = useState({
    consultantId: "",
    name: "",
    email: "",
  });
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    productId: "",
    name: "",
    description: "",
  });
  const [contracts, setContracts] = useState([]);
  const [contractForm, setContractForm] = useState({
    contractId: "",
    contractName: "",
    contractType: "",
    startDate: "",
    endDate: "",
    product: "",
    contractNumber: "",
    contractStatus: "",
    effectiveDate: "",
    renewalType: "",
    supportLevel: "",
    supportHours: "",
    includedTickets: "",
    excludedServices: "",
    usageLimit: "",
    customer: "",
  });
  const [expandedContracts, setExpandedContracts] = useState({});

  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editType, setEditType] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ id: null, type: null });

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    empId: "",
    contactNo: "",
    profileImage: "",
    addAsConsultant: "false"
  });

  const fetchCustomers = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/customers`, { withCredentials: true })
      .then((res) => setCustomers(res.data))
      .catch((err) => {
        console.error("Fetch customers error:", err);
        toast.error(err.response?.data?.error || "Failed to fetch customers");
      });
  };

  const fetchConsultants = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/consultants`)
      .then((res) => setConsultants(res.data))
      .catch((err) => {
        console.error("Fetch consultants error:", err);
        toast.error(err.response?.data?.error || "Failed to fetch consultants");
      });
  };

  const fetchUsers = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users`)
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error("Fetch users error:", err);
        if (err.response?.status !== 401) {
          toast.error(err.response?.data?.error || "Failed to fetch users");
        }
      });
  };

  const fetchContracts = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/contracts`)
      .then((res) => setContracts(res.data))
      .catch((err) => {
        console.error("Fetch contracts error:", err);
        toast.error(err.response?.data?.error || "Failed to fetch contracts");
      });
  };

  const fetchProducts = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Fetch products error:", err);
        toast.error(err.response?.data?.error || "Failed to fetch products");
      });
  };

  useEffect(() => {
    if (user && user.role === "admin") {
      const timer = setTimeout(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/check-session`)
          .then(res => {
            if (res.data.authenticated && res.data.role === 'admin') {
              fetchCustomers();
              fetchConsultants();
              fetchUsers();
              fetchContracts();
              fetchProducts();
            }
          })
          .catch(err => {
            console.error("!!! [V10] SERVER CHECK FAILED !!!", err);
          });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const resetForms = () => {
    setEditingId(null);
    setEditType(null);
    setIsFormDialogOpen(false);
    setCustomerForm({
      customerId: "",
      name: "",
      email: "",
      address: "",
      channelPartnerName: "",
      phone: "",
    });
    setConsultantForm({ consultantId: "", name: "", email: "" });
    setUserForm({
      name: "",
      email: "",
      password: "",
      role: "user",
      empId: "",
      contactNo: "",
      profileImage: "",
      addAsConsultant: "false"
    });
    setContractForm({
      contractId: "",
      contractName: "",
      contractType: "",
      startDate: "",
      endDate: "",
      product: "",
      contractNumber: "",
      contractStatus: "",
      effectiveDate: "",
      renewalType: "",
      supportLevel: "",
      supportHours: "",
      includedTickets: "",
      excludedServices: "",
      usageLimit: "",
      customer: "",
    });
    setProductForm({ productId: "", name: "", description: "" });
  };

  const handleEdit = (item, type) => {
    setEditingId(item._id);
    setEditType(type);
    setIsFormDialogOpen(true);
    if (type === "customer") {
      setCustomerForm({
        customerId: item.customerId || "",
        name: item.name,
        email: item.email || "",
        address: item.address || "",
        channelPartnerName: item.channelPartnerName || "",
        phone: item.phone || "",
      });
    } else if (type === "consultant") {
      setConsultantForm({
        consultantId: item.consultantId,
        name: item.name,
        email: item.email,
      });
    } else if (type === "user") {
      setUserForm({
        name: item.name,
        email: item.email,
        role: item.role,
        empId: item.empId || "",
        contactNo: item.contactNo || "",
        password: "",
        profileImage: item.profileImage || ""
      });
    } else if (type === "contract") {
      setContractForm({
        contractId: item.contractId,
        contractName: item.contractName,
        contractType: item.contractType,
        startDate: item.startDate ? item.startDate.split("T")[0] : "",
        endDate: item.endDate ? item.endDate.split("T")[0] : "",
        product: item.product?._id || item.product || "",
        contractNumber: item.contractNumber || "",
        contractStatus: item.contractStatus || "",
        effectiveDate: item.effectiveDate ? item.effectiveDate.split("T")[0] : "",
        renewalType: item.renewalType || "",
        supportLevel: item.supportLevel || "",
        supportHours: item.supportHours || "",
        includedTickets: item.includedTickets || "",
        excludedServices: item.excludedServices || "",
        usageLimit: item.usageLimit || "",
        customer: item.customer?._id || item.customer || "",
      });
    } else if (type === "product") {
      setProductForm({
        productId: item.productId,
        name: item.name,
        description: item.description || "",
      });
    }
  };

  const confirmDelete = () => {
    const { id, type } = itemToDelete;
    axios
      .delete(`${import.meta.env.VITE_API_URL}/${type}s/${id}`, { withCredentials: true })
      .then(() => {
        toast.success(`${type} deleted successfully`);
        if (type === "user") setUsers(users.filter((u) => u._id !== id));
        if (type === "customer") setCustomers(customers.filter((c) => c._id !== id));
        if (type === "consultant") setConsultants(consultants.filter((c) => c._id !== id));
        if (type === "contract") setContracts(contracts.filter((c) => c._id !== id));
        if (type === "product") setProducts(products.filter((p) => p._id !== id));
        setDeleteDialogOpen(false);
      })
      .catch((err) => toast.error("Error deleting: " + (err.response?.data?.error || err.message)));
  };

  const handleFormSubmit = (e, type) => {
    e.preventDefault();
    let url = "";
    let method = "post";
    let data = {};

    if (type === 'user') {
      url = editingId ? `${import.meta.env.VITE_API_URL}/users/${editingId}` : `${import.meta.env.VITE_API_URL}/signup`;
      method = editingId ? "put" : "post";
      data = userForm;
    } else if (type === 'customer') {
      url = editingId ? `${import.meta.env.VITE_API_URL}/customers/${editingId}` : `${import.meta.env.VITE_API_URL}/customers`;
      method = editingId ? "put" : "post";
      data = customerForm;
    } else if (type === 'consultant') {
      url = editingId ? `${import.meta.env.VITE_API_URL}/consultants/${editingId}` : `${import.meta.env.VITE_API_URL}/consultants`;
      method = editingId ? "put" : "post";
      data = consultantForm;
    } else if (type === 'product') {
      url = editingId ? `${import.meta.env.VITE_API_URL}/products/${editingId}` : `${import.meta.env.VITE_API_URL}/products`;
      method = editingId ? "put" : "post";
      data = productForm;
    } else if (type === 'contract') {
      url = editingId ? `${import.meta.env.VITE_API_URL}/contracts/${editingId}` : `${import.meta.env.VITE_API_URL}/contracts`;
      method = editingId ? "put" : "post";
      data = contractForm;
    }

    axios[method](url, data, { withCredentials: true })
      .then((res) => {
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} ${editingId ? 'updated' : 'added'} successfully`);
        if (type === 'user') {
          if (editingId) {
            setUsers(prev => prev.map(u => u._id === editingId ? res.data : u).sort((a, b) => a.name.localeCompare(b.name)));
          } else {
            setUsers(prev => [...prev, res.data].sort((a, b) => a.name.localeCompare(b.name)));
          }
        } else if (type === 'customer') {
          if (editingId) setCustomers(customers.map(c => c._id === editingId ? res.data : c));
          else setCustomers([...customers, res.data]);
        } else if (type === 'consultant') {
          if (editingId) setConsultants(consultants.map(c => c._id === editingId ? res.data : c));
          else setConsultants([...consultants, res.data]);
        } else if (type === 'product') {
          if (editingId) setProducts(products.map(p => p._id === editingId ? res.data : p));
          else setProducts([...products, res.data]);
        } else if (type === 'contract') {
          if (editingId) setContracts(contracts.map(c => c._id === editingId ? res.data : c));
          else setContracts([...contracts, res.data]);
          fetchContracts(); // For population
        }
        resetForms();
      })
      .catch((err) => toast.error(`Error: ${err.response?.data?.error || err.message}`));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      toast.error(newPassword ? "Passwords do not match" : "Password is required");
      return;
    }
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/${selectedItemInMenu._id}/password`, { password: newPassword }, { withCredentials: true });
      toast.success("Password updated successfully");
      setIsPasswordDialogOpen(false);
      setNewPassword("");
      setConfirmPassword("");
      setActionMenuAnchorEl(null);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update password");
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'user') setUserForm({ ...userForm, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    } else if (file) {
      toast.error("File size should be less than 2MB");
    }
  };

  const renderContent = () => {
    if (activeSection === 'overview') {
      return <OverviewSection user={user} counts={{
        users: users.length,
        products: products.length,
        contracts: contracts.length,
        customers: customers.length,
        consultants: consultants.length
      }} />;
    }

    return (
      <ManagementSections
        activeSection={activeSection}
        data={{ users, customers, consultants, products, contracts }}
        handlers={{
          onAdd: (type) => { resetForms(); setEditType(type); setIsFormDialogOpen(true); },
          onActionMenuOpen: (e, item, type) => {
            setActionMenuAnchorEl(e.currentTarget);
            setSelectedItemInMenu(item);
            setItemTypeInMenu(type);
            if (type === 'user') setSelectedUserInfo(item);
          }
        }}
        theme={theme}
        expandedContracts={expandedContracts}
        toggleContractExpand={(id) => setExpandedContracts(prev => ({ ...prev, [id]: !prev[id] }))}
      />
    );
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f7f9' }}>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }, }}>
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} isMobile={isMobile} handleDrawerToggle={handleDrawerToggle} navigate={navigate} />
        </Drawer>
        <Drawer variant="permanent" open
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, marginTop: '64px', border: 'none', height: 'calc(100% - 64px)' }, }}>
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} isMobile={isMobile} handleDrawerToggle={handleDrawerToggle} navigate={navigate} />
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, sm: 3 }, minWidth: 0, maxWidth: '100%', minHeight: '100vh' }}>
        <Toolbar />
        <Container maxWidth={false} sx={{ px: { xs: 1, sm: 2 } }}>
          <Box sx={{ mt: 2 }} />
          <Fade key={activeSection} in={true} timeout={600}>
            <Box sx={{ width: '100%' }}>{renderContent()}</Box>
          </Fade>
        </Container>

        <FormDialogs
          dialogs={{
            isFormOpen: isFormDialogOpen,
            isDeleteOpen: deleteDialogOpen,
            isPasswordOpen: isPasswordDialogOpen,
            isInfoOpen: isInfoDialogOpen
          }}
          forms={{
            userForm, customerForm, consultantForm, productForm, contractForm,
            passwordForm: { newPassword, confirmPassword }
          }}
          editingState={{ editingId, editType }}
          selectedData={{ selectedItem: { ...selectedItemInMenu, type: itemTypeInMenu }, selectedUserInfo }}
          menuAnchorEl={actionMenuAnchorEl}
          selectData={{ products, customers }}
          theme={theme}
          handlers={{
            onCloseAll: () => {
              resetForms();
              setDeleteDialogOpen(false);
              setIsPasswordDialogOpen(false);
              setIsInfoDialogOpen(false);
              setActionMenuAnchorEl(null);
            },
            onUserChange: (e) => setUserForm({ ...userForm, [e.target.name]: e.target.value }),
            onCustomerChange: (e) => setCustomerForm({ ...customerForm, [e.target.name]: e.target.value }),
            onConsultantChange: (e) => setConsultantForm({ ...consultantForm, [e.target.name]: e.target.value }),
            onProductChange: (e) => setProductForm({ ...productForm, [e.target.name]: e.target.value }),
            onContractChange: (e) => setContractForm({ ...contractForm, [e.target.name]: e.target.value }),
            onFileChange: handleFileChange,
            onPasswordChange: (type, val) => type === 'new' ? setNewPassword(val) : setConfirmPassword(val),
            onFormSubmit: handleFormSubmit,
            confirmDelete,
            handlePasswordSubmit,
            handleActionMenuClose: () => setActionMenuAnchorEl(null),
            handleInfoOpen: () => { setIsInfoDialogOpen(true); setActionMenuAnchorEl(null); },
            handleEditClick: handleEdit,
            openDeleteDialog: (id, type) => { setItemToDelete({ id, type }); setDeleteDialogOpen(true); },
            openPasswordDialog: () => setIsPasswordDialogOpen(true)
          }}
        />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
