import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Breadcrumbs, Link as MuiLink, TextField, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import { toast } from 'react-toastify';
import Footer from './Footer';

const ContactSupport = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would send this to your backend
        console.log('Contact form submitted:', formData);
        toast.success("Thank you! Your message has been sent to our support team.");
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f9fafb', pt: { xs: '64px', md: '80px' } }}>
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, flex: 1 }}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{ mb: 4 }}
                >
                    <MuiLink component={Link} underline="hover" color="inherit" to="/">
                        Home
                    </MuiLink>
                    <Typography color="text.primary">Contact Support</Typography>
                </Breadcrumbs>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={5}>
                        <Box sx={{ p: { xs: 3, md: 4 } }}>
                            <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 3, color: 'primary.main' }}>
                                Get in Touch
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 5, fontSize: '1.1rem', lineHeight: 1.6 }}>
                                Have a question or need assistance with Trackly? Our support team is here to help you get the most out of your time tracking experience.
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Box sx={{ bgcolor: 'primary.light', p: 1.5, borderRadius: 2, display: 'flex', color: 'primary.main' }}>
                                        <EmailIcon />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Email Us</Typography>
                                        <Typography variant="body2" color="text.secondary">support@goonertech.com</Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Box sx={{ bgcolor: 'primary.light', p: 1.5, borderRadius: 2, display: 'flex', color: 'primary.main' }}>
                                        <LocationOnIcon />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Office Address</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Gooner Technologies Pvt Ltd<br />
                                            Om Unnati Chs, Rivervalley Road<br />
                                            Borivali West, Mumbai 400103
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Box sx={{ bgcolor: 'primary.light', p: 1.5, borderRadius: 2, display: 'flex', color: 'primary.main', alignItems: 'center', justifyContent: 'center' }}>
                                        <LanguageIcon />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Our Website</Typography>
                                        <MuiLink
                                            href="https://gooner-tech.com/Aboutus"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                color: 'text.secondary',
                                                textDecoration: 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                '&:hover': { color: 'primary.main', textDecoration: 'underline' }
                                            }}
                                        >
                                            <img src="/gtech.png" alt="Logo" style={{ width: '20px', height: 'auto' }} />
                                            gooner-tech.com
                                        </MuiLink>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: '1px solid #e5e7eb' }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>Send us a Message</Typography>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Full Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Message"
                                            name="message"
                                            multiline
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            startIcon={<SendIcon />}
                                            sx={{
                                                px: 4,
                                                py: 1.5,
                                                borderRadius: 2,
                                                fontWeight: 800,
                                                textTransform: 'none',
                                                fontSize: '1rem'
                                            }}
                                        >
                                            Send Message
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Box>
    );
};

export default ContactSupport;
