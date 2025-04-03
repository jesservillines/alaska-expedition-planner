import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ 
      py: 3, 
      px: 2, 
      mt: 'auto',
      backgroundColor: (theme) => theme.palette.grey[100] 
    }}>
      <Divider sx={{ mb: 3 }} />
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', md: 'flex-start' } }}>
          <Box sx={{ mb: { xs: 2, md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h6" gutterBottom>
              Alaska Expedition Planner
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A comprehensive planning tool for Ruth Gorge expeditions
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-end' } }}>
            <Typography variant="body2" color="text.secondary">
              Data sourced from climbing publications, guide services, and trip reports
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              © {new Date().getFullYear()} Alaska Expedition Planner
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            <Link color="inherit" href="https://www.nps.gov/dena/index.htm" target="_blank" rel="noopener noreferrer" sx={{ mx: 1 }}>
              Denali National Park
            </Link>
            |
            <Link color="inherit" href="https://www.weather.gov/afc/" target="_blank" rel="noopener noreferrer" sx={{ mx: 1 }}>
              Alaska Weather
            </Link>
            |
            <Link color="inherit" href="https://www.mountainproject.com/area/105798197/ruth-gorge" target="_blank" rel="noopener noreferrer" sx={{ mx: 1 }}>
              Mountain Project
            </Link>
            |
            <Link color="inherit" href="https://americanalpineclub.org/alaska" target="_blank" rel="noopener noreferrer" sx={{ mx: 1 }}>
              American Alpine Club
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
