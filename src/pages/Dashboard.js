import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  CardActionArea,
  CardMedia,
  Button, 
  List, 
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RouteIcon from '@mui/icons-material/Terrain';
import MapIcon from '@mui/icons-material/Map';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ChecklistIcon from '@mui/icons-material/ChecklistRtl';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import InfoIcon from '@mui/icons-material/Info';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import routes from '../data/routes';

// Use local hero image for the dashboard
const heroImage = "/images/alaska_range_header.jpg";

// Function to get the appropriate route image
const getRouteImage = (routeId) => {
  // Dynamically check for an image file named after the route ID
  // This allows users to simply add a new image with the route ID name
  if (routeId) {
    const formattedRouteId = routeId.replace(/-/g, '_');
    const localImagePath = `/images/${formattedRouteId}.jpg`;
    return localImagePath;
  }
  
  // Fallback to a placeholder if there's no matching route image
  return `https://source.unsplash.com/featured/?mountain,alaska,climbing`;
};

const Dashboard = ({ selectedRoutes, expeditionDates }) => {
  const navigate = useNavigate();

  // Display specific featured routes as requested
  const featuredRoutes = routes.filter(route => 
    route.id === "ham-and-eggs" || route.id === "blue-collar-beatdown" || route.id === "right-couloir"
  );

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${heroImage})`,
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Grid container>
          <Grid item md={8}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                Alaska Ruth Gorge Expedition Planner
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Plan your climbing adventure with comprehensive route information, 
                seasonal details, and expedition logistics.
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                onClick={() => navigate('/routes')}
                endIcon={<ArrowForwardIcon />}
              >
                Explore Routes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Expedition Status */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Your Expedition
              </Typography>
              <Divider sx={{ mb: 2 }}/>
              <Typography variant="body1" gutterBottom>
                {selectedRoutes.length > 0 
                  ? `You've selected ${selectedRoutes.length} route${selectedRoutes.length > 1 ? 's' : ''}`
                  : 'No routes selected yet'}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {expeditionDates.start 
                  ? `Dates: ${expeditionDates.start.toDateString()} to ${expeditionDates.end.toDateString()}`
                  : 'No dates selected yet'}
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  startIcon={<RouteIcon />}
                  onClick={() => navigate('/routes')}
                >
                  Select Routes
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<CalendarMonthIcon />}
                  onClick={() => navigate('/calendar')}
                >
                  Plan Dates
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Optimal Planning Window
              </Typography>
              <Divider sx={{ mb: 2 }}/>
              <Typography variant="body1" paragraph>
                <strong>Late April to early May</strong> offers the best balance for Ruth Gorge climbing:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <WbSunnyIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Cold enough for solid ice and stable snow" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WbSunnyIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Longer days with improving weather patterns" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WbSunnyIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="May is historically the driest month" 
                  />
                </ListItem>
              </List>
              <Button 
                variant="outlined" 
                startIcon={<InfoIcon />}
                onClick={() => navigate('/seasonal-info')}
                sx={{ mt: 1 }}
              >
                More Weather Info
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Featured Routes */}
      <Typography variant="h4" sx={{ mb: 3 }}>
        Classic Ruth Gorge Routes
      </Typography>
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {featuredRoutes.map((route) => (
          <Grid item key={route.id} xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} className="route-card">
              <CardActionArea onClick={() => navigate('/routes')}>
                <CardMedia
                  component="div"
                  sx={{ pt: '75%', backgroundColor: 'grey.300' }}
                  // Use local route images where available
                  image={getRouteImage(route.id)}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {route.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {route.peak} • {route.grade} • {route.technicalGrade}
                  </Typography>
                  <Typography variant="body2">
                    {route.characteristics.substring(0, 100)}...
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Planning Tools */}
      <Typography variant="h4" sx={{ mb: 3 }}>
        Expedition Planning Tools
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea onClick={() => navigate('/map')}>
              <CardContent>
                <MapIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Interactive Map
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Visualize routes, landing zones, and campsites in the Ruth Gorge area.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea onClick={() => navigate('/budget')}>
              <CardContent>
                <AccountBalanceWalletIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Budget Calculator
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Estimate costs for flights, gear, food, and all expedition expenses.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea onClick={() => navigate('/packing')}>
              <CardContent>
                <ChecklistIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Packing Checklists
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Comprehensive gear lists tailored to Alaska Range expeditions.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea onClick={() => navigate('/logistics')}>
              <CardContent>
                <FlightTakeoffIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Logistics Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Air taxi services, accommodation, and travel details for your trip.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea onClick={() => navigate('/calendar')}>
              <CardContent>
                <CalendarMonthIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Expedition Calendar
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Plan your timeline including travel days, acclimatization, and climbing windows.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea onClick={() => navigate('/seasonal-info')}>
              <CardContent>
                <WbSunnyIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Seasonal Conditions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Historical weather data and optimal climbing windows for the Alaska Range.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
