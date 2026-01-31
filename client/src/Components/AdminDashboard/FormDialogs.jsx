import React from "react";
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Avatar,
    Grid,
    Divider,
    Chip,
    Menu,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import PeopleIcon from '@mui/icons-material/People';

const FormDialogs = ({
    // State
    dialogs,
    forms,
    editingState,
    selectedData,
    menuAnchorEl,

    // Handlers
    handlers,

    // Data for selects
    selectData,
    theme
}) => {
    const {
        isFormOpen,
        isDeleteOpen,
        isPasswordOpen,
        isInfoOpen
    } = dialogs;

    const {
        userForm,
        customerForm,
        consultantForm,
        productForm,
        contractForm,
        passwordForm
    } = forms;

    const { editingId, editType } = editingState;
    const { selectedItem, selectedUserInfo } = selectedData;
    const { products, customers } = selectData;

    const {
        onCloseAll,
        onUserChange,
        onCustomerChange,
        onConsultantChange,
        onProductChange,
        onContractChange,
        onFileChange,
        onPasswordChange,
        onFormSubmit,
        confirmDelete,
        handlePasswordSubmit,
        handleActionMenuClose,
        handleInfoOpen,
        handleEditClick
    } = handlers;

    return (
        <>
            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteOpen} onClose={onCloseAll}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this {selectedItem?.type}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseAll} color="primary">Cancel</Button>
                    <Button onClick={confirmDelete} color="error" autoFocus>Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Main Form Dialog */}
            <Dialog open={isFormOpen} onClose={onCloseAll} maxWidth={editType === 'contract' ? "lg" : "sm"} fullWidth>
                <DialogTitle sx={{
                    fontWeight: '800',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    py: 2.5
                }}>
                    {editingId ? <EditIcon /> : <AddIcon />}
                    {editingId ? `Edit ${editType?.charAt(0).toUpperCase() + editType?.slice(1)}` : `Add New ${editType?.charAt(0).toUpperCase() + editType?.slice(1)}`}
                </DialogTitle>
                <DialogContent dividers>
                    {editType === "user" && (
                        <form onSubmit={(e) => onFormSubmit(e, 'user')}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2, pb: 1 }}>
                                <TextField fullWidth label="Name" name="name" value={userForm.name} onChange={onUserChange} required variant="outlined" />
                                <TextField fullWidth label="Email" name="email" type="email" value={userForm.email} onChange={onUserChange} required variant="outlined" />
                                {!editingId && (
                                    <TextField fullWidth label="Password" name="password" type="password" value={userForm.password} onChange={onUserChange} required variant="outlined" />
                                )}
                                <FormControl fullWidth>
                                    <InputLabel>Role</InputLabel>
                                    <Select name="role" value={userForm.role} onChange={onUserChange} label="Role">
                                        <MenuItem value="user">User</MenuItem>
                                        <MenuItem value="admin">Admin</MenuItem>
                                    </Select>
                                </FormControl>
                                {!editingId && (
                                    <FormControl fullWidth>
                                        <InputLabel>Consultant Status</InputLabel>
                                        <Select name="addAsConsultant" value={userForm.addAsConsultant} onChange={onUserChange} label="Consultant Status">
                                            <MenuItem value="false">Keep only as user/admin</MenuItem>
                                            <MenuItem value="true">Add as consultant also</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                                <TextField fullWidth label="Employee ID" name="empId" value={userForm.empId} onChange={onUserChange} variant="outlined" />
                                <TextField fullWidth label="Contact No" name="contactNo" type="number" value={userForm.contactNo} onChange={onUserChange} variant="outlined" />
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                                    <Avatar src={userForm.profileImage} sx={{ width: 60, height: 60, bgcolor: theme.palette.primary.main }}>
                                        {userForm.name?.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Button variant="outlined" component="label" size="small" startIcon={<AddIcon />}>
                                        Upload Photo
                                        <input type="file" hidden accept="image/*" onChange={(e) => onFileChange(e, 'user')} />
                                    </Button>
                                    {userForm.profileImage && (
                                        <Button color="error" size="small" onClick={() => onUserChange({ target: { name: 'profileImage', value: "" } })}>
                                            Remove
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                            <DialogActions sx={{ px: 0, pt: 3 }}>
                                <Button onClick={onCloseAll} sx={{ fontWeight: 'bold' }}>Cancel</Button>
                                <Button type="submit" variant="contained" sx={{ fontWeight: 'bold', px: 4, borderRadius: 2 }}>{editingId ? 'Update' : 'Add'}</Button>
                            </DialogActions>
                        </form>
                    )}

                    {editType === "customer" && (
                        <form onSubmit={(e) => onFormSubmit(e, 'customer')}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2, pb: 1 }}>
                                {editingId && (
                                    <TextField
                                        fullWidth
                                        label="Customer ID"
                                        name="customerId"
                                        value={customerForm.customerId}
                                        disabled
                                        variant="outlined"
                                    />
                                )}
                                <TextField fullWidth label="Name" name="name" value={customerForm.name} onChange={onCustomerChange} required variant="outlined" />
                                <TextField fullWidth label="Billing Email" name="billingEmail" type="email" value={customerForm.billingEmail} onChange={onCustomerChange} required variant="outlined" />
                                <TextField fullWidth label="Country" name="country" value={customerForm.country} onChange={onCustomerChange} required variant="outlined" />
                                <TextField fullWidth label="Email" name="email" type="email" value={customerForm.email} onChange={onCustomerChange} variant="outlined" />
                                <TextField fullWidth label="Address" name="address" value={customerForm.address} onChange={onCustomerChange} variant="outlined" />
                                <TextField fullWidth label="Partner Name" name="channelPartnerName" value={customerForm.channelPartnerName} onChange={onCustomerChange} variant="outlined" />
                                <TextField fullWidth label="Phone" name="phone" value={customerForm.phone} onChange={onCustomerChange} variant="outlined" />
                            </Box>
                            <DialogActions sx={{ px: 0, pt: 3 }}>
                                <Button onClick={onCloseAll} sx={{ fontWeight: 'bold' }}>Cancel</Button>
                                <Button type="submit" variant="contained" sx={{ fontWeight: 'bold', px: 4, borderRadius: 2 }}>{editingId ? 'Update' : 'Add'}</Button>
                            </DialogActions>
                        </form>
                    )}

                    {editType === "product" && (
                        <form onSubmit={(e) => onFormSubmit(e, 'product')}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2, pb: 1 }}>
                                {editingId && (
                                    <TextField
                                        fullWidth
                                        label="Product ID"
                                        name="productId"
                                        value={productForm.productId}
                                        disabled
                                        variant="outlined"
                                    />
                                )}
                                <TextField fullWidth label="Product Name" name="name" value={productForm.name} onChange={onProductChange} required variant="outlined" />
                                <TextField fullWidth multiline rows={3} label="Description" name="description" value={productForm.description} onChange={onProductChange} variant="outlined" />
                            </Box>
                            <DialogActions sx={{ px: 0, pt: 3 }}>
                                <Button onClick={onCloseAll} sx={{ fontWeight: 'bold' }}>Cancel</Button>
                                <Button type="submit" variant="contained" sx={{ fontWeight: 'bold', px: 4, borderRadius: 2 }}>{editingId ? 'Update' : 'Add'}</Button>
                            </DialogActions>
                        </form>
                    )}

                    {editType === "consultant" && (
                        <form onSubmit={(e) => onFormSubmit(e, 'consultant')}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2, pb: 1 }}>
                                <TextField fullWidth label="Consultant ID" name="consultantId" value={consultantForm.consultantId} onChange={onConsultantChange} required variant="outlined" />
                                <TextField fullWidth label="Name" name="name" value={consultantForm.name} onChange={onConsultantChange} required variant="outlined" />
                                <TextField fullWidth label="Email" name="email" type="email" value={consultantForm.email} onChange={onConsultantChange} required variant="outlined" />
                            </Box>
                            <DialogActions sx={{ px: 0, pt: 3 }}>
                                <Button onClick={onCloseAll} sx={{ fontWeight: 'bold' }}>Cancel</Button>
                                <Button type="submit" variant="contained" sx={{ fontWeight: 'bold', px: 4, borderRadius: 2 }}>{editingId ? 'Update' : 'Add'}</Button>
                            </DialogActions>
                        </form>
                    )}

                    {editType === "contract" && (
                        <form onSubmit={(e) => onFormSubmit(e, 'contract')}>
                            <Grid container spacing={3} sx={{ pt: 2 }}>
                                {editingId && (
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Contract ID"
                                            name="contractId"
                                            value={contractForm.contractId}
                                            disabled
                                            variant="outlined"
                                        />
                                    </Grid>
                                )}
                                <Grid item xs={12} md={6}>
                                    <TextField fullWidth label="Contract Name" name="contractName" value={contractForm.contractName} onChange={onContractChange} required variant="outlined" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="contract-type-label">Contract Type</InputLabel>
                                        <Select labelId="contract-type-label" name="contractType" value={contractForm.contractType} onChange={onContractChange} label="Contract Type">
                                            <MenuItem value="Support">Support</MenuItem>
                                            <MenuItem value="AMC">AMC</MenuItem>
                                            <MenuItem value="License">License</MenuItem>
                                            <MenuItem value="Subscription">Subscription</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField fullWidth label="Contract Number" name="contractNumber" value={contractForm.contractNumber} onChange={onContractChange} variant="outlined" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField fullWidth label="Start Date" type="date" name="startDate" value={contractForm.startDate} onChange={onContractChange} InputLabelProps={{ shrink: true }} required variant="outlined" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField fullWidth label="End Date" type="date" name="endDate" value={contractForm.endDate} onChange={onContractChange} InputLabelProps={{ shrink: true }} required variant="outlined" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField fullWidth label="Effective Date" type="date" name="effectiveDate" value={contractForm.effectiveDate} onChange={onContractChange} InputLabelProps={{ shrink: true }} variant="outlined" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="contract-status-label">Status</InputLabel>
                                        <Select
                                            labelId="contract-status-label"
                                            name="contractStatus"
                                            value={contractForm.contractStatus}
                                            onChange={onContractChange}
                                            label="Status"
                                        >
                                            <MenuItem value="Draft">Draft</MenuItem>
                                            <MenuItem value="Active">Active</MenuItem>
                                            <MenuItem value="Expired">Expired</MenuItem>
                                            <MenuItem value="Terminated">Terminated</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="renewal-type-label">Renewable</InputLabel>
                                        <Select
                                            labelId="renewal-type-label"
                                            name="renewalType"
                                            value={contractForm.renewalType}
                                            onChange={onContractChange}
                                            label="Renewable"
                                        >
                                            <MenuItem value="Auto">Auto</MenuItem>
                                            <MenuItem value="Manual">Manual</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="support-level-label">Support Level</InputLabel>
                                        <Select
                                            labelId="support-level-label"
                                            name="supportLevel"
                                            value={contractForm.supportLevel}
                                            onChange={onContractChange}
                                            label="Support Level"
                                        >
                                            <MenuItem value="L1">L1</MenuItem>
                                            <MenuItem value="L2">L2</MenuItem>
                                            <MenuItem value="L3">L3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="support-hours-label">Support Hours</InputLabel>
                                        <Select
                                            labelId="support-hours-label"
                                            name="supportHours"
                                            value={contractForm.supportHours}
                                            onChange={onContractChange}
                                            label="Support Hours"
                                        >
                                            <MenuItem value="24x7">24x7</MenuItem>
                                            <MenuItem value="Business Hours">Business Hours</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField fullWidth label="Included Tickets" type="number" name="includedTickets" value={contractForm.includedTickets} onChange={onContractChange} variant="outlined" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField fullWidth label="Usage Limit" type="number" name="usageLimit" value={contractForm.usageLimit} onChange={onContractChange} variant="outlined" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="product-label">Product</InputLabel>
                                        <Select
                                            labelId="product-label"
                                            name="product"
                                            value={contractForm.product}
                                            onChange={onContractChange}
                                            label="Product"
                                        >
                                            <MenuItem value="">None</MenuItem>
                                            {products.map((p) => <MenuItem key={p._id} value={p._id}>{p.name}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="customer-label">Associate Customer</InputLabel>
                                        <Select
                                            labelId="customer-label"
                                            name="customer"
                                            value={contractForm.customer}
                                            onChange={onContractChange}
                                            label="Associate Customer"
                                        >
                                            <MenuItem value="">None</MenuItem>
                                            {customers.map((cust) => <MenuItem key={cust._id} value={cust._id}>{cust.name}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Excluded Services" name="excludedServices" value={contractForm.excludedServices} onChange={onContractChange} variant="outlined" multiline rows={2} />
                                </Grid>
                            </Grid>
                            <DialogActions sx={{ px: 0, pt: 3.5 }}>
                                <Button onClick={onCloseAll} sx={{ fontWeight: 'bold' }}>Cancel</Button>
                                <Button type="submit" variant="contained" sx={{ fontWeight: 'bold', px: 4, borderRadius: 2 }}>{editingId ? 'Update' : 'Add'}</Button>
                            </DialogActions>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            {/* Action Menu */}
            <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleActionMenuClose}>
                <MenuItem onClick={() => { handleEditClick(selectedItem, selectedItem?.type); handleActionMenuClose(); }}>
                    <ListItemIcon><EditIcon fontSize="small" color="primary" /></ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleInfoOpen}>
                    <ListItemIcon><InfoIcon fontSize="small" color="info" /></ListItemIcon>
                    <ListItemText>Info</ListItemText>
                </MenuItem>
                {selectedItem?.type === 'user' && (
                    <MenuItem onClick={() => { handlers.openPasswordDialog(); }}>
                        <ListItemIcon><VpnKeyIcon fontSize="small" color="secondary" /></ListItemIcon>
                        <ListItemText>Change Password</ListItemText>
                    </MenuItem>
                )}
                <MenuItem onClick={() => { handlers.openDeleteDialog(selectedItem?._id, selectedItem?.type); handleActionMenuClose(); }}>
                    <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>

            {/* Change Password Dialog */}
            <Dialog open={isPasswordOpen} onClose={onCloseAll} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontWeight: 'bold', bgcolor: 'secondary.main', color: 'white' }}>Change Password</DialogTitle>
                <form onSubmit={handlePasswordSubmit}>
                    <DialogContent sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant="body2">Change password for <strong>{selectedItem?.name}</strong></Typography>
                        <TextField fullWidth label="New Password" type="password" value={passwordForm.newPassword} onChange={(e) => onPasswordChange('new', e.target.value)} required />
                        <TextField fullWidth label="Confirm New Password" type="password" value={passwordForm.confirmPassword} onChange={(e) => onPasswordChange('confirm', e.target.value)} required />
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={onCloseAll}>Cancel</Button>
                        <Button type="submit" variant="contained" color="secondary" sx={{ fontWeight: 'bold' }}>Update Password</Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* User Info Dialog */}
            <Dialog open={isInfoOpen} onClose={onCloseAll} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 'bold', bgcolor: 'info.main', color: 'white', display: 'flex', alignItems: 'center', gap: 1.5, py: 2 }}>
                    <InfoIcon /> User Information
                </DialogTitle>
                <DialogContent dividers sx={{ pt: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Avatar src={selectedUserInfo?.profileImage} sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: '2rem', fontWeight: 'bold' }}>
                                {selectedUserInfo?.name?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>{selectedUserInfo?.name}</Typography>
                                <Chip label={selectedUserInfo?.role?.toUpperCase()} color={selectedUserInfo?.role === 'admin' ? 'error' : 'primary'} size="small" sx={{ mt: 0.5, fontWeight: 'bold' }} />
                            </Box>
                        </Box>
                        <Divider />
                        <Grid container spacing={2.5}>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <EmailIcon color="action" />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Email Address</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{selectedUserInfo?.email}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <BadgeIcon color="action" />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Employee ID</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{selectedUserInfo?.empId || 'N/A'}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <PhoneIcon color="action" />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Contact Number</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{selectedUserInfo?.contactNo || 'N/A'}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <PeopleIcon color="action" />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Account Role</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 500, textTransform: 'capitalize' }}>{selectedUserInfo?.role}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onCloseAll} variant="outlined" sx={{ fontWeight: 'bold' }}>Close</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => { onCloseAll(); handleEditClick(selectedUserInfo, "user"); }}
                        startIcon={<EditIcon />}
                        sx={{ fontWeight: 'bold' }}
                    >
                        Edit This User
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default FormDialogs;
