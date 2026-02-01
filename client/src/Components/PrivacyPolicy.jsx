import React from 'react';
import { Container, Typography, Box, Paper, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Footer from './Footer';

const PrivacyPolicy = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f9fafb', pt: { xs: '64px', md: '80px' } }}>
            <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 }, flex: 1 }}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{ mb: 4 }}
                >
                    <MuiLink component={Link} underline="hover" color="inherit" to="/">
                        Home
                    </MuiLink>
                    <Typography color="text.primary">Privacy Policy</Typography>
                </Breadcrumbs>

                <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, border: '1px solid #e5e7eb' }}>
                    <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 2, color: 'primary.main' }}>
                        Privacy Policy
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 6 }}>
                        Last Updated: February 2026
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <section>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>1. Introduction</Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                Welcome to Trackly ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                            </Typography>
                        </section>

                        <section>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>2. The Data We Collect</Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                            </Typography>
                            <Box component="ul" sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.7 }}>
                                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                                <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, login data, browser type and version.</li>
                                <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
                            </Box>
                        </section>

                        <section>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>3. How We Use Your Data</Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                            </Typography>
                            <Box component="ul" sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.7 }}>
                                <li>To provide and maintain our service.</li>
                                <li>To manage your account and registration as a user.</li>
                                <li>To contact you regarding updates or informative communications.</li>
                                <li>To provide you with news, special offers and general information.</li>
                            </Box>
                        </section>

                        <section>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>4. Data Security</Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                            </Typography>
                        </section>

                        <section>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>5. Contact Us</Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                If you have any questions about this privacy policy or our privacy practices, please contact us at support@goonertech.com.
                            </Typography>
                        </section>
                    </Box>
                </Paper>
            </Container>
            <Footer />
        </Box>
    );
};

export default PrivacyPolicy;
