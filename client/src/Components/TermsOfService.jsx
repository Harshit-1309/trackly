import React from 'react';
import { Container, Typography, Box, Paper, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Footer from './Footer';

const TermsOfService = () => {
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
                    <Typography color="text.primary">Terms of Service</Typography>
                </Breadcrumbs>

                <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, border: '1px solid #e5e7eb' }}>
                    <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 2, color: 'primary.main' }}>
                        Terms of Service
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 6 }}>
                        Last Updated: February 2026
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <section>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>1. Agreement to Terms</Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                By accessing or using Trackly, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service. These terms apply to all visitors, users, and others who access or use the service.
                            </Typography>
                        </section>

                        <section>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>2. Use License</Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                Permission is granted to temporarily use the services provided by Trackly for personal or internal business time tracking purposes. Under this license you may not:
                            </Typography>
                            <Box component="ul" sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.7 }}>
                                <li>Modify or copy the materials.</li>
                                <li>Use the materials for any commercial purpose other than intended time tracking.</li>
                                <li>Attempt to decompile or reverse engineer any software contained on the website.</li>
                                <li>Remove any copyright or other proprietary notations from the materials.</li>
                            </Box>
                        </section>

                        <section>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>3. User Accounts</Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
                            </Typography>
                        </section>

                        <section>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>4. Limitation of Liability</Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                In no event shall Gooner Technologies Pvt Ltd, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                            </Typography>
                        </section>

                        <section>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>5. Changes to Terms</Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.
                            </Typography>
                        </section>
                    </Box>
                </Paper>
            </Container>
            <Footer />
        </Box>
    );
};

export default TermsOfService;
