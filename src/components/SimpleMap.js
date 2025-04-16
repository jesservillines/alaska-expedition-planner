import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { routeCoordinates, peakCoordinates, landingZoneCoordinates } from '../data/coordinates';
import routes from '../data/routes';

function SimpleMap() {
  const mapRef = useRef(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    // Load the Google Maps script manually
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC4z8Np9U2SScB0EIyJc4xJIiXVZUD9JjY&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    // Define the callback function
    window.initMap = function() {
      try {
        if (mapRef.current) {
          // Use the Ruth Gorge Basecamp coordinates from our accurate coordinates file
          // Apply the same longitude adjustment as in ExpeditionMap.js for consistency
          const LONGITUDE_ADJUSTMENT = 0.5616;
          const ruthGorgeCoords = landingZoneCoordinates["Ruth Gorge Basecamp"];
          const adjustedCoords = {
            lat: ruthGorgeCoords.lat,
            lng: ruthGorgeCoords.lng + LONGITUDE_ADJUSTMENT
          };
          
          const map = new window.google.maps.Map(mapRef.current, {
            center: adjustedCoords,
            zoom: 10,
            mapTypeId: 'terrain'
          });
          
          // Add a marker at Ruth Gorge Basecamp
          new window.google.maps.Marker({
            position: adjustedCoords,
            map: map,
            title: 'Ruth Gorge Basecamp'
          });
          
          // Add markers for key mountains
          Object.entries(peakCoordinates).forEach(([peakName, coords]) => {
            if (['Mount Kudlich', 'Moose\'s Tooth', 'Mount Dickey'].includes(peakName)) {
              new window.google.maps.Marker({
                position: {
                  lat: coords.lat,
                  lng: coords.lng + LONGITUDE_ADJUSTMENT
                },
                map: map,
                title: peakName,
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 7,
                  fillColor: '#FF5722',
                  fillOpacity: 0.9,
                  strokeWeight: 1
                }
              });
            }
          });
          
          // Add markers for all routes from routes.js
          routes.forEach(route => {
            if (route.coordinates) {
              // Choose route color based on category
              let fillColor = '#4CAF50'; // Default green
              
              switch(route.category) {
                case 'Elite':
                  fillColor = '#FF5722'; // Orange for elite routes
                  break;
                case 'Modern Classic':
                case 'Modern':
                  fillColor = '#2196F3'; // Blue for modern routes
                  break;
                case 'Obscure':
                  fillColor = '#9C27B0'; // Purple for obscure routes
                  break;
                case 'Classic':
                default:
                  fillColor = '#4CAF50'; // Green for classics
              }
              
              new window.google.maps.Marker({
                position: {
                  lat: route.coordinates.lat,
                  lng: route.coordinates.lng + LONGITUDE_ADJUSTMENT
                },
                map: map,
                title: `${route.name} (${route.peak})`,
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 6,
                  fillColor: fillColor,
                  fillOpacity: 0.9,
                  strokeWeight: 1
                }
              });
            }
          });
          
          console.log("Map initialized successfully");
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Map initialization error:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };
    
    // Handle script loading errors
    script.onerror = function() {
      console.error("Failed to load Google Maps script");
      setError("Failed to load Google Maps script");
      setIsLoading(false);
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Clean up
      document.head.removeChild(script);
      window.initMap = undefined;
    };
  }, []);

  if (error) {
    return (
      <Paper sx={{ p: 3, m: 3 }}>
        <Typography variant="h6" color="error">Error loading Google Maps</Typography>
        <Typography variant="body1">{error}</Typography>
        <Typography variant="body2">
          Please check the browser console for more detailed error messages.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 1, m: 3 }}>
      <Typography variant="h6" gutterBottom>Simple Map Test</Typography>
      <Box sx={{ position: 'relative', height: '400px', width: '100%' }}>
        {isLoading && (
          <Box sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: 'rgba(255,255,255,0.7)',
            zIndex: 10
          }}>
            <CircularProgress />
          </Box>
        )}
        <div 
          ref={mapRef} 
          style={{ height: '100%', width: '100%' }}
        />
      </Box>
    </Paper>
  );
}

export default SimpleMap;
