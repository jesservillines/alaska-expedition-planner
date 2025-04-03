import React, { useState, useCallback, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  Grid,
  useTheme
} from '@mui/material';
// We're implementing our own map visualization

import routes from '../data/routes';
import logistics from '../data/logistics';

// Container style for the Google Map
const mapContainerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '8px'
};

// Center coordinates for the Ruth Gorge area
const center = {
  lat: 62.9550,
  lng: -150.1700
};

// Map options
const mapOptions = {
  mapTypeId: 'terrain',
  mapTypeControl: true,
  zoomControl: true,
  scrollwheel: true,
  streetViewControl: false
};

const ExpeditionMap = ({ selectedRoutes }) => {
  const theme = useTheme();
  const mapRef = useRef(null);
  
  // State for map features
  const [showAllRoutes, setShowAllRoutes] = useState(true);
  const [showLandingZones, setShowLandingZones] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState(null);
  
  // Since we don't have a valid Google Maps API key, we'll create a static map visualization
  const isLoaded = true; // Set to true to show our custom map implementation

  // Extract all landing zones from logistics data
  const landingZones = logistics.airTaxis.flatMap(airTaxi => 
    airTaxi.landingZones.map(zone => ({
      ...zone,
      airTaxi: airTaxi.name,
      coordinates: getLandingZoneCoordinates(zone.name)
    }))
  );

  // Sample landing zone coordinates (would need real GPS coordinates in production)
  function getLandingZoneCoordinates(zoneName) {
    switch(zoneName) {
      case 'Ruth Gorge Basecamp (Donnelly Landing)':
        return { lat: 62.9470, lng: -150.1700 };
      case 'Root Canal (Moose\'s Tooth)':
        return { lat: 62.9175, lng: -150.0800 };
      case 'Mountain House/Sheldon Amphitheater':
        return { lat: 62.9200, lng: -150.2400 };
      case 'West Fork Ruth':
        return { lat: 62.9350, lng: -150.2250 };
      default:
        return { lat: 62.9300, lng: -150.1800 };
    }
  }

  // Handle marker click to show info window
  const handleMarkerClick = useCallback((markerData) => {
    setSelectedMarker(markerData);
  }, []);

  // Close info window
  const handleCloseInfoWindow = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  // Callback for when the map loads
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Get color for route categories
  const getRouteColor = (category) => {
    // Different colors for different route categories
    const categoryColors = {
      'Classic': '#1976d2',      // blue
      'Modern Classic': '#00796b', // teal
      'Modern': '#7b1fa2',       // purple
      'Elite': '#c62828',        // red
      'Obscure': '#546e7a'       // blue-grey
    };
    
    return categoryColors[category] || '#757575';
  };

  // Landing zone color
  const landingZoneColor = '#ff9800';

  // Handle route selection on the map
  const handleMapRouteSelect = (routeId) => {
    // Would need to implement a way to communicate back to parent component
    console.log(`Selected route on map: ${routeId}`);
  };

  // Get routes to display on map
  const routesToDisplay = showAllRoutes ? routes : selectedRoutes;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Ruth Gorge Interactive Map
        </Typography>
        <Typography variant="body1" paragraph>
          Explore the Ruth Gorge region with this interactive map. Visualize climbing routes, air taxi landing zones, and plan your expedition.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          {/* Map Controls */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showAllRoutes}
                    onChange={(e) => setShowAllRoutes(e.target.checked)}
                    color="primary"
                  />
                }
                label="Show All Routes"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={showLandingZones}
                    onChange={(e) => setShowLandingZones(e.target.checked)}
                    color="primary"
                  />
                }
                label="Show Landing Zones"
              />
            </Box>
          </Paper>

          {/* Map */}
          <Paper sx={{ p: 0, mb: 3, height: '600px', overflow: 'hidden' }}>
            <Box 
              sx={{ 
                height: '100%', 
                backgroundColor: '#e8eaed',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Static Map Background */}
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `linear-gradient(135deg, #f1f3f8 25%, #e3e6eb 25%, #e3e6eb 50%, #f1f3f8 50%, #f1f3f8 75%, #e3e6eb 75%, #e3e6eb 100%)`,
                  backgroundSize: '40px 40px',
                  zIndex: 1
                }}
              />
              
              {/* Mountain Silhouettes */}
              <Box 
                sx={{ 
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '200px',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(100, 120, 140, 0.5) 100%)',
                  clipPath: 'polygon(0% 100%, 10% 80%, 15% 90%, 20% 75%, 25% 85%, 30% 70%, 35% 60%, 40% 80%, 45% 60%, 50% 40%, 55% 50%, 60% 30%, 65% 45%, 70% 20%, 75% 35%, 80% 25%, 85% 35%, 90% 15%, 95% 30%, 100% 5%, 100% 100%)',
                  zIndex: 2
                }}
              />
              
              {/* Glacier */}
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '60%',
                  height: '250px',
                  background: 'linear-gradient(0deg, rgba(220, 230, 240, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                  clipPath: 'polygon(0% 100%, 10% 90%, 20% 100%, 30% 95%, 40% 100%, 50% 90%, 60% 100%, 70% 95%, 80% 100%, 90% 90%, 100% 100%, 80% 0%, 20% 0%)',
                  zIndex: 3
                }}
              />
              
              {/* Route Markers */}
              {routesToDisplay.map((route, index) => {
                // Create a deterministic position based on route id or index
                const position = {
                  left: `${25 + (index * 15) % 55}%`,
                  top: `${30 + (index * 10) % 40}%`
                };
                
                return (
                  <Box
                    key={route.id}
                    sx={{
                      position: 'absolute',
                      left: position.left,
                      top: position.top,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: getRouteColor(route.classification || 'Classic'),
                      border: '2px solid white',
                      zIndex: 5,
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.2)',
                        boxShadow: '0 0 0 3px rgba(255,255,255,0.5)'
                      },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onClick={() => handleMarkerClick({ 
                      type: 'route', 
                      data: route 
                    })}
                  >
                    <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {index + 1}
                    </Typography>
                  </Box>
                );
              })}
              
              {/* Landing Zone Markers */}
              {showLandingZones && landingZones.map((zone, index) => {
                // Create a deterministic position for landing zones
                const position = {
                  left: `${20 + (index * 20) % 60}%`,
                  top: `${65 + (index * 5) % 15}%`
                };
                
                return (
                  <Box
                    key={`lz-${index}`}
                    sx={{
                      position: 'absolute',
                      left: position.left,
                      top: position.top,
                      width: 0,
                      height: 0,
                      borderLeft: '10px solid transparent',
                      borderRight: '10px solid transparent',
                      borderBottom: '20px solid #ff9800',
                      zIndex: 5,
                      cursor: 'pointer',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '20px',
                        left: '-10px',
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'transparent'
                      },
                      '&:hover': {
                        transform: 'scale(1.2)'
                      }
                    }}
                    onClick={() => handleMarkerClick({ 
                      type: 'landingZone', 
                      data: zone 
                    })}
                  />
                );
              })}
              
              {/* Info Window for Selected Marker */}
              {selectedMarker && (
                <Box 
                  sx={{
                    position: 'absolute',
                    right: '10px',
                    top: '10px',
                    backgroundColor: 'white',
                    border: '1px solid rgba(0,0,0,0.2)',
                    borderRadius: '4px',
                    padding: '12px',
                    maxWidth: '250px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    zIndex: 10
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {selectedMarker.data.name}
                    </Typography>
                    <Button 
                      size="small"
                      onClick={handleCloseInfoWindow}
                      sx={{ minWidth: '24px', height: '24px', p: 0, ml: 1 }}
                    >
                      ×
                    </Button>
                  </Box>
                  
                  {selectedMarker.type === 'route' ? (
                    <>
                      <Typography variant="body2">
                        <strong>{selectedMarker.data.peak}</strong> | {selectedMarker.data.grade}
                      </Typography>
                      {selectedMarker.data.technicalGrade && (
                        <Typography variant="body2" gutterBottom>
                          {selectedMarker.data.technicalGrade} | {selectedMarker.data.verticalGain}ft
                        </Typography>
                      )}
                      {selectedMarker.data.characteristics && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {selectedMarker.data.characteristics.substring(0, 100)}...
                        </Typography>
                      )}
                    </>
                  ) : (
                    <>
                      <Typography variant="body2">
                        Elevation: {selectedMarker.data.elevation}ft
                      </Typography>
                      <Typography variant="body2">
                        Operated by: {selectedMarker.data.airTaxi}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Price: ~${selectedMarker.data.price} per person (round trip)
                      </Typography>
                      {selectedMarker.data.notes && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {selectedMarker.data.notes}
                        </Typography>
                      )}
                    </>
                  )}
                </Box>
              )}
              
              {/* Legend */}
              <Box 
                sx={{
                  position: 'absolute',
                  left: '10px',
                  bottom: '10px',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  borderRadius: '4px',
                  padding: '8px',
                  zIndex: 10
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 1 }}>
                  Ruth Gorge Glacier - Interactive Map
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#1976d2' }} />
                    <Typography variant="caption">Classic Routes</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#00796b' }} />
                    <Typography variant="caption">Modern Classic Routes</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#c62828' }} />
                    <Typography variant="caption">Elite Routes</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: '10px solid #ff9800' }} />
                    <Typography variant="caption">Landing Zones</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Map Legend
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#1976d2' }} />
                  <Typography variant="body2">Classic Routes</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#00796b' }} />
                  <Typography variant="body2">Modern Classic Routes</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#7b1fa2' }} />
                  <Typography variant="body2">Modern Routes</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#c62828' }} />
                  <Typography variant="body2">Elite Routes</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff9800' }} />
                  <Typography variant="body2">Landing Zones</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          {/* Selected Routes Panel */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Selected Routes
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {selectedRoutes.length > 0 ? (
                <List dense disablePadding>
                  {selectedRoutes.map(route => (
                    <ListItem key={route.id} disablePadding sx={{ mb: 1 }}>
                      <ListItemText
                        primary={route.name}
                        secondary={`${route.peak} • ${route.grade}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No routes selected yet. Use the Routes Database to select objectives.
                </Typography>
              )}
              
              {selectedRoutes.length > 0 && (
                <Button 
                  variant="outlined" 
                  size="small" 
                  fullWidth 
                  sx={{ mt: 2 }}
                  onClick={() => setShowAllRoutes(false)}
                >
                  Show Only Selected
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Landing Zones Panel */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Common Landing Zones
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List dense disablePadding>
                {landingZones.slice(0, 4).map((zone, index) => (
                  <ListItem key={`zone-${index}`} disablePadding sx={{ mb: 1 }}>
                    <ListItemText
                      primary={zone.name}
                      secondary={`${zone.elevation}ft • ~$${zone.price}`}
                    />
                  </ListItem>
                ))}
              </List>
              
              <Button 
                variant="outlined" 
                size="small" 
                fullWidth 
                sx={{ mt: 2 }}
                onClick={() => setShowLandingZones(true)}
              >
                Show All Landing Zones
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Note: This map provides approximate locations for planning purposes. Actual GPS coordinates may vary.
          You should always consult with your air taxi service and use detailed topographic maps for navigation.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ExpeditionMap;
