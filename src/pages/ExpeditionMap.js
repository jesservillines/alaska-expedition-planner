import React, { useState, useCallback, useRef, useMemo } from 'react';
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
  useTheme,
  CircularProgress
} from '@mui/material';
import { useLoadScript, GoogleMap, Marker, Polyline, InfoWindow } from '@react-google-maps/api';

import routes from '../data/routes';
import logistics from '../data/logistics';
import { routeCoordinates, peakCoordinates, landingZoneCoordinates } from '../data/coordinates';

// Container style for the Google Map
const mapContainerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '8px'
};

// Center coordinates for the Ruth Gorge area - updated to more accurate position
const center = {
  lat: 62.9053,
  lng: -150.1900
};

// Map options
const mapOptions = {
  mapTypeId: 'terrain',
  mapTypeControl: true,
  zoomControl: true,
  scrollwheel: true,
  streetViewControl: false
};

const ExpeditionMap = ({ selectedRoutes, setSelectedRoutes }) => {
  const theme = useTheme();
  const mapRef = useRef(null);
  
  // State for map features
  const [showAllRoutes, setShowAllRoutes] = useState(true);
  const [showLandingZones, setShowLandingZones] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState(null);
  
  // Load Google Maps script using environment variable for API key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "AIzaSyC4z8Np9U2SScB0EIyJc4xJIiXVZUD9JjY", // Fallback for local development
    libraries: ['places'],
  });

  // Extract all landing zones from logistics data with proper coordinates
  const landingZones = logistics.airTaxis.flatMap(airTaxi => 
    airTaxi.landingZones.map(zone => ({
      ...zone,
      airTaxi: airTaxi.name,
      coordinates: getLandingZoneCoordinates(zone.name),
      type: 'landingZone',
      peak: getPeakForLandingZone(zone.name) // Add associated peak info
    }))
  );

  // Get nearby peak for landing zones
  function getPeakForLandingZone(zoneName) {
    switch(zoneName) {
      case 'Ruth Gorge Basecamp (Donnelly Landing)':
        return 'Mount Dickey';
      case 'Root Canal (Moose\'s Tooth)':
        return 'Moose\'s Tooth';
      case 'Mountain House/Sheldon Amphitheater':
        return 'Mount Huntington';
      case 'West Fork Ruth':
        return 'Mount Kudlich';
      case 'Ruth Glacier':
        return 'Mount Barille';
      case 'Pika Glacier/Little Switzerland':
        return 'Little Switzerland';
      default:
        return 'Ruth Gorge';
    }
  }

  // Landing zone coordinates (using accurate coordinate system)
  function getLandingZoneCoordinates(zoneName) {
    switch(zoneName) {
      case 'Ruth Gorge Basecamp (Donnelly Landing)':
        return { lat: 62.9372, lng: -150.1933 }; // Updated
      case 'Root Canal (Moose\'s Tooth)':
        return { lat: 62.9125, lng: -150.0667 }; // Updated
      case 'Mountain House/Sheldon Amphitheater':
        return { lat: 62.8302, lng: -150.2167 }; // Updated
      case 'West Fork Ruth':
        return { lat: 62.8813, lng: -150.2533 }; // Updated
      case 'Ruth Glacier':
        return { lat: 62.9053, lng: -150.1918 }; // Updated
      case 'Pika Glacier/Little Switzerland':
        return { lat: 62.8267, lng: -150.1800 }; // Updated
      default:
        return { lat: 62.9053, lng: -150.1900 }; // Updated central point
    }
  }
  
  // Get coordinates for routes based on their route ID or peak/landing zone as fallback
  function getRouteCoordinates(route) {
    // First check if we have precise route coordinates in our data file
    if (route.id && routeCoordinates[route.id]) {
      // Use the summit coordinates by default for markers
      return routeCoordinates[route.id].summit;
    }
    
    // If no route-specific coordinates, fallback to peak coordinates
    if (route.peak && peakCoordinates[route.peak]) {
      // Add a small random offset to prevent routes on the same peak from overlapping exactly
      const routeIdHash = route.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 100;
      
      // Create an offset based on the route ID
      const latOffset = (routeIdHash % 11 - 5) * 0.0003;
      const lngOffset = (routeIdHash % 13 - 6) * 0.0003;
      
      return {
        lat: peakCoordinates[route.peak].lat + latOffset,
        lng: peakCoordinates[route.peak].lng + lngOffset
      };
    }
    
    // If we have information about the landing zone, use that as a fallback
    if (route.landingZone) {
      // Find the right landing zone coordinates
      for (const [key, coords] of Object.entries(landingZoneCoordinates)) {
        if (route.landingZone.includes(key)) {
          // Add a small offset to distinguish it from the landing zone marker
          return {
            lat: coords.lat + 0.005,
            lng: coords.lng + 0.003
          };
        }
      }
    }
    
    // Default coordinates for the Ruth Gorge area if we can't determine a better location
    return { lat: 62.9350, lng: -150.1800 };
  }

  // Handle marker click to show info window
  const handleMarkerClick = useCallback((markerData) => {
    setSelectedMarker(markerData);
  }, []);

  // Close info window
  const handleCloseInfoWindow = useCallback(() => {
    setSelectedMarker(null);
  }, []);
  
  // Toggle route selection from the map
  const handleRouteToggle = useCallback((route) => {
    console.log('Toggling route:', route.id, route.name);
    
    // Find if this route is already selected
    const isAlreadySelected = selectedRoutes.some(r => r.id === route.id);
    
    if (isAlreadySelected) {
      // Remove from selected routes
      setSelectedRoutes(prev => prev.filter(r => r.id !== route.id));
    } else {
      // Add to selected routes
      setSelectedRoutes(prev => [...prev, route]);
    }
    
    // Update the marker to reflect the new selection state
    setSelectedMarker(prev => prev ? {
      ...prev,
      isSelected: !isAlreadySelected
    } : null);
    
    // Log for debugging
    console.log(`Route ${route.id} ${isAlreadySelected ? 'removed from' : 'added to'} selection.`);
    console.log(`Total selected routes: ${isAlreadySelected ? selectedRoutes.length - 1 : selectedRoutes.length + 1}`);
  }, [selectedRoutes, setSelectedRoutes]);

  // Callback for when the map loads
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    
    // Create bounds that include all routes and landing zones
    const bounds = new window.google.maps.LatLngBounds();
    
    // Add all route coordinates to bounds - use raw routes data to avoid dependency issues
    routes.forEach(route => {
      if (route.coordinates && route.coordinates.lat && route.coordinates.lng) {
        bounds.extend(new window.google.maps.LatLng(
          route.coordinates.lat,
          route.coordinates.lng
        ));
      }
    });
    
    // Add landing zone coordinates to bounds
    landingZones.forEach(zone => {
      if (zone.coordinates && zone.coordinates.lat && zone.coordinates.lng) {
        bounds.extend(new window.google.maps.LatLng(
          zone.coordinates.lat,
          zone.coordinates.lng
        ));
      }
    });
    
    // Store the bounds for later use
    setMapBounds(bounds);
    
    // Fit the map to these bounds with padding
    map.fitBounds(bounds, 50); // 50 pixels of padding
    
    console.log(`Map loaded with ${routes.length} routes and ${landingZones.length} landing zones`);
    console.log(`Routes with coordinates: ${routes.filter(r => r.coordinates).length}`);
    // Force redraw of routes by logging them
    routes.slice(0, 5).forEach(route => console.log(`Route ${route.id}: ${route.name}, Peak: ${route.peak}`));
  }, [landingZones, routes]);

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

  // Landing zone styles
  const landingZoneColor = '#ff9800';
  const landingZoneSelectedColor = '#ff5722';
  
  // Map bounds for auto-centering
  const [mapBounds, setMapBounds] = useState(null);
  
  // Get all routes from the routes database for filtering/display
  const allRoutes = useMemo(() => {
    // We need to ensure each route has proper coordinates
    const processedRoutes = routes.map(route => {
      // Get coordinates for this route based on its peak and landing zone
      const coordinates = getRouteCoordinates(route);
      
      return {
        ...route,
        isSelected: selectedRoutes.some(r => r.id === route.id),
        type: 'route',
        coordinates: coordinates
      };
    });
    
    console.log(`Processed ${processedRoutes.length} routes with coordinates`);
    return processedRoutes;
  }, [selectedRoutes]); // Removed landingZones dependency to avoid circular references

  // Handle route selection on the map
  const handleMapRouteSelect = (routeId) => {
    // Would need to implement a way to communicate back to parent component
    console.log(`Selected route on map: ${routeId}`);
  };

  // Get routes to display on map
  const routesToDisplay = useMemo(() => {
    const routesToShow = showAllRoutes ? allRoutes : allRoutes.filter(route => route.isSelected);
    return routesToShow;
  }, [showAllRoutes, allRoutes]);

  // Render loading state or error
  if (loadError) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" height="500px">
          <Typography variant="h5" color="error">Error loading Google Maps: {loadError.message}</Typography>
        </Box>
      </Container>
    );
  }

  if (!isLoaded) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" height="500px">
          <CircularProgress />
          <Typography variant="h6" ml={2}>Loading map...</Typography>
        </Box>
      </Container>
    );
  }

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

          {/* Main Map */}
          <Paper sx={{ p: 0, mb: 3, height: '600px', overflow: 'hidden' }}>
            <GoogleMap
              mapContainerStyle={{
                width: '100%',
                height: '100%',
              }}
              center={center}
              zoom={10}
              options={{
                ...mapOptions,
                styles: [
                  {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [{"visibility": "off"}]
                  },
                  {
                    "featureType": "poi",
                    "stylers": [{"visibility": "off"}]
                  },
                  {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [{"visibility": "off"}]
                  },
                  {
                    "featureType": "transit",
                    "stylers": [{"visibility": "off"}]
                  }
                ]
              }}
              onLoad={onMapLoad}
            >
              {/* Display landing zones */}
              {showLandingZones && landingZones.map((zone, index) => (
                <Marker
                  key={`landing-${index}`}
                  position={zone.coordinates}
                  icon={{
                    url: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png',
                    scaledSize: new window.google.maps.Size(32, 32)
                  }}
                  onClick={() => handleMarkerClick(zone)}
                  animation={selectedMarker && selectedMarker.name === zone.name ? 
                    window.google.maps.Animation.BOUNCE : null}
                  zIndex={10} // Higher z-index for landing zones
                />
              ))}
              
              {/* Major Ruth Gorge Routes - Fixed static markers */}
              {showAllRoutes && (
                <>
                  {/* Ham and Eggs - Moose's Tooth */}
                  <Marker
                    position={{ lat: 62.9086, lng: -150.0667 }}
                    icon={{
                      path: window.google.maps.SymbolPath.CIRCLE,
                      fillColor: '#1976d2', // Classic route
                      fillOpacity: 0.9,
                      strokeWeight: 2,
                      strokeColor: '#FFFFFF',
                      scale: 7
                    }}
                    onClick={() => handleMarkerClick({
                      id: 'ham-and-eggs',
                      name: 'Ham and Eggs',
                      peak: "Moose's Tooth",
                      grade: "Grade V, 5.9 WI4",
                      type: 'route',
                      category: 'Classic',
                      coordinates: { lat: 62.9086, lng: -150.0667 }
                    })}
                  />
                  
                  {/* Mt. Dickey - The Badlands */}
                  <Marker
                    position={{ lat: 62.9372, lng: -150.1967 }}
                    icon={{
                      path: window.google.maps.SymbolPath.CIRCLE,
                      fillColor: '#00796b', // Modern Classic
                      fillOpacity: 0.9,
                      strokeWeight: 2,
                      strokeColor: '#FFFFFF',
                      scale: 7
                    }}
                    onClick={() => handleMarkerClick({
                      id: 'the-badlands',
                      name: 'The Badlands',
                      peak: "Mount Dickey",
                      grade: "Grade VI, 5.10 A2+",
                      type: 'route',
                      category: 'Modern Classic',
                      coordinates: { lat: 62.9372, lng: -150.1967 }
                    })}
                  />
                  
                  {/* Mount Barille - Cobra Pillar */}
                  <Marker
                    position={{ lat: 62.9253, lng: -150.1883 }}
                    icon={{
                      path: window.google.maps.SymbolPath.CIRCLE,
                      fillColor: '#7b1fa2', // Modern
                      fillOpacity: 0.9,
                      strokeWeight: 2,
                      strokeColor: '#FFFFFF',
                      scale: 7
                    }}
                    onClick={() => handleMarkerClick({
                      id: 'cobra-pillar',
                      name: 'Cobra Pillar',
                      peak: "Mount Barille",
                      grade: "Grade V, 5.11+ A2",
                      type: 'route',
                      category: 'Modern',
                      coordinates: { lat: 62.9253, lng: -150.1883 }
                    })}
                  />
                  
                  {/* Mount Kudlich - The Climbing is Easy */}
                  <Marker
                    position={{ lat: 62.8814, lng: -150.2483 }}
                    icon={{
                      path: window.google.maps.SymbolPath.CIRCLE,
                      fillColor: '#c62828', // Elite
                      fillOpacity: 0.9,
                      strokeWeight: 2,
                      strokeColor: '#FFFFFF',
                      scale: 7
                    }}
                    onClick={() => handleMarkerClick({
                      id: 'climbing-is-easy',
                      name: 'The Climbing is Easy',
                      peak: "Mount Kudlich",
                      grade: "Grade VI, 5.12 A3",
                      type: 'route',
                      category: 'Elite',
                      coordinates: { lat: 62.8814, lng: -150.2483 }
                    })}
                  />
                </>
              )}
              
              {/* Info Window */}
              {selectedMarker && (
                <InfoWindow
                  position={selectedMarker.coordinates || selectedMarker.data?.coordinates}
                  onCloseClick={handleCloseInfoWindow}
                >
                  <div style={{ padding: '5px', maxWidth: '220px' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {selectedMarker.name}
                    </Typography>
                    {selectedMarker.type === 'route' ? (
                      <div>
                        <Typography variant="body2">
                          <strong>{selectedMarker.peak}</strong> | {selectedMarker.grade}
                        </Typography>
                        {selectedMarker.technicalGrade && (
                          <Typography variant="body2">
                            {selectedMarker.technicalGrade} | {selectedMarker.verticalGain}ft
                          </Typography>
                        )}
                        <Typography variant="body2" sx={{ mt: 0.5, fontSize: '0.8rem', color: 'text.secondary' }}>
                          {selectedMarker.firstAscent ? `First Ascent: ${selectedMarker.firstAscent}` : ''}
                        </Typography>
                        {selectedMarker.pitches && (
                          <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                            {selectedMarker.pitches} pitches
                          </Typography>
                        )}
                        <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                          Landing Zone: {selectedMarker.landingZone || "Ruth Gorge"}
                        </Typography>
                        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                          <Button 
                            size="small" 
                            variant="outlined" 
                            color="primary"
                            onClick={() => handleMapRouteSelect(selectedMarker.id)}
                          >
                            View Details
                          </Button>
                          <Button 
                            size="small" 
                            variant={selectedMarker.isSelected ? "contained" : "outlined"} 
                            color={selectedMarker.isSelected ? "secondary" : "primary"}
                            onClick={() => handleRouteToggle(selectedMarker)}
                          >
                            {selectedMarker.isSelected ? "Selected" : "Add Route"}
                          </Button>
                        </Box>
                      </div>
                    ) : (
                      <div>
                        <Typography variant="body2">
                          Elevation: {selectedMarker.elevation}ft
                        </Typography>
                        <Typography variant="body2">
                          Air Taxi: {selectedMarker.airTaxi}
                        </Typography>
                        <Typography variant="body2">
                          Price: ~${selectedMarker.price}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 0.5, fontSize: '0.8rem', color: 'text.secondary' }}>
                          Good access point for: {selectedMarker.peak || "Ruth Gorge"}
                        </Typography>
                        {selectedMarker.notes && (
                          <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary', mt: 0.5 }}>
                            {selectedMarker.notes}
                          </Typography>
                        )}
                      </div>
                    )}
                  </div>
                </InfoWindow>
              )}
              
              {/* Map Legend */}
              <div style={{
                position: 'absolute',
                left: '10px',
                bottom: '10px',
                backgroundColor: 'rgba(255,255,255,0.8)',
                padding: '8px',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 1 }}>
                  Ruth Gorge - Map Legend
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
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#7b1fa2' }} />
                    <Typography variant="caption">Modern Routes</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#c62828' }} />
                    <Typography variant="caption">Elite Routes</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ff9800' }} />
                    <Typography variant="caption">Landing Zones</Typography>
                  </Box>
                </Box>
              </div>
            </GoogleMap>
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
