import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';

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
          const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: 62.9550, lng: -150.1700 },
            zoom: 10,
            mapTypeId: 'terrain'
          });
          
          // Add a marker
          new window.google.maps.Marker({
            position: { lat: 62.9550, lng: -150.1700 },
            map: map,
            title: 'Ruth Gorge'
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
